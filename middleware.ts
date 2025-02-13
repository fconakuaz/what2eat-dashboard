import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  const session = await auth(); // Obtiene la sesión del usuario

  // Rutas que NO necesitan autenticación
  const publicRoutes = [
    '/login',
    '/api',
    '/_next',
    '/favicon.ico',
    '/manifest.json',
    '/banner.webp' // ✅ Permitir imágenes en public/
  ];

  // Permitir archivos en `public/`
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Permitir imágenes en `public/`
  if (req.nextUrl.pathname.startsWith('/banner.webp')) {
    return NextResponse.next();
  }

  // Si la URL está en `publicRoutes`, permitir acceso
  if (publicRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Si no hay sesión, redirigir a /login
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next(); // Permitir acceso si está autenticado
}

// 🔹 Configuración del middleware: Se ejecuta en todas las rutas excepto las excluidas
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|banner.webp).*)']
};
