import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Download, Receipt, CreditCard, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PembayaranUKT = () => {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const paymentData = [
    {
      id: 1,
      tahunAkademik: '2024/2025 Ganjil',
      semester: 5,
      tagihan: 2400000,
      terbayar: 2400000,
      keringanan: 0,
      kewajiban: 2400000,
      status: 'LUNAS',
      tanggalBayar: '2024-08-15',
      metodeBayar: 'Virtual Account BNI',
      nomorRef: 'VA2024081512345'
    },
    {
      id: 2,
      tahunAkademik: '2023/2024 Genap',
      semester: 4,
      tagihan: 2400000,
      terbayar: 2400000,
      keringanan: 0,
      kewajiban: 2400000,
      status: 'LUNAS',
      tanggalBayar: '2024-01-20',
      metodeBayar: 'Transfer Bank',
      nomorRef: 'TF2024012045678'
    },
    {
      id: 3,
      tahunAkademik: '2023/2024 Ganjil',
      semester: 3,
      tagihan: 2400000,
      terbayar: 1200000,
      keringanan: 600000,
      kewajiban: 1800000,
      status: 'BELUM LUNAS',
      tanggalBayar: null,
      metodeBayar: null,
      nomorRef: null
    }
  ];

  const currentBill = paymentData.find(p => p.status === 'BELUM LUNAS');
  
  const totalPaid = paymentData.reduce((sum, payment) => sum + payment.terbayar, 0);
  const totalBill = paymentData.reduce((sum, payment) => sum + payment.kewajiban, 0);
  const totalDiscount = paymentData.reduce((sum, payment) => sum + payment.keringanan, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'LUNAS':
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />LUNAS</Badge>;
      case 'BELUM LUNAS':
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />BELUM LUNAS</Badge>;
      case 'PENDING':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />PENDING</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
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
            <DollarSign className="h-8 w-8" />
            Pembayaran UKT
          </h1>
          <p className="text-muted-foreground">Informasi dan riwayat pembayaran UKT</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Unduh Laporan
          </Button>
          <Button variant="outline" size="sm">
            <Receipt className="h-4 w-4 mr-2" />
            Kwitansi
          </Button>
        </div>
      </div>

      {/* Current Bill Alert */}
      {currentBill && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span>
                Anda memiliki tagihan UKT yang belum lunas untuk semester {currentBill.semester} 
                sebesar <strong>{formatCurrency(currentBill.kewajiban - currentBill.terbayar)}</strong>
              </span>
              <Button size="sm" className="w-fit">
                <CreditCard className="h-4 w-4 mr-2" />
                Bayar Sekarang
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-lg font-bold text-primary">{formatCurrency(totalPaid)}</div>
            <p className="text-sm text-muted-foreground">Total Terbayar</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-lg font-bold text-primary">{formatCurrency(totalBill - totalPaid)}</div>
            <p className="text-sm text-muted-foreground">Sisa Tagihan</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-lg font-bold text-primary">{formatCurrency(totalDiscount)}</div>
            <p className="text-sm text-muted-foreground">Total Keringanan</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-lg font-bold text-primary">
              {paymentData.filter(p => p.status === 'LUNAS').length}
            </div>
            <p className="text-sm text-muted-foreground">Semester Lunas</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Tabs */}
      <Tabs defaultValue="history" className="space-y-4">
        <TabsList>
          <TabsTrigger value="history">Riwayat Pembayaran</TabsTrigger>
          <TabsTrigger value="payment">Bayar UKT</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Pembayaran UKT</CardTitle>
              <CardDescription>Daftar pembayaran UKT seluruh semester</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">No</th>
                      <th className="text-left p-3">Tahun Akademik</th>
                      <th className="text-left p-3">Keterangan</th>
                      <th className="text-left p-3">Tagihan</th>
                      <th className="text-left p-3">Terbayar</th>
                      <th className="text-left p-3">Keringanan</th>
                      <th className="text-left p-3">Kewajiban</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentData.map((payment, index) => (
                      <motion.tr
                        key={payment.id}
                        className="border-b hover:bg-muted/50"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3">{payment.tahunAkademik}</td>
                        <td className="p-3">UKT Semester {payment.semester}</td>
                        <td className="p-3">{formatCurrency(payment.tagihan)}</td>
                        <td className="p-3">{formatCurrency(payment.terbayar)}</td>
                        <td className="p-3">{formatCurrency(payment.keringanan)}</td>
                        <td className="p-3 font-semibold">{formatCurrency(payment.kewajiban)}</td>
                        <td className="p-3">{getStatusBadge(payment.status)}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            {payment.status === 'LUNAS' ? (
                              <Button variant="outline" size="sm">
                                <Receipt className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button size="sm">
                                <CreditCard className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Detail Tagihan</CardTitle>
                <CardDescription>Informasi tagihan UKT semester aktif</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentBill ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Semester:</span>
                        <span className="font-semibold">{currentBill.semester} ({currentBill.tahunAkademik})</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tagihan Pokok:</span>
                        <span className="font-semibold">{formatCurrency(currentBill.tagihan)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Keringanan:</span>
                        <span className="font-semibold text-green-600">
                          -{formatCurrency(currentBill.keringanan)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sudah Dibayar:</span>
                        <span className="font-semibold">{formatCurrency(currentBill.terbayar)}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold">Sisa Tagihan:</span>
                        <span className="font-bold text-primary">
                          {formatCurrency(currentBill.kewajiban - currentBill.terbayar)}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <p className="text-lg font-semibold">Tidak ada tagihan aktif</p>
                    <p className="text-muted-foreground">Semua UKT telah lunas</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Metode Pembayaran</CardTitle>
                <CardDescription>Pilih metode pembayaran yang diinginkan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button className="w-full justify-start h-auto p-4" variant="outline">
                    <div className="text-left">
                      <div className="font-semibold">Virtual Account BNI</div>
                      <div className="text-sm text-muted-foreground">
                        Transfer melalui VA BNI dengan kode unik
                      </div>
                    </div>
                  </Button>
                  <Button className="w-full justify-start h-auto p-4" variant="outline">
                    <div className="text-left">
                      <div className="font-semibold">QRIS</div>
                      <div className="text-sm text-muted-foreground">
                        Bayar dengan scan QR Code
                      </div>
                    </div>
                  </Button>
                  <Button className="w-full justify-start h-auto p-4" variant="outline">
                    <div className="text-left">
                      <div className="font-semibold">Internet Banking</div>
                      <div className="text-sm text-muted-foreground">
                        Transfer langsung dari akun bank
                      </div>
                    </div>
                  </Button>
                  <Button className="w-full justify-start h-auto p-4" variant="outline">
                    <div className="text-left">
                      <div className="font-semibold">LinkAja</div>
                      <div className="text-sm text-muted-foreground">
                        Pembayaran digital LinkAja
                      </div>
                    </div>
                  </Button>
                </div>
                
                {currentBill && (
                  <Button className="w-full" size="lg">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Bayar {formatCurrency(currentBill.kewajiban - currentBill.terbayar)}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default PembayaranUKT;