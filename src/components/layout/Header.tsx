import { useState, useEffect } from 'react';
import { Bell, User, Settings, LogOut, Lock, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PasswordChangeModal } from '@/components/modals/PasswordChangeModal';
import { maskNIM } from '@/lib/utils';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(0);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  // Mock user data
  const user = {
    nim: '244101060016',
    nama: 'NAUFAL M.D',
    email: 'naufal.md@polinema.ac.id',
    avatarUrl: '',
  };

  // Polling notifications every 5 seconds
  useEffect(() => {
    const poll = setInterval(() => {
      // Simulate notification count
      setNotifications(prev => (prev < 5 ? prev + Math.floor(Math.random() * 2) : 5));
    }, 5000);

    return () => clearInterval(poll);
  }, []);

  return (
    <>
      <motion.header 
        className="sticky top-0 z-50 w-full border-b siakad-header shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          {/* Left side - Menu toggle and Logo */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10"
              onClick={onMenuToggle}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="text-white font-bold text-xl">
                SIAKAD <span className="text-blue-200 font-normal">POLINEMA</span>
              </div>
            </div>
          </div>

          {/* Right side - Notifications and User menu */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white hover:bg-white/10"
              onClick={() => navigate('/message')}
            >
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-warning text-warning-foreground"
                  variant="secondary"
                >
                  {notifications > 9 ? '9+' : notifications}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-white/20">
                    <AvatarImage src={user.avatarUrl} alt={user.nama} />
                    <AvatarFallback className="bg-primary-hover text-white">
                      {user.nama.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 mr-4" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm font-medium text-foreground">
                      {user.nama}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      NIM: {maskNIM(user.nim)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/general/biodata')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowPasswordModal(true)}>
                  <Lock className="mr-2 h-4 w-4" />
                  <span>Ganti Password</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Pengaturan</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.header>

      <PasswordChangeModal 
        open={showPasswordModal} 
        onOpenChange={setShowPasswordModal} 
      />
    </>
  );
};