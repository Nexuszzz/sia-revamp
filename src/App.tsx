import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

// Import all pages
import Dashboard from "./pages/Dashboard";
import Message from "./pages/Message";
import NotFound from "./pages/NotFound";

// General pages
import Biodata from "./pages/general/Biodata";
import VerifikasiData from "./pages/general/VerifikasiData";
import NisnVaksin from "./pages/general/NisnVaksin";
import KTM from "./pages/general/KTM";
import KTMVirtual from "./pages/general/KTMVirtual";
import RiwayatStatusKelas from "./pages/general/RiwayatStatusKelas";
import BPJSKesehatan from "./pages/general/BPJSKesehatan";

// Akademik pages
import KalenderAkademik from "./pages/akademik/KalenderAkademik";
import KRS from "./pages/akademik/KRS";
import JadwalKuliah from "./pages/akademik/JadwalKuliah";
import Nilai from "./pages/akademik/Nilai";
import NilaiDetail from "./pages/akademik/NilaiDetail";
import SKPI from "./pages/akademik/SKPI";
import Presensi from "./pages/akademik/Presensi";
import Kompetisi from "./pages/akademik/Kompetisi";
import Prestasi from "./pages/akademik/Prestasi";

// UKT pages
import PembayaranUKT from "./pages/ukt/PembayaranUKT";
import KeringanUKT from "./pages/ukt/KeringanUKT";

// Surat & Kuesioner pages
import PermintaanSurat from "./pages/surat-kuesioner/PermintaanSurat";
import RiwayatSurat from "./pages/surat-kuesioner/RiwayatSurat";
import Kuesioner from "./pages/surat-kuesioner/Kuesioner";
import KuisionerAkademik from "./pages/surat-kuesioner/KuisionerAkademik";

// Tingkat Akhir pages
import PKL from "./pages/tingkat-akhir/PKL";
import TugasAkhir from "./pages/tingkat-akhir/TugasAkhir";
import FotoIjazah from "./pages/tingkat-akhir/FotoIjazah";
import KuisionerTingkatAkhir from "./pages/tingkat-akhir/KuisionerTingkatAkhir";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/message" element={<Message />} />

            {/* General Routes */}
            <Route path="/general/biodata" element={<Biodata />} />
            <Route path="/general/verifikasi-data" element={<VerifikasiData />} />
            <Route path="/general/nisn-vaksin" element={<NisnVaksin />} />
            <Route path="/general/ktm" element={<KTM />} />
            <Route path="/general/ktm-virtual" element={<KTMVirtual />} />
            <Route path="/general/riwayat-status-kelas" element={<RiwayatStatusKelas />} />
            <Route path="/general/bpjs-kesehatan" element={<BPJSKesehatan />} />

            {/* Akademik Routes */}
            <Route path="/akademik/kalender" element={<KalenderAkademik />} />
            <Route path="/akademik/krs" element={<KRS />} />
            <Route path="/akademik/jadwal" element={<JadwalKuliah />} />
            <Route path="/akademik/nilai" element={<Nilai />} />
            <Route path="/akademik/nilai/:semester" element={<NilaiDetail />} />
            <Route path="/akademik/skpi" element={<SKPI />} />
            <Route path="/akademik/presensi" element={<Presensi />} />
            <Route path="/akademik/kompetisi" element={<Kompetisi />} />
            <Route path="/akademik/prestasi" element={<Prestasi />} />

            {/* UKT Routes */}
            <Route path="/ukt/pembayaran" element={<PembayaranUKT />} />
            <Route path="/ukt/keringanan" element={<KeringanUKT />} />

            {/* Surat & Kuesioner Routes */}
            <Route path="/surat-kuesioner/permintaan" element={<PermintaanSurat />} />
            <Route path="/surat-kuesioner/riwayat" element={<RiwayatSurat />} />
            <Route path="/surat-kuesioner/kuesioner" element={<Kuesioner />} />
            <Route path="/surat-kuesioner/kuesioner-akademik" element={<KuisionerAkademik />} />

            {/* Tingkat Akhir Routes */}
            <Route path="/tingkat-akhir/pkl" element={<PKL />} />
            <Route path="/tingkat-akhir/tugas-akhir" element={<TugasAkhir />} />
            <Route path="/tingkat-akhir/foto-ijazah" element={<FotoIjazah />} />
            <Route path="/tingkat-akhir/kuesioner" element={<KuisionerTingkatAkhir />} />

            {/* Catch all - must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
