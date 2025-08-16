import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Users, Calendar, CheckCircle, Clock, AlertTriangle, Upload, Download, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TugasAkhir = () => {
  const [selectedTab, setSelectedTab] = useState('progress');

  const thesisData = {
    title: 'Implementasi Jaringan 5G untuk Optimasi Komunikasi IoT dalam Smart City',
    supervisor: 'Dr. Ing. Budi Santoso, M.T.',
    cosupervisor: 'Muhammad Rizky, S.T., M.T.',
    status: 'progress',
    startDate: '2024-02-01',
    targetDefense: '2024-06-15',
    progress: 75,
    stage: 'Penulisan BAB IV'
  };

  const milestones = [
    {
      title: 'Pengajuan Proposal',
      description: 'Submit proposal tugas akhir',
      status: 'completed',
      date: '2024-01-15',
      progress: 100
    },
    {
      title: 'Seminar Proposal',
      description: 'Presentasi proposal di depan penguji',
      status: 'completed',
      date: '2024-02-01',
      progress: 100
    },
    {
      title: 'Penelitian & Implementasi',
      description: 'Pelaksanaan penelitian dan pengembangan sistem',
      status: 'in_progress',
      date: '2024-02-05',
      progress: 85
    },
    {
      title: 'Penulisan Laporan',
      description: 'Penyusunan laporan tugas akhir',
      status: 'in_progress',
      date: '2024-03-01',
      progress: 70
    },
    {
      title: 'Sidang Tugas Akhir',
      description: 'Presentasi hasil tugas akhir',
      status: 'upcoming',
      date: '2024-06-15',
      progress: 0
    }
  ];

  const documents = [
    {
      name: 'Proposal Tugas Akhir',
      type: 'PDF',
      size: '2.5 MB',
      uploadDate: '2024-01-15',
      status: 'approved',
      version: '1.0'
    },
    {
      name: 'BAB I - Pendahuluan',
      type: 'PDF',
      size: '1.8 MB',
      uploadDate: '2024-02-10',
      status: 'approved',
      version: '2.1'
    },
    {
      name: 'BAB II - Landasan Teori',
      type: 'PDF',
      size: '3.2 MB',
      uploadDate: '2024-02-25',
      status: 'revision',
      version: '1.5'
    },
    {
      name: 'BAB III - Metodologi',
      type: 'PDF',
      size: '2.1 MB',
      uploadDate: '2024-03-10',
      status: 'approved',
      version: '1.8'
    },
    {
      name: 'BAB IV - Implementasi (Draft)',
      type: 'PDF',
      size: '4.5 MB',
      uploadDate: '2024-03-20',
      status: 'review',
      version: '0.9'
    }
  ];

  const consultationHistory = [
    {
      date: '2024-03-18',
      time: '10:00',
      topic: 'Review BAB IV dan Implementasi Sistem',
      supervisor: 'Dr. Ing. Budi Santoso',
      notes: 'Perlu perbaikan pada bagian algoritma dan penambahan hasil testing',
      status: 'completed'
    },
    {
      date: '2024-03-15',
      time: '14:00',
      topic: 'Diskusi Hasil Eksperimen',
      supervisor: 'Muhammad Rizky, S.T., M.T.',
      notes: 'Data eksperimen sudah bagus, perlu analisis yang lebih mendalam',
      status: 'completed'
    },
    {
      date: '2024-03-22',
      time: '09:00',
      topic: 'Konsultasi BAB V - Kesimpulan',
      supervisor: 'Dr. Ing. Budi Santoso',
      notes: 'Jadwal konsultasi akan datang',
      status: 'scheduled'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success/10 text-success';
      case 'approved': return 'bg-success/10 text-success';
      case 'in_progress': return 'bg-primary/10 text-primary';
      case 'review': return 'bg-warning/10 text-warning';
      case 'revision': return 'bg-destructive/10 text-destructive';
      case 'upcoming': return 'bg-secondary/10 text-secondary-foreground';
      default: return 'bg-secondary/10 text-secondary-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'in_progress':
      case 'review':
        return <Clock className="h-4 w-4" />;
      case 'revision':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
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
            <BookOpen className="h-8 w-8" />
            Tugas Akhir
          </h1>
          <p className="text-muted-foreground">Pengelolaan dan monitoring tugas akhir</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Konsultasi
          </Button>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload Dokumen
          </Button>
        </div>
      </div>

      {/* Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{thesisData.title}</CardTitle>
          <CardDescription>
            <div className="space-y-1">
              <p><span className="font-medium">Pembimbing:</span> {thesisData.supervisor}</p>
              <p><span className="font-medium">Co-Pembimbing:</span> {thesisData.cosupervisor}</p>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg border border-border">
              <div className="text-2xl font-bold text-primary">{thesisData.progress}%</div>
              <div className="text-sm text-muted-foreground">Progress</div>
              <Progress value={thesisData.progress} className="mt-2" />
            </div>
            <div className="text-center p-4 rounded-lg border border-border">
              <Badge className={getStatusColor(thesisData.status)}>
                {getStatusIcon(thesisData.status)}
                <span className="ml-1">{thesisData.stage}</span>
              </Badge>
              <div className="text-sm text-muted-foreground mt-2">Status Saat Ini</div>
            </div>
            <div className="text-center p-4 rounded-lg border border-border">
              <div className="text-lg font-semibold">{thesisData.startDate}</div>
              <div className="text-sm text-muted-foreground">Mulai Penelitian</div>
            </div>
            <div className="text-center p-4 rounded-lg border border-border">
              <div className="text-lg font-semibold">{thesisData.targetDefense}</div>
              <div className="text-sm text-muted-foreground">Target Sidang</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="documents">Dokumen</TabsTrigger>
          <TabsTrigger value="consultation">Konsultasi</TabsTrigger>
          <TabsTrigger value="guidelines">Panduan</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Milestone Progress</CardTitle>
              <CardDescription>Tahapan penyelesaian tugas akhir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-lg border border-border"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {getStatusIcon(milestone.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{milestone.title}</h3>
                        <Badge className={getStatusColor(milestone.status)}>
                          {milestone.status === 'completed' && 'Selesai'}
                          {milestone.status === 'in_progress' && 'Berlangsung'}
                          {milestone.status === 'upcoming' && 'Akan Datang'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {milestone.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Target: {milestone.date}
                        </span>
                        <span className="text-xs font-medium">
                          {milestone.progress}%
                        </span>
                      </div>
                      <Progress value={milestone.progress} className="mt-2" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dokumen Tugas Akhir</CardTitle>
              <CardDescription>Upload dan kelola dokumen tugas akhir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc, index) => (
                  <motion.div
                    key={doc.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{doc.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {doc.type} • {doc.size} • v{doc.version} • {doc.uploadDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(doc.status)}>
                        {getStatusIcon(doc.status)}
                        <span className="ml-1">
                          {doc.status === 'approved' && 'Disetujui'}
                          {doc.status === 'revision' && 'Revisi'}
                          {doc.status === 'review' && 'Review'}
                        </span>
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consultation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Konsultasi</CardTitle>
              <CardDescription>Jadwal dan catatan konsultasi dengan pembimbing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {consultationHistory.map((consultation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-4 border-primary/20 pl-4 pb-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(consultation.status)}>
                          {consultation.status === 'completed' && 'Selesai'}
                          {consultation.status === 'scheduled' && 'Terjadwal'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {consultation.date} - {consultation.time}
                        </span>
                      </div>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <h4 className="font-medium mb-1">{consultation.topic}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Pembimbing: {consultation.supervisor}
                    </p>
                    <p className="text-sm">{consultation.notes}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guidelines" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Panduan Penulisan</CardTitle>
                <CardDescription>Format dan struktur laporan tugas akhir</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Template Laporan TA
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Pedoman Penulisan
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Format Sitasi
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informasi Sidang</CardTitle>
                <CardDescription>Persyaratan dan prosedur sidang tugas akhir</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Jadwal Sidang
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Daftar Penguji
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Syarat Sidang
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Pastikan semua dokumen telah disetujui pembimbing sebelum mendaftar sidang. 
              Pendaftaran sidang dilakukan minimal 2 minggu sebelum tanggal sidang yang diinginkan.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default TugasAkhir;