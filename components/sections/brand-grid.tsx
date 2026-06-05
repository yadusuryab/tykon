'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import { Brand } from '@/components/types/brand';

interface BrandsGridProps {
  title?: string;
  subtitle?: string;
  showFeaturedOnly?: boolean;
  limit?: number;
}

export default function BrandsGrid({
  title = 'BRANDS',
  subtitle = 'Explore our shoes',
  showFeaturedOnly = false,
  limit,
}: BrandsGridProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch('/api/brands');
        if (!res.ok) throw new Error('Failed to fetch brands');
        const data: Brand[] = await res.json();
        let filtered = showFeaturedOnly ? data.filter((b) => b.featured) : data;
        if (limit) filtered = filtered.slice(0, limit);
        setBrands(filtered);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, [showFeaturedOnly, limit]);

  if (error) {
    return (
      <section className="w-full py-4 px-4">
        <p className="text-center text-sm" style={{ color: 'var(--destructive)' }}>
          {error}
        </p>
      </section>
    );
  }

  return (
    <section className="w-full py-10 px-4" style={{ background: 'var(--background)' }}>

      {/* Header */}
      
        <h2
          className="text-2xl mb-2 md:text-3xl font-black italic tracking-tighter uppercase leading-none"
          style={{ color: 'var(--foreground)' }}
        >
          {title}
        </h2>

      {/* Grid */}
      <div
        className="max-w-7xl mx-auto border"
        style={{ borderColor: 'var(--border)' }}
      >
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:grid-cols-5"
        >
          {loading
            ? Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[180px] animate-pulse border-r border-b"
                  style={{
                    background: 'var(--muted)',
                    borderColor: 'var(--border)',
                  }}
                />
              ))
            : brands.map((brand) => (
                <Link key={brand._id} href={`/products?brands=${brand.slug?.current}`}>
                  <article
                    className="group rounded-md relative flex flex-col items-center justify-end p-5 min-h-[180px]
                      border-r bg-black border-b cursor-pointer transition-colors duration-200 hover:bg-[var(--muted)]"
                   
                  >
                    {/* Featured badge */}
                    

                    {/* Logo */}
                    <div className="flex-1 flex items-center justify-center w-full px-4">
                      {brand.logo ? (
                        <Image
                          src={brand.logo}
                          alt={brand.logoAlt || brand.name}
                          width={130}
                          height={70}
                          className="object-contain max-h-[70px] w-auto"
                        />
                      ) : (
                        <span
                          className="text-2xl  font-black uppercase"
                          style={{ color: 'var(--foreground)' }}
                        >
                          {brand.name}
                        </span>
                      )}
                    </div>

                    {/* Brand name */}
                    <p
                      className="w-full text-center  text-white text-[13px] font-medium pt-3 mt-3"
                    
                    >
                      {brand.name}
                    </p>
                  </article>
                </Link>
              ))}
        </div>
      </div>

      {!loading && brands.length === 0 && (
        <p
          className="text-center text-sm py-16"
          style={{ color: 'var(--muted-foreground)' }}
        >
          No brands found.
        </p>
      )}
    </section>
  );
}