import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, MapPin, Users, Star, Clock, Award, Filter, Search, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Kompetisi = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const competitions = [
    {
      id: 1,
      title: 'National Programming Contest 2024',
      category: 'programming',
      level: 'Nasional',
      deadline: '2024-09-15',
      date: '2024-10-20',
      location: 'Jakarta Convention Center',
      organizer: 'ACM Indonesia',
      prize: 'Rp 50.000.000',
      participants: 500,
      description: 'Kompetisi pemrograman terbesar di Indonesia dengan berbagai kategori lomba',
      status: 'open',
      registered: false,
      difficulty: 'Advanced',
      requirements: ['Min. semester 3', 'Team 3 orang', 'Portofolio programming'],
      image: '/placeholder-competition.jpg'
    },
    {
      id: 2,
      title: 'Innovation Challenge 2024',
      category: 'innovation',
      level: 'Internasional',
      deadline: '2024-08-30',
      date: '2024-11-10',
      location: 'Singapore Tech Hub',
      organizer: 'TechCorp Asia',
      prize: '$10,000',
      participants: 200,
      description: 'Kompetisi inovasi teknologi dengan fokus pada solusi berkelanjutan',
      status: 'open',
      registered: true,
      difficulty: 'Intermediate',
      requirements: ['Min. semester 5', 'Team 2-4 orang', 'Business plan'],
      image: '/placeholder-innovation.jpg'
    },
    {
      id: 3,
      title: 'Data Science Hackathon',
      category: 'datascience',
      level: 'Regional',
      deadline: '2024-08-25',
      date: '2024-09-30',
      location: 'Surabaya Tech Center',
      organizer: 'Data Science Indonesia',
      prize: 'Rp 25.000.000',
      participants: 150,
      description: 'Hackathon 48 jam untuk mengembangkan solusi data science',
      status: 'open',
      registered: false,
      difficulty: 'Intermediate',
      requirements: ['Pengalaman Python/R', 'Team 2-3 orang', 'Portfolio data'],
      image: '/placeholder-datascience.jpg'
    },
    {
      id: 4,
      title: 'UI/UX Design Challenge',
      category: 'design',
      level: 'Nasional',
      deadline: '2024-08-20',
      date: '2024-09-15',
      location: 'Bandung Creative Hub',
      organizer: 'Indonesia Design Association',
      prize: 'Rp 15.000.000',
      participants: 300,
      description: 'Kompetisi desain antarmuka dan pengalaman pengguna',
      status: 'open',
      registered: false,
      difficulty: 'Beginner',
      requirements: ['Portfolio design', 'Individual/Team', 'Software design'],
      image: '/placeholder-design.jpg'
    },
    {
      id: 5,
      title: 'Robotics Championship 2024',
      category: 'robotics',
      level: 'Internasional',
      deadline: '2024-07-30',
      date: '2024-08-25',
      location: 'Malaysia Tech Expo',
      organizer: 'ASEAN Robotics',
      prize: '$5,000',
      participants: 80,
      description: 'Kompetisi robotika dengan berbagai kategori dan tingkat kesulitan',
      status: 'closed',
      registered: true,
      difficulty: 'Advanced',
      requirements: ['Hardware robotics', 'Team 4-5 orang', 'Technical proposal'],
      image: '/placeholder-robotics.jpg'
    }
  ];

  const categories = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'programming', label: 'Programming' },
    { value: 'innovation', label: 'Innovation' },
    { value: 'datascience', label: 'Data Science' },
    { value: 'design', label: 'UI/UX Design' },
    { value: 'robotics', label: 'Robotics' }
  ];

  const achievements = [
    {
      title: 'Juara 2 Hackathon Nasional 2023',
      category: 'programming',
      level: 'Nasional',
      year: '2023',
      team: 'Team Alpha',
      prize: 'Rp 20.000.000'
    },
    {
      title: 'Best Innovation Award',
      category: 'innovation',
      level: 'Regional',
      year: '2023',
      team: 'Tech Innovators',
      prize: 'Rp 10.000.000'
    },
    {
      title: 'Finalist UI/UX Competition',
      category: 'design',
      level: 'Nasional',
      year: '2022',
      team: 'Design Masters',
      prize: 'Rp 5.000.000'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-success/10 text-success">Buka Pendaftaran</Badge>;
      case 'closed':
        return <Badge variant="destructive">Tutup</Badge>;
      case 'ongoing':
        return <Badge className="bg-warning/10 text-warning">Berlangsung</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getLevelBadge = (level: string) => {
    const colors = {
      'Internasional': 'bg-purple-500 text-white',
      'Nasional': 'bg-blue-500 text-white',
      'Regional': 'bg-green-500 text-white'
    };
    return <Badge className={colors[level as keyof typeof colors]}>{level}</Badge>;
  };

  const getDifficultyBadge = (difficulty: string) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-800',
      'Intermediate': 'bg-yellow-100 text-yellow-800',
      'Advanced': 'bg-red-100 text-red-800'
    };
    return <Badge className={colors[difficulty as keyof typeof colors]}>{difficulty}</Badge>;
  };

  const filteredCompetitions = competitions.filter(comp => {
    const matchesSearch = comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || comp.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const openCompetitions = competitions.filter(comp => comp.status === 'open');
  const registeredCompetitions = competitions.filter(comp => comp.registered);

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
            Kompetisi Akademik
          </h1>
          <p className="text-muted-foreground">Temukan dan ikuti berbagai kompetisi untuk mengasah kemampuan</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{openCompetitions.length}</div>
                <div className="text-sm text-muted-foreground">Buka Pendaftaran</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{registeredCompetitions.length}</div>
                <div className="text-sm text-muted-foreground">Terdaftar</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">{achievements.length}</div>
                <div className="text-sm text-muted-foreground">Prestasi</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{competitions.length}</div>
                <div className="text-sm text-muted-foreground">Total Kompetisi</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="browse">Jelajahi Kompetisi</TabsTrigger>
          <TabsTrigger value="registered">Kompetisi Saya</TabsTrigger>
          <TabsTrigger value="achievements">Prestasi</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari kompetisi..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Competitions Grid */}
          <div className="grid gap-6">
            {filteredCompetitions.map((competition, index) => (
              <motion.div
                key={competition.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-48 h-32 bg-muted rounded-lg flex items-center justify-center">
                        <Trophy className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-2">{competition.title}</h3>
                            <p className="text-muted-foreground mb-3">{competition.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {getStatusBadge(competition.status)}
                              {getLevelBadge(competition.level)}
                              {getDifficultyBadge(competition.difficulty)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">Deadline</div>
                              <div className="text-muted-foreground">{new Date(competition.deadline).toLocaleDateString('id-ID')}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">Lokasi</div>
                              <div className="text-muted-foreground">{competition.location}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">Peserta</div>
                              <div className="text-muted-foreground">{competition.participants}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">Hadiah</div>
                              <div className="text-muted-foreground">{competition.prize}</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Organizer: {competition.organizer}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Detail
                            </Button>
                            {competition.status === 'open' && (
                              <Button size="sm" disabled={competition.registered}>
                                {competition.registered ? 'Sudah Terdaftar' : 'Daftar Sekarang'}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="registered" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kompetisi yang Diikuti</CardTitle>
              <CardDescription>Daftar kompetisi yang sudah Anda daftarkan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {registeredCompetitions.map((competition, index) => (
                  <motion.div
                    key={competition.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border border-border"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{competition.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(competition.date).toLocaleDateString('id-ID')}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {competition.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(competition.status)}
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Prestasi Kompetisi
              </CardTitle>
              <CardDescription>Rekam jejak prestasi dalam berbagai kompetisi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border border-border bg-gradient-to-r from-primary/5 to-transparent"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Trophy className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Team: {achievement.team}</span>
                          <span>•</span>
                          <span>{achievement.year}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getLevelBadge(achievement.level)}
                        <Badge variant="outline" className="text-success border-success">
                          {achievement.prize}
                        </Badge>
                      </div>
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

export default Kompetisi;