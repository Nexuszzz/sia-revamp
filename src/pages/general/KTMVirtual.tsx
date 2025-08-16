import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, QrCode, Download, Share2, Smartphone, Wifi, Shield, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const KTMVirtual = () => {
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const studentData = {
    nama: 'NAUFAL MUHAMMAD DZAKA PODI',
    nim: '20210001',
    prodi: 'D4 JARINGAN TELEKOMUNIKASI DIGITAL',
    fakultas: 'FAKULTAS TEKNIK',
    angkatan: '2021',
    status: 'AKTIF',
    berlaku: '2024-12-31',
    foto: '/placeholder-student.jpg'
  };

  const features = [
    {
      icon: <QrCode className="h-6 w-6" />,
      title: 'QR Code Verification',
      description: 'Verifikasi identitas dengan scan QR code yang unik'
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: 'Mobile Friendly',
      description: 'Akses mudah melalui smartphone kapan saja'
    },
    {
      icon: <Wifi className="h-6 w-6" />,
      title: 'Online Integration',
      description: 'Terintegrasi dengan sistem kampus secara online'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Secure & Valid',
      description: 'Keamanan data terjamin dengan enkripsi tinggi'
    }
  ];

  const usageStats = [
    { label: 'Akses Perpustakaan', count: 45, icon: '📚' },
    { label: 'Absensi Digital', count: 120, icon: '✅' },
    { label: 'Akses Lab', count: 32, icon: '💻' },
    { label: 'Verifikasi Event', count: 18, icon: '🎫' }
  ];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <CreditCard className="h-8 w-8" />
            KTM Virtual
          </h1>
          <p className="text-muted-foreground">Kartu Tanda Mahasiswa digital untuk berbagai keperluan akademik</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Bagikan
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Virtual Card */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Kartu Mahasiswa Digital</CardTitle>
              <CardDescription>Klik kartu untuk melihat sisi belakang</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <motion.div
                  className="relative w-96 h-60 cursor-pointer perspective-1000"
                  onClick={() => setIsCardFlipped(!isCardFlipped)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="relative w-full h-full preserve-3d"
                    animate={{ rotateY: isCardFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Front Side */}
                    <div className="absolute inset-0 w-full h-full backface-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-2xl text-white p-6 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xs font-semibold opacity-90">UNIVERSITAS TEKNOLOGI</h3>
                            <h4 className="text-xs opacity-75">STUDENT ID CARD</h4>
                          </div>
                          <div className="w-12 h-8 bg-white/20 rounded backdrop-blur-sm"></div>
                        </div>
                        
                        <div className="flex gap-4 flex-1">
                          <div className="w-20 h-24 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                            <CreditCard className="h-8 w-8 text-white/60" />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-lg font-bold mb-1">{studentData.nama}</h2>
                            <p className="text-sm opacity-90">{studentData.nim}</p>
                            <p className="text-xs opacity-75 mt-2">{studentData.prodi}</p>
                            <p className="text-xs opacity-75">{studentData.fakultas}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-end text-xs">
                          <div>
                            <p className="opacity-75">ANGKATAN {studentData.angkatan}</p>
                          </div>
                          <div className="text-right">
                            <p className="opacity-75">BERLAKU HINGGA</p>
                            <p className="font-semibold">{studentData.berlaku}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back Side */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotateY-180">
                      <div className="w-full h-full bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl shadow-2xl text-white p-6 flex flex-col items-center justify-center">
                        <div className="w-32 h-32 bg-white rounded-lg mb-4 flex items-center justify-center">
                          <QrCode className="h-20 w-20 text-blue-600" />
                        </div>
                        <p className="text-sm text-center opacity-90 mb-2">Scan QR Code untuk verifikasi</p>
                        <p className="text-xs opacity-75 text-center">ID: {studentData.nim}</p>
                        <div className="mt-4 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-xs">Terverifikasi</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <QrCode className="h-4 w-4 mr-2" />
                      QR Code
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>QR Code Verification</DialogTitle>
                      <DialogDescription>
                        Gunakan QR code ini untuk verifikasi identitas
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center py-6">
                      <div className="w-48 h-48 bg-white rounded-lg border flex items-center justify-center">
                        <QrCode className="h-32 w-32 text-gray-600" />
                      </div>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      <p>ID: {studentData.nim}</p>
                      <p>Valid until: {studentData.berlaku}</p>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button size="sm" onClick={() => setIsCardFlipped(!isCardFlipped)}>
                  {isCardFlipped ? 'Lihat Depan' : 'Lihat Belakang'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Usage Statistics */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Statistik Penggunaan</CardTitle>
              <CardDescription>Riwayat penggunaan KTM Virtual bulan ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {usageStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 rounded-lg border border-border"
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-xl font-bold text-foreground">{stat.count}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Student Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Mahasiswa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm font-medium">Nama Lengkap</div>
                <div className="text-sm text-muted-foreground">{studentData.nama}</div>
              </div>
              <div>
                <div className="text-sm font-medium">NIM</div>
                <div className="text-sm text-muted-foreground">{studentData.nim}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Program Studi</div>
                <div className="text-sm text-muted-foreground">{studentData.prodi}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Fakultas</div>
                <div className="text-sm text-muted-foreground">{studentData.fakultas}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Status</div>
                <Badge className="bg-success/10 text-success">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {studentData.status}
                </Badge>
              </div>
              <div>
                <div className="text-sm font-medium">Berlaku Hingga</div>
                <div className="text-sm text-muted-foreground">{studentData.berlaku}</div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Fitur KTM Virtual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Bagikan Link
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <QrCode className="h-4 w-4 mr-2" />
                  Tampilkan QR
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default KTMVirtual;