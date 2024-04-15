import "@/styles/globals.css";

import React, { ReactNode } from 'react';

import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
// import { Navbar } from "@/components/navbar";
// import { Link } from "@nextui-org/link";
import clsx from "clsx";

// import GuestSessionProvider from "./guest-session-provider";


export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	// themeColor: [
	// 	{ media: "(prefers-color-scheme: light)", color: "white" },
	// 	{ media: "(prefers-color-scheme: dark)", color: "black" },
	// ],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

type LayoutProps = {
    children?: React.ReactNode
}

type LayoutPropsExtended = {
    children?: React.ReactNode
    modal?: React.ReactNode
}

export default function RootLayout(props: LayoutProps | LayoutPropsExtended) {
	const { children, modal } = {
        ...props,
        modal: undefined,
    }
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body className={clsx("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
				<Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
					<div className="relative flex flex-col h-screen">
						{/* <Navbar /> */}
						<main className="container mx-auto max-w-7xl p-10 flex-grow">
							{children}
						</main>
						{/* {modal} */}
						{/* <footer className="w-full flex items-center justify-center py-3">
						<Link
							isExternal
							className="flex items-center gap-1 text-current"
							href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
							title="nextui.org homepage"
						>
							<span className="text-default-600">Powered by</span>
							<p className="text-primary">NextUI</p>
						</Link>
					</footer> */}
					</div>
				</Providers>
			</body>
		</html >
	);
}
