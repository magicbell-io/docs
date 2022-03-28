import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import path from 'path';
import React, {ReactNode, useEffect} from 'react';
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
  children: ReactNode;
}

export default function DocPageLayout({ title = 'Docs', description, children }: Props) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useToggle(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    setSidebarOpen(false);
  }, [router.asPath]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen flex flex-col">
      <NextSeo
        title={`MagicBell - ${title}`}
        description={description}
        canonical={path.join(
          process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.magicbell.com',
          router.basePath,
          router.asPath,
        )}
      />
      <Header onToggleMenu={toggleSidebar} />
      <div className="max-w-screen-xl mx-auto divide-x divide-gray-200 flex flex-1 w-full">
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
