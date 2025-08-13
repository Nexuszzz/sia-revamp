import { FileCheck } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';

const RiwayatSurat = () => (
  <PageTemplate
    title="Riwayat Surat"
    description="Status permintaan surat yang telah diajukan"
    icon={<FileCheck className="h-8 w-8" />}
  />
);

export default RiwayatSurat;