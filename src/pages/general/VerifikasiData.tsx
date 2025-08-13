import { motion } from 'framer-motion';
import { FileCheck, Upload, CheckCircle, Clock, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const VerifikasiData = () => {
  const verifikasiItems = [
    { nama: 'KTP', status: 'Terverifikasi', file: 'ktp_naufal.pdf', tanggal: '2024-08-01' },
    { nama: 'Ijazah SMA', status: 'Terverifikasi', file: 'ijazah_sma.pdf', tanggal: '2024-08-01' },
    { nama: 'Kartu Keluarga', status: 'Menunggu', file: 'kk_naufal.pdf', tanggal: '2024-08-10' },
    { nama: 'Surat Keterangan Tidak Mampu', status: 'Ditolak', file: 'sktm.pdf', tanggal: '2024-08-05' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Terverifikasi':
        return <Badge className="bg-success/10 text-success"><CheckCircle className="h-3 w-3 mr-1" />Terverifikasi</Badge>;
      case 'Menunggu':
        return <Badge className="bg-warning/10 text-warning"><Clock className="h-3 w-3 mr-1" />Menunggu</Badge>;
      case 'Ditolak':
        return <Badge variant="destructive"><X className="h-3 w-3 mr-1" />Ditolak</Badge>;
      default:
        return <Badge variant="secondary">Belum Upload</Badge>;
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
        <h1 className="text-3xl font-bold text-foreground">Verifikasi Data</h1>
        <p className="text-muted-foreground">Upload dan verifikasi dokumen akademik Anda</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            Status Verifikasi Dokumen
          </CardTitle>
          <CardDescription>
            Pastikan semua dokumen telah terverifikasi untuk kelancaran proses akademik
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {verifikasiItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div>
                  <h3 className="font-medium">{item.nama}</h3>
                  <p className="text-sm text-muted-foreground">
                    File: {item.file} • Upload: {item.tanggal}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(item.status)}
                  {item.status === 'Ditolak' && (
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Ulang
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Upload Dokumen Baru</h3>
            <div className="flex items-center gap-4">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Pilih File
              </Button>
              <span className="text-sm text-muted-foreground">
                Format: PDF, JPG, PNG (Maks. 2MB)
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VerifikasiData;