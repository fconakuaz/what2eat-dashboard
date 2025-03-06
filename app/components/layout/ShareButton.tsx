import { Button } from '@/components/ui/button';
import { useMenuStore } from 'app/store/menuStore';
import { Send } from 'lucide-react';

export default function ShareButton() {
  const { idMenu, saveDailyMenu } = useMenuStore();

  if (idMenu === null || idMenu === undefined) {
    return;
  }
  const handleShare = () => {
    const baseUrl =
      typeof window !== 'undefined'
        ? window.location.origin
        : 'https://what2eat-dashboard.vercel.app';
    const menuUrl = `${baseUrl}/menu/${idMenu}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=¡Mira este menú que comparto contigo! 🍽️ ${menuUrl}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      size="sm"
      variant="outline"
      className="h-8 gap-1"
      onClick={handleShare}
    >
      <Send className="h-4 w-4" />
      <span className="sm:not-sr-only sm:whitespace-nowrap">Compartir</span>
    </Button>
  );
}
