
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCheck,
  ClipboardList,
  Calendar,
  Pill,
  Phone,
  BarChart3,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Check-In Queue', url: '/check-in', icon: UserCheck },
  { title: 'Intake Tasks', url: '/intake', icon: ClipboardList },
  { title: 'Calendar', url: '/calendar', icon: Calendar },
  { title: 'Refill Queue', url: '/refills', icon: Pill },
  { title: 'Call-Back Queue', url: '/callbacks', icon: Phone },
  { title: 'Reports', url: '/reports', icon: BarChart3 },
];

export const AppSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? 'bg-blue-100 text-blue-700 font-medium' 
      : 'hover:bg-gray-100 text-gray-700';

  return (
    <Sidebar collapsible="icon" className={isCollapsed ? 'w-16' : 'w-64'}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavClassName}
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
