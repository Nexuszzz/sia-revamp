import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCheck, Eye, Download, Search, Filter, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const RiwayatSurat = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('semua');
  const [selectedSurat, setSelectedSurat] = useState<any>(null);

  const riwayatSurat = [
    {
      id: 1,
      nomorSurat: 'SKT/2024/001',
      jenis: 'Surat Keterangan Aktif Kuliah',
      tanggalPengajuan: '2024-08-15',
      tanggalSelesai: '2024-08-18',
      status: 'Selesai',
      keperluan: 'Persyaratan beasiswa',
      keterangan: 'Untuk pengajuan beasiswa PPA',
      pemohon: 'Ahmad Rizki',
      nim: '20210001'
    },
    {
      id: 2,
      nomorSurat: 'SPM/2024/002',
      jenis: 'Surat Pengantar Magang/PKL',
      tanggalPengajuan: '2024-08-10',
      tanggalSelesai: null,
      status: 'Diproses',
      keperluan: 'PKL di PT. Technology Indonesia',
      keterangan: 'Magang selama 3 bulan',
      pemohon: 'Siti Nurhaliza',
      nim: '20210002'
    },
    {
      id: 3,
      nomorSurat: null,
      jenis: 'Surat Keterangan Berkelakuan Baik',
      tanggalPengajuan: '2024-08-05',
      tanggalSelesai: null,
      status: 'Pending',
      keperluan: 'Melamar kerja',
      keterangan: 'Untuk lamaran PT. Digital Solutions',
      pemohon: 'Budi Santoso',
      nim: '20210003'
    },
    {
      id: 4,
      nomorSurat: null,
      jenis: 'Surat Rekomendasi Beasiswa',
      tanggalPengajuan: '2024-08-03',
      tanggalSelesai: null,
      status: 'Ditolak',
      keperluan: 'Beasiswa LPDP',
      keterangan: 'IPK tidak memenuhi syarat minimum',
      pemohon: 'Dewi Lestari',
      nim: '20210004'
    },
    {
      id: 5,
      nomorSurat: 'SKL/2024/003',
      jenis: 'Surat Keterangan Lulus',
      tanggalPengajuan: '2024-07-28',
      tanggalSelesai: '2024-07-30',
      status: 'Selesai',
      keperluan: 'Persyaratan CPNS',
      keterangan: 'Untuk pendaftaran CPNS 2024',
      pemohon: 'Eko Prasetyo',
      nim: '20200001'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Selesai':
        return <Badge className="bg-success/10 text-success border-success/20">Selesai</Badge>;
      case 'Diproses':
        return <Badge className="bg-warning/10 text-warning border-warning/20">Diproses</Badge>;
      case 'Pending':
        return <Badge className="bg-muted text-muted-foreground">Pending</Badge>;
      case 'Ditolak':
        return <Badge variant="destructive">Ditolak</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredSurat = riwayatSurat.filter(surat => {
    const matchesSearch = surat.jenis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         surat.keperluan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         surat.pemohon.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'semua' || surat.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusStats = () => {
    const stats = riwayatSurat.reduce((acc, surat) => {
      acc[surat.status] = (acc[surat.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return stats;
  };

  const stats = getStatusStats();

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
            <FileCheck className="h-8 w-8" />
            Riwayat Surat
          </h1>
          <p className="text-muted-foreground">Pantau status dan riwayat permintaan surat yang telah diajukan</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(stats).map(([status, count], index) => (
          <motion.div
            key={status}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{count}</div>
                  <div className="text-sm text-muted-foreground">{status}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari berdasarkan jenis surat, keperluan, atau pemohon..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua">Semua Status</SelectItem>
                  <SelectItem value="selesai">Selesai</SelectItem>
                  <SelectItem value="diproses">Diproses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="ditolak">Ditolak</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Riwayat List */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Riwayat Surat</CardTitle>
          <CardDescription>
            Menampilkan {filteredSurat.length} dari {riwayatSurat.length} permintaan surat
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSurat.length === 0 ? (
              <div className="text-center py-8">
                <FileCheck className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Tidak ada riwayat surat ditemukan</p>
              </div>
            ) : (
              filteredSurat.map((surat, index) => (
                <motion.div
                  key={surat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{surat.jenis}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{surat.keperluan}</p>
                          {surat.nomorSurat && (
                            <div className="text-xs text-muted-foreground">
                              No. Surat: {surat.nomorSurat}
                            </div>
                          )}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Diajukan: {new Date(surat.tanggalPengajuan).toLocaleDateString('id-ID')}
                            </div>
                            {surat.tanggalSelesai && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Selesai: {new Date(surat.tanggalSelesai).toLocaleDateString('id-ID')}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {getStatusBadge(surat.status)}
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setSelectedSurat(surat)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Detail Permintaan Surat</DialogTitle>
                                </DialogHeader>
                                {selectedSurat && (
                                  <div className="space-y-4">
                                    <div>
                                      <label className="text-sm font-medium">Jenis Surat</label>
                                      <p className="text-sm text-muted-foreground">{selectedSurat.jenis}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Pemohon</label>
                                      <p className="text-sm text-muted-foreground">{selectedSurat.pemohon} ({selectedSurat.nim})</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Keperluan</label>
                                      <p className="text-sm text-muted-foreground">{selectedSurat.keperluan}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Keterangan</label>
                                      <p className="text-sm text-muted-foreground">{selectedSurat.keterangan}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Status</label>
                                      <div className="mt-1">
                                        {getStatusBadge(selectedSurat.status)}
                                      </div>
                                    </div>
                                    {selectedSurat.nomorSurat && (
                                      <div>
                                        <label className="text-sm font-medium">Nomor Surat</label>
                                        <p className="text-sm text-muted-foreground">{selectedSurat.nomorSurat}</p>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            {surat.status === 'Selesai' && (
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RiwayatSurat;