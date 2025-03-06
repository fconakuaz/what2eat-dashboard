'use client';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { GenerateHTMLFromJson } from '../../AI/getRecipe';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, BookmarkIcon, Calendar, BookmarkX, Share } from 'lucide-react';
import { SkeletonMenu } from '@/components/ui/skeletonMenu';
import { useCommonStore } from 'app/store/commonStore';
import { useProfileStore } from 'app/store/profileStore';
import { useRouter } from 'next/navigation';
import { SpinLoading } from 'app/components/layout/SpinLoading';
import { useMenuStore } from 'app/store/menuStore';
import { CalendarHistory } from '@/components/calendarHistory';
import { SkeletonListSavedMenus } from '../../../components/ui/skeletonListSavedMenus';
import ShareButton from 'app/components/layout/ShareButton';

const HomePage = () => {
  const { selectedSavedMenu, saveDailyMenu, saving, setSavedMenu } =
    useMenuStore();
  const t = useTranslations('HomePage');
  const { loading, loading2, selectedDate } = useCommonStore();
  const { getSavedMenus, savedMenus } = useMenuStore();
  const { profile, getUserProfile } = useProfileStore();
  const router = useRouter();

  console.log('🟢🟢🟢 selectedSavedMenu 🟢🟢🟢');
  console.log(selectedSavedMenu);
  const handleSetSavedMenu = (id: string | undefined) => {
    if (id !== undefined) {
      setSavedMenu(id);
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      await getUserProfile(router);
    };

    const loadSavedMenus = async () => {
      await getSavedMenus();
    };

    if (!profile?.userActive) {
      loadProfile();
    }

    if (profile?.email) {
      loadSavedMenus();
    }
  }, [profile, getUserProfile, router, selectedDate]);

  if (!profile?.userActive) {
    return <SpinLoading />;
  }

  return (
    <Card className="rounded-none px-0 py-0 md:px-8 md:py-3">
      <CardHeader className="w-full h-[80px] px-4 text-lg md:text-2xl pl-5 justify-center items-center md:items-start ">
        <CardTitle className="flex flex-row w-full  ">
          <div className="hidden md:flex mt-0 flex-row text-lg min-w-[120px] md:min-w-[300px] items-center justify-start pr-4 pb-4 gap-3">
            <Calendar className="text-primary mr-1" /> Mis Menús
          </div>
          <div
            className={`${selectedSavedMenu?.id == null ? 'hidden' : ''} mt-0 w-full flex flex-row items-center justify-end pr-6 pb-2 gap-3`}
          >
            <Button
              size="sm"
              variant={'outline'}
              className="h-8 gap-1"
              onClick={() => saveDailyMenu()}
              disabled={saving}
            >
              <BookmarkX className="h-4 w-4" />
              <span className="sm:not-sr-only sm:whitespace-nowrap">
                {saving ? 'Quitando...' : 'Eliminar '}
              </span>
            </Button>
            <ShareButton />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 md:flex-row gap-4 flex-col">
        {/* LEFT */}
        <div className="flex flex-col h-full items-start justify-center p-0 w-full md:max-w-[270px] md:min-w-[270px] md:w-1/4">
          {/* Botones apilados */}
          <div className="mt-0 w-full flex flex-col items-center justify-center gap-3 ">
            <CalendarHistory />
          </div>

          {/* Botones apilados */}
          <div className="my-4 w-full flex flex-col items-center justify-center gap-3 pl-1 ">
            {loading ? (
              <SkeletonListSavedMenus />
            ) : savedMenus.length > 0 ? (
              savedMenus?.map((menu, index) => {
                if (menu?.id) {
                  return (
                    <Button
                      key={index}
                      variant={'secondary'}
                      className="w-full max-w-[270px]"
                      onClick={() => handleSetSavedMenu(menu?.id)}
                    >
                      <BookmarkIcon /> Ver menú guardado {index + 1}
                    </Button>
                  );
                }
              })
            ) : (
              'Sin registros guardados para la fecha seleccionada'
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="md:w-3/4 w-full rounded-lg p-0 ">
          <div className="flex h-full w-full items-start justify-center p-0 md:p-0 pt-0">
            {loading2 ? (
              <SkeletonMenu />
            ) : (
              <div className="bg-muted/0 sm:bg-muted/0 px-0 py-0 sm:px-0 sm:py-0 md:px-0 md:py-0 ml-0 mr-0 md:ml-3 md:mr-4 mt-10 md:mt-0">
                {selectedSavedMenu?.breakfast?.recipe_description ? (
                  <div>
                    <GenerateHTMLFromJson
                      meal={selectedSavedMenu?.breakfast}
                      mealName={'Breakfast'}
                    />
                    <GenerateHTMLFromJson
                      meal={selectedSavedMenu?.snack1}
                      mealName={'Snack1'}
                    />
                    <GenerateHTMLFromJson
                      meal={selectedSavedMenu?.lunch}
                      mealName={'Lunch'}
                    />
                    <GenerateHTMLFromJson
                      meal={selectedSavedMenu?.snack2}
                      mealName={'Snack2'}
                    />
                    <GenerateHTMLFromJson
                      meal={selectedSavedMenu?.dinner}
                      mealName={'Dinner'}
                    />
                  </div>
                ) : (
                  <p className="text-muted-foreground flex flex-row pt-10">
                    <Info className="mr-2" /> {t('infoSavedMenu')}
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
