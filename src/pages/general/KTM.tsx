import { motion } from 'framer-motion';
import { CreditCard, Download, Printer, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { maskNIM } from '@/lib/utils';
import { useState } from 'react';

const KTM = () => {
  const [showFullNIM] = useState(false);

  const ktmData = {
    nim: '244101060016',
    nama: 'NAUFAL M.D',
    prodi: 'D4 Jaringan Telekomunikasi Digital',
    angkatan: '2022',
    status: 'Aktif',
    berlakuHingga: '2026-08-31',
    statusKTM: 'Sudah Dicetak',
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground">Kartu Tanda Mahasiswa (KTM)</h1>
        <p className="text-muted-foreground">Informasi dan cetak KTM fisik</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KTM Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Preview KTM
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-primary p-6 rounded-lg text-white shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-sm">POLITEKNIK NEGERI MALANG</h3>
                  <p className="text-xs opacity-90">KARTU TANDA MAHASISWA</p>
                </div>
                <div className="w-16 h-20 bg-white/20 rounded border-2 border-white/30 flex items-center justify-center">
                  <span className="text-xs">FOTO</span>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs opacity-75">NIM</p>
                    <p className="font-mono">{showFullNIM ? ktmData.nim : maskNIM(ktmData.nim)}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-75">Angkatan</p>
                    <p>{ktmData.angkatan}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs opacity-75">Nama</p>
                  <p className="font-medium">{ktmData.nama}</p>
                </div>
                
                <div>
                  <p className="text-xs opacity-75">Program Studi</p>
                  <p>{ktmData.prodi}</p>
                </div>
                
                <div className="flex justify-between text-xs mt-4">
                  <span>Berlaku hingga: {new Date(ktmData.berlakuHingga).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status & Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Status KTM</CardTitle>
            <CardDescription>Informasi status dan layanan KTM</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <h3 className="font-medium">Status Cetak</h3>
                <p className="text-sm text-muted-foreground">KTM fisik</p>
              </div>
              <Badge className="bg-success/10 text-success">
                {ktmData.statusKTM}
              </Badge>
            </div>

            <div className="space-y-3">
              <Button className="w-full" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download KTM Digital
              </Button>
              
              <Button className="w-full" variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Cetak Ulang KTM
              </Button>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Lokasi Pengambilan
              </h3>
              <p className="text-sm text-muted-foreground">
                Bagian Kemahasiswaan<br />
                Gedung Sipil Lt.1, Ruang 101<br />
                Senin-Jumat: 08:00 - 15:00 WIB
              </p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-950 dark:border-blue-800">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Jadwal Cetak Massal
              </h3>
              <p className="text-sm text-muted-foreground">
                Cetak KTM massal untuk mahasiswa baru:<br />
                <span className="font-medium">25-27 Agustus 2024</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default KTM;