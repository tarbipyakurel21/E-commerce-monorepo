'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect, useRef } from 'react';
import { toast } from '@/components/toast';
import { useRouter } from 'next/navigation';

const InactivityWatcher = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const timer = useRef<NodeJS.Timeout | null>(null);
  const timeoutDuration = 15 * 60 * 1000; // 15 minutes

  const resetTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      if (user) {
        await logout(); // call your logout function
        toast.info('🕒 Session expired due to inactivity');
        router.push('/login');
      }
    }, timeoutDuration);
  };

  useEffect(() => {
    if (user) {
      window.addEventListener('mousemove', resetTimer);
      window.addEventListener('keydown', resetTimer);
      resetTimer(); // start the timer on login
    }

    return () => {
      if (timer.current) clearTimeout(timer.current);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [user]);

  return null;
};

export default InactivityWatcher;
