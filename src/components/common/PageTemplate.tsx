import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PageTemplateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}

export const PageTemplate = ({ title, description, icon, children }: PageTemplateProps) => {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          {icon}
          {title}
        </h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fitur Dalam Pengembangan</CardTitle>
          <CardDescription>Halaman ini sedang dalam tahap pengembangan</CardDescription>
        </CardHeader>
        <CardContent>
          {children || (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Konten untuk halaman {title.toLowerCase()} akan segera tersedia.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};