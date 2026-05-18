'use client';
import { useEffect } from 'react';

export default function RootPage() {
  useEffect(() => {
    const base = window.location.pathname.replace(/\/+$/, '');
    window.location.replace(base + '/zh');
  }, []);
  return null;
}
