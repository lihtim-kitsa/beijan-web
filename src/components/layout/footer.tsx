"use client";

export function Footer() {
	return (
		<footer
			className="relative border-t"
			style={{
				borderColor: "var(--color-border)",
				backgroundColor: "var(--color-background)",
			}}
		>
			<div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-12 md:px-8">
				<div className="flex flex-col items-center justify-between gap-6 md:flex-row">
					{/* Brand */}
					<div className="flex flex-col items-center gap-2 md:items-start">
						<a
							className="font-bold text-sm uppercase tracking-[0.08em] transition-opacity hover:opacity-70"
							href="/"
							style={{ color: "var(--color-foreground)" }}
						>
							Beijan
						</a>
						<p
							className="text-sm"
							style={{ color: "var(--color-muted)" }}
						>
							Giving every machine a brain.
						</p>
					</div>

					{/* Back to top */}
					<a
						className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
						href="/#"
						style={{ color: "var(--color-muted)" }}
					>
						Back to top
						<svg
							className="h-4 w-4"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							viewBox="0 0 24 24"
						>
							<path
								d="M5 15l7-7 7 7"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<title>Up Arrow</title>
						</svg>
					</a>
				</div>

				{/* Copyright */}
				<div
					className="border-t pt-6 text-center"
					style={{ borderColor: "var(--color-border)" }}
				>
					<p className="text-xs" style={{ color: "var(--color-muted)" }}>
						© {new Date().getFullYear()} Beijan Technologies. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
