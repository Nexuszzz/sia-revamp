import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Eye, 
  EyeOff, 
  Filter,
  RefreshCw,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer 
} from 'recharts';
import { maskNIM, gradeToPoint, calculateGPA } from '@/lib/utils';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Grade {
  id: string;
  kode: string;
  nama: string;
  sks: number;
  nilaiHuruf: string;
  bobot: number;
  semester: string;
  kategori?: string;
}

const GRADE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const Nilai = () => {
  const navigate = useNavigate();
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [showFullNIM, setShowFullNIM] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock user data
  const user = {
    nim: '244101060016',
    nama: 'NAUFAL M.D',
  };

  // Mock grades data with realistic distribution
  const allGrades: Grade[] = [
    // Semester 1
    { id: '1', kode: 'MK101', nama: 'Matematika Dasar', sks: 3, nilaiHuruf: 'A', bobot: 4.0, semester: '2022/2023 Ganjil', kategori: 'Dasar' },
    { id: '2', kode: 'MK102', nama: 'Bahasa Indonesia', sks: 2, nilaiHuruf: 'AB', bobot: 3.5, semester: '2022/2023 Ganjil', kategori: 'Umum' },
    { id: '3', kode: 'MK103', nama: 'Fisika Dasar', sks: 3, nilaiHuruf: 'B', bobot: 3.0, semester: '2022/2023 Ganjil', kategori: 'Dasar' },
    { id: '4', kode: 'MK104', nama: 'Kimia Dasar', sks: 3, nilaiHuruf: 'AB', bobot: 3.5, semester: '2022/2023 Ganjil', kategori: 'Dasar' },
    { id: '5', kode: 'MK105', nama: 'Algoritma Pemrograman', sks: 4, nilaiHuruf: 'A', bobot: 4.0, semester: '2022/2023 Ganjil', kategori: 'Inti' },
    
    // Semester 2
    { id: '6', kode: 'MK201', nama: 'Kalkulus', sks: 3, nilaiHuruf: 'AB', bobot: 3.5, semester: '2022/2023 Genap', kategori: 'Dasar' },
    { id: '7', kode: 'MK202', nama: 'Statistika', sks: 3, nilaiHuruf: 'B', bobot: 3.0, semester: '2022/2023 Genap', kategori: 'Dasar' },
    { id: '8', kode: 'MK203', nama: 'Pemrograman Web', sks: 4, nilaiHuruf: 'A', bobot: 4.0, semester: '2022/2023 Genap', kategori: 'Inti' },
    { id: '9', kode: 'MK204', nama: 'Basis Data', sks: 3, nilaiHuruf: 'A', bobot: 4.0, semester: '2022/2023 Genap', kategori: 'Inti' },
    { id: '10', kode: 'MK205', nama: 'Jaringan Komputer', sks: 3, nilaiHuruf: 'AB', bobot: 3.5, semester: '2022/2023 Genap', kategori: 'Inti' },
    
    // Semester 3
    { id: '11', kode: 'MK301', nama: 'Struktur Data', sks: 4, nilaiHuruf: 'A', bobot: 4.0, semester: '2023/2024 Ganjil', kategori: 'Inti' },
    { id: '12', kode: 'MK302', nama: 'Sistem Operasi', sks: 3, nilaiHuruf: 'AB', bobot: 3.5, semester: '2023/2024 Ganjil', kategori: 'Inti' },
    { id: '13', kode: 'MK303', nama: 'Rekayasa Perangkat Lunak', sks: 3, nilaiHuruf: 'A', bobot: 4.0, semester: '2023/2024 Ganjil', kategori: 'Inti' },
    { id: '14', kode: 'MK304', nama: 'Interaksi Manusia Komputer', sks: 3, nilaiHuruf: 'B', bobot: 3.0, semester: '2023/2024 Ganjil', kategori: 'Inti' },
    { id: '15', kode: 'MK305', nama: 'Kewarganegaraan', sks: 2, nilaiHuruf: 'A', bobot: 4.0, semester: '2023/2024 Ganjil', kategori: 'Umum' },
    
    // Semester 4
    { id: '16', kode: 'MK401', nama: 'Analisis dan Perancangan Sistem', sks: 3, nilaiHuruf: 'AB', bobot: 3.5, semester: '2023/2024 Genap', kategori: 'Inti' },
    { id: '17', kode: 'MK402', nama: 'Pemrograman Mobile', sks: 4, nilaiHuruf: 'A', bobot: 4.0, semester: '2023/2024 Genap', kategori: 'Inti' },
    { id: '18', kode: 'MK403', nama: 'Keamanan Sistem Informasi', sks: 3, nilaiHuruf: 'AB', bobot: 3.5, semester: '2023/2024 Genap', kategori: 'Inti' },
    { id: '19', kode: 'MK404', nama: 'Machine Learning', sks: 3, nilaiHuruf: 'B', bobot: 3.0, semester: '2023/2024 Genap', kategori: 'Pilihan' },
    { id: '20', kode: 'MK405', nama: 'Bahasa Inggris', sks: 2, nilaiHuruf: 'A', bobot: 4.0, semester: '2023/2024 Genap', kategori: 'Umum' },
    
    // Semester 5 (Current)
    { id: '21', kode: 'MK501', nama: 'Proyek Perangkat Lunak', sks: 4, nilaiHuruf: 'A', bobot: 4.0, semester: '2024/2025 Ganjil', kategori: 'Inti' },
    { id: '22', kode: 'MK502', nama: 'Artificial Intelligence', sks: 3, nilaiHuruf: 'AB', bobot: 3.5, semester: '2024/2025 Ganjil', kategori: 'Pilihan' },
    { id: '23', kode: 'MK503', nama: 'Cloud Computing', sks: 3, nilaiHuruf: 'A', bobot: 4.0, semester: '2024/2025 Ganjil', kategori: 'Pilihan' },
  ];

  // Filter grades based on selected semester
  const filteredGrades = selectedSemester === 'all' 
    ? allGrades 
    : allGrades.filter(grade => grade.semester === selectedSemester);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalSKS = filteredGrades.reduce((acc, grade) => acc + grade.sks, 0);
    const totalBobot = filteredGrades.reduce((acc, grade) => acc + (grade.bobot * grade.sks), 0);
    const gpa = totalSKS > 0 ? totalBobot / totalSKS : 0;
    
    return {
      gpa: gpa,
      totalSKS: totalSKS,
      avgBobot: filteredGrades.length > 0 ? filteredGrades.reduce((acc, grade) => acc + grade.bobot, 0) / filteredGrades.length : 0,
      semesterCount: new Set(allGrades.map(g => g.semester)).size,
    };
  }, [filteredGrades]);

  // GPA trend data
  const gpaData = useMemo(() => {
    const semesters = [...new Set(allGrades.map(g => g.semester))].sort();
    return semesters.map(semester => {
      const semesterGrades = allGrades.filter(g => g.semester === semester);
      const gpa = calculateGPA(semesterGrades);
      return {
        semester: semester.replace('2024/2025 ', '').replace('2023/2024 ', '').replace('2022/2023 ', ''),
        gpa: parseFloat(gpa.toFixed(2)),
        sks: semesterGrades.reduce((acc, g) => acc + g.sks, 0),
      };
    });
  }, []);

  // Grade distribution data
  const gradeDistribution = useMemo(() => {
    const distribution = filteredGrades.reduce((acc, grade) => {
      acc[grade.nilaiHuruf] = (acc[grade.nilaiHuruf] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(distribution).map(([grade, count]) => ({
      grade,
      count,
      percentage: ((count / filteredGrades.length) * 100).toFixed(1),
    }));
  }, [filteredGrades]);

  // Semester performance data
  const semesterPerformance = useMemo(() => {
    const semesters = [...new Set(allGrades.map(g => g.semester))].sort();
    return semesters.map(semester => {
      const semesterGrades = allGrades.filter(g => g.semester === semester);
      const gpa = calculateGPA(semesterGrades);
      const sks = semesterGrades.reduce((acc, g) => acc + g.sks, 0);
      return {
        semester: semester.replace('2024/2025 ', '').replace('2023/2024 ', '').replace('2022/2023 ', ''),
        gpa: parseFloat(gpa.toFixed(2)),
        sks,
      };
    });
  }, []);

  // Get unique semesters for filter
  const semesters = [...new Set(allGrades.map(g => g.semester))].sort();

  // Export functions
  const exportToPDF = async () => {
    const element = document.getElementById('transcript-content');
    if (!element) return;

    try {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`transkrip-${maskNIM(user.nim)}.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
  };

  const exportChart = async (chartId: string) => {
    const element = document.getElementById(chartId);
    if (!element) return;

    try {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = `chart-${chartId}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error exporting chart:', error);
    }
  };

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
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
          <h1 className="text-3xl font-bold text-foreground">Analitik Nilai Akademik</h1>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-muted-foreground">
              NIM: {showFullNIM ? user.nim : maskNIM(user.nim)}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFullNIM(!showFullNIM)}
            >
              {showFullNIM ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={exportToPDF}
          >
            <FileText className="h-4 w-4 mr-2" />
            Ekspor PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, staggerChildren: 0.1 }}
      >
        <motion.div variants={{ hidden: { scale: 0.8, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">IPK</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <motion.div 
                className="text-2xl font-bold text-primary"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
              >
                {stats.gpa.toFixed(2)}
              </motion.div>
              <p className="text-xs text-muted-foreground">dari 4.00</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={{ hidden: { scale: 0.8, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total SKS</CardTitle>
              <BarChart3 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalSKS}</div>
              <p className="text-xs text-muted-foreground">SKS diambil</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={{ hidden: { scale: 0.8, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rata-rata Bobot</CardTitle>
              <TrendingUp className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.avgBobot.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">per mata kuliah</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={{ hidden: { scale: 0.8, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Semester</CardTitle>
              <BarChart3 className="h-4 w-4 text-info" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.semesterCount}</div>
              <p className="text-xs text-muted-foreground">semester selesai</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Charts and Analysis */}
      <Tabs defaultValue="charts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="charts">Grafik Analitik</TabsTrigger>
          <TabsTrigger value="table">Tabel Nilai</TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-6">
          {/* Filter Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter Semester
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Semester</SelectItem>
                    {semesters.map(semester => (
                      <SelectItem key={semester} value={semester}>
                        {semester}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={refreshData}>
                  Terapkan Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* GPA Trend Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Trend IPK per Semester</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => exportChart('gpa-chart')}
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div id="gpa-chart">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={gpaData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="semester" />
                        <YAxis domain={[0, 4]} />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="gpa" 
                          stroke="#3b82f6" 
                          strokeWidth={3}
                          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Grade Distribution Pie Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Distribusi Nilai</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => exportChart('distribution-chart')}
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div id="distribution-chart">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={gradeDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                          label={({ grade, percentage }) => `${grade} (${percentage}%)`}
                        >
                          {gradeDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={GRADE_COLORS[index % GRADE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Semester Performance Bar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Performa per Semester</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => exportChart('performance-chart')}
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div id="performance-chart">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={semesterPerformance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="semester" />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="right" dataKey="sks" fill="#10b981" name="Total SKS" />
                        <Line yAxisId="left" type="monotone" dataKey="gpa" stroke="#3b82f6" name="IPK" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="table">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Tabel Nilai Detail</CardTitle>
                <CardDescription>
                  Daftar lengkap mata kuliah dan nilai yang diperoleh
                </CardDescription>
              </CardHeader>
              <CardContent id="transcript-content">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Kode</th>
                        <th className="text-left p-3">Mata Kuliah</th>
                        <th className="text-left p-3">SKS</th>
                        <th className="text-left p-3">Nilai</th>
                        <th className="text-left p-3">Bobot</th>
                        <th className="text-left p-3">Semester</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredGrades.map((grade, index) => (
                        <motion.tr
                          key={grade.id}
                          className="border-b hover:bg-muted/50"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <td className="p-3 font-medium">{grade.kode}</td>
                          <td className="p-3">{grade.nama}</td>
                          <td className="p-3">{grade.sks}</td>
                          <td className="p-3">
                            <Badge variant="secondary">{grade.nilaiHuruf}</Badge>
                          </td>
                          <td className="p-3">{grade.bobot.toFixed(1)}</td>
                          <td className="p-3 text-sm text-muted-foreground">
                            {grade.semester}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Nilai;