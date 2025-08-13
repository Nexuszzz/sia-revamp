import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  DollarSign, 
  Calendar, 
  Award, 
  TrendingUp, 
  Users, 
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  BarChart3,
  User
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { formatCurrency, getStatusBadgeClass, maskNIM } from '@/lib/utils';

interface PaymentRecord {
  no: number;
  tahunAkademik: string;
  keterangan: string;
  tagihan: number;
  terbayar: number;
  keringanan: number;
  kewajiban: number;
  status: string;
}

interface InventoryItem {
  nama: string;
  status: string;
  tglDibagikan?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [showFullNIM, setShowFullNIM] = useState(false);

  // Mock data for current user
  const user = {
    nim: '244101060016',
    nama: 'NAUFAL M.D',
    semester: '5',
    ipk: 3.75,
    sksLulus: 98,
    sksTotal: 144,
  };

  // Mock payment data
  const paymentData: PaymentRecord[] = [
    {
      no: 1,
      tahunAkademik: '2024/2025 Ganjil',
      keterangan: 'UKT-MABA 5',
      tagihan: 10000000,
      terbayar: 10000000,
      keringanan: 0,
      kewajiban: 0,
      status: 'LUNAS',
    },
    {
      no: 2,
      tahunAkademik: '2025/2026 Ganjil',
      keterangan: 'UKT-5',
      tagihan: 5000000,
      terbayar: 5000000,
      keringanan: 0,
      kewajiban: 0,
      status: 'LUNAS',
    },
  ];

  // Mock inventory data
  const inventoryData: InventoryItem[] = [
    { nama: 'Teknik Kimia', status: 'Sudah Diambil', tglDibagikan: '12 Agustus 2024' },
    { nama: 'Teknik Sipil', status: 'Sudah Diambil', tglDibagikan: '12 Agustus 2024' },
    { nama: 'Administrasi Niaga', status: 'Belum Diambil', tglDibagikan: '13 Agustus 2024' },
  ];

  const academicProgress = (user.sksLulus / user.sksTotal) * 100;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Welcome Header */}
      <motion.div variants={itemVariants} className="siakad-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Selamat Datang, {user.nama}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-muted-foreground">
                NIM: {showFullNIM ? user.nim : maskNIM(user.nim)}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFullNIM(!showFullNIM)}
              >
                {showFullNIM ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Semester</div>
            <div className="text-2xl font-bold text-primary">{user.semester}</div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">IPK</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{user.ipk.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">dari 4.00</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SKS Lulus</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{user.sksLulus}</div>
            <p className="text-xs text-muted-foreground">dari {user.sksTotal} SKS</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <Award className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{academicProgress.toFixed(1)}%</div>
            <Progress value={academicProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status UKT</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">LUNAS</div>
            <p className="text-xs text-muted-foreground">Semester Ini</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment History */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Riwayat Pembayaran UKT
              </CardTitle>
              <CardDescription>
                Ringkasan pembayaran UKT Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentData.map((payment) => (
                  <motion.div
                    key={payment.no}
                    className="flex items-center justify-between p-4 border rounded-lg hover-scale cursor-pointer"
                    whileHover={{ x: 4 }}
                  >
                    <div>
                      <div className="font-medium">{payment.keterangan}</div>
                      <div className="text-sm text-muted-foreground">{payment.tahunAkademik}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatCurrency(payment.terbayar)}</div>
                      <Badge className={getStatusBadgeClass(payment.status)}>
                        {payment.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4">
                <Button 
                  onClick={() => navigate('/ukt/pembayaran')}
                  className="w-full"
                  variant="outline"
                >
                  Lihat Detail Pembayaran
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Inventory Status */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Kelengkapan Mahasiswa
              </CardTitle>
              <CardDescription>
                Status pengambilan kelengkapan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {inventoryData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="text-sm">{item.nama}</div>
                    <div className="flex items-center gap-2">
                      {item.status === 'Sudah Diambil' ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : (
                        <Clock className="h-4 w-4 text-warning" />
                      )}
                      <span className={`text-xs ${item.status === 'Sudah Diambil' ? 'text-success' : 'text-warning'}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="text-xs text-muted-foreground text-center">
                Pengambilan Kelengkapan MABA<br />
                <span className="font-medium">12 - 16 Agustus 2024</span><br />
                Gedung AT Lt.2, 08:30 - 15:00 WIB
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
            <CardDescription>Menu yang sering digunakan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-20 flex-col gap-2 hover-scale"
                onClick={() => navigate('/akademik/nilai')}
              >
                <BarChart3 className="h-6 w-6" />
                <span className="text-xs">Lihat Nilai</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2 hover-scale"
                onClick={() => navigate('/akademik/jadwal')}
              >
                <Calendar className="h-6 w-6" />
                <span className="text-xs">Jadwal Kuliah</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2 hover-scale"
                onClick={() => navigate('/akademik/presensi')}
              >
                <Users className="h-6 w-6" />
                <span className="text-xs">Presensi</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2 hover-scale"
                onClick={() => navigate('/general/biodata')}
              >
                <User className="h-6 w-6" />
                <span className="text-xs">Biodata</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;