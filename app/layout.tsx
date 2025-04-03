import '@/styles/globals.css';
import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { Analytics } from '@vercel/analytics/next';
import { Provider } from './providers';
import { Metadata, Viewport } from 'next'
import { Uncial_Antiqua, Texturina } from 'next/font/google'
import { cn } from '@/lib/utils';

const uncial = Uncial_Antiqua({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
})

const texturina = Texturina({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'Wrap ETH',
	description: 'Easily wrap ETH or xDAI for trading with any ERC-20 token. No fees, no frills.',
	icons: {
		icon: "/favicon.ico",
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={cn('h-screen w-screen max-w-full bg-background overflow-auto', uncial.className, texturina.className)}>
				<Provider>
					<main>{children}</main>
				</Provider>
				<Analytics mode='production' />
			</body>
		</html >
	)
}
