import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'es'; // Idioma predeterminado (inglés)

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
