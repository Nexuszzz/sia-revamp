import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Filter, Download, Bell, Clock, MapPin, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const KalenderAkademik = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState('all');

  const events = [
    {
      id: 1,
      title: 'Pembukaan Semester Ganjil 2024/2025',
      date: '2024-08-26',
      endDate: '2024-08-26',
      category: 'akademik',
      location: 'Auditorium Utama',
      description: 'Pembukaan resmi semester ganjil dengan sambutan rektor',
      participants: 1200,
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Pengisian KRS Online',
      date: '2024-08-15',
      endDate: '2024-08-30',
      category: 'registrasi',
      location: 'Portal Akademik',
      description: 'Periode pengisian Kartu Rencana Studi untuk semester ganjil',
      participants: 5000,
      status: 'ongoing'
    },
    {
      id: 3,
      title: 'Ujian Tengah Semester',
      date: '2024-10-14',
      endDate: '2024-10-25',
      category: 'ujian',
      location: 'Berbagai Ruang',
      description: 'Pelaksanaan UTS untuk semua mata kuliah semester ganjil',
      participants: 4500,
      status: 'upcoming'
    },
    {
      id: 4,
      title: 'Festival Sains dan Teknologi',
      date: '2024-09-05',
      endDate: '2024-09-07',
      category: 'event',
      location: 'Hall Expo',
      description: 'Pameran hasil riset dan inovasi teknologi mahasiswa',
      participants: 800,
      status: 'upcoming'
    },
    {
      id: 5,
      title: 'Libur Hari Kemerdekaan',
      date: '2024-08-17',
      endDate: '2024-08-17',
      category: 'libur',
      location: '-',
      description: 'Libur nasional dalam rangka HUT RI ke-79',
      participants: 0,
      status: 'completed'
    },
    {
      id: 6,
      title: 'Workshop Machine Learning',
      date: '2024-09-12',
      endDate: '2024-09-12',
      category: 'workshop',
      location: 'Lab Komputer A',
      description: 'Workshop pengenalan machine learning untuk mahasiswa IT',
      participants: 50,
      status: 'upcoming'
    }
  ];

  const categories = [
    { value: 'all', label: 'Semua Kategori', color: 'bg-gray-500' },
    { value: 'akademik', label: 'Akademik', color: 'bg-blue-500' },
    { value: 'ujian', label: 'Ujian', color: 'bg-red-500' },
    { value: 'event', label: 'Event', color: 'bg-purple-500' },
    { value: 'registrasi', label: 'Registrasi', color: 'bg-green-500' },
    { value: 'libur', label: 'Libur', color: 'bg-orange-500' },
    { value: 'workshop', label: 'Workshop', color: 'bg-indigo-500' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ongoing':
        return <Badge className="bg-success/10 text-success">Berlangsung</Badge>;
      case 'upcoming':
        return <Badge className="bg-warning/10 text-warning">Akan Datang</Badge>;
      case 'completed':
        return <Badge className="bg-muted text-muted-foreground">Selesai</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat?.color || 'bg-gray-500';
  };

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const upcomingEvents = events.filter(event => event.status === 'upcoming').slice(0, 3);

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
            Kalender Akademik
          </h1>
          <p className="text-muted-foreground">Jadwal lengkap kegiatan akademik semester ini</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button>
            <Bell className="h-4 w-4 mr-2" />
            Set Reminder
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{events.length}</div>
                <div className="text-sm text-muted-foreground">Total Events</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">{events.filter(e => e.status === 'ongoing').length}</div>
                <div className="text-sm text-muted-foreground">Berlangsung</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{events.filter(e => e.status === 'upcoming').length}</div>
                <div className="text-sm text-muted-foreground">Akan Datang</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-muted-foreground">{events.filter(e => e.status === 'completed').length}</div>
                <div className="text-sm text-muted-foreground">Selesai</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Events Mendatang
            </CardTitle>
            <CardDescription>3 event terdekat yang akan berlangsung</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full ${getCategoryColor(event.category)} mt-1 flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{event.title}</h4>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </div>
                      {event.location !== '-' && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Calendar Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${category.color}`} />
                            {category.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {filteredEvents.length} events ditemukan
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Events List */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Kegiatan</CardTitle>
              <CardDescription>Semua kegiatan akademik yang dijadwalkan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          <div className={`w-4 h-4 rounded-full ${getCategoryColor(event.category)} mt-0.5 flex-shrink-0`} />
                          <div>
                            <h3 className="font-semibold text-foreground">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.date).toLocaleDateString('id-ID')}
                            {event.endDate !== event.date && (
                              <span> - {new Date(event.endDate).toLocaleDateString('id-ID')}</span>
                            )}
                          </div>
                          {event.location !== '-' && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {event.location}
                            </div>
                          )}
                          {event.participants > 0 && (
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {event.participants} peserta
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(event.status)}
                        <Button variant="ghost" size="sm">
                          <Bell className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default KalenderAkademik;