import { DollarSign } from 'lucide-react';
import { PageTemplate } from '@/components/common/PageTemplate';

const PembayaranUKT = () => (
  <PageTemplate
    title="Pembayaran UKT"
    description="Informasi dan riwayat pembayaran UKT"
    icon={<DollarSign className="h-8 w-8" />}
  />
);

export default PembayaranUKT;