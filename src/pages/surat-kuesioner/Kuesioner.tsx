import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, CheckCircle, Clock, Star, Send, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Kuesioner = () => {
  const kuesionerList = [
    {
      id: 1,
      title: 'Evaluasi Kepuasan Mahasiswa Semester Ganjil 2024',
      description: 'Survei evaluasi kepuasan mahasiswa terhadap layanan akademik',
      deadline: '2024-08-30',
      status: 'open',
      progress: 0,
      questions: 25,
      category: 'akademik',
      reward: 'Sertifikat + 10 Poin'
    },
    {
      id: 2,
      title: 'Kuesioner Fasilitas Kampus',
      description: 'Penilaian terhadap fasilitas dan infrastruktur kampus',
      deadline: '2024-09-15',
      status: 'completed',
      progress: 100,
      questions: 15,
      category: 'fasilitas',
      reward: '5 Poin'
    },
    {
      id: 3,
      title: 'Survei Pembelajaran Online',
      description: 'Feedback mengenai efektivitas pembelajaran daring',
      deadline: '2024-08-25',
      status: 'in_progress',
      progress: 60,
      questions: 20,
      category: 'pembelajaran',
      reward: 'Sertifikat'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-success/10 text-success">Tersedia</Badge>;
      case 'completed':
        return <Badge className="bg-primary/10 text-primary"><CheckCircle className="h-3 w-3 mr-1" />Selesai</Badge>;
      case 'in_progress':
        return <Badge className="bg-warning/10 text-warning"><Clock className="h-3 w-3 mr-1" />Dalam Proses</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <MessageSquare className="h-8 w-8" />
          Kuesioner & Survei
        </h1>
        <p className="text-muted-foreground">Berpartisipasi dalam survei untuk meningkatkan kualitas kampus</p>
      </div>

      <div className="grid gap-6">
        {kuesionerList.map((kuesioner, index) => (
          <motion.div
            key={kuesioner.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{kuesioner.title}</h3>
                        <p className="text-muted-foreground">{kuesioner.description}</p>
                      </div>
                      {getStatusBadge(kuesioner.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <div className="font-medium">Deadline</div>
                        <div className="text-muted-foreground">{new Date(kuesioner.deadline).toLocaleDateString('id-ID')}</div>
                      </div>
                      <div>
                        <div className="font-medium">Pertanyaan</div>
                        <div className="text-muted-foreground">{kuesioner.questions} soal</div>
                      </div>
                      <div>
                        <div className="font-medium">Kategori</div>
                        <div className="text-muted-foreground capitalize">{kuesioner.category}</div>
                      </div>
                      <div>
                        <div className="font-medium">Reward</div>
                        <div className="text-muted-foreground">{kuesioner.reward}</div>
                      </div>
                    </div>

                    {kuesioner.status === 'in_progress' && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{kuesioner.progress}%</span>
                        </div>
                        <Progress value={kuesioner.progress} />
                      </div>
                    )}

                    <div className="flex gap-2">
                      {kuesioner.status === 'open' && (
                        <Button>
                          <Send className="h-4 w-4 mr-2" />
                          Mulai Kuesioner
                        </Button>
                      )}
                      {kuesioner.status === 'in_progress' && (
                        <Button>
                          <Clock className="h-4 w-4 mr-2" />
                          Lanjutkan
                        </Button>
                      )}
                      {kuesioner.status === 'completed' && (
                        <Button variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Lihat Hasil
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Kuesioner;