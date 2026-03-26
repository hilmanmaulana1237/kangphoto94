"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconDrone, IconCalendar, IconUser, IconClock, IconMessageCircle, IconRefresh, IconLogout, IconBrandWhatsapp } from "@tabler/icons-react";

interface Order {
  id: string;
  name: string;
  phone: string;
  package: string;
  address: string;
  date: string;
  ktm: string;
  createdAt: string;
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const router = useRouter();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error("Gagal menarik data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  useEffect(() => {
    fetchOrders();
    // Auto-refresh setiap 10 detik (Realtime polling sederhana)
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-brand-black text-white p-6 md:p-12 font-sans selection:bg-brand-tosca/30 selection:text-brand-tosca pt-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Admin */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-tosca/10 border border-brand-tosca/30 text-sm text-brand-tosca mb-4 font-medium backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Admin Dashboard (No SQL)
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight">Data <span className="font-bold text-brand-tosca">Reservasi</span></h1>
            <p className="text-brand-gray mt-2 text-sm md:text-base">Memonitor formulir pemesanan (*Real-time via JSON*) yang belum di-follow up di WA.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-0 items-start md:items-center">
            <button 
              onClick={fetchOrders}
              className="flex items-center gap-2 px-6 py-3 bg-neutral-900 border border-neutral-800 hover:border-brand-tosca hover:bg-neutral-800 rounded-xl transition-all text-sm font-medium disabled:opacity-50 w-full sm:w-auto justify-center"
              disabled={loading}
            >
              <IconRefresh className={`w-4 h-4 text-brand-tosca ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">{loading ? 'Menyinkronkan...' : `Refresh data Pukul ${lastUpdated.toLocaleTimeString('id-ID')}`}</span>
              <span className="md:hidden">Refresh</span>
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 rounded-xl transition-all text-sm font-medium text-red-400 w-full sm:w-auto justify-center"
            >
              <IconLogout className="w-4 h-4" />
              Keluar
            </button>
          </div>
        </div>

        {/* Tabel Data / Cards */}
        {orders.length === 0 && !loading ? (
          <div className="w-full flex-col flex items-center justify-center p-20 bg-neutral-900/40 border border-neutral-800 rounded-3xl backdrop-blur-md">
            <IconDrone className="w-16 h-16 text-brand-gray/30 mb-4" />
            <h3 className="text-xl font-medium text-brand-gray">Belum ada pesanan</h3>
            <p className="text-brand-gray/60 mt-2 text-sm">Pesanan dari website akan otomatis muncul di sini tanpa *reload*.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-black/40 border border-neutral-800 hover:border-brand-tosca/50 p-6 md:p-8 rounded-[2rem] backdrop-blur-xl transition-all group shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-neutral-900 border border-neutral-700 rounded-full flex items-center justify-center group-hover:bg-brand-tosca/20 group-hover:border-brand-tosca transition-colors">
                      <IconUser className="w-6 h-6 text-brand-tosca" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-white">{order.name}</h3>
                      <p className="text-xs text-brand-gray">{new Date(order.createdAt).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-brand-tosca/10 border border-brand-tosca/30 text-brand-tosca text-xs rounded-full font-medium whitespace-nowrap">
                    ID: {order.id.toUpperCase()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800">
                    <div className="text-brand-gray text-xs mb-1 flex items-center gap-1"><IconDrone className="w-3 h-3"/> Paket Sewa</div>
                    <div className="text-white font-medium text-sm">{order.package || '-'}</div>
                  </div>
                  <div className="bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800">
                    <div className="text-brand-gray text-xs mb-1 flex items-center gap-1"><IconCalendar className="w-3 h-3"/> Tanggal</div>
                    <div className="text-white font-medium text-sm">{order.date || 'Belum diisi'}</div>
                  </div>
                  <div className="bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800 flex flex-col justify-center">
                    <div className="text-brand-gray text-xs mb-1 flex items-center gap-1"><IconMessageCircle className="w-3 h-3"/> No HP / WA</div>
                    {order.phone ? (
                      <div className="flex items-center justify-between gap-2 mt-1">
                        <span className="text-white font-medium text-sm truncate">{order.phone}</span>
                        <a 
                          href={`https://wa.me/${order.phone.replace(/\D/g, '').replace(/^0/, '62')}`} 
                          target="_blank" 
                          className="flex items-center justify-center p-1.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg hover:bg-green-500/20 hover:scale-105 transition-all shrink-0"
                          title="Chat via WhatsApp"
                        >
                          <IconBrandWhatsapp className="w-4 h-4" />
                        </a>
                      </div>
                    ) : (
                      <span className="text-white font-medium text-sm">-</span>
                    )}
                  </div>
                  <div className="bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800">
                    <div className="text-brand-gray text-xs mb-1 flex items-center gap-1"><IconUser className="w-3 h-3"/> Kartu KTM</div>
                    <div className="text-white font-medium text-sm">{order.ktm || '-'}</div>
                  </div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl relative">
                  <IconMessageCircle className="absolute top-4 right-4 text-brand-gray/20 w-8 h-8" />
                  <p className="text-xs text-brand-gray mb-2 font-medium">Alamat</p>
                  <p className="text-sm text-neutral-300">
                    {order.address || 'Tidak ada alamat pengiriman.'}
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
