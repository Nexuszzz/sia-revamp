import { BarChart3 } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';

const NilaiDetail = () => (
  <PageTemplate
    title="Detail Nilai Semester"
    description="Rincian nilai per semester"
    icon={<BarChart3 className="h-8 w-8" />}
  />
);

export default NilaiDetail;