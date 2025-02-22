'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAuthStore } from 'app/store/authStore';

export default function SessionSync() {
  const { data: session } = useSession();
  const { setSession, logout } = useAuthStore();
  useEffect(() => {
    if (session) {
      setSession(session); // Guarda la sesión en Zustand
    }
    if (session?.user === undefined) {
      logout(); // Guarda la sesión en Zustand
    }
  }, [session, setSession]);
  return null; // No renderiza nada, solo sincroniza
}
