import { Camera } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';

const FotoIjazah = () => (
  <PageTemplate
    title="Foto Ijazah"
    description="Upload foto untuk keperluan ijazah"
    icon={<Camera className="h-8 w-8" />}
  />
);

export default FotoIjazah;