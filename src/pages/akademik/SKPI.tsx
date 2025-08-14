import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Eye, Star, BookOpen, Trophy, Users, Clock, CheckCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const SKPI = () => {
  const [selectedSection, setSelectedSection] = useState('overview');

  const studentData = {
    nama: 'Naufal Maulana Darmawan',
    nim: '20210001',
    prodi: 'Teknik Informatika',
    angkatan: '2021',
    ipk: 3.78,
    status: 'Aktif'
  };

  const achievements = [
    {
      category: 'Akademik',
      items: [
        { title: 'Mahasiswa Berprestasi Tingkat Fakultas', year: '2023', level: 'Fakultas', description: 'Juara 1 Mahasiswa Berprestasi Fakultas Teknik' },
        { title: 'Dean List Semester 5', year: '2023', level: 'Fakultas', description: 'IPK 3.80 pada semester 5' },
        { title: 'Scholarship Awardee', year: '2022', level: 'Universitas', description: 'Penerima beasiswa prestasi akademik' }
      ]
    },
    {
      category: 'Organisasi',
      items: [
        { title: 'Ketua Himpunan Mahasiswa Teknik Informatika', year: '2023', level: 'Fakultas', description: 'Memimpin organisasi dengan 500+ anggota' },
        { title: 'Staff Divisi IT BEM Universitas', year: '2022', level: 'Universitas', description: 'Mengembangkan sistem informasi BEM' },
        { title: 'Volunteer TedxUniversitas', year: '2022', level: 'Universitas', description: 'Koordinator IT event TEDx' }
      ]
    },
    {
      category: 'Kompetisi',
      items: [
        { title: 'Juara 2 Hackathon Nasional 2023', year: '2023', level: 'Nasional', description: 'Kompetisi pengembangan aplikasi mobile' },
        { title: 'Juara 1 Programming Contest Regional', year: '2022', level: 'Regional', description: 'Kompetisi pemrograman tingkat Jawa Timur' },
        { title: 'Finalist Business Plan Competition', year: '2023', level: 'Nasional', description: '10 besar kompetisi rencana bisnis mahasiswa' }
      ]
    },
    {
      category: 'Sertifikasi',
      items: [
        { title: 'Google Cloud Professional Developer', year: '2023', level: 'Internasional', description: 'Sertifikasi pengembangan cloud computing' },
        { title: 'AWS Solutions Architect Associate', year: '2023', level: 'Internasional', description: 'Arsitektur solusi cloud Amazon Web Services' },
        { title: 'Oracle Database Administrator', year: '2022', level: 'Internasional', description: 'Administrasi basis data Oracle' }
      ]
    }
  ];

  const skills = [
    { name: 'Programming', level: 90, color: 'bg-blue-500' },
    { name: 'Leadership', level: 85, color: 'bg-purple-500' },
    { name: 'Project Management', level: 80, color: 'bg-green-500' },
    { name: 'Public Speaking', level: 75, color: 'bg-orange-500' },
    { name: 'Data Analysis', level: 85, color: 'bg-indigo-500' },
    { name: 'Team Collaboration', level: 90, color: 'bg-pink-500' }
  ];

  const getLevelBadge = (level: string) => {
    const colors = {
      'Internasional': 'bg-purple-500',
      'Nasional': 'bg-blue-500',
      'Regional': 'bg-green-500',
      'Universitas': 'bg-orange-500',
      'Fakultas': 'bg-yellow-500'
    };
    return <Badge className={`${colors[level as keyof typeof colors] || 'bg-gray-500'} text-white`}>{level}</Badge>;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Akademik': return <BookOpen className="h-5 w-5" />;
      case 'Organisasi': return <Users className="h-5 w-5" />;
      case 'Kompetisi': return <Trophy className="h-5 w-5" />;
      case 'Sertifikasi': return <Award className="h-5 w-5" />;
      default: return <Star className="h-5 w-5" />;
    }
  };

  const totalAchievements = achievements.reduce((total, cat) => total + cat.items.length, 0);

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
            <Award className="h-8 w-8" />
            SKPI - Surat Keterangan Pendamping Ijazah
          </h1>
          <p className="text-muted-foreground">Dokumen komprehensif capaian akademik dan non-akademik</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Preview SKPI</DialogTitle>
                <DialogDescription>
                  Pratinjau dokumen SKPI yang akan didownload
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 p-4">
                <div className="text-center border-b pb-4">
                  <h2 className="text-xl font-bold">SURAT KETERANGAN PENDAMPING IJAZAH</h2>
                  <p className="text-sm text-muted-foreground mt-2">Universitas Teknologi Indonesia</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Nama:</strong> {studentData.nama}</div>
                  <div><strong>NIM:</strong> {studentData.nim}</div>
                  <div><strong>Program Studi:</strong> {studentData.prodi}</div>
                  <div><strong>IPK:</strong> {studentData.ipk}</div>
                </div>
                {/* More preview content */}
              </div>
            </DialogContent>
          </Dialog>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download SKPI
          </Button>
        </div>
      </div>

      {/* Student Profile Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Award className="h-10 w-10 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground">{studentData.nama}</h2>
              <p className="text-muted-foreground">{studentData.prodi} • Angkatan {studentData.angkatan}</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge className="bg-primary/10 text-primary">NIM: {studentData.nim}</Badge>
                <Badge className="bg-success/10 text-success">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  IPK: {studentData.ipk}
                </Badge>
                <Badge className="bg-blue-500/10 text-blue-500">{studentData.status}</Badge>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{totalAchievements}</div>
                <div className="text-xs text-muted-foreground">Prestasi</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">{studentData.ipk}</div>
                <div className="text-xs text-muted-foreground">IPK</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">4</div>
                <div className="text-xs text-muted-foreground">Semester</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="achievements" className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="achievements">Prestasi & Pencapaian</TabsTrigger>
          <TabsTrigger value="skills">Kompetensi & Skills</TabsTrigger>
          <TabsTrigger value="documents">Dokumen & Sertifikat</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid gap-6">
            {achievements.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {getCategoryIcon(category.category)}
                      {category.category}
                    </CardTitle>
                    <CardDescription>
                      {category.items.length} prestasi dalam kategori {category.category.toLowerCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.items.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) }}
                          className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground">{item.title}</h4>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{item.year}</span>
                              </div>
                            </div>
                            <div>
                              {getLevelBadge(item.level)}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kompetensi & Keahlian</CardTitle>
              <CardDescription>Penilaian kompetensi berdasarkan prestasi dan aktivitas mahasiswa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribusi Kompetensi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border border-border text-center"
                  >
                    <div className={`w-8 h-8 mx-auto rounded-full ${skill.color} mb-2`} />
                    <div className="font-medium text-sm">{skill.name}</div>
                    <div className="text-xl font-bold text-foreground">{skill.level}%</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Dokumen & Sertifikat
              </CardTitle>
              <CardDescription>Koleksi sertifikat dan dokumen pendukung SKPI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {achievements.flatMap(cat => cat.items).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className="text-xs text-muted-foreground">{item.year}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getLevelBadge(item.level)}
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-3 w-3" />
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

export default SKPI;