import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Star, Calendar, Medal, Crown, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Prestasi = () => {
  const [selectedYear, setSelectedYear] = useState('2024');

  const prestasi = [
    {
      id: 1,
      title: 'Juara 1 Programming Contest Regional',
      kategori: 'Akademik',
      tingkat: 'Regional',
      tahun: '2024',
      bulan: 'Agustus',
      penyelenggara: 'ACM Indonesia Chapter',
      deskripsi: 'Memenangkan kompetisi programming dengan menyelesaikan 8 dari 10 soal dalam waktu 3 jam',
      poin: 100,
      sertifikat: true,
      team: 'Team Alpha',
      ranking: 1,
      totalPeserta: 150
    },
    {
      id: 2,
      title: 'Best Innovation Award 2024',
      kategori: 'Inovasi',
      tingkat: 'Nasional',
      tahun: '2024',
      bulan: 'Juli',
      penyelenggara: 'Kementerian Pendidikan',
      deskripsi: 'Penghargaan inovasi terbaik untuk aplikasi pembelajaran berbasis AI',
      poin: 150,
      sertifikat: true,
      team: 'AI Innovators',
      ranking: 1,
      totalPeserta: 200
    },
    {
      id: 3,
      title: 'Juara 2 Hackathon Nasional',
      kategori: 'Teknologi',
      tingkat: 'Nasional',
      tahun: '2023',
      bulan: 'November',
      penyelenggara: 'TechCorp Indonesia',
      deskripsi: 'Runner-up dalam hackathon 48 jam dengan solusi smart city',
      poin: 80,
      sertifikat: true,
      team: 'Code Warriors',
      ranking: 2,
      totalPeserta: 300
    },
    {
      id: 4,
      title: 'Mahasiswa Berprestasi Fakultas',
      kategori: 'Akademik',
      tingkat: 'Fakultas',
      tahun: '2023',
      bulan: 'Desember',
      penyelenggara: 'Fakultas Teknik',
      deskripsi: 'Terpilih sebagai mahasiswa berprestasi tingkat fakultas dengan IPK 3.78',
      poin: 60,
      sertifikat: true,
      team: '-',
      ranking: 1,
      totalPeserta: 50
    },
    {
      id: 5,
      title: 'Juara 3 Design Thinking Competition',
      kategori: 'Desain',
      tingkat: 'Regional',
      tahun: '2023',
      bulan: 'September',
      penyelenggara: 'Indonesia Design Council',
      deskripsi: 'Peringkat 3 dalam kompetisi design thinking untuk solusi UX/UI',
      poin: 50,
      sertifikat: true,
      team: 'Design Masters',
      ranking: 3,
      totalPeserta: 120
    },
    {
      id: 6,
      title: 'Outstanding Leadership Award',
      kategori: 'Kepemimpinan',
      tingkat: 'Universitas',
      tahun: '2023',
      bulan: 'Juni',
      penyelenggara: 'Kemahasiswaan Universitas',
      deskripsi: 'Penghargaan kepemimpinan terbaik dalam organisasi mahasiswa',
      poin: 40,
      sertifikat: true,
      team: '-',
      ranking: 1,
      totalPeserta: 30
    }
  ];

  const achievements = {
    totalPrestasi: prestasi.length,
    totalPoin: prestasi.reduce((sum, p) => sum + p.poin, 0),
    juara1: prestasi.filter(p => p.ranking === 1).length,
    tingkatNasional: prestasi.filter(p => p.tingkat === 'Nasional').length
  };

  const kategoristats = prestasi.reduce((acc, p) => {
    acc[p.kategori] = (acc[p.kategori] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getRankingBadge = (ranking: number) => {
    const badges = {
      1: <Badge className="bg-yellow-500 text-white"><Crown className="h-3 w-3 mr-1" />Juara 1</Badge>,
      2: <Badge className="bg-gray-400 text-white"><Medal className="h-3 w-3 mr-1" />Juara 2</Badge>,
      3: <Badge className="bg-amber-600 text-white"><Award className="h-3 w-3 mr-1" />Juara 3</Badge>
    };
    return badges[ranking as keyof typeof badges] || <Badge variant="outline">Peringkat {ranking}</Badge>;
  };

  const getTingkatBadge = (tingkat: string) => {
    const colors = {
      'Internasional': 'bg-purple-500',
      'Nasional': 'bg-blue-500',
      'Regional': 'bg-green-500',
      'Universitas': 'bg-orange-500',
      'Fakultas': 'bg-yellow-500'
    };
    return <Badge className={`${colors[tingkat as keyof typeof colors]} text-white`}>{tingkat}</Badge>;
  };

  const getKategoriIcon = (kategori: string) => {
    const icons = {
      'Akademik': <Star className="h-4 w-4" />,
      'Teknologi': <Target className="h-4 w-4" />,
      'Inovasi': <TrendingUp className="h-4 w-4" />,
      'Desain': <Award className="h-4 w-4" />,
      'Kepemimpinan': <Crown className="h-4 w-4" />
    };
    return icons[kategori as keyof typeof icons] || <Trophy className="h-4 w-4" />;
  };

  const filteredPrestasi = selectedYear === 'all' ? prestasi : prestasi.filter(p => p.tahun === selectedYear);

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
            <Trophy className="h-8 w-8" />
            Prestasi & Pencapaian
          </h1>
          <p className="text-muted-foreground">Rekam jejak prestasi dan pencapaian selama kuliah</p>
        </div>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Trophy className="h-8 w-8 mx-auto text-primary mb-2" />
                <div className="text-2xl font-bold text-foreground">{achievements.totalPrestasi}</div>
                <div className="text-sm text-muted-foreground">Total Prestasi</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Crown className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                <div className="text-2xl font-bold text-foreground">{achievements.juara1}</div>
                <div className="text-sm text-muted-foreground">Juara 1</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Star className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                <div className="text-2xl font-bold text-foreground">{achievements.tingkatNasional}</div>
                <div className="text-sm text-muted-foreground">Tingkat Nasional</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Target className="h-8 w-8 mx-auto text-green-500 mb-2" />
                <div className="text-2xl font-bold text-foreground">{achievements.totalPoin}</div>
                <div className="text-sm text-muted-foreground">Poin Prestasi</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="timeline">Timeline Prestasi</TabsTrigger>
          <TabsTrigger value="categories">Kategori & Statistik</TabsTrigger>
          <TabsTrigger value="certificates">Sertifikat & Dokumen</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6">
          {/* Year Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                {['all', '2024', '2023', '2022'].map((year) => (
                  <Button
                    key={year}
                    variant={selectedYear === year ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedYear(year)}
                  >
                    {year === 'all' ? 'Semua' : year}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Prestasi Timeline */}
          <div className="space-y-4">
            {filteredPrestasi.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-20 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                          {getKategoriIcon(item.kategori)}
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          {item.bulan} {item.tahun}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                            <p className="text-muted-foreground mb-3">{item.deskripsi}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {getRankingBadge(item.ranking)}
                              {getTingkatBadge(item.tingkat)}
                              <Badge variant="outline" className="text-primary">
                                {item.kategori}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">{item.poin}</div>
                            <div className="text-sm text-muted-foreground">Poin</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                          <div>
                            <div className="font-medium text-foreground">Penyelenggara</div>
                            <div className="text-muted-foreground">{item.penyelenggara}</div>
                          </div>
                          <div>
                            <div className="font-medium text-foreground">Tim</div>
                            <div className="text-muted-foreground">{item.team || 'Individual'}</div>
                          </div>
                          <div>
                            <div className="font-medium text-foreground">Peserta</div>
                            <div className="text-muted-foreground">{item.totalPeserta} peserta</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {item.sertifikat && (
                              <Badge className="bg-success/10 text-success">
                                <Award className="h-3 w-3 mr-1" />
                                Bersertifikat
                              </Badge>
                            )}
                          </div>
                          <Button variant="outline" size="sm">
                            Lihat Detail
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribusi Prestasi per Kategori</CardTitle>
                <CardDescription>Breakdown prestasi berdasarkan kategori yang berbeda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(kategoristats).map(([kategori, count], index) => (
                    <motion.div
                      key={kategori}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {getKategoriIcon(kategori)}
                          <span className="font-medium">{kategori}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{count} prestasi</span>
                      </div>
                      <Progress value={(count / prestasi.length) * 100} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prestasi per Tingkat Kompetisi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Nasional', 'Regional', 'Universitas', 'Fakultas'].map((tingkat, index) => {
                    const count = prestasi.filter(p => p.tingkat === tingkat).length;
                    return (
                      <motion.div
                        key={tingkat}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-lg border border-border text-center"
                      >
                        <div className="text-2xl font-bold text-foreground">{count}</div>
                        <div className="text-sm text-muted-foreground">{tingkat}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Sertifikat & Dokumen
              </CardTitle>
              <CardDescription>Koleksi sertifikat dan dokumen prestasi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {prestasi.filter(p => p.sertifikat).map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.penyelenggara} • {item.bulan} {item.tahun}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getRankingBadge(item.ranking)}
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Prestasi;