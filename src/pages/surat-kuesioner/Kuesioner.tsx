import { MessageSquare } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';

const Kuesioner = () => (
  <PageTemplate
    title="Kuesioner"
    description="Kuesioner dan survei kampus"
    icon={<MessageSquare className="h-8 w-8" />}
  />
);

export default Kuesioner;