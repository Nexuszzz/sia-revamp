import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Calendar, Users, Award, Clock, CheckCircle, AlertTriangle, ArrowRight, Filter, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const RiwayatStatusKelas = () => {
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedTab, setSelectedTab] = useState('timeline');

  const studentInfo = {
    nama: 'Naufal Muhammad Dzaka',
    nim: '20210001',
    prodi: 'D4 Jaringan Telekomunikasi Digital',
    statusCurrent: 'AKTIF',
    semester: 6,
    ipkCurrent: 3.75
  };

  const statusHistory = [
    {
      periode: '2024/1',
      semester: 6,
      status: 'AKTIF',
      kelas: 'REG-A',
      ips: 3.80,
      ipk: 3.75,
      sks: 20,
      date: '2024-01-15',
      changes: [],
      type: 'normal'
    },
    {
      periode: '2023/2',
      semester: 5,
      status: 'AKTIF',
      kelas: 'REG-A',
      ips: 3.65,
      ipk: 3.72,
      sks: 22,
      date: '2023-08-20',
      changes: [],
      type: 'normal'
    },
    {
      periode: '2023/1',
      semester: 4,
      status: 'AKTIF',
      kelas: 'REG-A',
      ips: 3.85,
      ipk: 3.74,
      sks: 20,
      date: '2023-01-10',
      changes: ['Pindah kelas dari REG-B ke REG-A'],
      type: 'class_change'
    },
    {
      periode: '2022/2',
      semester: 3,
      status: 'CUTI',
      kelas: 'REG-B',
      ips: 0,
      ipk: 3.70,
      sks: 0,
      date: '2022-08-15',
      changes: ['Mengajukan cuti akademik karena sakit'],
      type: 'leave'
    },
    {
      periode: '2022/1',
      semester: 2,
      status: 'AKTIF',
      kelas: 'REG-B',
      ips: 3.90,
      ipk: 3.70,
      sks: 18,
      date: '2022-01-12',
      changes: [],
      type: 'normal'
    },
    {
      periode: '2021/2',
      semester: 1,
      status: 'AKTIF',
      kelas: 'REG-B',
      ips: 3.50,
      ipk: 3.50,
      sks: 16,
      date: '2021-08-20',
      changes: ['Mahasiswa baru'],
      type: 'new_student'
    }
  ];

  const classHistory = [
    {
      kelas: 'REG-A',
      periode: '2023/1 - Sekarang',
      durasi: '1.5 tahun',
      prestasi: ['Juara 2 Kompetisi Programming', 'Best Student Award'],
      waliKelas: 'Dr. Ahmad Syarif',
      totalMahasiswa: 35
    },
    {
      kelas: 'REG-B',
      periode: '2021/2 - 2022/2',
      durasi: '1 tahun',
      prestasi: ['Aktif di organisasi mahasiswa'],
      waliKelas: 'Prof. Dr. Siti Nurhaliza',
      totalMahasiswa: 40
    }
  ];

  const performanceMetrics = {
    totalSemester: 6,
    totalSks: 116,
    targetSks: 144,
    progressPercentage: 80.6,
    averageIps: 3.62,
    highestIps: 3.90,
    lowestIps: 3.50,
    statusChanges: 2,
    classChanges: 1
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'AKTIF': return 'bg-success/10 text-success';
      case 'CUTI': return 'bg-warning/10 text-warning';
      case 'NON-AKTIF': return 'bg-destructive/10 text-destructive';
      case 'LULUS': return 'bg-primary/10 text-primary';
      default: return 'bg-secondary/10 text-secondary-foreground';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'normal': return <CheckCircle className="h-4 w-4" />;
      case 'class_change': return <ArrowRight className="h-4 w-4" />;
      case 'leave': return <Clock className="h-4 w-4" />;
      case 'new_student': return <Award className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'normal': return 'bg-success/10 text-success';
      case 'class_change': return 'bg-primary/10 text-primary';
      case 'leave': return 'bg-warning/10 text-warning';
      case 'new_student': return 'bg-purple-100 text-purple-600';
      default: return 'bg-secondary/10 text-secondary-foreground';
    }
  };

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
            <BarChart3 className="h-8 w-8" />
            Riwayat Status Kelas
          </h1>
          <p className="text-muted-foreground">Tracking perubahan status dan kelas mahasiswa</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Pilih Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Semester</SelectItem>
              <SelectItem value="1">Semester 1</SelectItem>
              <SelectItem value="2">Semester 2</SelectItem>
              <SelectItem value="3">Semester 3</SelectItem>
              <SelectItem value="4">Semester 4</SelectItem>
              <SelectItem value="5">Semester 5</SelectItem>
              <SelectItem value="6">Semester 6</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Student Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Informasi Mahasiswa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center p-4 rounded-lg border border-border">
              <div className="text-lg font-bold text-primary">{studentInfo.nama}</div>
              <div className="text-xs text-muted-foreground">Nama</div>
            </div>
            <div className="text-center p-4 rounded-lg border border-border">
              <div className="text-lg font-bold">{studentInfo.nim}</div>
              <div className="text-xs text-muted-foreground">NIM</div>
            </div>
            <div className="text-center p-4 rounded-lg border border-border">
              <Badge className={getStatusColor(studentInfo.statusCurrent)}>
                {studentInfo.statusCurrent}
              </Badge>
              <div className="text-xs text-muted-foreground mt-1">Status</div>
            </div>
            <div className="text-center p-4 rounded-lg border border-border">
              <div className="text-lg font-bold">{studentInfo.semester}</div>
              <div className="text-xs text-muted-foreground">Semester</div>
            </div>
            <div className="text-center p-4 rounded-lg border border-border">
              <div className="text-lg font-bold text-success">{studentInfo.ipkCurrent}</div>
              <div className="text-xs text-muted-foreground">IPK</div>
            </div>
            <div className="text-center p-4 rounded-lg border border-border">
              <div className="text-lg font-bold text-primary">{performanceMetrics.progressPercentage}%</div>
              <div className="text-xs text-muted-foreground">Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="performance">Performa</TabsTrigger>
          <TabsTrigger value="classes">Riwayat Kelas</TabsTrigger>
          <TabsTrigger value="analytics">Analitik</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Timeline Status Akademik</CardTitle>
              <CardDescription>Perubahan status dan pencapaian akademik dari waktu ke waktu</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {statusHistory.map((item, index) => (
                  <motion.div
                    key={item.periode}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8 pb-6 border-l-2 border-primary/20 last:border-l-transparent"
                  >
                    <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{item.periode}</h3>
                        <p className="text-sm text-muted-foreground">Semester {item.semester} • {item.date}</p>
                      </div>
                      <Badge className={getTypeColor(item.type)}>
                        {item.type === 'normal' && 'Normal'}
                        {item.type === 'class_change' && 'Pindah Kelas'}
                        {item.type === 'leave' && 'Cuti'}
                        {item.type === 'new_student' && 'Mahasiswa Baru'}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
                      <div className="p-3 rounded-lg bg-secondary/10">
                        <div className="text-xs text-muted-foreground">Status</div>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                      <div className="p-3 rounded-lg bg-secondary/10">
                        <div className="text-xs text-muted-foreground">Kelas</div>
                        <div className="font-medium">{item.kelas}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-secondary/10">
                        <div className="text-xs text-muted-foreground">IPS</div>
                        <div className="font-medium text-primary">{item.ips}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-secondary/10">
                        <div className="text-xs text-muted-foreground">IPK</div>
                        <div className="font-medium text-success">{item.ipk}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-secondary/10">
                        <div className="text-xs text-muted-foreground">SKS</div>
                        <div className="font-medium">{item.sks}</div>
                      </div>
                    </div>

                    {item.changes.length > 0 && (
                      <div className="mt-3 p-3 rounded-lg bg-warning/5 border border-warning/20">
                        <div className="text-xs font-medium text-warning mb-1">Perubahan:</div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {item.changes.map((change, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <AlertTriangle className="h-3 w-3 text-warning flex-shrink-0" />
                              {change}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Akademik</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Progress SKS</span>
                    <span className="text-sm font-medium">{performanceMetrics.totalSks}/{performanceMetrics.targetSks}</span>
                  </div>
                  <Progress value={performanceMetrics.progressPercentage} />
                  <div className="text-xs text-muted-foreground mt-1">
                    {performanceMetrics.progressPercentage}% menuju kelulusan
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg border border-border">
                    <div className="text-lg font-bold text-success">{performanceMetrics.averageIps}</div>
                    <div className="text-xs text-muted-foreground">Rata-rata IPS</div>
                  </div>
                  <div className="text-center p-3 rounded-lg border border-border">
                    <div className="text-lg font-bold text-primary">{performanceMetrics.totalSemester}</div>
                    <div className="text-xs text-muted-foreground">Total Semester</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistik Performa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">IPS Tertinggi</span>
                  <span className="font-semibold text-success">{performanceMetrics.highestIps}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">IPS Terendah</span>
                  <span className="font-semibold text-warning">{performanceMetrics.lowestIps}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Perubahan Status</span>
                  <span className="font-semibold">{performanceMetrics.statusChanges}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pindah Kelas</span>
                  <span className="font-semibold">{performanceMetrics.classChanges}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trend Prestasi Akademik
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Grafik trend IPS akan ditampilkan di sini</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Kelas</CardTitle>
              <CardDescription>Histori perpindahan dan informasi kelas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classHistory.map((kelas, index) => (
                  <motion.div
                    key={kelas.kelas}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border border-border"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{kelas.kelas}</h3>
                        <p className="text-sm text-muted-foreground">{kelas.periode}</p>
                      </div>
                      <Badge className="bg-primary/10 text-primary">
                        {kelas.durasi}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="text-xs font-medium text-muted-foreground">Wali Kelas</div>
                        <div className="text-sm">{kelas.waliKelas}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-muted-foreground">Total Mahasiswa</div>
                        <div className="text-sm">{kelas.totalMahasiswa} orang</div>
                      </div>
                    </div>

                    {kelas.prestasi.length > 0 && (
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-2">Prestasi di Kelas Ini:</div>
                        <div className="flex flex-wrap gap-2">
                          {kelas.prestasi.map((prestasi, idx) => (
                            <Badge key={idx} className="bg-success/10 text-success">
                              <Award className="h-3 w-3 mr-1" />
                              {prestasi}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Stabilitas Akademik</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-success mb-2">92%</div>
                <p className="text-sm text-muted-foreground">
                  Tingkat konsistensi status aktif
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Adaptabilitas</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">A-</div>
                <p className="text-sm text-muted-foreground">
                  Kemampuan beradaptasi dengan perubahan
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Proyeksi Kelulusan</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-warning mb-2">2025</div>
                <p className="text-sm text-muted-foreground">
                  Estimasi tahun kelulusan
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Rekomendasi Akademik</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-lg border border-success/20 bg-success/5">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-success">Performa Baik</div>
                      <p className="text-sm text-muted-foreground">
                        IPK konsisten di atas 3.5. Pertahankan konsistensi belajar.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-primary">Target SKS</div>
                      <p className="text-sm text-muted-foreground">
                        Ambil 20-22 SKS semester depan untuk mencapai target kelulusan tepat waktu.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-lg border border-warning/20 bg-warning/5">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-warning">Perhatian</div>
                      <p className="text-sm text-muted-foreground">
                        Pastikan tidak ada mata kuliah yang tertunda untuk menghindari keterlambatan kelulusan.
                      </p>
                    </div>
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

export default RiwayatStatusKelas;