# Extract optimized WebP frames from video for scroll animation
# Usage: .\scripts\extract-frames.ps1

param(
    [string]$VideoPath = "public\videos\hero.mp4",
    [string]$OutputDir = "public\frames\hero",
    [int]$TargetFrames = 45,        # Number of frames to extract (fewer = faster loading)
    [int]$Quality = 65,              # WebP quality (0-100, lower = smaller files)
    [int]$MaxWidth = 1280            # Max width in pixels (height auto-calculated)
)

Write-Host "Frame Extraction Script" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan

# Check if ffmpeg is available
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    Write-Host "Error: ffmpeg is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Check if video exists
if (-not (Test-Path $VideoPath)) {
    Write-Host "Error: Video file not found at $VideoPath" -ForegroundColor Red
    exit 1
}

# Get video duration
$durationOutput = ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 $VideoPath 2>$null
$duration = [float]$durationOutput

Write-Host "Video duration: $duration seconds" -ForegroundColor Yellow

# Calculate FPS to get target number of frames
$fps = $TargetFrames / $duration
Write-Host "Extracting $TargetFrames frames at $([math]::Round($fps, 2)) fps" -ForegroundColor Yellow

# Create output directory
if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
    Write-Host "Created directory: $OutputDir" -ForegroundColor Green
} else {
    # Clean existing frames
    Remove-Item "$OutputDir\frame_*.webp" -ErrorAction SilentlyContinue
    Write-Host "Cleaned existing frames in: $OutputDir" -ForegroundColor Yellow
}

Write-Host "`nExtracting frames..." -ForegroundColor Cyan

# Extract frames as optimized WebP with transparent background
# -vf: remove dark background (#0A080A), scale to max width, use lanczos for quality
# colorkey filter removes the background color (0x0A080A) with some similarity tolerance
# -quality: WebP quality
# -compression_level: WebP compression (6 = max)
ffmpeg -i $VideoPath `
    -vf "colorkey=0x0A080A:0.03:0.0,fps=$fps,scale='min($MaxWidth,iw)':'-2':flags=lanczos" `
    -c:v libwebp `
    -quality $Quality `
    -compression_level 6 `
    -preset photo `
    -loop 0 `
    "$OutputDir\frame_%04d.webp" `
    -y 2>&1 | Out-Null

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Frame extraction failed" -ForegroundColor Red
    exit 1
}

# Optional additional optimization pass: re-encode each extracted WebP to
# make sure quality/compression settings are consistently applied and to
# squeeze a bit more size out of the frames. This will overwrite the
# extracted frames in-place.
Write-Host "`nRe-optimizing frames with ffmpeg (this may take a few seconds)..." -ForegroundColor Cyan

$reencodeError = $false
foreach ($file in Get-ChildItem "$OutputDir\frame_*.webp" | Sort-Object Name) {
    $src = $file.FullName
    $tmp = "$src.tmp.webp"

    # Re-encode: remove background, scale to ensure width limit, apply chosen quality
    ffmpeg -i $src `
        -vf "colorkey=0x0A080A:0.03:0.0,scale='min($MaxWidth,iw)':'-2':flags=lanczos" `
        -c:v libwebp `
        -quality $Quality `
        -compression_level 6 `
        -preset photo `
        -loop 0 `
        $tmp `
        -y 2>&1 | Out-Null

    if ($LASTEXITCODE -ne 0 -or -not (Test-Path $tmp)) {
        Write-Host "Warning: failed to re-encode $($file.Name)" -ForegroundColor Yellow
        $reencodeError = $true
        continue
    }

    Move-Item -Force $tmp $src
}

if ($reencodeError) {
    Write-Host "One or more frames failed re-encoding; original extracted files remain for those." -ForegroundColor Yellow
}

# Count extracted frames
$frameCount = (Get-ChildItem "$OutputDir\frame_*.webp").Count
Write-Host "`nExtracted $frameCount frames" -ForegroundColor Green

# Calculate total size
$totalSize = (Get-ChildItem "$OutputDir\frame_*.webp" | Measure-Object -Property Length -Sum).Sum
$avgSize = $totalSize / $frameCount
$totalSizeMB = [math]::Round($totalSize / 1MB, 2)
$avgSizeKB = [math]::Round($avgSize / 1KB, 1)

Write-Host "`nFrame Statistics:" -ForegroundColor Cyan
Write-Host "  Total frames: $frameCount"
Write-Host "  Total size: $totalSizeMB MB"
Write-Host "  Avg frame size: $avgSizeKB KB"

Write-Host "`nUpdate your ScrollVideo component:" -ForegroundColor Yellow
Write-Host "  frameCount={$frameCount}" -ForegroundColor White
Write-Host "  framePathPattern=`"/frames/hero/frame_`"" -ForegroundColor White
Write-Host "  format=`"webp`"" -ForegroundColor White

Write-Host "`nDone!" -ForegroundColor Green
