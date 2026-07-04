"use client";

import type * as React from "react";

interface ContainerProps {
	children: React.ReactNode;
	style?: React.CSSProperties;
	className?: string;
	size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizeMap = {
	sm: "640px",
	md: "768px",
	lg: "1024px",
	xl: "1280px",
	full: "100%",
};

export function Container({
	children,
	style,
	className,
	size = "xl",
}: ContainerProps) {
	const containerStyles: React.CSSProperties = {
		width: "100%",
		maxWidth: sizeMap[size],
		marginLeft: "auto",
		marginRight: "auto",
		paddingLeft: "var(--space-lg)",
		paddingRight: "var(--space-lg)",
		...style,
	};

	return (
		<div className={className} style={containerStyles}>
			{children}
		</div>
	);
}
