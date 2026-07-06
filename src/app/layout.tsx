import "~/styles/globals.css";
import "~/styles/mobile.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SmoothScrollProvider } from "~/components/layout";
import { CrosshairCursor } from "~/components/ui";

export const metadata: Metadata = {
	title: "Beijan Tech — Giving Every Machine a Brain",
	description:
		"Beijan Technologies builds precision-automated defense systems. Autonomous targeting, CNN-powered accuracy, and RTK-stabilized positioning.",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html className={`${geist.variable}`} lang="en">
			<body className="min-h-screen w-full">
				<CrosshairCursor />
				<SmoothScrollProvider>{children}</SmoothScrollProvider>
			</body>
		</html>
	);
}
