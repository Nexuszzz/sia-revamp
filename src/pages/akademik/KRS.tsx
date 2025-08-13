import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Plus, Trash2, Eye, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';

const KRS = () => {
  const [selectedCourses, setSelectedCourses] = useState([1, 2, 3, 4, 5]);

  const krsStatus = {
    periode: 'Semester Ganjil 2024/2025',
    statusKRS: 'Draft',
    batasWaktu: '2024-08-30',
    maxSKS: 24,
    minSKS: 12,
  };

  const availableCourses = [
    {
      id: 1, kode: 'TI501', nama: 'Machine Learning', sks: 3, 
      jadwal: 'Senin, 08:00-10:30', prasyarat: ['TI301', 'TI302'],
      dosen: 'Dr. Ahmad ML, M.Kom', kuota: 30, terisi: 25,
      status: 'Available', wajib: true
    },
    {
      id: 2, kode: 'TI502', nama: 'Cloud Computing', sks: 3,
      jadwal: 'Selasa, 10:00-12:30', prasyarat: ['TI401'],
      dosen: 'Prof. Cloud Expert, Ph.D', kuota: 25, terisi: 20,
      status: 'Available', wajib: true
    },
    {
      id: 3, kode: 'TI503', nama: 'Mobile Development', sks: 4,
      jadwal: 'Rabu, 13:00-16:30', prasyarat: ['TI201'],
      dosen: 'Lisa Mobile, M.Kom', kuota: 20, terisi: 18,
      status: 'Available', wajib: true
    },
    {
      id: 4, kode: 'TI504', nama: 'Data Science', sks: 3,
      jadwal: 'Kamis, 08:00-10:30', prasyarat: ['TI301'],
      dosen: 'Dr. Data Scientist, M.Si', kuota: 30, terisi: 28,
      status: 'Almost Full', wajib: true
    },
    {
      id: 5, kode: 'TI505', nama: 'Cyber Security', sks: 3,
      jadwal: 'Jumat, 10:00-12:30', prasyarat: ['TI401'],
      dosen: 'Security Expert, M.Kom', kuota: 25, terisi: 15,
      status: 'Available', wajib: true
    },
    {
      id: 6, kode: 'TI506', nama: 'Blockchain Technology', sks: 3,
      jadwal: 'Senin, 13:00-15:30', prasyarat: ['TI301'],
      dosen: 'Blockchain Dev, M.T', kuota: 20, terisi: 12,
      status: 'Available', wajib: false
    },
    {
      id: 7, kode: 'TI507', nama: 'IoT Systems', sks: 3,
      jadwal: 'Selasa, 15:00-17:30', prasyarat: ['TI201'],
      dosen: 'IoT Specialist, M.Kom', kuota: 25, terisi: 25,
      status: 'Full', wajib: false
    }
  ];

  const registeredCourses = availableCourses.filter(course => 
    selectedCourses.includes(course.id)
  );

  const totalSKS = registeredCourses.reduce((sum, course) => sum + course.sks, 0);

  const toggleCourse = (courseId: number) => {
    const course = availableCourses.find(c => c.id === courseId);
    if (course?.status === 'Full') return;

    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(prev => prev.filter(id => id !== courseId));
    } else {
      if (totalSKS + (course?.sks || 0) <= krsStatus.maxSKS) {
        setSelectedCourses(prev => [...prev, courseId]);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-500';
      case 'Almost Full': return 'bg-yellow-500';
      case 'Full': return 'bg-red-500';
      default: return 'bg-gray-500';
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
            <ClipboardCheck className="h-8 w-8" />
            Kartu Rencana Studi (KRS)
          </h1>
          <p className="text-muted-foreground">{krsStatus.periode}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview KRS
          </Button>
          <Button disabled={totalSKS < krsStatus.minSKS}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Ajukan KRS
          </Button>
        </div>
      </div>

      {/* Status Alert */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Status KRS: <strong>{krsStatus.statusKRS}</strong> | 
          Batas pengajuan: <strong>{new Date(krsStatus.batasWaktu).toLocaleDateString('id-ID')}</strong>
        </AlertDescription>
      </Alert>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{totalSKS}</div>
            <p className="text-sm text-muted-foreground">SKS Terpilih</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{krsStatus.maxSKS - totalSKS}</div>
            <p className="text-sm text-muted-foreground">SKS Tersisa</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{registeredCourses.length}</div>
            <p className="text-sm text-muted-foreground">Mata Kuliah</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              {registeredCourses.filter(c => c.wajib).length}
            </div>
            <p className="text-sm text-muted-foreground">MK Wajib</p>
          </CardContent>
        </Card>
      </div>

      {/* KRS Tabs */}
      <Tabs defaultValue="selection" className="space-y-4">
        <TabsList>
          <TabsTrigger value="selection">Pemilihan MK</TabsTrigger>
          <TabsTrigger value="registered">KRS Saya</TabsTrigger>
        </TabsList>

        <TabsContent value="selection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mata Kuliah Tersedia</CardTitle>
              <CardDescription>Pilih mata kuliah untuk semester ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border ${
                      selectedCourses.includes(course.id) ? 'border-primary bg-primary/5' : 'border-border'
                    } ${course.status === 'Full' ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={selectedCourses.includes(course.id)}
                          onCheckedChange={() => toggleCourse(course.id)}
                          disabled={course.status === 'Full' || 
                            (!selectedCourses.includes(course.id) && totalSKS + course.sks > krsStatus.maxSKS)}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{course.nama}</span>
                            <Badge variant={course.wajib ? 'default' : 'secondary'}>
                              {course.wajib ? 'Wajib' : 'Pilihan'}
                            </Badge>
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(course.status)}`} />
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {course.kode} • {course.sks} SKS • {course.jadwal}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Dosen: {course.dosen}
                          </div>
                          {course.prasyarat.length > 0 && (
                            <div className="text-xs text-muted-foreground">
                              Prasyarat: {course.prasyarat.join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <div>Kuota: {course.terisi}/{course.kuota}</div>
                        <Badge variant={
                          course.status === 'Available' ? 'default' :
                          course.status === 'Almost Full' ? 'destructive' :
                          'secondary'
                        }>
                          {course.status}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registered">
          <Card>
            <CardHeader>
              <CardTitle>KRS Terpilih</CardTitle>
              <CardDescription>
                Total {totalSKS} SKS dari {registeredCourses.length} mata kuliah
              </CardDescription>
            </CardHeader>
            <CardContent>
              {registeredCourses.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Belum ada mata kuliah terpilih
                </div>
              ) : (
                <div className="space-y-4">
                  {registeredCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg border border-border bg-card"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{course.nama}</span>
                            <Badge variant={course.wajib ? 'default' : 'secondary'}>
                              {course.wajib ? 'Wajib' : 'Pilihan'}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {course.kode} • {course.sks} SKS • {course.jadwal}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Dosen: {course.dosen}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleCourse(course.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default KRS;