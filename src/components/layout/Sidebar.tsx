import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  GraduationCap,
  CreditCard,
  FileText,
  Award,
  Home,
  ChevronDown,
  ChevronRight,
  Calendar,
  BookOpen,
  DollarSign,
  ClipboardCheck,
  BarChart3,
  Users,
  MapPin,
  Shield,
  Heart,
  CreditCard as Card,
  ExternalLink,
  MessageSquare,
  FileCheck,
  Camera,
  HelpCircle,
  Trophy,
  Briefcase,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  className?: string;
}

interface MenuItem {
  label: string;
  href?: string;
  icon: any;
  external?: boolean;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: Home,
  },
  {
    label: 'General',
    icon: User,
    children: [
      { label: 'Biodata', href: '/general/biodata', icon: User },
      { label: 'Verifikasi Data', href: '/general/verifikasi-data', icon: FileCheck },
      { label: 'NISN & Vaksin', href: '/general/nisn-vaksin', icon: Shield },
      { label: 'KTM', href: '/general/ktm', icon: Card },
      { label: 'KTM Virtual', href: '/general/ktm-virtual', icon: Card },
      { label: 'Riwayat Status Kelas', href: '/general/riwayat-status-kelas', icon: BarChart3 },
      { label: 'BPJS Kesehatan', href: '/general/bpjs-kesehatan', icon: Heart },
    ],
  },
  {
    label: 'Akademik',
    icon: GraduationCap,
    children: [
      { label: 'Kalender Akademik', href: '/akademik/kalender', icon: Calendar },
      { label: 'KRS', href: '/akademik/krs', icon: ClipboardCheck },
      { label: 'LinkAja', href: '/akademik/linkaja', icon: ExternalLink, external: true },
      { label: 'Jadwal Kuliah', href: '/akademik/jadwal', icon: Calendar },
      { label: 'Nilai', href: '/akademik/nilai', icon: BarChart3 },
      { label: 'LMS', href: '/akademik/lms', icon: BookOpen, external: true },
      { label: 'SKPI', href: '/akademik/skpi', icon: Award },
      { label: 'Presensi', href: '/akademik/presensi', icon: Users },
      { label: 'Kompetisi', href: '/akademik/kompetisi', icon: Trophy },
      { label: 'Prestasi', href: '/akademik/prestasi', icon: Award },
    ],
  },
  {
    label: 'UKT',
    icon: CreditCard,
    children: [
      { label: 'Pembayaran', href: '/ukt/pembayaran', icon: DollarSign },
      { label: 'Keringanan', href: '/ukt/keringanan', icon: FileText },
      { label: 'Bantuan COVID-19', href: '/ukt/bantuan-covid19', icon: Heart },
    ],
  },
  {
    label: 'Surat & Kuesioner',
    icon: FileText,
    children: [
      { label: 'Permintaan Surat', href: '/surat-kuesioner/permintaan', icon: FileText },
      { label: 'Riwayat Surat', href: '/surat-kuesioner/riwayat', icon: FileCheck },
      { label: 'Kuesioner', href: '/surat-kuesioner/kuesioner', icon: MessageSquare },
      { label: 'Kuesioner Akademik', href: '/surat-kuesioner/kuesioner-akademik', icon: HelpCircle },
    ],
  },
  {
    label: 'Tingkat Akhir',
    icon: Award,
    children: [
      { label: 'PKL', href: '/tingkat-akhir/pkl', icon: Briefcase },
      { label: 'Tugas Akhir', href: '/tingkat-akhir/tugas-akhir', icon: BookOpen },
      { label: 'Foto Ijazah', href: '/tingkat-akhir/foto-ijazah', icon: Camera },
      { label: 'Kuesioner', href: '/tingkat-akhir/kuesioner', icon: MessageSquare },
    ],
  },
];

export const Sidebar = ({ collapsed, className }: SidebarProps) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (label: string) => {
    if (collapsed) return;
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.label);
    const itemIsActive = item.href ? isActive(item.href) : false;
    
    // Check if any child is active for parent highlighting
    const hasActiveChild = hasChildren && item.children?.some(child => 
      child.href ? isActive(child.href) : false
    );

    if (hasChildren) {
      return (
        <div key={item.label}>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start h-10 px-3 mb-1",
              collapsed ? "px-2" : "px-3",
              (hasActiveChild || isExpanded) && "bg-primary/10 text-primary",
              level > 0 && "ml-4"
            )}
            onClick={() => toggleExpanded(item.label)}
          >
            <item.icon className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-3")} />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </>
            )}
          </Button>
          
          <AnimatePresence>
            {isExpanded && !collapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                {item.children?.map(child => renderMenuItem(child, level + 1))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    if (item.external) {
      return (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center h-10 px-3 mb-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
            collapsed ? "px-2 justify-center" : "px-3 justify-start",
            level > 0 && !collapsed && "ml-8"
          )}
        >
          <item.icon className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-3")} />
          {!collapsed && (
            <span className="flex-1 text-left">{item.label}</span>
          )}
          {!collapsed && <ExternalLink className="h-3 w-3 ml-2" />}
        </a>
      );
    }

    return (
      <NavLink
        key={item.label}
        to={item.href || '#'}
        className={cn(
          "flex items-center h-10 px-3 mb-1 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
          collapsed ? "px-2 justify-center" : "px-3 justify-start",
          level > 0 && !collapsed && "ml-8",
          itemIsActive && "bg-primary text-primary-foreground"
        )}
      >
        <item.icon className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-3")} />
        {!collapsed && (
          <span className="flex-1 text-left">{item.label}</span>
        )}
      </NavLink>
    );
  };

  return (
    <motion.aside
      className={cn(
        "sticky top-16 h-[calc(100vh-4rem)] border-r bg-card flex flex-col",
        collapsed ? "w-16" : "w-64",
        className
      )}
      initial={false}
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-2">
          {menuItems.map(item => renderMenuItem(item))}
        </div>
      </ScrollArea>
      
      {!collapsed && (
        <div className="p-3 border-t">
          <div className="text-xs text-muted-foreground text-center">
            SIAKAD POLINEMA v2.0
          </div>
        </div>
      )}
    </motion.aside>
  );
};