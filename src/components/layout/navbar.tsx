"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as React from "react";
import { cn } from "~/lib/utils";

const navItems = [
	{ label: "Products", href: "#products" },
	{ label: "Contact", href: "#contact" },
];

export function Navbar() {
	const [scrolled, setScrolled] = React.useState(false);

	React.useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={cn(
				"fixed top-0 left-0 z-50 flex w-full justify-center px-6 transition-all duration-300",
				scrolled
					? "bg-[var(--color-background)]/90 border-b border-[var(--color-border)] backdrop-blur-xl"
					: "border-b border-transparent bg-transparent",
			)}
		>
			<nav className="flex h-[72px] w-full max-w-7xl items-center justify-between">
				<a
					className="font-bold text-lg uppercase tracking-[0.08em] transition-opacity hover:opacity-70"
					href="/"
					style={{ color: "var(--color-foreground)" }}
				>
					Beijan
				</a>

				<NavigationMenu.Root>
					<NavigationMenu.List className="m-0 flex list-none items-center gap-8 p-0">
						{navItems.map((item) => (
							<NavigationMenu.Item key={item.label}>
								<NavigationMenu.Link
									className="font-medium text-xs uppercase tracking-[0.15em] transition-colors"
									href={item.href}
									style={{
										color: "var(--color-muted)",
									}}
									onMouseEnter={(e) => {
										(e.target as HTMLElement).style.color =
											"var(--color-foreground)";
									}}
									onMouseLeave={(e) => {
										(e.target as HTMLElement).style.color =
											"var(--color-muted)";
									}}
								>
									{item.label}
								</NavigationMenu.Link>
							</NavigationMenu.Item>
						))}
					</NavigationMenu.List>
				</NavigationMenu.Root>
			</nav>
		</header>
	);
}
