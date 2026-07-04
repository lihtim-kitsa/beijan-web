"use client";

import * as React from "react";

type TextVariant = "h1" | "h2" | "h3" | "h4" | "body" | "caption" | "overline";
type TextColor = "default" | "accent" | "muted";

interface TextProps {
	variant?: TextVariant;
	color?: TextColor;
	as?: keyof React.JSX.IntrinsicElements;
	children: React.ReactNode;
	style?: React.CSSProperties;
	className?: string;
}

const variantStyles: Record<TextVariant, React.CSSProperties> = {
	h1: {
		fontSize: "var(--text-7xl)",
		fontWeight: 700,
		lineHeight: 1.1,
		letterSpacing: "-0.02em",
	},
	h2: {
		fontSize: "var(--text-5xl)",
		fontWeight: 600,
		lineHeight: 1.2,
		letterSpacing: "-0.01em",
	},
	h3: {
		fontSize: "var(--text-3xl)",
		fontWeight: 600,
		lineHeight: 1.3,
	},
	h4: {
		fontSize: "var(--text-xl)",
		fontWeight: 500,
		lineHeight: 1.4,
	},
	body: {
		fontSize: "var(--text-base)",
		fontWeight: 400,
		lineHeight: 1.6,
	},
	caption: {
		fontSize: "var(--text-sm)",
		fontWeight: 400,
		lineHeight: 1.5,
	},
	overline: {
		fontSize: "var(--text-xs)",
		fontWeight: 500,
		letterSpacing: "0.1em",
		textTransform: "uppercase" as const,
	},
};

const colorStyles: Record<TextColor, React.CSSProperties> = {
	default: {
		color: "var(--color-foreground)",
	},
	accent: {
		color: "var(--color-accent)",
	},
	muted: {
		color: "var(--color-muted)",
	},
};

const defaultElements: Record<TextVariant, keyof React.JSX.IntrinsicElements> =
	{
		h1: "h1",
		h2: "h2",
		h3: "h3",
		h4: "h4",
		body: "p",
		caption: "span",
		overline: "span",
	};

export function Text({
	variant = "body",
	color = "default",
	as,
	children,
	style,
	className,
}: TextProps) {
	const Component = as ?? defaultElements[variant];

	const combinedStyles: React.CSSProperties = {
		margin: 0,
		...variantStyles[variant],
		...colorStyles[color],
		...style,
	};

	return React.createElement(
		Component,
		{ style: combinedStyles, className },
		children,
	);
}
