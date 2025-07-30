'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/toast';

const GlobalAuthChecker = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      toast.info('🔐 You must be logged in');
      router.push('/login');
    }
  }, [user, loading]);

  return null; // this component doesn't render anything
};

export default GlobalAuthChecker;
