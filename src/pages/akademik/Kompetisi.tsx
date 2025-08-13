import { Trophy } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';

const Kompetisi = () => (
  <PageTemplate
    title="Kompetisi"
    description="Informasi kompetisi akademik"
    icon={<Trophy className="h-8 w-8" />}
  />
);

export default Kompetisi;