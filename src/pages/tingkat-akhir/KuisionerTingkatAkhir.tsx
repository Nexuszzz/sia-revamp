import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, CheckCircle, Clock, Star, Award, TrendingUp, Users, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

const KuisionerTingkatAkhir = () => {
  const [selectedTab, setSelectedTab] = useState('available');

  const surveyCategories = [
    {
      id: 'academic',
      title: 'Evaluasi Akademik',
      description: 'Penilaian terhadap program studi dan pembelajaran',
      icon: '📚',
      surveys: 12,
      completed: 8,
      reward: 15
    },
    {
      id: 'facilities',
      title: 'Fasilitas Kampus',
      description: 'Evaluasi fasilitas dan infrastruktur kampus',
      icon: '🏫',
      surveys: 8,
      completed: 6,
      reward: 10
    },
    {
      id: 'services',
      title: 'Layanan Mahasiswa',
      description: 'Penilaian layanan akademik dan non-akademik',
      icon: '🛎️',
      surveys: 10,
      completed: 7,
      reward: 12
    },
    {
      id: 'career',
      title: 'Persiapan Karir',
      description: 'Evaluasi kesiapan menghadapi dunia kerja',
      icon: '💼',
      surveys: 6,
      completed: 4,
      reward: 20
    }
  ];

  const availableSurveys = [
    {
      id: 1,
      title: 'Evaluasi Kualitas Dosen Program Studi',
      category: 'academic',
      description: 'Penilaian terhadap kualitas pengajaran dan bimbingan dosen',
      duration: '15 menit',
      deadline: '2024-04-15',
      reward: 5,
      priority: 'high',
      participants: 245,
      target: 300
    },
    {
      id: 2,
      title: 'Kepuasan Layanan Perpustakaan',
      category: 'facilities',
      description: 'Evaluasi fasilitas dan layanan perpustakaan kampus',
      duration: '10 menit',
      deadline: '2024-04-20',
      reward: 3,
      priority: 'medium',
      participants: 180,
      target: 250
    },
    {
      id: 3,
      title: 'Efektivitas Program PKL/Magang',
      category: 'career',
      description: 'Penilaian program PKL dalam mempersiapkan dunia kerja',
      duration: '20 menit',
      deadline: '2024-04-25',
      reward: 8,
      priority: 'high',
      participants: 120,
      target: 200
    },
    {
      id: 4,
      title: 'Kualitas Fasilitas Laboratorium',
      category: 'facilities',
      description: 'Evaluasi kelengkapan dan kondisi fasilitas lab',
      duration: '12 menit',
      deadline: '2024-04-30',
      reward: 4,
      priority: 'medium',
      participants: 95,
      target: 150
    }
  ];

  const completedSurveys = [
    {
      id: 1,
      title: 'Evaluasi Kurikulum Program Studi',
      category: 'academic',
      completedDate: '2024-03-15',
      reward: 5,
      rating: 4.2,
      feedback: 'Terima kasih atas partisipasinya. Masukan Anda sangat berharga.'
    },
    {
      id: 2,
      title: 'Kepuasan Layanan Administrasi',
      category: 'services',
      completedDate: '2024-03-10',
      reward: 3,
      rating: 3.8,
      feedback: 'Saran Anda akan kami tindaklanjuti untuk perbaikan layanan.'
    },
    {
      id: 3,
      title: 'Evaluasi Sistem Pembelajaran Online',
      category: 'academic',
      completedDate: '2024-03-05',
      reward: 4,
      rating: 4.5,
      feedback: 'Evaluasi Anda membantu pengembangan sistem e-learning.'
    }
  ];

  const stats = {
    totalCompleted: 25,
    totalRewards: 85,
    averageRating: 4.2,
    rank: 12
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive';
      case 'medium': return 'bg-warning/10 text-warning';
      case 'low': return 'bg-success/10 text-success';
      default: return 'bg-secondary/10 text-secondary-foreground';
    }
  };

  const getCategoryIcon = (category) => {
    const cat = surveyCategories.find(c => c.id === category);
    return cat ? cat.icon : '📝';
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
            <MessageSquare className="h-8 w-8" />
            Kuesioner Tingkat Akhir
          </h1>
          <p className="text-muted-foreground">Evaluasi dan feedback untuk peningkatan kualitas pendidikan</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-primary/10 text-primary">
            <Award className="h-3 w-3 mr-1" />
            {stats.totalRewards} Poin
          </Badge>
          <Badge className="bg-success/10 text-success">
            <Star className="h-3 w-3 mr-1" />
            Rank #{stats.rank}
          </Badge>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-4 rounded-lg border border-border"
        >
          <div className="text-2xl font-bold text-primary">{stats.totalCompleted}</div>
          <div className="text-sm text-muted-foreground">Kuesioner Selesai</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center p-4 rounded-lg border border-border"
        >
          <div className="text-2xl font-bold text-warning">{stats.totalRewards}</div>
          <div className="text-sm text-muted-foreground">Total Poin</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center p-4 rounded-lg border border-border"
        >
          <div className="text-2xl font-bold text-success">{stats.averageRating}</div>
          <div className="text-sm text-muted-foreground">Rating Rata-rata</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center p-4 rounded-lg border border-border"
        >
          <div className="text-2xl font-bold text-destructive">#{stats.rank}</div>
          <div className="text-sm text-muted-foreground">Peringkat Partisipasi</div>
        </motion.div>
      </div>

      {/* Category Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {surveyCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-lg">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{category.title}</h3>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{category.completed}/{category.surveys}</span>
                  </div>
                  <Progress value={(category.completed / category.surveys) * 100} />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {category.reward} poin tersedia
                    </span>
                    <Badge className="bg-primary/10 text-primary text-xs">
                      {Math.round((category.completed / category.surveys) * 100)}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="available">Tersedia</TabsTrigger>
          <TabsTrigger value="completed">Selesai</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kuesioner Tersedia</CardTitle>
              <CardDescription>Daftar kuesioner yang dapat Anda isi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableSurveys.map((survey, index) => (
                  <motion.div
                    key={survey.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-lg">
                          {getCategoryIcon(survey.category)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{survey.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {survey.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>⏱️ {survey.duration}</span>
                            <span>📅 Deadline: {survey.deadline}</span>
                            <span>👥 {survey.participants}/{survey.target} partisipan</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getPriorityColor(survey.priority)}>
                          {survey.priority === 'high' && 'Prioritas Tinggi'}
                          {survey.priority === 'medium' && 'Prioritas Sedang'}
                          {survey.priority === 'low' && 'Prioritas Rendah'}
                        </Badge>
                        <Badge className="bg-success/10 text-success">
                          +{survey.reward} poin
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Target Partisipan</span>
                          <span>{survey.participants}/{survey.target}</span>
                        </div>
                        <Progress value={(survey.participants / survey.target) * 100} />
                      </div>
                      <Button size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Isi Kuesioner
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kuesioner Selesai</CardTitle>
              <CardDescription>Riwayat kuesioner yang telah Anda isi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedSurveys.map((survey, index) => (
                  <motion.div
                    key={survey.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border border-border"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-success" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{survey.title}</h3>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                            <span>📅 Selesai: {survey.completedDate}</span>
                            <span>⭐ Rating: {survey.rating}/5</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {survey.feedback}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-success/10 text-success">
                        +{survey.reward} poin
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Alert>
        <TrendingUp className="h-4 w-4" />
        <AlertDescription>
          Isi lebih banyak kuesioner untuk mendapatkan poin reward dan meningkatkan peringkat Anda! 
          Poin dapat ditukarkan dengan berbagai benefit menarik.
        </AlertDescription>
      </Alert>
    </motion.div>
  );
};

export default KuisionerTingkatAkhir;