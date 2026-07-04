"use client";

import type * as React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
	primary: {
		backgroundColor: "var(--color-accent)",
		color: "var(--color-background)",
		border: "none",
	},
	secondary: {
		backgroundColor: "var(--color-surface-elevated)",
		color: "var(--color-foreground)",
		border: "1px solid var(--color-border)",
	},
	ghost: {
		backgroundColor: "transparent",
		color: "var(--color-foreground)",
		border: "none",
	},
	outline: {
		backgroundColor: "transparent",
		color: "var(--color-accent)",
		border: "1px solid var(--color-accent)",
	},
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
	sm: {
		padding: "var(--space-xs) var(--space-sm)",
		fontSize: "var(--text-sm)",
	},
	md: {
		padding: "var(--space-sm) var(--space-md)",
		fontSize: "var(--text-base)",
	},
	lg: {
		padding: "var(--space-md) var(--space-xl)",
		fontSize: "var(--text-lg)",
	},
};

export function Button({
	variant = "primary",
	size = "md",
	children,
	style,
	...props
}: ButtonProps) {
	const baseStyles: React.CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: "var(--space-sm)",
		borderRadius: "var(--radius-md)",
		fontWeight: 500,
		cursor: "pointer",
		transition: "all var(--transition-fast)",
		...variantStyles[variant],
		...sizeStyles[size],
		...style,
	};

	return (
		<button style={baseStyles} {...props}>
			{children}
		</button>
	);
}
