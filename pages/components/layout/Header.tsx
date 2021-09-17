/* eslint-disable @next/next/no-img-element */
import { MenuIcon } from '@heroicons/react/outline';
import React from 'react';

interface Props {
  onToggleMenu: () => void;
}

export default function Header({ onToggleMenu }: Props) {
  const toggleMenu = () => {
    onToggleMenu();
  };

  return (
    <header className="z-20 flex-shrink-0 flex sticky top-0">
      <div className="flex-1 hidden justify-between py-2 md:pr-8 md:flex max-w-screen-xl mx-auto">
        <div className="flex-1 flex items-center">
          <a href="https://magicbell.com">
            <img src="/docs/MBUpdatedLogoWhite.svg" alt="MagicBell" style={{ height: '35px' }} />
          </a>
        </div>
        <div className="ml-4 flex items-center md:ml-6 space-x-5 py-4">
          <a href="https://magicbell.com/pricing">Pricing</a>
          <a href="https://magicbell.com/docs">Docs</a>
          <a href="https://magicbell.com/blog">Blog</a>
          <a href="https://magicbell.com/about">About</a>
          <a href="https://app.magicbell.com">Login</a>
          <a className="secondary-button bg-transparent" href="https://calendly.com/hana_mohan/demo-magicbell">
            Schedule a Demo
          </a>
          <a className="main-button" href="https://app.magicbell.com">
            Sign Up for Free
          </a>
        </div>
      </div>
      <div className="flex-1 flex items-center md:hidden">
        <a href="https://magicbell.com">
          <img src="/docs/white-logo.png" alt="MagicBell" style={{ height: '40px' }} />
        </a>
      </div>
      <button
        className="px-4 text-white focus:outline-none md:hidden h-20"
        onClick={toggleMenu}
      >
        <span className="sr-only">Open main menu</span>
        <MenuIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </header>
  );
}
