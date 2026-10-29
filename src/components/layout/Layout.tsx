import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingPlantAssistant from '../common/FloatingPlantAssistant';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingPlantAssistant />
    </div>
  );
};

export default Layout;