import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Search, Filter, MoreVertical, Reply, Archive, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Message {
  id: string;
  title: string;
  body: string;
  sender: string;
  date: string;
  unread: boolean;
  category: string;
}

const Message = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  // Mock messages data
  const messages: Message[] = [
    {
      id: '1',
      title: 'Pengumuman Jadwal UTS Semester Ganjil 2024/2025',
      body: 'Dengan hormat, bersama ini kami sampaikan jadwal Ujian Tengah Semester (UTS) untuk Semester Ganjil 2024/2025. Ujian akan dilaksanakan mulai tanggal 15 Oktober 2024...',
      sender: 'Bagian Akademik',
      date: '2024-08-10',
      unread: true,
      category: 'Akademik',
    },
    {
      id: '2',
      title: 'Pembayaran UKT Semester Genap 2024/2025',
      body: 'Kepada seluruh mahasiswa, harap segera melakukan pembayaran UKT semester genap 2024/2025 paling lambat tanggal 31 Januari 2025...',
      sender: 'Bagian Keuangan',
      date: '2024-08-08',
      unread: true,
      category: 'Keuangan',
    },
    {
      id: '3',
      title: 'Konfirmasi Pendaftaran KRS Online',
      body: 'Pendaftaran KRS Anda untuk semester ganjil 2024/2025 telah berhasil disimpan. Total SKS yang diambil: 22 SKS...',
      sender: 'Sistem SIAKAD',
      date: '2024-08-05',
      unread: false,
      category: 'Sistem',
    },
    {
      id: '4',
      title: 'Undangan Seminar Nasional Teknologi',
      body: 'Kami mengundang seluruh mahasiswa untuk mengikuti Seminar Nasional Teknologi yang akan dilaksanakan pada tanggal 25 Agustus 2024...',
      sender: 'Himpunan Mahasiswa',
      date: '2024-08-03',
      unread: false,
      category: 'Event',
    },
    {
      id: '5',
      title: 'Pengumuman Beasiswa KIP-Kuliah',
      body: 'Bagi mahasiswa penerima beasiswa KIP-Kuliah, harap melakukan perpanjangan berkas paling lambat tanggal 20 Agustus 2024...',
      sender: 'Bagian Kemahasiswaan',
      date: '2024-08-01',
      unread: false,
      category: 'Beasiswa',
    },
  ];

  const filteredMessages = messages.filter(message =>
    message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = messages.filter(m => m.unread).length;

  const getCategoryColor = (category: string) => {
    const colors = {
      'Akademik': 'bg-blue-500/10 text-blue-600',
      'Keuangan': 'bg-green-500/10 text-green-600',
      'Sistem': 'bg-purple-500/10 text-purple-600',
      'Event': 'bg-orange-500/10 text-orange-600',
      'Beasiswa': 'bg-indigo-500/10 text-indigo-600',
    };
    return colors[category as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pesan Inbox</h1>
          <p className="text-muted-foreground">
            Anda memiliki {unreadCount} pesan yang belum dibaca
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {unreadCount} Baru
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Daftar Pesan
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari pesan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="space-y-1 p-4">
                  {filteredMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                        selectedMessage?.id === message.id
                          ? 'bg-primary/10 border-primary/20'
                          : 'hover:bg-muted/50'
                      } ${message.unread ? 'bg-accent/30' : ''}`}
                      onClick={() => setSelectedMessage(message)}
                      whileHover={{ x: 2 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${message.unread ? 'bg-primary' : 'bg-transparent'}`} />
                          <span className={`text-sm font-medium ${message.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {message.sender}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.date).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                      <h3 className={`text-sm font-medium mb-1 line-clamp-2 ${message.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {message.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <Badge className={`text-xs ${getCategoryColor(message.category)}`}>
                          {message.category}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreVertical className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Reply className="mr-2 h-4 w-4" />
                              Balas
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Archive className="mr-2 h-4 w-4" />
                              Arsipkan
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Detail Pesan</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedMessage ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(selectedMessage.category)}>
                        {selectedMessage.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(selectedMessage.date).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">{selectedMessage.title}</h2>
                    <p className="text-sm text-muted-foreground">Dari: {selectedMessage.sender}</p>
                  </div>

                  <Separator />

                  <div className="prose prose-sm max-w-none">
                    <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                      {selectedMessage.body}
                    </p>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button size="sm">
                        <Reply className="mr-2 h-4 w-4" />
                        Balas
                      </Button>
                      <Button variant="outline" size="sm">
                        <Archive className="mr-2 h-4 w-4" />
                        Arsipkan
                      </Button>
                    </div>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Hapus
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <Mail className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Pilih Pesan</h3>
                  <p className="text-muted-foreground">
                    Pilih pesan dari daftar untuk melihat detail lengkapnya
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default Message;