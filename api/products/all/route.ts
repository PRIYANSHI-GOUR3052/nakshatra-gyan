import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    // Fetch regular products
    const [products] = await connection.query('SELECT * FROM products ORDER BY id DESC');
    
    // Fetch stones
    const [stones] = await connection.query('SELECT * FROM stones');
    
    // Transform stones data to match the expected format
    const formattedStones = (stones as any[]).map(stone => ({
      name: stone.name,
      description: stone.benefits,
      pricePerCarat: stone.price_per_carat,
      slug: stone.name_en.toLowerCase().replace(/\s+/g, '-'),
      isStone: true,
      zodiac: stone.zodiac,
      zodiacEn: stone.zodiac_en,
      benefitsEn: stone.benefits_en
    }));
    
    // Transform products data to match the expected format
    const formattedProducts = (products as any[]).map(product => ({
      name: product.name,
      description: product.description,
      price: product.price,
      slug: product.slug,
      isStone: false
    }));
    
    // Combine both datasets
    const allProducts = [...formattedProducts, ...formattedStones];
    
    connection.release();
    
    return NextResponse.json({ products: allProducts });
  } catch (error) {
    console.error('Error fetching all products:', error);
    return NextResponse.json({ error: 'Failed to fetch all products' }, { status: 500 });
  }
}