'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { LayoutDashboard, Wallet, Target } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              isActive={pathname.startsWith(item.href)}
              tooltip={item.label}
            >
              <item.icon />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
       <SidebarMenuItem>
          <SidebarMenuButton disabled tooltip="Transações">
            <Wallet/>
            <span>Transações</span>
          </SidebarMenuButton>
      </SidebarMenuItem>
       <SidebarMenuItem>
          <SidebarMenuButton disabled tooltip="Metas">
            <Target/>
            <span>Metas</span>
          </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
