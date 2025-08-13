import { Heart } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';

const BPJSKesehatan = () => (
  <PageTemplate
    title="BPJS Kesehatan"
    description="Informasi dan layanan BPJS Kesehatan mahasiswa"
    icon={<Heart className="h-8 w-8" />}
  />
);

export default BPJSKesehatan;