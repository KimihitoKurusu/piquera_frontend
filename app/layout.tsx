"use client"
import "@/styles/globals.css";
import {fontSans} from "@/config/fonts";
import {Providers} from "./providers";
import {Navbar} from "@/components/navbar";
import {Link} from "@nextui-org/link";
import clsx from "clsx";
import {Card} from 'antd';
import React, {useEffect} from "react";
import {store} from "@/store/store";
import {Provider} from "react-redux";



export default function RootLayout({
									   children,
								   }: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
		<head/>
		<body
			className={clsx(
				"min-h-screen bg-background font-sans antialiased",
				fontSans.variable
			)}
		>

		<Providers themeProps={{attribute: "class", defaultTheme: "dark"}}>
			<Provider store={store}>
				<div className="relative flex flex-col h-screen">
					<Navbar/>
					<main style={{width: "100%"}} className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
						<Card>{children}</Card>
					</main>
					<footer className="w-full flex items-center justify-center py-3">
						<Link
							isExternal
							className="flex items-center gap-1 text-current"
							href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
							title="nextui.org homepage"
						>
							<span className="text-default-600">Powered by</span>
							<p className="text-primary">NextUI</p>
						</Link>
					</footer>
				</div>
			</Provider>
		</Providers>
		</body>
		</html>
	);
}
