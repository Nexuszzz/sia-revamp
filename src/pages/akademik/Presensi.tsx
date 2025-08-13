import { Users } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';

const Presensi = () => (
  <PageTemplate
    title="Presensi"
    description="Data kehadiran perkuliahan"
    icon={<Users className="h-8 w-8" />}
  />
);

export default Presensi;