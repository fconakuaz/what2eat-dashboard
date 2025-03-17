import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { useTranslations } from 'next-intl';
import { MyPreferences } from './MyPreferences';
import { useIncludeFoodStore } from 'app/store/includeFoodStore';
import { useExcludeFoodStore } from 'app/store/excludeFoodStore';
import { BadgeIngredient } from './BadgeIngredient';
import { Card } from '../ui/card';
import { DrawerFoodSelection } from './DrawerFoodSelection';
import { useEffect } from 'react';
import { useProfileStore } from 'app/store/profileStore';
import { Info } from 'lucide-react';

export const AccordionFilter = () => {
  const t = useTranslations('HomePage');
  const { ingredientsToInclude, fetchIncludedFoods } = useIncludeFoodStore();
  const { ingredientsToExclude, fetchExcludedFoods } = useExcludeFoodStore();
  const { profile } = useProfileStore();

  useEffect(() => {
    if (profile?.id) {
      fetchIncludedFoods(profile?.id);
      fetchExcludedFoods(profile?.id);
    }
  }, [profile?.id]);

  return (
    <Accordion type="single" collapsible className="w-full">
      {/* My preferences */}
      <AccordionItem value="item-3">
        <AccordionTrigger>{t('my_preferences')}</AccordionTrigger>
        <AccordionContent>
          <MyPreferences />
        </AccordionContent>
      </AccordionItem>

      {/* Includ Food */}
      <AccordionItem value="item-1">
        <AccordionTrigger>{t('include_foods')}</AccordionTrigger>
        <AccordionContent>
          <Card className="w-full p-4 pt-7">
            <div className="flex justify-start mb-7  ">
              <DrawerFoodSelection
                data={ingredientsToInclude}
                typeDrawer={'include'}
              />
            </div>
            <div className="  ">
              {ingredientsToInclude.length > 0 ? (
                ingredientsToInclude.map(({ name, state }, index) => (
                  <BadgeIngredient
                    key={index}
                    name={name}
                    state={state}
                    type="include"
                  />
                ))
              ) : (
                <p className="text-muted-foreground pl-1 pb-4 pr-1">
                  {t('infoAdd')}
                </p>
              )}
            </div>
          </Card>
        </AccordionContent>
      </AccordionItem>

      {/* Exclude Food */}
      <AccordionItem value="item-2">
        <AccordionTrigger>{t('exclude_foods')}</AccordionTrigger>
        <AccordionContent>
          <Card className="w-full p-4 pt-7">
            <div className="flex justify-start mb-7  ">
              <DrawerFoodSelection
                data={ingredientsToExclude}
                typeDrawer={'exclude'}
              />
            </div>
            <div className="  ">
              {ingredientsToExclude.length > 0 ? (
                ingredientsToExclude.map(({ name, state }, index) => (
                  <BadgeIngredient
                    key={index}
                    name={name}
                    state={state}
                    type="include"
                  />
                ))
              ) : (
                <p className="text-muted-foreground pl-1 pb-4 pr-1">
                  {t('infoAdd')}
                </p>
              )}
            </div>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
