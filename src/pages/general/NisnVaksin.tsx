import { motion } from 'framer-motion';
import { Shield, Syringe, CheckCircle, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const NisnVaksin = () => {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground">NISN & Data Vaksin</h1>
        <p className="text-muted-foreground">Kelola data NISN dan informasi vaksinasi Anda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* NISN */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Nomor Induk Siswa Nasional (NISN)
            </CardTitle>
            <CardDescription>Data NISN dari pendidikan sebelumnya</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>NISN</Label>
              <Input value="1234567890" readOnly />
            </div>
            <div>
              <Label>Nama Sesuai NISN</Label>
              <Input value="NAUFAL M.D" readOnly />
            </div>
            <div>
              <Label>Asal Sekolah</Label>
              <Input value="SMAN 1 Malang" readOnly />
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm text-success">Data NISN telah terverifikasi</span>
            </div>
          </CardContent>
        </Card>

        {/* Vaksin */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Syringe className="h-5 w-5" />
              Data Vaksinasi COVID-19
            </CardTitle>
            <CardDescription>Informasi vaksinasi untuk kebutuhan kampus</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Status Vaksinasi</Label>
              <div className="mt-2">
                <Badge className="bg-success/10 text-success">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Lengkap (3 Dosis)
                </Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Dosis 1</span>
                  <span className="text-sm text-muted-foreground">Sinovac - 15 Aug 2021</span>
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Dosis 2</span>
                  <span className="text-sm text-muted-foreground">Sinovac - 15 Sep 2021</span>
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Booster</span>
                  <span className="text-sm text-muted-foreground">Pfizer - 15 Mar 2022</span>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload Sertifikat Vaksin Baru
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default NisnVaksin;