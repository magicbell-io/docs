import XIcon from '@heroicons/react/outline/XIcon';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { SitemapItem } from '../../../lib/sitemap';
import Menu from './Menu';

interface Props {
  isOpen: boolean;
  toggle: () => void;
  navigationItems: SitemapItem[];
}

export default function MobileMenu({ isOpen, navigationItems, toggle }: Props) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: { x: -400 },
            visible: { x: 0 },
          }}
          transition={{ duration: 0.35, stiffness: 0 }}
          className="fixed h-screen top-0 bottom-0 flex-1 flex flex-col max-w-xs w-full bg-white z-50 shadow"
        >
          <button
            onClick={toggle}
            className="absolute top-0 right-0 p-4 text-gray-400 hover:text-gray-800"
          >
            <XIcon className="h-6 w-6" />
          </button>
          <div className="mt-12 flex flex-col overflow-scroll">
            <Menu navigationItems={navigationItems} />
            <a
              className="m-6 mobile-signup-button text-center"
              href="https://app.magicbell.com"
            >
              Sign Up
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
