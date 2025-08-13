import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building, Calendar, MapPin, Upload, FileText, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PKL = () => {
  const pklStatus = {
    status: 'Sedang Berjalan',
    perusahaan: 'PT. Technology Solutions Indonesia',
    pembimbing: 'Dr. Ahmad Susanto, M.Kom',
    progress: 65
  };

  const milestones = [
    { id: 1, task: 'Proposal PKL', status: 'Selesai', completed: true },
    { id: 2, task: 'Surat Pengantar', status: 'Selesai', completed: true },
    { id: 3, task: 'Pelaksanaan PKL', status: 'Berlangsung', completed: false },
    { id: 4, task: 'Laporan PKL', status: 'Pending', completed: false }
  ];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Briefcase className="h-8 w-8" />
          Praktik Kerja Lapangan (PKL)
        </h1>
        <p className="text-muted-foreground">Semester 7 • Status: {pklStatus.status}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progress PKL</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={pklStatus.progress} className="h-2 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Detail Perusahaan</h3>
              <p className="text-sm">
                <Building className="h-4 w-4 inline mr-1" />
                {pklStatus.perusahaan}
              </p>
              <p className="text-sm">
                Pembimbing: {pklStatus.pembimbing}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="timeline">
        <TabsList>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="documents">Dokumen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="timeline">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={milestone.id} className={`flex items-center gap-4 p-4 rounded-lg border ${
                    milestone.completed ? 'border-green-200 bg-green-50' : 'border-border'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.completed ? 'bg-green-500 text-white' : 'bg-muted'
                    }`}>
                      {milestone.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{milestone.task}</h4>
                    </div>
                    <Badge variant={milestone.completed ? 'default' : 'secondary'}>
                      {milestone.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Upload dokumen PKL Anda</p>
                <Button className="mt-4">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Dokumen
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default PKL;