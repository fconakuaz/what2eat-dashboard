'use client';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { AccordionFilter } from '@/components/dashboard/AccordionFilter';
import { Button } from '@/components/ui/button';
import { runGemini, GenerateHTMLFromJson } from '../../AI/getRecipe';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Info,
  Sparkles,
  Save,
  Bookmark,
  BookmarkIcon,
  Calendar
} from 'lucide-react';
import { SkeletonMenu } from '@/components/ui/skeletonMenu';
import { useCommonStore } from 'app/store/commonStore';
import { useExcludeFoodStore } from 'app/store/excludeFoodStore';
import { useIncludeFoodStore } from 'app/store/includeFoodStore';
import { useProfileStore } from 'app/store/profileStore';
import { useRouter } from 'next/navigation';
import { SpinLoading } from 'app/components/layout/SpinLoading';
import { useMenuStore } from 'app/store/menuStore';
import { useLanguageStore } from 'app/store/languajeStore';
import { useAuthStore } from 'app/store/authStore';
import { CalendarHistory } from '@/components/calendarHistory';

const HomePage = () => {
  const { ingredientsToInclude } = useIncludeFoodStore();
  const { ingredientsToExclude } = useExcludeFoodStore();
  const {
    breakfast,
    snack1,
    snack2,
    lunch,
    dinner,
    setMenu,
    saveDailyMenu,
    saving
  } = useMenuStore();
  const t = useTranslations('HomePage');
  const { loading, setLoadingTrue, setLoadingFalse } = useCommonStore();

  const { profile, fetchUserProfile } = useProfileStore();
  const { locale } = useLanguageStore();
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      await fetchUserProfile(router);
    };

    if (!profile?.userActive) {
      loadProfile();
    }
  }, [profile, fetchUserProfile, router]);

  async function runIA() {
    try {
      setLoadingTrue();
      const response = await runGemini(
        ingredientsToInclude,
        ingredientsToExclude,
        profile,
        locale
      );
      console.log('Response:', response);
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

  // 🔹 Muestra un loader mientras se obtiene el perfil
  if (!profile?.userActive) {
    return <SpinLoading />;
  }

  return (
    <Card className="rounded-none px-0 py-0 md:px-8 md:py-3">
      <CardHeader className="w-full h-[80px] px-4 text-2xl pl-5 justify-center items-center md:items-start ">
        <CardTitle className="flex flex-row  ">
          <Calendar className="text-primary mr-2" /> Mis menús guardados
        </CardTitle>
        {/* <CardDescription>{t('subtitle')}</CardDescription> */}
      </CardHeader>
      <CardContent className="flex flex-1 md:flex-row gap-4 flex-col">
        {/* LEFT */}
        <div className="flex flex-col h-full items-start justify-center p-0 w-full md:max-w-[270px] md:min-w-[270px] md:w-1/4">
          {/* 🔹 Botones apilados */}
          <div className="mt-0 w-full flex flex-col items-center justify-center gap-3 ">
            <CalendarHistory />
          </div>

          {/* 🔹 Botones apilados */}
          <div className="my-4 w-full flex flex-col items-center justify-center gap-3 pl-1 ">
            <Button variant={'secondary'} className="w-full max-w-[270px]">
              <BookmarkIcon /> Ver menú guardado 1
            </Button>
            <Button variant={'secondary'} className="w-full max-w-[270px]">
              <BookmarkIcon /> Ver menú guardado 2
            </Button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="md:w-3/4 w-full rounded-lg p-0 ">
          <div className="flex h-full w-full items-start justify-center p-0 md:p-0 pt-0">
            {loading ? (
              <SkeletonMenu />
            ) : (
              <div className="bg-muted/0 sm:bg-muted/0 px-0 py-0 sm:px-0 sm:py-0 md:px-0 md:py-0 ml-0 mr-0 md:ml-3 md:mr-4 mt-10 md:mt-0">
                {breakfast?.recipe_description ? (
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
