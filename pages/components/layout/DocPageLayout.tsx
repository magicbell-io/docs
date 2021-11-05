import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import path from 'path';
import React, { useEffect } from 'react';
import { useToggle } from 'react-use';
import sitemap from '../../../lib/sitemap';
import DesktopMenu from '../menu/DesktopMenu';
import MobileMenu from '../menu/MobileMenu';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';

interface Props {
  title?: string;
  description?: string;
  children: JSX.Element | JSX.Element[];
}

export default function DocPageLayout({ title = 'Docs', description, children }: Props) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useToggle(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    setSidebarOpen(false);
  }, [router.asPath]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col min-h-screen">
      <NextSeo
        title={`MagicBell - ${title}`}
        description={description}
        canonical={path.join('https://www.magicbell.com', router.basePath, router.asPath)}
      />
      <Header onToggleMenu={toggleSidebar} />
      <div className="flex flex-1 w-full max-w-screen-xl mx-auto divide-x divide-gray-200">
        <MobileMenu
          navigationItems={sitemap}
          isOpen={sidebarOpen}
          toggle={toggleSidebar}
        />
        <DesktopMenu navigationItems={sitemap} />
        <Content>{children}</Content>
      </div>
      <Footer />
    </div>
  );
}
