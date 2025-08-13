import { MessageSquare } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';

const KuisionerTingkatAkhir = () => (
  <PageTemplate
    title="Kuesioner Tingkat Akhir"
    description="Evaluasi untuk mahasiswa tingkat akhir"
    icon={<MessageSquare className="h-8 w-8" />}
  />
);

export default KuisionerTingkatAkhir;