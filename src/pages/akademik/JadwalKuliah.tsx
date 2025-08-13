import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, Filter, Download, Printer } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const JadwalKuliah = () => {
  const [selectedDay, setSelectedDay] = useState('all');
  const [selectedWeek, setSelectedWeek] = useState('current');

  const jadwalData = [
    {
      id: 1, hari: 'Senin', waktu: '07:30-10:00', kode: 'TI101', 
      matakuliah: 'Algoritma dan Pemrograman', sks: 4,
      dosen: 'Dr. Ahmad Susanto, M.Kom', ruang: 'Lab Komputer 1', 
      kelas: 'TI-2A', jenis: 'Praktikum'
    },
    {
      id: 2, hari: 'Senin', waktu: '10:30-12:00', kode: 'TI102',
      matakuliah: 'Matematika Diskrit', sks: 3,
      dosen: 'Prof. Siti Nurhaliza, Ph.D', ruang: 'GKB 1-201', 
      kelas: 'TI-2A', jenis: 'Teori'
    },
    {
      id: 3, hari: 'Selasa', waktu: '08:00-10:30', kode: 'TI103',
      matakuliah: 'Struktur Data', sks: 4,
      dosen: 'Budi Santoso, M.T', ruang: 'Lab Komputer 2', 
      kelas: 'TI-2A', jenis: 'Praktikum'
    },
    {
      id: 4, hari: 'Selasa', waktu: '13:00-15:30', kode: 'TI104',
      matakuliah: 'Basis Data', sks: 4,
      dosen: 'Rina Fitriani, M.Kom', ruang: 'Lab Komputer 3', 
      kelas: 'TI-2A', jenis: 'Praktikum'
    },
    {
      id: 5, hari: 'Rabu', waktu: '07:30-09:00', kode: 'TI105',
      matakuliah: 'Jaringan Komputer', sks: 3,
      dosen: 'Drs. Hadi Purnomo, M.Si', ruang: 'GKB 2-301', 
      kelas: 'TI-2A', jenis: 'Teori'
    },
    {
      id: 6, hari: 'Rabu', waktu: '10:00-12:30', kode: 'TI106',
      matakuliah: 'Pemrograman Web', sks: 4,
      dosen: 'Lisa Andriani, M.Kom', ruang: 'Lab Komputer 1', 
      kelas: 'TI-2A', jenis: 'Praktikum'
    },
    {
      id: 7, hari: 'Kamis', waktu: '08:00-11:30', kode: 'TI107',
      matakuliah: 'Sistem Operasi', sks: 4,
      dosen: 'Dr. Bambang Wijaya, M.T', ruang: 'Lab Sistem', 
      kelas: 'TI-2A', jenis: 'Praktikum'
    },
    {
      id: 8, hari: 'Jumat', waktu: '07:30-10:00', kode: 'TI108',
      matakuliah: 'Rekayasa Perangkat Lunak', sks: 3,
      dosen: 'Desi Ratnawati, M.Kom', ruang: 'GKB 1-105', 
      kelas: 'TI-2A', jenis: 'Teori'
    }
  ];

  const weekDays = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
  const filteredJadwal = selectedDay === 'all' ? jadwalData : jadwalData.filter(j => j.hari === selectedDay);

  const getTotalSKS = () => {
    const uniqueCourses = Array.from(new Set(jadwalData.map(j => j.kode)));
    return uniqueCourses.reduce((total, kode) => {
      const course = jadwalData.find(j => j.kode === kode);
      return total + (course?.sks || 0);
    }, 0);
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
            <Calendar className="h-8 w-8" />
            Jadwal Kuliah
          </h1>
          <p className="text-muted-foreground">Semester Ganjil 2024/2025 • Total {getTotalSKS()} SKS</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Ekspor
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{jadwalData.length}</div>
            <p className="text-sm text-muted-foreground">Total Jadwal</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{getTotalSKS()}</div>
            <p className="text-sm text-muted-foreground">Total SKS</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              {jadwalData.filter(j => j.jenis === 'Praktikum').length}
            </div>
            <p className="text-sm text-muted-foreground">Praktikum</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              {jadwalData.filter(j => j.jenis === 'Teori').length}
            </div>
            <p className="text-sm text-muted-foreground">Teori</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Jadwal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Hari</SelectItem>
                {weekDays.map(day => (
                  <SelectItem key={day} value={day}>{day}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedWeek} onValueChange={setSelectedWeek}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Minggu Ini</SelectItem>
                <SelectItem value="next">Minggu Depan</SelectItem>
                <SelectItem value="all">Semua Minggu</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Tabs */}
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Daftar</TabsTrigger>
          <TabsTrigger value="calendar">Kalender</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {filteredJadwal.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={item.jenis === 'Praktikum' ? 'default' : 'secondary'}>
                          {item.jenis}
                        </Badge>
                        <span className="font-mono text-sm text-muted-foreground">{item.kode}</span>
                      </div>
                      <h3 className="text-lg font-semibold">{item.matakuliah}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {item.dosen}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {item.ruang}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-primary">{item.hari}</div>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-4 w-4" />
                        {item.waktu}
                      </div>
                      <div className="text-sm text-muted-foreground">{item.sks} SKS</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {weekDays.map(day => (
                  <div key={day} className="space-y-2">
                    <h3 className="font-semibold text-center border-b pb-2">{day}</h3>
                    {jadwalData
                      .filter(item => item.hari === day)
                      .map(item => (
                        <div key={item.id} className="p-3 bg-primary/10 rounded-lg text-sm">
                          <div className="font-medium">{item.waktu}</div>
                          <div className="text-xs">{item.matakuliah}</div>
                          <div className="text-xs text-muted-foreground">{item.ruang}</div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default JadwalKuliah;