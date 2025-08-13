import { Calendar } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';

const KalenderAkademik = () => (
  <PageTemplate
    title="Kalender Akademik"
    description="Jadwal kegiatan akademik semester ini"
    icon={<Calendar className="h-8 w-8" />}
  />
);

export default KalenderAkademik;