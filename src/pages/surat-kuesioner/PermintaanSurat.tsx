import { FileText } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';

const PermintaanSurat = () => (
  <PageTemplate
    title="Permintaan Surat"
    description="Ajukan permintaan surat keterangan"
    icon={<FileText className="h-8 w-8" />}
  />
);

export default PermintaanSurat;