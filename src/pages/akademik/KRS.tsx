import { ClipboardCheck } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';

const KRS = () => (
  <PageTemplate
    title="Kartu Rencana Studi (KRS)"
    description="Pendaftaran mata kuliah semester ini"
    icon={<ClipboardCheck className="h-8 w-8" />}
  />
);

export default KRS;