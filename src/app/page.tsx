"use client";

import { useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { VideoModal } from "@/components/ui/video-modal";
import {
  IconHome, IconInfoCircle, IconMessage, IconCamera, IconVideo, IconMap,
  IconWallet, IconBulb, IconShieldCheck, IconFocus2, IconRocket, IconUsers, IconCoin, IconDrone
} from "@tabler/icons-react";
import Image from "next/image";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    drone: "DJI Mini 3",
    date: "",
    duration: "1 Hari",
    withPilot: "Ya",
    message: ""
  });

  const WA_NUMBER = "6281312602025";

  const navItems = [
    { name: "Beranda", link: "/", icon: <IconHome className="h-4 w-4" /> },
    { name: "Tentang", link: "#tentang", icon: <IconInfoCircle className="h-4 w-4" /> },
    { name: "Layanan", link: "#layanan", icon: <IconCamera className="h-4 w-4" /> },
    { name: "Armada", link: "#armada", icon: <IconRocket className="h-4 w-4" /> },
    { name: "Pesan", link: "#pesan", icon: <IconMessage className="h-4 w-4" /> },
  ];

  // Single drone presentation

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Simpan data ke API lokal (JSON file tanpa database SQL)
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          createdAt: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
    }

    // 2. Format Teks untuk WhatsApp
    const text = `Halo *kangaerial/kangphoto94*, saya ingin menyewa armada dengan detail berikut:
%0A
%0A*Nama:* ${formData.name}
%0A*Armada:* ${formData.drone}
%0A*Tanggal:* ${formData.date}
%0A*Durasi:* ${formData.duration}
%0A*Dengan Pilot:* ${formData.withPilot}
%0A*Pesan Tambahan:* ${formData.message}
%0A
%0AMohon konfirmasi ketersediaan dan biayanya. Terima kasih!`;
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${text}`;
    
    // 3. Arahkan pengguna ke WhatsApp
    window.open(waUrl, "_blank");
  };

  return (
    <main className="bg-neutral-50 dark:bg-brand-black min-h-screen selection:bg-brand-tosca/30 selection:text-brand-tosca font-sans text-neutral-600 dark:text-brand-gray overflow-x-hidden">
      <FloatingNav navItems={navItems} />

      {/* HERO SECTION - AURORA OVERLAYED ON MOUNTAIN DRONE PIC */}
      <section className="relative overflow-hidden w-full h-auto min-h-[90vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
            fill
            className="object-cover grayscale-[30%]"
            alt="Hero Background"
            priority
          />
          <div className="absolute inset-0 bg-white/60 dark:bg-brand-black/70"></div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-50 dark:from-brand-black to-transparent"></div>
        </div>

        {/* We use AuroraBackground as a wrapper to bring its animation without blocking our img */}
        {/* Adjusted Aurora colors via globals.css or keep it neutral to act as lighting */}
        <AuroraBackground className="bg-transparent absolute inset-0 z-0 h-full w-full opacity-40 mix-blend-screen pointer-events-none">
          <div />
        </AuroraBackground>

        <div className="z-10 flex flex-col items-center justify-center px-4 md:px-6 max-w-5xl mx-auto text-center gap-6 relative mt-10 md:mt-0">
          <div className="px-5 py-2 rounded-full border border-brand-tosca/30 text-brand-tosca shadow-[0_0_20px_rgba(21,154,156,0.2)] text-xs md:text-sm tracking-[0.2em] uppercase font-medium bg-neutral-50 dark:bg-brand-black/80 backdrop-blur-md">
            Sewa Drone Premium <span className="text-neutral-900 dark:text-white">kangphoto94</span>
          </div>

          <TextGenerateEffect
            words="Elevate Your Vision, Capture The Impossible."
            className="text-4xl md:text-6xl lg:text-7xl font-light text-neutral-900 dark:text-white tracking-tight leading-tight z-10"
          />

          <p className="text-neutral-600 dark:text-brand-gray text-base md:text-xl max-w-2xl mt-4 max-md:mt-2 font-light leading-relaxed px-4">
            Jasa Sewa Drone Profesional untuk Foto Udara & Video Udara. Persenjatai project Anda dengan armada mutakhir yang dikendalikan oleh pilot bersertifikat.
          </p>

          <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-4 mt-8 md:mt-12 px-4 relative z-20">
            <a href="#armada" className="px-8 py-4 rounded-full bg-brand-tosca text-white font-semibold hover:bg-brand-darkTosca hover:scale-[1.02] shadow-[0_0_40px_rgba(21,154,156,0.4)] transition-all text-sm md:text-base text-center">
              Eksplorasi Armada
            </a>
            <a href="#pesan" className="px-8 py-4 rounded-full border border-brand-gray/50 text-neutral-900 dark:text-white font-medium hover:bg-brand-tosca/10 hover:border-brand-tosca hover:text-brand-tosca transition-colors text-sm md:text-base text-center backdrop-blur-sm bg-white dark:bg-black/40">
              Booking Sekarang
            </a>
          </div>
        </div>
      </section>

      {/* TENTANG KAMI: AERIAL CITY DARK BACKGROUND */}
      <section id="tentang" className="py-24 md:py-32 px-4 w-full relative">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1517424683070-580a15865a7f?q=80&w=2000&auto=format&fit=crop"
            fill
            className="object-cover grayscale"
            alt="Aerial City Background"
          />
          <div className="absolute inset-0 bg-white/85 dark:bg-brand-black/90"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#159A9C_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05]"></div>
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-neutral-50 dark:from-brand-black to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-50 dark:from-brand-black to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-tosca/10 border border-brand-tosca/30 text-sm text-brand-tosca mb-6 backdrop-blur-sm">
              <IconDrone className="w-4 h-4" /> Insight Perusahaan
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-neutral-900 dark:text-white tracking-tight">4 Alasan Sewa Drone?</h2>
            <p className="text-neutral-600 dark:text-brand-gray mt-6 max-w-3xl mx-auto text-sm md:text-lg leading-relaxed">
              Memiliki drone sendiri memerlukan biaya akuisisi ratusan juta dan lisensi ketat tingkat nasional. Menyewa adalah kunci efisiensi Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16 px-4 md:px-0 max-w-5xl mx-auto">
            <div className="flex gap-6 group">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-white/80 dark:bg-neutral-900/60 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700/50 flex items-center justify-center group-hover:scale-110 group-hover:border-brand-tosca group-hover:shadow-[0_0_20px_rgba(21,154,156,0.3)] transition-all">
                  <IconWallet className="w-7 h-7 text-brand-tosca group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-medium text-neutral-900 dark:text-white mb-3">Lebih Ekonomis</h3>
                <p className="text-neutral-600 dark:text-brand-gray text-sm md:text-base leading-relaxed">Bebas dari beban depresiasi aset ratusan juta, pemeliharaan teknis berkala, hingga asuransi armada. Cukup alokasikan anggaran syuting Anda secara efisien dengan transparansi absolut.</p>
              </div>
            </div>

            <div className="flex gap-6 group">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-white/80 dark:bg-neutral-900/60 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700/50 flex items-center justify-center group-hover:scale-110 group-hover:border-brand-tosca group-hover:shadow-[0_0_20px_rgba(21,154,156,0.3)] transition-all">
                  <IconBulb className="w-7 h-7 text-brand-tosca group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-medium text-neutral-900 dark:text-white mb-3">Jaminan Hasil Terbaik</h3>
                <p className="text-neutral-600 dark:text-brand-gray text-sm md:text-base leading-relaxed">Dieksekusi secara presisi oleh tangan ahlinya. Harmonisasi dinamis antara manuver ruang dan pergerakan kamera menghasilkan mahakarya visual sinematik berkelas dunia.</p>
              </div>
            </div>

            <div className="flex gap-6 group">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-white/80 dark:bg-neutral-900/60 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700/50 flex items-center justify-center group-hover:scale-110 group-hover:border-brand-tosca group-hover:shadow-[0_0_20px_rgba(21,154,156,0.3)] transition-all">
                  <IconShieldCheck className="w-7 h-7 text-brand-tosca group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-medium text-neutral-900 dark:text-white mb-3">Beban Risiko Nol</h3>
                <p className="text-neutral-600 dark:text-brand-gray text-sm md:text-base leading-relaxed">Eksklusi total terhadap risiko teknis di lokasi syuting. Seluruh jaminan operasional ditangani sepenuhnya oleh operator kami, memastikan keamanan dan tenggat waktu proyek Anda tak terganggu.</p>
              </div>
            </div>

            <div className="flex gap-6 group">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-white/80 dark:bg-neutral-900/60 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700/50 flex items-center justify-center group-hover:scale-110 group-hover:border-brand-tosca group-hover:shadow-[0_0_20px_rgba(21,154,156,0.3)] transition-all">
                  <IconFocus2 className="w-7 h-7 text-brand-tosca group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-medium text-neutral-900 dark:text-white mb-3">Fokus Berkarya</h3>
                <p className="text-neutral-600 dark:text-brand-gray text-sm md:text-base leading-relaxed">Serahkan urusan birokrasi perizinan terbang, kalibrasi sensor kompleks, hingga mitigasi kondisi alat kepada kami. Berikan ruang tak terbatas bagi sutradara untuk sepenuhnya fokus pada visi kreatif.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - DRONE OPERATOR BACKGROUND */}
      <section className="py-24 px-4 w-full relative">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1473968512647-3ce1eb7ae0ea?q=80&w=2000&auto=format&fit=crop"
            fill
            className="object-cover grayscale"
            alt="Drone Operator Background"
          />
          <div className="absolute inset-0 bg-white/85 dark:bg-brand-black/90"></div>
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-neutral-50 dark:from-brand-black to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-50 dark:from-brand-black to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10 py-10">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-light text-neutral-900 dark:text-white tracking-tight mb-8">
              Kenapa Memilih Jasa <span className="font-bold text-brand-tosca">kangphoto94</span>?
            </h2>
            <p className="text-neutral-600 dark:text-brand-gray mb-12 text-sm md:text-lg leading-relaxed max-w-xl">
              Terdapat ratusan vendor di Indonesia, namun hanya sedikit yang menjanjikan reliabilitas & sentuhan magis di lokasi syuting. Inilah diferensiasi fundamental kami.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-black/60 border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl backdrop-blur-xl hover:bg-brand-tosca/5 hover:border-brand-tosca/50 hover:-translate-y-1 transition-all group">
                <IconRocket className="w-8 h-8 text-brand-tosca mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-lg text-neutral-900 dark:text-white mb-2">Armada Mutakhir</h4>
                <p className="text-neutral-600 dark:text-brand-gray text-sm">Pembaruan ekosistem DJI Cinema dengan kualitas hingga 8K ProRes Raw secara rutin.</p>
              </div>
              <div className="bg-white dark:bg-black/60 border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl backdrop-blur-xl hover:bg-brand-tosca/5 hover:border-brand-tosca/50 hover:-translate-y-1 transition-all group">
                <IconCamera className="w-8 h-8 text-brand-tosca mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-lg text-neutral-900 dark:text-white mb-2">Operator Ahli</h4>
                <p className="text-neutral-600 dark:text-brand-gray text-sm">Pilot berlisensi, dididik langsung untuk pengambilan gambar berstandar Aerial Cinematography global.</p>
              </div>
              <div className="bg-white dark:bg-black/60 border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl backdrop-blur-xl hover:bg-brand-tosca/5 hover:border-brand-tosca/50 hover:-translate-y-1 transition-all group">
                <IconUsers className="w-8 h-8 text-brand-tosca mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-lg text-neutral-900 dark:text-white mb-2">Kepercayaan Klien</h4>
                <p className="text-neutral-600 dark:text-brand-gray text-sm">Portfolio luas dari ratusan klien B2B, brand nasional maupun event berskala internasional.</p>
              </div>
              <div className="bg-white dark:bg-black/60 border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl backdrop-blur-xl hover:bg-brand-tosca/5 hover:border-brand-tosca/50 hover:-translate-y-1 transition-all group">
                <IconCoin className="w-8 h-8 text-brand-tosca mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-lg text-neutral-900 dark:text-white mb-2">Efisiensi Biaya</h4>
                <p className="text-neutral-600 dark:text-brand-gray text-sm">Manajemen teknis gesit di lapangan tanpa delay operasional, memotong jam syuting berlebih.</p>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full lg:w-auto relative hidden md:block">
            {/* Switched to brand-tosca glow */}
            <div className="absolute inset-0 bg-brand-tosca/10 blur-3xl rounded-full"></div>
            <div className="border border-brand-tosca/20 bg-neutral-900/40 backdrop-blur-md p-4 rounded-3xl relative shadow-[0_0_50px_rgba(21,154,156,0.15)] transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image
                src="https://images.unsplash.com/photo-1508444845599-5c89863b1c44?q=80&w=1169&auto=format&fit=crop"
                width={600}
                height={800}
                alt="kangphoto94 cinematic shot"
                className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES: AERIAL LANDSCAPE ABSTRACT BACKGROUND */}
      <section id="layanan" className="py-24 md:py-32 px-4 w-full relative">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1504681869696-d977211a5f4c?q=80&w=2000&auto=format&fit=crop"
            fill
            className="object-cover grayscale"
            alt="Abstract drone view"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(21,154,156,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(21,154,156,0.03)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
          <div className="absolute inset-0 bg-white/85 dark:bg-brand-black/90"></div>
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-neutral-50 dark:from-brand-black to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-50 dark:from-brand-black to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-light text-neutral-900 dark:text-white tracking-tight mb-4">Layanan Premium</h2>
            <div className="w-20 h-1 bg-brand-tosca mb-6"></div>
            <p className="text-neutral-600 dark:text-brand-gray max-w-2xl text-sm md:text-lg">Ruang lingkup operasional yang disesuaikan dengan spektrum industri kreatif yang menuntut presisi tanpa kompromi.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 px-4 md:px-0">
            <div className="flex flex-col bg-white dark:bg-black/40 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-[2rem] p-8 hover:-translate-y-2 hover:bg-brand-tosca/5 hover:border-brand-tosca/30 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-tosca/10 blur-3xl rounded-full group-hover:bg-brand-tosca/20 transition-colors"></div>
              <div className="p-4 bg-neutral-50 dark:bg-brand-black rounded-2xl mb-8 w-fit border border-neutral-300 dark:border-neutral-700 group-hover:border-brand-tosca/50 transition-colors">
                <IconVideo className="w-8 h-8 text-brand-tosca group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-medium text-neutral-900 dark:text-white mb-4">Layar Lebar & TVC</h3>
              <p className="text-neutral-600 dark:text-brand-gray text-sm md:text-base leading-relaxed mt-auto">
                Implementasi sensor full-frame untuk Dynamic Range luas. Penstabilan 3 sumbu mekanik hilangkan mikrojitter pada manuver ekstrem.
              </p>
            </div>

            <div className="flex flex-col bg-white dark:bg-black/40 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-[2rem] p-8 hover:-translate-y-2 hover:bg-brand-tosca/5 hover:border-brand-tosca/30 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-tosca/10 blur-3xl rounded-full group-hover:bg-brand-tosca/20 transition-colors"></div>
              <div className="p-4 bg-neutral-50 dark:bg-brand-black rounded-2xl mb-8 w-fit border border-neutral-300 dark:border-neutral-700 group-hover:border-brand-tosca/50 transition-colors">
                <IconCamera className="w-8 h-8 text-brand-tosca group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-medium text-neutral-900 dark:text-white mb-4">Event & Festival VIP</h3>
              <p className="text-neutral-600 dark:text-brand-gray text-sm md:text-base leading-relaxed mt-auto">
                Meliput dari sudut epik pada konser atau *wedding* eksklusif tanpa merusak polusi suara berkat baling-baling aerodinamis rendah-bising.
              </p>
            </div>

            <div className="flex flex-col bg-white dark:bg-black/40 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-[2rem] p-8 hover:-translate-y-2 hover:bg-brand-tosca/5 hover:border-brand-tosca/30 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-tosca/10 blur-3xl rounded-full group-hover:bg-brand-tosca/20 transition-colors"></div>
              <div className="p-4 bg-neutral-50 dark:bg-brand-black rounded-2xl mb-8 w-fit border border-neutral-300 dark:border-neutral-700 group-hover:border-brand-tosca/50 transition-colors">
                <IconMap className="w-8 h-8 text-brand-tosca group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-medium text-neutral-900 dark:text-white mb-4">Inspeksi & Pemetaan</h3>
              <p className="text-neutral-600 dark:text-brand-gray text-sm md:text-base leading-relaxed mt-auto">
                Otomatisasi pemetaan dengan akurasi RTK sentimeter. Mampu menganalisa area operasional konstruksi, agrikultur, hingga pertambangan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FLEET SECTION: HANGAR/STUDIO BACKGROUND */}
      <section id="armada" className="py-24 md:py-32 px-4 w-full relative">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1579820010410-c10411aaaa88?q=80&w=2000&auto=format&fit=crop"
            fill
            className="object-cover grayscale"
            alt="Drone Studio Background"
          />
          <div className="absolute inset-0 bg-white/85 dark:bg-brand-black/90"></div>
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-neutral-50 dark:from-brand-black to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-50 dark:from-brand-black to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto z-10">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-light text-neutral-900 dark:text-white tracking-tight">Eksplorasi Armada</h2>
            <p className="text-neutral-600 dark:text-brand-gray mt-4 max-w-xl mx-auto text-sm md:text-lg">Jajaran senjata pamungkas visualisasi angkasa untuk merealisasikan direksi imajinasi Anda.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-brand-tosca/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="w-full lg:w-1/2 z-10">
              <CardContainer className="inter-var w-full">
                <CardBody className="bg-neutral-50 dark:bg-brand-black/60 relative group/card border-neutral-200 dark:border-neutral-800 w-full rounded-3xl p-4 sm:p-6 border backdrop-blur-xl hover:border-brand-tosca/50 hover:shadow-[0_0_40px_rgba(21,154,156,0.15)] transition-all">
                  <CardItem translateZ="100" className="w-full">
                    <div className="relative h-64 sm:h-80 md:h-[450px] w-full rounded-2xl overflow-hidden grayscale-[50%] group-hover/card:grayscale-0 transition-all duration-700 border border-neutral-200 dark:border-neutral-800 group-hover/card:border-brand-tosca/30">
                      <Image
                        src="/djimini3.jpg"
                        fill
                        className="object-cover scale-100 group-hover/card:scale-110 transition-transform duration-700 hover:object-center"
                        alt="DJI Mini 3"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-6 left-6">
                        <div className="px-3 py-1 mb-3 rounded-full bg-brand-tosca/20 border border-brand-tosca text-brand-tosca text-xs font-semibold backdrop-blur-md w-fit inline-block">
                          ARMADA UTAMA
                        </div>
                        <h3 className="text-3xl font-bold text-white drop-shadow-lg">DJI Mini 3</h3>
                      </div>
                    </div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>

            <div className="w-full lg:w-1/2 z-10 flex flex-col gap-6 md:gap-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white mb-4">Ringkas, Senyap, Mematikan.</h3>
                <p className="text-neutral-600 dark:text-brand-gray text-base md:text-lg leading-relaxed">
                  Dirancang khusus untuk manuver lincah dan regulasi ketat. DJI Mini 3 membawa sensor revolusioner bertenaga tinggi dalam bentuk aerodinamis super ringan. Ideal untuk dokumentasi kota padat maupun alam bebas.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-black/50 border border-neutral-200 dark:border-neutral-800 p-4 rounded-2xl backdrop-blur-md">
                  <span className="block text-brand-tosca font-bold text-xl md:text-2xl mb-1">4K HDR</span>
                  <span className="text-neutral-600 dark:text-brand-gray text-xs md:text-sm">Resolusi Maksimal</span>
                </div>
                <div className="bg-white dark:bg-black/50 border border-neutral-200 dark:border-neutral-800 p-4 rounded-2xl backdrop-blur-md">
                  <span className="block text-brand-tosca font-bold text-xl md:text-2xl mb-1">38 Menit</span>
                  <span className="text-neutral-600 dark:text-brand-gray text-xs md:text-sm">Durasi Terbang</span>
                </div>
                <div className="bg-white dark:bg-black/50 border border-neutral-200 dark:border-neutral-800 p-4 rounded-2xl backdrop-blur-md">
                  <span className="block text-brand-tosca font-bold text-xl md:text-2xl mb-1">&lt;249g</span>
                  <span className="text-neutral-600 dark:text-brand-gray text-xs md:text-sm">Bebas Regulasi Berat</span>
                </div>
                <div className="bg-white dark:bg-black/50 border border-neutral-200 dark:border-neutral-800 p-4 rounded-2xl backdrop-blur-md">
                  <span className="block text-brand-tosca font-bold text-xl md:text-2xl mb-1">Vertical</span>
                  <span className="text-neutral-600 dark:text-brand-gray text-xs md:text-sm">Format TikTok/Reels</span>
                </div>
              </div>

              <div className="bg-neutral-50 dark:bg-brand-black/40 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 md:p-6">
                <h4 className="text-neutral-900 dark:text-white font-medium mb-4 flex items-center gap-2">
                  <IconShieldCheck className="w-5 h-5 text-brand-tosca" /> Keunggulan Utama
                </h4>
                <ul className="space-y-3 text-neutral-600 dark:text-brand-gray text-sm md:text-base">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-tosca mt-2 shrink-0"></div>
                    <span> Sensor 1/1.3-inch CMOS untuk performa Low-Light luar biasa</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-tosca mt-2 shrink-0"></div>
                    <span> Gimbal bisa berotasi 90° untuk konten vertikal tanpa cropping</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-tosca mt-2 shrink-0"></div>
                    <span> Tingkat kebisingan (noise) sangat rendah, tidak merusak audio syuting</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-4 mt-2">
                <div className="text-2xl md:text-4xl font-bold text-brand-tosca tracking-tight">Rp 1.000.000</div>
                <div className="text-neutral-600 dark:text-brand-gray text-sm md:text-base font-medium">/ Hari <br /><span className="text-neutral-500 font-light">(Termasuk Pilot & Baterai)</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO / VIDEO SHOWCASE SECTION */}
      <section id="portfolio" className="py-24 md:py-32 px-4 w-full relative">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1541625902195-263a2a9e578c?q=80&w=2000&auto=format&fit=crop"
            fill
            className="object-cover grayscale"
            alt="Landscape cinematography"
          />
          <div className="absolute inset-0 bg-white/90 dark:bg-brand-black/90"></div>
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-neutral-50 dark:from-brand-black to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-50 dark:from-brand-black to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto z-10">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-light text-neutral-900 dark:text-white tracking-tight mb-4">Mahakarya Visual</h2>
            <div className="w-20 h-1 bg-brand-tosca mx-auto mb-6"></div>
            <p className="text-neutral-600 dark:text-brand-gray max-w-2xl mx-auto text-sm md:text-lg">Cuplikan dokumentasi udara eksklusif yang direkam oleh pilot tersertifikasi <strong>kangphoto94</strong>.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <VideoModal
              title="Cinematic View"
              videoSrc="/video/CinematicView.mp4"
            />
            <VideoModal
              title="Gunung Galunggung"
              videoSrc="/video/GunungGalunggung.mp4"
            />
            <VideoModal
              title="Sky Lantern Festival"
              videoSrc="/video/SkyLantern.mp4"
            />
          </div>
        </div>
      </section>


      {/* ORDER SECTION: SUNSET/AERIAL BACKGROUND */}
      <section id="pesan" className="py-24 md:py-32 px-4 w-full relative">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1527409335558-45e0c5113dc5?q=80&w=2000&auto=format&fit=crop"
            fill
            className="object-cover grayscale"
            alt="Order section background"
          />
          <div className="absolute inset-0 bg-white/85 dark:bg-brand-black/85"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(21,154,156,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(21,154,156,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] z-10"></div>
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-neutral-50 dark:from-brand-black to-transparent z-10"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-light text-neutral-900 dark:text-white tracking-tight">Kunci Jadwal Anda</h2>
            <p className="text-neutral-600 dark:text-brand-gray mt-4 max-w-xl mx-auto text-sm md:text-lg">Silakan selesaikan form di bawah. Tim <span className="text-brand-tosca font-bold">kangphoto94</span> akan terhubung via WhatsApp secara interaktif.</p>
          </div>

          <div className="relative bg-white/90 dark:bg-neutral-950/70 backdrop-blur-2xl border border-neutral-200 dark:border-neutral-800 p-6 md:p-12 rounded-[2.5rem] shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-brand-tosca to-transparent"></div>

            <form onSubmit={handleOrder} className="flex flex-col gap-6 md:gap-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-neutral-600 dark:text-brand-gray ml-1">Nama / Instansi</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-neutral-50 dark:bg-brand-black/80 border border-neutral-200 dark:border-neutral-800 rounded-2xl px-5 py-4 text-neutral-900 dark:text-white placeholder-brand-gray/50 focus:outline-none focus:border-brand-tosca transition-all font-light"
                    placeholder="Budi Santoso / PT. Media"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-neutral-600 dark:text-brand-gray ml-1">Pilihan Armada</label>
                  <select
                    value={formData.drone}
                    onChange={(e) => setFormData({ ...formData, drone: e.target.value })}
                    className="bg-neutral-50 dark:bg-brand-black/80 border border-neutral-200 dark:border-neutral-800 rounded-2xl px-5 py-4 text-neutral-900 dark:text-white focus:outline-none focus:border-brand-tosca transition-all appearance-none font-light"
                  >
                    <option value="DJI Mini 3">DJI Mini 3</option>
                    <option value="Konsultasi Dulu">Belum Yakin (Konsultasi via WA)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-neutral-600 dark:text-brand-gray ml-1">Tanggal</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="bg-neutral-50 dark:bg-brand-black/80 border border-neutral-200 dark:border-neutral-800 rounded-2xl px-5 py-4 text-neutral-900 dark:text-white focus:outline-none focus:border-brand-tosca transition-all font-light"
                    
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-neutral-600 dark:text-brand-gray ml-1">Durasi Sewa</label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="bg-neutral-50 dark:bg-brand-black/80 border border-neutral-200 dark:border-neutral-800 rounded-2xl px-5 py-4 text-neutral-900 dark:text-white focus:outline-none focus:border-brand-tosca transition-all appearance-none font-light"
                  >
                    <option value="TBD / Konsultasi Dulu">Konsultasi Dulu</option>
                    <option value="Setengah Hari (6 Jam)">Setengah Hari (6 Jam)</option>
                    <option value="1 Hari (12 Jam)">1 Hari (12 Jam)</option>
                    <option value="Eksklusif / Multi-day">Multi-day (&gt;1 Hari)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-neutral-600 dark:text-brand-gray ml-1">Opsi Pelayanan Pilot</label>
                <div className="flex flex-col md:flex-row gap-4">
                  <label className="flex items-center gap-3 cursor-pointer bg-neutral-50 dark:bg-brand-black/80 border border-neutral-200 dark:border-neutral-800 px-6 py-4 rounded-2xl w-full md:w-1/2 hover:border-brand-tosca/50 transition-colors">
                    <input type="radio" checked={formData.withPilot === "Ya"} onChange={() => setFormData({ ...formData, withPilot: "Ya" })} name="pilot" className="accent-brand-tosca w-4 h-4" />
                    <span className="text-neutral-700 dark:text-neutral-200 text-sm font-light">Plus Pilot Berlisensi (Disarankan)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer bg-neutral-50 dark:bg-brand-black/80 border border-neutral-200 dark:border-neutral-800 px-6 py-4 rounded-2xl w-full md:w-1/2 hover:border-brand-tosca/50 transition-colors">
                    <input type="radio" checked={formData.withPilot === "Tidak (Lepas Kunci)"} onChange={() => setFormData({ ...formData, withPilot: "Tidak (Lepas Kunci)" })} name="pilot" className="accent-brand-tosca w-4 h-4" />
                    <span className="text-neutral-700 dark:text-neutral-200 text-sm font-light">Drone Saja (Lepas Kunci)</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-neutral-600 dark:text-brand-gray ml-1">Deskripsi & Lokasi Produksi</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-neutral-50 dark:bg-brand-black/80 border border-neutral-200 dark:border-neutral-800 rounded-2xl px-5 py-5 text-neutral-900 dark:text-white placeholder-brand-gray/50 focus:outline-none focus:border-brand-tosca transition-all resize-none font-light"
                  placeholder="Ceritakan singkat visi Anda, lokasi, dan kebutuhan spesifik. Cth: Syuting dokumenter di Jakarta..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="mt-6 w-full py-5 rounded-2xl bg-brand-tosca text-white font-semibold text-base hover:bg-brand-darkTosca hover:scale-[1.01] transition-all flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(21,154,156,0.3)]"
              >
                <IconMessage className="w-5 h-5" />
                Diskusikan via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-brand-tosca/20 bg-neutral-50 dark:bg-brand-black pt-16 pb-8 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4 mb-12">
          <div className="flex flex-col gap-2">
            <div className="text-2xl md:text-3xl font-light tracking-widest text-brand-tosca">
              kangphoto<span className="font-bold text-neutral-600 dark:text-brand-gray">94</span>
            </div>
            <p className="text-neutral-600 dark:text-brand-gray text-xs md:text-sm tracking-wide uppercase">Premium Aerial Cinematography</p>
          </div>
          <div className="flex gap-8 text-sm font-medium text-neutral-600 dark:text-brand-gray">
            <a href="#layanan" className="hover:text-brand-tosca transition-colors">Layanan</a>
            <a href="#armada" className="hover:text-brand-tosca transition-colors">Armada</a>
            <a href="#pesan" className="hover:text-brand-tosca transition-colors">Reservasi</a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 border-t border-brand-gray/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-neutral-600 dark:text-brand-gray/70 text-xs md:text-sm text-center md:text-left">
            © {new Date().getFullYear()} DyraStudio. Hak Cipta Dilindungi.
          </div>
          <div className="text-brand-tosca text-xs text-center md:text-right uppercase tracking-[0.2em] font-medium">
            Perspektif Kelas Dunia.
          </div>
        </div>
      </footer>
    </main>
  );
}
