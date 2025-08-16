import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, CheckCircle, X, Eye, Download, AlertTriangle, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

const FotoIjazah = () => {
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [photoStatus, setPhotoStatus] = useState('pending'); // pending, approved, rejected, needs_revision

  const requirements = [
    {
      title: 'Ukuran Foto',
      description: '4x6 cm (400x600 pixel minimum)',
      status: 'required',
      icon: '📐'
    },
    {
      title: 'Format File',
      description: 'JPG, JPEG, atau PNG',
      status: 'required',
      icon: '📄'
    },
    {
      title: 'Ukuran File',
      description: 'Maksimal 2MB',
      status: 'required',
      icon: '💾'
    },
    {
      title: 'Background',
      description: 'Latar belakang merah atau biru',
      status: 'required',
      icon: '🎨'
    },
    {
      title: 'Pose',
      description: 'Formal, menghadap kamera',
      status: 'required',
      icon: '👤'
    },
    {
      title: 'Pakaian',
      description: 'Formal/semi formal',
      status: 'required',
      icon: '👔'
    }
  ];

  const submissionHistory = [
    {
      date: '2024-01-15',
      time: '10:30',
      status: 'rejected',
      feedback: 'Background kurang sesuai standar, gunakan background merah atau biru solid',
      reviewer: 'Admin Akademik'
    },
    {
      date: '2024-01-20',
      time: '14:15',
      status: 'needs_revision',
      feedback: 'Ukuran foto perlu disesuaikan menjadi 4x6 cm',
      reviewer: 'Admin Akademik'
    },
    {
      date: '2024-01-22',
      time: '09:45',
      status: 'pending',
      feedback: 'Foto sedang dalam proses review',
      reviewer: '-'
    }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setUploadedPhoto({
              name: file.name,
              size: file.size,
              url: URL.createObjectURL(file)
            });
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-success/10 text-success';
      case 'rejected': return 'bg-destructive/10 text-destructive';
      case 'needs_revision': return 'bg-warning/10 text-warning';
      default: return 'bg-secondary/10 text-secondary-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <X className="h-4 w-4" />;
      case 'needs_revision': return <AlertTriangle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
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
            <Camera className="h-8 w-8" />
            Foto Ijazah
          </h1>
          <p className="text-muted-foreground">Upload dan kelola foto untuk keperluan ijazah</p>
        </div>
        <Badge className={getStatusColor(photoStatus)}>
          {getStatusIcon(photoStatus)}
          <span className="ml-1">
            {photoStatus === 'approved' && 'Disetujui'}
            {photoStatus === 'rejected' && 'Ditolak'}
            {photoStatus === 'needs_revision' && 'Perlu Revisi'}
            {photoStatus === 'pending' && 'Menunggu Review'}
          </span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upload Foto Ijazah</CardTitle>
              <CardDescription>
                Pastikan foto sesuai dengan persyaratan yang telah ditentukan
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!uploadedPhoto ? (
                <div className="border-2 border-dashed border-border rounded-lg p-8">
                  <div className="text-center">
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag & drop foto atau klik untuk upload
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                      <Upload className="h-4 w-4 mr-2" />
                      Pilih Foto
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <img
                      src={uploadedPhoto.url}
                      alt="Uploaded photo"
                      className="max-w-xs max-h-64 rounded-lg border"
                    />
                  </div>
                  <div className="flex items-center justify-between bg-secondary/10 p-4 rounded-lg">
                    <div>
                      <p className="font-medium">{uploadedPhoto.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedPhoto.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Preview Foto</DialogTitle>
                            <DialogDescription>
                              Pastikan foto sesuai dengan persyaratan
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex justify-center">
                            <img
                              src={uploadedPhoto.url}
                              alt="Photo preview"
                              className="max-w-full max-h-96 rounded-lg"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setUploadedPhoto(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {uploadProgress < 100 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}
                  {uploadProgress === 100 && (
                    <Button className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Submit Foto
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submission History */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Riwayat Pengiriman</CardTitle>
              <CardDescription>Histori upload dan review foto ijazah</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {submissionHistory.map((submission, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-4 border-primary/20 pl-4 pb-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getStatusColor(submission.status)}>
                            {getStatusIcon(submission.status)}
                            <span className="ml-1">
                              {submission.status === 'approved' && 'Disetujui'}
                              {submission.status === 'rejected' && 'Ditolak'}
                              {submission.status === 'needs_revision' && 'Perlu Revisi'}
                              {submission.status === 'pending' && 'Review'}
                            </span>
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {submission.date} - {submission.time}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {submission.feedback}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Review oleh: {submission.reviewer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requirements Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Persyaratan Foto</CardTitle>
              <CardDescription>Pastikan foto memenuhi semua kriteria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requirements.map((req, index) => (
                  <motion.div
                    key={req.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm flex-shrink-0">
                      {req.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{req.title}</h4>
                      <p className="text-xs text-muted-foreground">{req.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Foto yang tidak sesuai persyaratan akan ditolak dan perlu diupload ulang.
              Proses review membutuhkan waktu 1-2 hari kerja.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Bantuan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Camera className="h-4 w-4 mr-2" />
                  Tips Foto Bagus
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Info className="h-4 w-4 mr-2" />
                  FAQ Foto Ijazah
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default FotoIjazah;