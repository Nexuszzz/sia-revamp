import { BarChart3 } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';

const RiwayatStatusKelas = () => (
  <PageTemplate
    title="Riwayat Status Kelas"
    description="Riwayat perubahan status dan kelas mahasiswa"
    icon={<BarChart3 className="h-8 w-8" />}
  />
);

export default RiwayatStatusKelas;