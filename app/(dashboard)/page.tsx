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
import { SkeletonMenu } from '@/components/ui/skeletonMenu';
import { useCommonStore } from 'app/store/commonStore';
import { useExcludeFoodStore } from 'app/store/excludeFoodStore';
import { useIncludeFoodStore } from 'app/store/includeFoodStore';

const HomePage = () => {
  const [menu, setMenu] = useState<any>([]);
  const { ingredientsToInclude } = useIncludeFoodStore();
  const { ingredientsToExclude } = useExcludeFoodStore();
  const t = useTranslations('HomePage');
  const { loading, setLoadingTrue, setLoadingFalse } = useCommonStore();

  async function run() {
    try {
      setLoadingTrue();
      const response = await runGemini(
        ingredientsToInclude,
        ingredientsToExclude
      );
      console.log('Response:', response);
      setMenu(response);
      setLoadingFalse();
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
            <Button
              size="sm"
              className={`h-8 gap-1 ${loading && 'bg-transparent text-white'}`}
              onClick={run}
              disabled={loading}
            >
              <Sparkles
                className={`h-3.5 w-3.5 ${loading && 'animate-pulse'}`}
              />
              <span className={`sm:not-sr-only sm:whitespace-nowrap`}>
                {loading ? t('creating_daily_menu') : t('create_daily_menu')}
              </span>
            </Button>
          </div>

          <div className="grid w-full gap-4 md:grid-cols-[30%_70%] mt-10 md:mt-0">
            <div className="h-auto">
              <AccordionFilter />
            </div>
            {loading ? (
              <SkeletonMenu />
            ) : (
              <div className="bg-muted/30 px-4 py-4 md:px-10 md:py-8 ml-0 mr-0 md:ml-3 md:mr-4 mt-10 md:mt-0">
                {menu && Object.keys(menu).length > 0 ? (
                  <GenerateHTMLFromJson json={menu} />
                ) : (
                  <p className="text-muted-foreground">
                    <Info className="mb-2" /> {t('info')}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default HomePage;
