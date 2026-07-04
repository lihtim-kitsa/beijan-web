#!/bin/bash
# Extract optimized WebP frames from video for scroll animation
# Usage: ./scripts/extract-frames.sh

VIDEO_PATH="${1:-public/videos/hero.mp4}"
OUTPUT_DIR="${2:-public/frames/hero}"
TARGET_FRAMES="${3:-50}"        # Number of frames to extract (fewer = faster loading)
QUALITY="${4:-20}"              # WebP quality (0-100, lower = smaller files)
MAX_WIDTH="${5:-1920}"          # Max width in pixels (height auto-calculated)

echo -e "\033[36mFrame Extraction Script\033[0m"
echo -e "\033[36m========================\033[0m"

# Check if ffmpeg is available
if ! command -v ffmpeg &> /dev/null; then
    echo -e "\033[31mError: ffmpeg is not installed or not in PATH\033[0m"
    exit 1
fi

# Check if video exists
if [ ! -f "$VIDEO_PATH" ]; then
    echo -e "\033[31mError: Video file not found at $VIDEO_PATH\033[0m"
    exit 1
fi

# Get video duration
DURATION=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$VIDEO_PATH" 2>/dev/null)

echo -e "\033[33mVideo duration: $DURATION seconds\033[0m"

# Calculate FPS to get target number of frames
FPS=$(echo "scale=4; $TARGET_FRAMES / $DURATION" | bc)
echo -e "\033[33mExtracting $TARGET_FRAMES frames at $FPS fps\033[0m"

# Create output directory
if [ ! -d "$OUTPUT_DIR" ]; then
    mkdir -p "$OUTPUT_DIR"
    echo -e "\033[32mCreated directory: $OUTPUT_DIR\033[0m"
else
    # Clean existing frames
    rm -f "$OUTPUT_DIR"/frame_*.webp
    echo -e "\033[33mCleaned existing frames in: $OUTPUT_DIR\033[0m"
fi

echo -e "\n\033[36mExtracting frames...\033[0m"

# Extract frames as optimized WebP with transparent background
# colorkey filter removes the background color (#0A080A) with similarity tolerance
ffmpeg -loglevel error -i "$VIDEO_PATH" \
    -vf "fps=$FPS,scale='min($MAX_WIDTH,iw)':'-2':flags=lanczos" \
    -c:v libwebp \
    -quality "$QUALITY" \
    -compression_level 6 \
    -preset photo \
    -loop 0 \
    "$OUTPUT_DIR/frame_%04d.webp" \
    -y 2>&1

if [ $? -ne 0 ]; then
    echo -e "\033[31mError: Frame extraction failed\033[0m"
    exit 1
fi

# Re-optimize frames
echo -e "\n\033[36mRe-optimizing frames with ffmpeg (this may take a few seconds)...\033[0m"

REENCODE_ERROR=0
for file in "$OUTPUT_DIR"/frame_*.webp; do
    [ -f "$file" ] || continue
    tmp="${file}.tmp.webp"
    
    ffmpeg -loglevel error -i "$file" \
        -vf "scale='min($MAX_WIDTH,iw)':'-2':flags=lanczos" \
        -c:v libwebp \
        -quality "$QUALITY" \
        -compression_level 6 \
        -preset photo \
        -loop 0 \
        "$tmp" \
        -y 2>&1
    
    if [ $? -eq 0 ] && [ -f "$tmp" ]; then
        mv -f "$tmp" "$file"
    else
        echo -e "\033[33mWarning: failed to re-encode $(basename "$file")\033[0m"
        REENCODE_ERROR=1
    fi
done

if [ $REENCODE_ERROR -ne 0 ]; then
    echo -e "\033[33mOne or more frames failed re-encoding; original extracted files remain for those.\033[0m"
fi

# Count extracted frames
FRAME_COUNT=$(find "$OUTPUT_DIR" -name "frame_*.webp" | wc -l)
echo -e "\n\033[32mExtracted $FRAME_COUNT frames\033[0m"

# Calculate total size
TOTAL_SIZE=$(du -sb "$OUTPUT_DIR" | awk '{print $1}')
AVG_SIZE=$(echo "scale=0; $TOTAL_SIZE / $FRAME_COUNT" | bc)
TOTAL_SIZE_MB=$(echo "scale=2; $TOTAL_SIZE / 1048576" | bc)
AVG_SIZE_KB=$(echo "scale=1; $AVG_SIZE / 1024" | bc)

echo -e "\n\033[36mFrame Statistics:\033[0m"
echo "  Total frames: $FRAME_COUNT"
echo "  Total size: $TOTAL_SIZE_MB MB"
echo "  Avg frame size: $AVG_SIZE_KB KB"

echo -e "\n\033[33mUpdate your ScrollVideo component:\033[0m"
echo -e "  \033[37mframeCount={$FRAME_COUNT}\033[0m"
echo -e "  \033[37mframePathPattern=\"/frames/hero/frame_\"\033[0m"
echo -e "  \033[37mformat=\"webp\"\033[0m"

echo -e "\n\033[32mDone!\033[0m"
