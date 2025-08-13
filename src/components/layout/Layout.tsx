import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={toggleMobileMenu} />
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        </div>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-50 bg-black/50 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                className="fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] md:hidden"
                initial={{ x: -256 }}
                animate={{ x: 0 }}
                exit={{ x: -256 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              >
                <Sidebar 
                  collapsed={false} 
                  onToggle={() => {}} 
                  className="bg-card shadow-lg"
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          <motion.div
            className="p-4 md:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>

        {/* Sidebar Toggle Button for Desktop */}
        <motion.button
          className="fixed bottom-6 left-6 z-40 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
          onClick={toggleSidebar}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: sidebarCollapsed ? 0 : 180 }}
            transition={{ duration: 0.2 }}
          >
            ←
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
};