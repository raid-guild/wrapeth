'use client';

import React, { useEffect, useState } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { useAccount } from 'wagmi';
import WrapperForm from '@/components/WrapperForm';
import Header from '@/components/Header';
import ConnectWallet from '@/components/ConnectWallet';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import RaidGuild from '@/components/icons/RaidGuild';

export default function Home() {
	const [deposit, setDeposit] = useState<boolean>(true);
	const { isConnected, chain } = useAccount();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const onButtonSelection = (index: number) => {
		switch (index) {
			case 0:
				setDeposit(true);
				break;
			case 1:
				setDeposit(false);
				break;
			default:
				// eslint-disable-next-line no-console
				console.log(`Invalid input: ${index}`);
		}
	};

	return (
		<div className='container mx-auto max-w-[80ch]'>
			<Header>
				<ConnectWallet />
			</Header>
			<h1 className='font-uncial font-semibold text-7xl text-center mt-10'>Wrap Eth</h1>
			<Card className='mt-6 p-32 w-full border-2 border-white rounded-xs'>
				<div className="flex items-center justify-center">
					<Button
						onClick={() => onButtonSelection(0)}
						className={cn(
							'pointer rounded-xs rounded-r-none hover:bg-purple-600 uppercase',
							deposit ? 'bg-purple-600 hover:bg-primary' : 'bg-secondary',
						)}
					>
						Wrap {mounted ? (chain?.nativeCurrency?.symbol || 'ETH') : 'ETH'}
					</Button>
					<Button
						onClick={() => onButtonSelection(1)}
						className={cn(
							'pointer rounded-xs rounded-l-none hover:bg-purple-600 uppercase',
							deposit ? 'bg-secondary' : 'bg-purple-600 hover:bg-primary',
						)}
					>
						Unwrap W{mounted ? (chain?.nativeCurrency?.symbol || 'ETH') : 'ETH'}
					</Button>
				</div>

				{mounted && isConnected ? (
					<WrapperForm action={deposit ? 'deposit' : 'withdraw'} />
				) : (
					<h1 className='mt-5 font-uncial font-semibold text-2xl text-white text-center'>
						Connect to {deposit ? 'wrap' : 'unwrap'} ETH
					</h1>
				)}
			</Card>

			<div className='flex justify-center md:justify-end w-full my-6 mr-48'>
				<Link
					className='flex flex-col items-center justify-center gap-1.5'
					href='https://raidguild.org'
					target='_blank'
					rel='noopener noreferrer'
				>
					<h1 className='text-white font-uncial font-semibold text-xl'>
						Brought to you by:
					</h1>
					<RaidGuild className='w-50 h-14 text-primary' />
				</Link>
			</div>
		</div>
	)
}