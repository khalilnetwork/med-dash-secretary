import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Clock,
  UserCheck,
  ClipboardList,
  ListTodo,
  Pill,
  Phone,
  AlertTriangle,
  BarChart3,
  Settings,
  ChevronDown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Appointments",
    icon: Calendar,
    subItems: [
      { title: "Calendar View", url: "/calendar", icon: Calendar },
      { title: "Today's Agenda", url: "/agenda", icon: Clock },
    ],
  },
  {
    title: "Check-In",
    icon: UserCheck,
    subItems: [
      { title: "Check-In Queue", url: "/check-in", icon: UserCheck },
      { title: "Intake Forms", url: "/intake", icon: ClipboardList },
    ],
  },
  {
    title: "Tasks & Queues",
    icon: ListTodo,
    subItems: [
      { title: "Prescription Refills", url: "/refills", icon: Pill },
      { title: "Follow-Up Calls", url: "/callbacks", icon: Phone },
      { title: "Lab Alerts", url: "/lab-alerts", icon: AlertTriangle },
    ],
  },
  {
    title: "Reports",
    url: "/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export const AppSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-sidebar-accent text-sidebar-primary font-medium"
      : "hover:bg-sidebar-accent/50 text-sidebar-foreground";

  const isGroupActive = (item: any) => {
    if (item.url) return location.pathname === item.url;
    if (item.subItems) {
      return item.subItems.some(
        (subItem: any) => location.pathname === subItem.url,
      );
    }
    return false;
  };

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isSectionOpen = (title: string) => {
    return (
      openSections[title] ??
      isGroupActive(menuItems.find((item) => item.title === title))
    );
  };

  return (
    <Sidebar collapsible="icon" className={isCollapsed ? "w-16" : "w-64"}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <Collapsible
                      open={isSectionOpen(item.title)}
                      onOpenChange={() => toggleSection(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full justify-between hover:bg-sidebar-accent/70 transition-all duration-200">
                          <div className="flex items-center">
                            <item.icon className="h-5 w-5 transition-transform duration-200" />
                            {!isCollapsed && (
                              <span className="ml-2 transition-opacity duration-200">
                                {item.title}
                              </span>
                            )}
                          </div>
                          {!isCollapsed && (
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-300 ${
                                isSectionOpen(item.title) ? "rotate-180" : ""
                              }`}
                            />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {!isCollapsed && (
                        <CollapsibleContent className="transition-all duration-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                          <SidebarMenuSub>
                            {item.subItems.map(
                              (subItem: any, index: number) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild>
                                    <NavLink
                                      to={subItem.url}
                                      end
                                      className={`${getNavClassName} transition-all duration-200 hover:translate-x-1`}
                                      style={{
                                        animationDelay: `${index * 50}ms`,
                                      }}
                                    >
                                      <subItem.icon className="h-4 w-4 transition-all duration-200" />
                                      <span className="transition-all duration-200">
                                        {subItem.title}
                                      </span>
                                    </NavLink>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ),
                            )}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className={`${getNavClassName} transition-all duration-200 hover:translate-x-1`}
                      >
                        <item.icon className="h-5 w-5 transition-transform duration-200" />
                        {!isCollapsed && (
                          <span className="transition-opacity duration-200">
                            {item.title}
                          </span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
