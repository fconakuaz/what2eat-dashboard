'use client';

import { useSearchParams } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') ?? 'Unknown';

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <div className="max-w-md p-6 bg-gray-800 rounded-lg shadow-lg text-center">
        {/* 🔹 Icono centrado de Lucide */}
        <div className="flex justify-center mb-3">
          <ShieldAlert className="w-12 h-12 text-blue-500" />
        </div>

        <h1 className="text-2xl font-bold">Acceso Denegado</h1>
        <p className="mt-2">
          {error === 'AccessDenied'
            ? 'Tu cuenta ha sido suspendida debido a una violación de los términos de uso y normas de conducta de la aplicación. Si crees que esto es un error, por favor, contacta con el soporte.'
            : 'Ha ocurrido un error inesperado. Intenta de nuevo más tarde.'}
        </p>
        <a
          href="/login"
          className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white font-medium"
        >
          Volver al inicio de sesión
        </a>
      </div>
    </div>
  );
}
