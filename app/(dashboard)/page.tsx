'use client';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
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
import { Info, Sparkles, Save, Bookmark } from 'lucide-react';
import { SkeletonMenu } from '@/components/ui/skeletonMenu';
import { useCommonStore } from 'app/store/commonStore';
import { useExcludeFoodStore } from 'app/store/excludeFoodStore';
import { useIncludeFoodStore } from 'app/store/includeFoodStore';
import { useProfileStore } from 'app/store/profileStore';
import { useRouter } from 'next/navigation';
import { SpinLoading } from 'app/components/layout/SpinLoading';
import { useMenuStore } from 'app/store/menuStore';
import { useLanguageStore } from 'app/store/languajeStore';
import ShareButton from 'app/components/layout/ShareButton';
import SaveButton from 'app/components/layout/SaveButton';
import { useActivityStore } from 'app/store/activityStore';

const HomePage = () => {
  const { ingredientsToInclude } = useIncludeFoodStore();
  const { ingredientsToExclude } = useExcludeFoodStore();
  const { breakfast, snack1, snack2, lunch, dinner, setMenu, resetMenu } =
    useMenuStore();
  const t = useTranslations('HomePage');
  const { loading, setLoadingTrue, setLoadingFalse } = useCommonStore();
  const { profile, getUserProfile } = useProfileStore();
  const { locale } = useLanguageStore();
  const { activities } = useActivityStore();
  const { currentPage, fetchActivityRecords } = useActivityStore();
  const router = useRouter();

  useEffect(() => {
    fetchActivityRecords(currentPage);
  }, []);

  useEffect(() => {
    const loadProfile = async () => {
      await getUserProfile(router);
    };

    if (!profile?.userActive) {
      loadProfile();
    }
  }, [profile, getUserProfile, router]);

  async function runIA() {
    try {
      setLoadingTrue();
      resetMenu();
      const response = await runGemini(
        ingredientsToInclude,
        ingredientsToExclude,
        profile,
        locale,
        activities
      );
      setMenu({
        breakfast: response?.Breakfast,
        snack1: response?.snack1,
        lunch: response?.lunch,
        snack2: response?.snack2,
        dinner: response?.dinner
      });

      setLoadingFalse();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Muestra un loader mientras se obtiene el perfil
  if (!profile?.userActive) {
    return <SpinLoading />;
  }

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="w-full flex justify-end space-x-3">
            <div className={` ${loading && 'hidden'}`}>
              <SaveButton />
              <ShareButton />
            </div>

            {/* Generar menú */}
            <Button
              size="sm"
              className={`h-8 gap-1 ${loading && 'bg-transparent text-white'}`}
              onClick={runIA}
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
              <div className="bg-muted/0 sm:bg-muted/30 px-0 py-0 sm:px-4 sm:py-4 md:px-10 md:py-8 ml-0 mr-0 md:ml-3 md:mr-4 mt-10 md:mt-0">
                {breakfast && Object.keys(breakfast).length > 0 ? (
                  <div>
                    <GenerateHTMLFromJson
                      meal={breakfast}
                      mealName={'Breakfast'}
                    />
                    <GenerateHTMLFromJson meal={snack1} mealName={'Snack1'} />
                    <GenerateHTMLFromJson meal={lunch} mealName={'Lunch'} />
                    <GenerateHTMLFromJson meal={snack2} mealName={'Snack2'} />
                    <GenerateHTMLFromJson meal={dinner} mealName={'Dinner'} />
                  </div>
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
