import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Send, Plus, Eye, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const PermintaanSurat = () => {
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState({
    jenisSurat: '',
    keperluan: '',
    keterangan: ''
  });

  const suratTypes = [
    { value: 'aktif', label: 'Surat Keterangan Aktif Kuliah', waktu: '3-5 hari kerja' },
    { value: 'berkelakuan', label: 'Surat Keterangan Berkelakuan Baik', waktu: '5-7 hari kerja' },
    { value: 'cuti', label: 'Surat Permohonan Cuti Akademik', waktu: '7-10 hari kerja' },
    { value: 'transkrip', label: 'Surat Keterangan Transkrip Sementara', waktu: '2-3 hari kerja' },
    { value: 'magang', label: 'Surat Pengantar Magang/PKL', waktu: '3-5 hari kerja' },
    { value: 'penelitian', label: 'Surat Izin Penelitian', waktu: '5-7 hari kerja' },
    { value: 'lulus', label: 'Surat Keterangan Lulus', waktu: '3-5 hari kerja' },
    { value: 'beasiswa', label: 'Surat Rekomendasi Beasiswa', waktu: '7-10 hari kerja' }
  ];

  const riwayatSurat = [
    {
      id: 1,
      jenis: 'Surat Keterangan Aktif Kuliah',
      tanggalPengajuan: '2024-08-15',
      status: 'Selesai',
      keperluan: 'Persyaratan beasiswa'
    },
    {
      id: 2,
      jenis: 'Surat Pengantar Magang/PKL',
      tanggalPengajuan: '2024-08-10',
      status: 'Diproses',
      keperluan: 'PKL di PT. Technology Indonesia'
    },
    {
      id: 3,
      jenis: 'Surat Keterangan Berkelakuan Baik',
      tanggalPengajuan: '2024-08-05',
      status: 'Pending',
      keperluan: 'Melamar kerja'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Selesai':
        return <Badge className="bg-green-500">Selesai</Badge>;
      case 'Diproses':
        return <Badge className="bg-blue-500">Diproses</Badge>;
      case 'Pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'Ditolak':
        return <Badge variant="destructive">Ditolak</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
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
            <FileText className="h-8 w-8" />
            Permintaan Surat
          </h1>
          <p className="text-muted-foreground">Ajukan permintaan surat keterangan dan administrasi</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ajukan Surat Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Ajukan Surat Baru</DialogTitle>
              <DialogDescription>
                Isi formulir berikut untuk mengajukan surat
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="jenisSurat">Jenis Surat</Label>
                <Select value={formData.jenisSurat} onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, jenisSurat: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis surat" />
                  </SelectTrigger>
                  <SelectContent>
                    {suratTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="keperluan">Keperluan</Label>
                <Input
                  id="keperluan"
                  value={formData.keperluan}
                  onChange={(e) => setFormData(prev => ({ ...prev, keperluan: e.target.value }))}
                  placeholder="Masukkan keperluan surat"
                />
              </div>
              <div>
                <Label htmlFor="keterangan">Keterangan Tambahan</Label>
                <Textarea
                  id="keterangan"
                  value={formData.keterangan}
                  onChange={(e) => setFormData(prev => ({ ...prev, keterangan: e.target.value }))}
                  placeholder="Keterangan tambahan (opsional)"
                  rows={3}
                />
              </div>
              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Ajukan Surat
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Letter Types */}
        <Card>
          <CardHeader>
            <CardTitle>Jenis Surat Tersedia</CardTitle>
            <CardDescription>Pilih jenis surat yang ingin diajukan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suratTypes.map((type, index) => (
                <motion.div
                  key={type.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer"
                  onClick={() => setSelectedType(type.value)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{type.label}</h4>
                      <p className="text-sm text-muted-foreground">
                        Estimasi: {type.waktu}
                      </p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Ajukan: {type.label}</DialogTitle>
                          <DialogDescription>
                            Estimasi proses: {type.waktu}
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div>
                            <Label htmlFor="keperluan">Keperluan</Label>
                            <Input
                              id="keperluan"
                              placeholder="Masukkan keperluan surat"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="keterangan">Keterangan Tambahan</Label>
                            <Textarea
                              id="keterangan"
                              placeholder="Keterangan tambahan (opsional)"
                              rows={3}
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            <Send className="h-4 w-4 mr-2" />
                            Ajukan Surat
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Request History */}
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Pengajuan</CardTitle>
            <CardDescription>Status pengajuan surat terbaru</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riwayatSurat.map((surat, index) => (
                <motion.div
                  key={surat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg border border-border"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{surat.jenis}</h4>
                      <p className="text-sm text-muted-foreground">{surat.keperluan}</p>
                    </div>
                    {getStatusBadge(surat.status)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {new Date(surat.tanggalPengajuan).toLocaleDateString('id-ID')}
                    </span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {surat.status === 'Selesai' && (
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default PermintaanSurat;