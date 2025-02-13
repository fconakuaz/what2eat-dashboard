'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAuthStore } from 'app/store/authStore';

export default function SessionSync() {
  const { data: session } = useSession();
  const setSession = useAuthStore((state) => state.setSession);

  useEffect(() => {
    if (session) {
      setSession(session); // 🔹 Guarda la sesión en Zustand
    }
  }, [session, setSession]);

  return null; // No renderiza nada, solo sincroniza
}
