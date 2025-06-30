
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { TopNavbar } from '@/components/TopNavbar';

export const Layout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 via-green-50 to-sky-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <TopNavbar />
          <main className="flex-1 p-6 overflow-auto">
            <div className="fade-in">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
