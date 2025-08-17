import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, CreditCard, MapPin, Calendar, Phone, CheckCircle, AlertTriangle, Clock, Shield, FileText, Download, Search, Filter, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

const BPJSKesehatan = () => {
  const [selectedTab, setSelectedTab] = useState('card');
  const [searchFacility, setSearchFacility] = useState('');

  const bpjsData = {
    nama: 'Naufal Muhammad Dzaka',
    nim: '20210001',
    nomorKartu: '0002089123456',
    kelasRawat: 'Kelas III',
    statusKepesertaan: 'AKTIF',
    tanggalDaftar: '2021-08-01',
    masaBerlaku: '2024-12-31',
    faskes1: 'Puskesmas Kedungkandang',
    premi: 'Rp 42.000/bulan',
    statusPembayaran: 'Lunas'
  };

  const healthcareStats = {
    totalKunjungan: 12,
    totalKlaim: 8,
    penghematanBiaya: 4500000,
    fasilitasTersedia: 156
  };

  const medicalHistory = [
    {
      tanggal: '2024-03-15',
      jenis: 'Rawat Jalan',
      faskes: 'RS PKU Muhammadiyah',
      diagnosis: 'Gastritis Akut',
      biaya: 450000,
      klaim: 400000,
      status: 'approved',
      dokter: 'Dr. Sari Dewi, Sp.PD'
    },
    {
      tanggal: '2024-02-20',
      jenis: 'Pemeriksaan Rutin',
      faskes: 'Puskesmas Kedungkandang',
      diagnosis: 'Medical Check Up',
      biaya: 150000,
      klaim: 150000,
      status: 'approved',
      dokter: 'Dr. Ahmad Fauzi'
    },
    {
      tanggal: '2024-01-10',
      jenis: 'Rawat Jalan',
      faskes: 'Klinik Husada',
      diagnosis: 'Influenza',
      biaya: 200000,
      klaim: 180000,
      status: 'approved',
      dokter: 'Dr. Lisa Maharani'
    },
    {
      tanggal: '2023-12-05',
      jenis: 'Konsultasi',
      faskes: 'RS Saiful Anwar',
      diagnosis: 'Konsultasi Mata',
      biaya: 300000,
      klaim: 250000,
      status: 'processing',
      dokter: 'Dr. Budi Santoso, Sp.M'
    }
  ];

  const nearbyFacilities = [
    {
      nama: 'RS PKU Muhammadiyah Malang',
      jenis: 'Rumah Sakit',
      jarak: '2.1 km',
      rating: 4.5,
      spesialisasi: ['Penyakit Dalam', 'Bedah', 'Anak', 'Kandungan'],
      antrian: 'Sedang',
      jamBuka: '24 Jam',
      telepon: '(0341) 362459'
    },
    {
      nama: 'Puskesmas Kedungkandang',
      jenis: 'Puskesmas',
      jarak: '0.8 km',
      rating: 4.2,
      spesialisasi: ['Umum', 'KIA', 'Gigi', 'Imunisasi'],
      antrian: 'Rendah',
      jamBuka: '07:00 - 20:00',
      telepon: '(0341) 801234'
    },
    {
      nama: 'Klinik Husada Prima',
      jenis: 'Klinik',
      jarak: '1.5 km',
      rating: 4.3,
      spesialisasi: ['Umum', 'Laboratorium', 'Radiologi'],
      antrian: 'Rendah',
      jamBuka: '08:00 - 21:00',
      telepon: '(0341) 567890'
    },
    {
      nama: 'RS Saiful Anwar',
      jenis: 'Rumah Sakit',
      jarak: '3.2 km',
      rating: 4.7,
      spesialisasi: ['Mata', 'Jantung', 'Saraf', 'Onkologi'],
      antrian: 'Tinggi',
      jamBuka: '24 Jam',
      telepon: '(0341) 362038'
    }
  ];

  const upcomingAppointments = [
    {
      tanggal: '2024-03-25',
      waktu: '10:00',
      faskes: 'Puskesmas Kedungkandang',
      dokter: 'Dr. Ahmad Fauzi',
      jenis: 'Kontrol Rutin',
      status: 'confirmed'
    },
    {
      tanggal: '2024-04-02',
      waktu: '14:30',
      faskes: 'RS PKU Muhammadiyah',
      dokter: 'Dr. Sari Dewi, Sp.PD',
      jenis: 'Follow Up',
      status: 'pending'
    }
  ];

  const benefits = [
    {
      kategori: 'Rawat Jalan',
      deskripsi: 'Pelayanan kesehatan perorangan tingkat pertama',
      coverage: '100%',
      icon: '🏥'
    },
    {
      kategori: 'Rawat Inap',
      deskripsi: 'Perawatan di rumah sakit sesuai kelas perawatan',
      coverage: '100%',
      icon: '🛏️'
    },
    {
      kategori: 'Persalinan',
      deskripsi: 'Pemeriksaan kehamilan dan persalinan normal/caesar',
      coverage: '100%',
      icon: '👶'
    },
    {
      kategori: 'Gawat Darurat',
      deskripsi: 'Pelayanan kegawatdaruratan medis',
      coverage: '100%',
      icon: '🚨'
    },
    {
      kategori: 'Obat-obatan',
      deskripsi: 'Obat sesuai formularium nasional',
      coverage: '100%',
      icon: '💊'
    },
    {
      kategori: 'Rehabilitasi Medik',
      deskripsi: 'Fisioterapi dan rehabilitasi medis',
      coverage: '100%',
      icon: '🏃‍♂️'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-success/10 text-success';
      case 'processing': return 'bg-warning/10 text-warning';
      case 'rejected': return 'bg-destructive/10 text-destructive';
      case 'confirmed': return 'bg-success/10 text-success';
      case 'pending': return 'bg-warning/10 text-warning';
      case 'AKTIF': return 'bg-success/10 text-success';
      default: return 'bg-secondary/10 text-secondary-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
      case 'confirmed':
      case 'AKTIF':
        return <CheckCircle className="h-4 w-4" />;
      case 'processing':
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'rejected':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getAntrianColor = (antrian) => {
    switch (antrian) {
      case 'Rendah': return 'text-success';
      case 'Sedang': return 'text-warning';
      case 'Tinggi': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const filteredFacilities = nearbyFacilities.filter(facility =>
    facility.nama.toLowerCase().includes(searchFacility.toLowerCase()) ||
    facility.jenis.toLowerCase().includes(searchFacility.toLowerCase())
  );

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
            <Heart className="h-8 w-8" />
            BPJS Kesehatan
          </h1>
          <p className="text-muted-foreground">Informasi dan layanan BPJS Kesehatan mahasiswa</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(bpjsData.statusKepesertaan)}>
            {getStatusIcon(bpjsData.statusKepesertaan)}
            <span className="ml-1">{bpjsData.statusKepesertaan}</span>
          </Badge>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Kartu
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-4 rounded-lg border border-border"
        >
          <div className="text-2xl font-bold text-primary">{healthcareStats.totalKunjungan}</div>
          <div className="text-sm text-muted-foreground">Total Kunjungan</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center p-4 rounded-lg border border-border"
        >
          <div className="text-2xl font-bold text-success">{healthcareStats.totalKlaim}</div>
          <div className="text-sm text-muted-foreground">Klaim Disetujui</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center p-4 rounded-lg border border-border"
        >
          <div className="text-lg font-bold text-warning">Rp {(healthcareStats.penghematanBiaya / 1000000).toFixed(1)}M</div>
          <div className="text-sm text-muted-foreground">Penghematan</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center p-4 rounded-lg border border-border"
        >
          <div className="text-2xl font-bold text-destructive">{healthcareStats.fasilitasTersedia}</div>
          <div className="text-sm text-muted-foreground">Fasilitas</div>
        </motion.div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="card">Kartu</TabsTrigger>
          <TabsTrigger value="history">Riwayat</TabsTrigger>
          <TabsTrigger value="facilities">Faskes</TabsTrigger>
          <TabsTrigger value="appointments">Janji</TabsTrigger>
          <TabsTrigger value="benefits">Manfaat</TabsTrigger>
        </TabsList>

        <TabsContent value="card" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* BPJS Card */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Kartu BPJS Kesehatan</CardTitle>
                  <CardDescription>Informasi kartu kepesertaan BPJS Kesehatan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-6">
                    <motion.div
                      className="w-96 h-60 bg-gradient-to-br from-green-600 to-green-800 rounded-xl shadow-2xl text-white p-6 flex flex-col"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xs font-semibold opacity-90">BPJS KESEHATAN</h3>
                          <h4 className="text-xs opacity-75">KARTU INDONESIA SEHAT</h4>
                        </div>
                        <div className="w-12 h-8 bg-white/20 rounded backdrop-blur-sm flex items-center justify-center">
                          <Heart className="h-4 w-4" />
                        </div>
                      </div>
                      
                      <div className="flex gap-4 flex-1">
                        <div className="w-20 h-24 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                          <CreditCard className="h-8 w-8 text-white/60" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-lg font-bold mb-1">{bpjsData.nama}</h2>
                          <p className="text-sm opacity-90">{bpjsData.nomorKartu}</p>
                          <p className="text-xs opacity-75 mt-2">{bpjsData.kelasRawat}</p>
                          <p className="text-xs opacity-75">{bpjsData.faskes1}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-end text-xs">
                        <div>
                          <p className="opacity-75">BERLAKU HINGGA</p>
                          <p className="font-semibold">{bpjsData.masaBerlaku}</p>
                        </div>
                        <div className="text-right">
                          <p className="opacity-75">STATUS</p>
                          <p className="font-semibold">{bpjsData.statusPembayaran}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      Kartu BPJS Anda aktif dan dapat digunakan di seluruh fasilitas kesehatan yang bekerja sama dengan BPJS.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>

            {/* Card Details */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Detail Kepesertaan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm font-medium">Nama Lengkap</div>
                    <div className="text-sm text-muted-foreground">{bpjsData.nama}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Nomor Kartu</div>
                    <div className="text-sm text-muted-foreground">{bpjsData.nomorKartu}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Kelas Rawat</div>
                    <div className="text-sm text-muted-foreground">{bpjsData.kelasRawat}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Faskes Tingkat I</div>
                    <div className="text-sm text-muted-foreground">{bpjsData.faskes1}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Premi Bulanan</div>
                    <div className="text-sm text-muted-foreground">{bpjsData.premi}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Status</div>
                    <Badge className={getStatusColor(bpjsData.statusKepesertaan)}>
                      {getStatusIcon(bpjsData.statusKepesertaan)}
                      <span className="ml-1">{bpjsData.statusKepesertaan}</span>
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Aksi Cepat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Buat Janji Dokter
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Cek Riwayat Klaim
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      Cari Faskes Terdekat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Medis & Klaim</CardTitle>
              <CardDescription>Histori penggunaan layanan kesehatan dan klaim BPJS</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicalHistory.map((record, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border border-border"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Heart className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{record.diagnosis}</h3>
                          <p className="text-sm text-muted-foreground">{record.faskes} • {record.dokter}</p>
                          <p className="text-xs text-muted-foreground">{record.tanggal}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(record.status)}>
                        {getStatusIcon(record.status)}
                        <span className="ml-1">
                          {record.status === 'approved' && 'Disetujui'}
                          {record.status === 'processing' && 'Diproses'}
                          {record.status === 'rejected' && 'Ditolak'}
                        </span>
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 rounded-lg bg-secondary/10">
                        <div className="text-xs text-muted-foreground">Jenis Layanan</div>
                        <div className="font-medium">{record.jenis}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-secondary/10">
                        <div className="text-xs text-muted-foreground">Total Biaya</div>
                        <div className="font-medium">Rp {record.biaya.toLocaleString()}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-secondary/10">
                        <div className="text-xs text-muted-foreground">Klaim BPJS</div>
                        <div className="font-medium text-success">Rp {record.klaim.toLocaleString()}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facilities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fasilitas Kesehatan Terdekat</CardTitle>
              <CardDescription>Daftar faskes yang bekerja sama dengan BPJS di sekitar Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari fasilitas kesehatan..."
                    value={searchFacility}
                    onChange={(e) => setSearchFacility(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredFacilities.map((facility, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{facility.nama}</h3>
                        <p className="text-sm text-muted-foreground">{facility.jenis} • {facility.jarak}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 text-warning fill-current" />
                          <span className="text-xs">{facility.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground mb-1">Antrian</div>
                        <Badge className={`${getAntrianColor(facility.antrian)} text-xs`}>
                          {facility.antrian}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div>
                        <div className="text-xs text-muted-foreground">Jam Operasional</div>
                        <div className="text-sm">{facility.jamBuka}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Telepon</div>
                        <div className="text-sm">{facility.telepon}</div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-xs text-muted-foreground mb-1">Spesialisasi</div>
                      <div className="flex flex-wrap gap-1">
                        {facility.spesialisasi.map((spec, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Buat Janji
                      </Button>
                      <Button variant="outline" size="sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        Lihat Lokasi
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Hubungi
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Janji Temu Mendatang</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg border border-border"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{appointment.jenis}</h4>
                          <p className="text-sm text-muted-foreground">{appointment.dokter}</p>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {getStatusIcon(appointment.status)}
                          <span className="ml-1">
                            {appointment.status === 'confirmed' && 'Terkonfirmasi'}
                            {appointment.status === 'pending' && 'Menunggu'}
                          </span>
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>📅 {appointment.tanggal}</p>
                        <p>⏰ {appointment.waktu}</p>
                        <p>🏥 {appointment.faskes}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Buat Janji Baru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Pilih Faskes & Dokter
                  </Button>
                  <div className="p-4 rounded-lg bg-secondary/10">
                    <h4 className="font-semibold mb-2">Tips Booking:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Siapkan kartu BPJS dan identitas</li>
                      <li>• Pilih jadwal yang tersedia</li>
                      <li>• Datang 15 menit sebelum jadwal</li>
                      <li>• Bawa surat rujukan jika diperlukan</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manfaat BPJS Kesehatan</CardTitle>
              <CardDescription>Daftar lengkap layanan yang ditanggung BPJS Kesehatan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border border-border"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-lg">
                        {benefit.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">{benefit.kategori}</h4>
                          <Badge className="bg-success/10 text-success">
                            {benefit.coverage}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{benefit.deskripsi}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prosedur Klaim</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold">Kunjungi Faskes Tingkat I</h4>
                    <p className="text-sm text-muted-foreground">Datang ke faskes tingkat I yang terdaftar dengan membawa kartu BPJS</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold">Ambil Nomor Antrian</h4>
                    <p className="text-sm text-muted-foreground">Registrasi dan ambil nomor antrian untuk pemeriksaan</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold">Pemeriksaan Dokter</h4>
                    <p className="text-sm text-muted-foreground">Lakukan konsultasi dan pemeriksaan dengan dokter</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold">Rujukan (Jika Diperlukan)</h4>
                    <p className="text-sm text-muted-foreground">Terima surat rujukan untuk faskes tingkat lanjutan jika diperlukan</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default BPJSKesehatan;