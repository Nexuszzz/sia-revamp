import { Calendar } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';

const JadwalKuliah = () => (
  <PageTemplate
    title="Jadwal Kuliah"
    description="Jadwal perkuliahan semester ini"
    icon={<Calendar className="h-8 w-8" />}
  />
);

export default JadwalKuliah;