import { motion } from 'framer-motion';
import { User, Edit, Camera, Eye, EyeOff, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { maskNIM } from '@/lib/utils';
import { useState } from 'react';

const Biodata = () => {
  const [showFullNIM, setShowFullNIM] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const userData = {
    nim: '244101060016',
    nama: 'NAUFAL M.D',
    email: 'naufal.md@polinema.ac.id',
    prodi: 'D4 Teknik Informatika',
    angkatan: '2022',
    status: 'Aktif',
    alamat: 'Jl. Soekarno Hatta No. 9, Malang',
    telepon: '081234567890',
    tempatLahir: 'Malang',
    tanggalLahir: '2000-05-15',
    jenisKelamin: 'Laki-laki',
    agama: 'Islam',
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Biodata Mahasiswa</h1>
          <p className="text-muted-foreground">Informasi personal dan akademik Anda</p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)}>
          <Edit className="h-4 w-4 mr-2" />
          {isEditing ? 'Batal Edit' : 'Edit Biodata'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Foto Profil
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src="" alt={userData.nama} />
              <AvatarFallback className="text-2xl">
                {userData.nama.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              <Camera className="h-4 w-4 mr-2" />
              Ubah Foto
            </Button>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Data Personal</CardTitle>
            <CardDescription>Informasi pribadi mahasiswa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>NIM</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    value={showFullNIM ? userData.nim : maskNIM(userData.nim)} 
                    readOnly 
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFullNIM(!showFullNIM)}
                  >
                    {showFullNIM ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <Label>Nama Lengkap</Label>
                <Input value={userData.nama} readOnly={!isEditing} />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={userData.email} readOnly={!isEditing} />
              </div>
              <div>
                <Label>Program Studi</Label>
                <Input value={userData.prodi} readOnly />
              </div>
              <div>
                <Label>Angkatan</Label>
                <Input value={userData.angkatan} readOnly />
              </div>
              <div>
                <Label>Status</Label>
                <Input value={userData.status} readOnly />
              </div>
              <div>
                <Label>Tempat Lahir</Label>
                <Input value={userData.tempatLahir} readOnly={!isEditing} />
              </div>
              <div>
                <Label>Tanggal Lahir</Label>
                <Input value={userData.tanggalLahir} type="date" readOnly={!isEditing} />
              </div>
              <div>
                <Label>Jenis Kelamin</Label>
                <Input value={userData.jenisKelamin} readOnly={!isEditing} />
              </div>
              <div>
                <Label>Agama</Label>
                <Input value={userData.agama} readOnly={!isEditing} />
              </div>
              <div className="md:col-span-2">
                <Label>Alamat</Label>
                <Input value={userData.alamat} readOnly={!isEditing} />
              </div>
              <div>
                <Label>No. Telepon</Label>
                <Input value={userData.telepon} readOnly={!isEditing} />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Batal
                </Button>
                <Button onClick={() => setIsEditing(false)}>
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Perubahan
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default Biodata;