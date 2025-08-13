import { BookOpen } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';

const TugasAkhir = () => (
  <PageTemplate
    title="Tugas Akhir"
    description="Pendaftaran dan informasi tugas akhir"
    icon={<BookOpen className="h-8 w-8" />}
  />
);

export default TugasAkhir;