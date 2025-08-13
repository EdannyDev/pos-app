import React from 'react';
import { 
  LayoutContainer, 
  MainContent 
} from '@/styles/layout.styles';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

export default function Layout({ children }) {
  return (
    <LayoutContainer>
      <Navbar />
      <Sidebar />
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
}