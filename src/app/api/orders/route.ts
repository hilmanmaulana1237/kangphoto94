import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import fs from 'fs/promises';
import path from 'path';

// Helper: Menentukan apakah kita berjalan di Vercel (dengan Storage KV) atau Lokal
const isVercelKVEnabled = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

const dataFilePath = path.join(process.cwd(), 'orders.json');

// Helper lokal
async function getLocalOrders() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (error) {
    return [];
  }
}

async function saveLocalOrders(orders: any[]) {
  await fs.writeFile(dataFilePath, JSON.stringify(orders, null, 2), 'utf-8');
}


export async function GET() {
  try {
    let orders: any[] = [];

    if (isVercelKVEnabled) {
      // 1. Ambil dari Vercel KV (Redis)
      orders = (await kv.get('orders')) || [];
    } else {
      // 2. Ambil dari Local JSON
      orders = await getLocalOrders();
    }

    // Urutkan dari pesanan terbaru
    orders.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return NextResponse.json(orders);
  } catch (error) {
    console.error("GET Orders Error:", error);
    return NextResponse.json({ error: 'Gagal mengambil data pesanan' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const newOrder = await req.json();
    newOrder.id = Math.random().toString(36).substring(2, 9).toUpperCase(); // ID unik pendek
    
    let orders: any[] = [];

    if (isVercelKVEnabled) {
      // 1. Simpan ke Vercel KV (Redis)
      orders = (await kv.get('orders')) || [];
      orders.push(newOrder);
      await kv.set('orders', orders);
    } else {
      // 2. Simpan ke Local JSON
      orders = await getLocalOrders();
      orders.push(newOrder);
      await saveLocalOrders(orders);
    }
    
    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("POST Orders Error:", error);
    return NextResponse.json({ error: 'Gagal menyimpan pesanan' }, { status: 500 });
  }
}
