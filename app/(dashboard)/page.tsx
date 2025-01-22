'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { AccordionFilter } from '@/components/dashboard/AccordionFilter';
import { Button } from '@/components/ui/button';
import { runGemini, GenerateHTMLFromJson } from '../AI/getRecipe';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Info, Sparkles } from 'lucide-react';

const HomePage = () => {
  const [menu, setMenu] = useState<any>([]);
  const t = useTranslations('HomePage');
  async function run() {
    try {
      const response = await runGemini();
      console.log('Response:', response);
      setMenu(response);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="w-full grid place-items-end">
            <Button size="sm" className="h-8 gap-1" onClick={run}>
              <Sparkles className="h-3.5 w-3.5" />
              <span className="  sm:not-sr-only sm:whitespace-nowrap">
                {t('create_daily_menu')}
              </span>
            </Button>
          </div>

          <div className="grid w-full gap-4 md:grid-cols-[30%_70%]">
            <div className="h-auto">
              <AccordionFilter />
            </div>

            <div className="bg-muted/30 px-4 py-3 md:px-10 md:py-8 ml-0 mr-0 md:ml-3 md:mr-4">
              {menu && Object.keys(menu).length > 0 ? (
                <GenerateHTMLFromJson json={menu} />
              ) : (
                <p className="text-muted-foreground">
                  <Info className="mb-2" /> {t('info')}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default HomePage;
