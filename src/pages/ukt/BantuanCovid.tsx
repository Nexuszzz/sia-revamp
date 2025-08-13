import { Heart } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';

const BantuanCovid = () => (
  <PageTemplate
    title="Bantuan COVID-19"
    description="Program bantuan selama pandemi"
    icon={<Heart className="h-8 w-8" />}
  />
);

export default BantuanCovid;