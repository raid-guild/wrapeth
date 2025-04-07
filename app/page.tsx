'use client';

import ConnectWallet from '@/components/ConnectWallet';
import Header from '@/components/Header';
import RaidGuild from '@/components/icons/RaidGuild';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Skeleton from '@/components/ui/skeleton';
import WrapperForm from '@/components/WrapperForm';
import cn from '@/lib/utils';
import '@rainbow-me/rainbowkit/styles.css';
import Link from 'next/link';
import React, { Suspense, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

const Home = () => {
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
        <Suspense fallback={<Skeleton className='h-10 w-20' />}>
          <ConnectWallet />
        </Suspense>
      </Header>
      <h1 className='font-uncial mt-10 text-center text-7xl font-semibold'>
        Wrap Eth
      </h1>
      <Card className='mt-6 w-full rounded-xs border-2 border-white p-32'>
        <div className='flex items-center justify-center'>
          <Button
            onClick={() => onButtonSelection(0)}
            className={cn(
              'pointer rounded-xs rounded-r-none uppercase hover:bg-purple-600',
              deposit ? 'hover:bg-primary bg-purple-600' : 'bg-secondary'
            )}
          >
            Wrap {mounted ? chain?.nativeCurrency?.symbol || 'ETH' : 'ETH'}
          </Button>
          <Button
            onClick={() => onButtonSelection(1)}
            className={cn(
              'pointer rounded-xs rounded-l-none uppercase hover:bg-purple-600',
              deposit ? 'bg-secondary' : 'hover:bg-primary bg-purple-600'
            )}
          >
            Unwrap W{mounted ? chain?.nativeCurrency?.symbol || 'ETH' : 'ETH'}
          </Button>
        </div>

        {mounted && isConnected ? (
          <WrapperForm action={deposit ? 'deposit' : 'withdraw'} />
        ) : (
          <h1 className='font-uncial mt-5 text-center text-2xl font-semibold text-white'>
            Connect to {deposit ? 'wrap' : 'unwrap'} ETH
          </h1>
        )}
      </Card>

      <div className='my-6 mr-48 flex w-full justify-center md:justify-end'>
        <Link
          className='flex flex-col items-center justify-center gap-1.5'
          href='https://raidguild.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          <h1 className='font-uncial text-xl font-semibold text-white'>
            Brought to you by:
          </h1>
          <RaidGuild className='text-primary h-14 w-50' />
        </Link>
      </div>
    </div>
  );
};

export default Home;
