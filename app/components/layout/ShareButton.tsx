import { Button } from '@/components/ui/button';
import { Send, Share } from 'lucide-react';

export default function ShareButton({
  menuId
}: {
  menuId: string | undefined;
}) {
  if (menuId === undefined) {
    return;
  }
  const handleShare = () => {
    const baseUrl =
      typeof window !== 'undefined'
        ? window.location.origin
        : 'https://what2eat-dashboard.vercel.app';
    const menuUrl = `${baseUrl}/menu/${menuId}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=¡Mira este menú que comparto contigo! 🍽️ ${menuUrl}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      size="sm"
      variant="secondary"
      className="h-8 gap-1"
      onClick={handleShare}
    >
      {/* <img src="/whatsapp.webp" className="h-4 w-4" /> */}
      <Send className="h-4 w-4" />
      <span className="sm:not-sr-only sm:whitespace-nowrap">Compartir</span>
    </Button>
  );
}
