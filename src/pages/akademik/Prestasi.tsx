import { Award } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';

const Prestasi = () => (
  <PageTemplate
    title="Prestasi"
    description="Rekam jejak prestasi mahasiswa"
    icon={<Award className="h-8 w-8" />}
  />
);

export default Prestasi;