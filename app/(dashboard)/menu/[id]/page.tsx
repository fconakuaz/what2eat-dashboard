// app/menu/[id]/page.tsx (App Router en Next.js 13+)
'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useMenuStore } from 'app/store/menuStore';
import { SpinLoading } from 'app/components/layout/SpinLoading';
import { SkeletonMenu } from '@/components/ui/skeletonMenu';
import { useCommonStore } from 'app/store/commonStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GenerateHTMLFromJson } from 'app/AI/getRecipe';
import { FileWarning, Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SharedMenuPage() {
  const { id } = useParams(); // Obtener el ID desde la URL
  const { loadSharedMenu, sharedMenu } = useMenuStore(); // Accede al store
  const { loading, loading2, selectedDate } = useCommonStore();
  const t = useTranslations('HomePage');

  useEffect(() => {
    if (id) {
      loadSharedMenu(id.toString());
    }
  }, [id, loadSharedMenu]);

  return (
    <Card className="rounded-none px-0 py-0 md:px-8 md:py-3">
      <CardHeader className="w-full h-[80px] px-4 text-lg md:text-2xl pl-5 justify-center items-center md:items-start ">
        <CardTitle className="flex flex-row w-full  ">
          <div className="w-full flex my-0 md:my-10 flex-row items-center justify-center gap-3 ">
            <h1>Mi menú compartido</h1>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 md:flex-row gap-4 flex-col items-center justify-center">
        {/* RIGHT */}
        <div className="md:w-3/4 w-full rounded-lg p-0 ">
          <div className="flex h-full w-full items-start justify-center p-0 md:p-0 pt-0">
            {loading2 ? (
              <SkeletonMenu />
            ) : (
              <div className="bg-muted/0 sm:bg-muted/0 px-0 py-0 sm:px-0 sm:py-0 md:px-0 md:py-0 ml-0 mr-0 md:ml-3 md:mr-4 mt-0 md:mt-0">
                <div className="flex justify-center mt-0 mb-10">
                  <Link
                    href="https://what2eat-landing.vercel.app"
                    target="_blank"
                  >
                    <Button variant={'default'}>
                      Crea tus propios menús aquí
                    </Button>
                  </Link>
                </div>
                {sharedMenu?.breakfast?.recipe_description ? (
                  <div>
                    <GenerateHTMLFromJson
                      meal={sharedMenu?.breakfast}
                      mealName={'Breakfast'}
                    />
                    <GenerateHTMLFromJson
                      meal={sharedMenu?.snack1}
                      mealName={'Snack1'}
                    />
                    <GenerateHTMLFromJson
                      meal={sharedMenu?.lunch}
                      mealName={'Lunch'}
                    />
                    <GenerateHTMLFromJson
                      meal={sharedMenu?.snack2}
                      mealName={'Snack2'}
                    />
                    <GenerateHTMLFromJson
                      meal={sharedMenu?.dinner}
                      mealName={'Dinner'}
                    />
                  </div>
                ) : (
                  <p className="text-muted-foreground items-center flex flex-col pt-10 h-screen">
                    <FileWarning size={30} className="my-2 " />{' '}
                    {t('infoSharedMenu')}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
