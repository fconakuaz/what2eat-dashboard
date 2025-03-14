import { GoogleGenerativeAI } from '@google/generative-ai';
import { responseSchema } from './modelRecipe';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Check, Drumstick, Egg, Flame } from 'lucide-react';
import { useTranslations } from 'next-intl';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-exp'
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
  responseSchema
};

export async function runGemini(
  ingredientsToInclude,
  ingredientsToExclude,
  profile,
  locale,
  activities
) {
  const chatSession = model.startChat({
    generationConfig,
    history: []
  });
  const activitiesString = JSON.stringify(activities);
  const arrIngredientsToInclude =
    ingredientsToInclude.length > 0
      ? //' Se puede incluir sólo los siguientes ingredientes pero ninguno más que ' +
        ' Se puede incluir los siguientes ingredientes: ' +
        ingredientsToInclude
          .filter(({ state }) => state)
          .map(({ name }) => name)
          .join(', ') +
        '.\n'
      : ' incluir cualquier ingrediente';

  const arrIngredientsToExclude =
    ingredientsToExclude.length > 0
      ? ' excluir ingredientes como ' +
        ingredientsToExclude
          .filter(({ state }) => state)
          .map(({ name }) => name)
          .join(', ') +
        ingredientsToInclude
          .filter(({ state }) => state == false)
          .map(({ name }) => name)
          .join(', ') +
        '.\n'
      : ' no excluir ningún ingrediente';

  const messageToSend = `Genera una lista de recetas para un menú del día. 
      ${arrIngredientsToInclude} 
      ${arrIngredientsToExclude}
      Debe ser un tipo de comida: ${profile?.dietaryPreference}.
      Debe considerarse para personas de edad de: ${profile?.age} años.
      Debe considerarse para cumplir la meta de: ${profile?.goal}.
      De una altura de: ${profile?.height} cm.
      De un peso de: ${profile?.weight} kg.
      Debe ser un menú adaptado para personas que tienen: diabetes, colesterol alto, hipertensión.
      Género: ${profile?.gender}.
      Debe tener la proteína necesaria según la estatura y peso dicho, además de la edad  
      Y que sea para una persona con actividad: ${profile?.physicalActivity}.
      Idioma: ${locale === 'en' ? 'Inglés' : 'Español'}.
      ${activitiesString !== '{"group":[],"all":[]}' ? `Considera el menú diario para alguiente que haga la siguiente actividad física en el periodo de una semana: ${JSON.stringify(activities)}.` : ''}
      Con ingredientes fáciles de conseguir en el país de: México y en el estado de Veracruz.`;
  console.log('🟢🟢🟢 messageToSend 🟢🟢🟢');
  console.log(messageToSend);
  const result = await chatSession.sendMessage(messageToSend);

  try {
    const responseText = result.response.text();
    const responseJson = JSON.parse(responseText);
    return responseJson;
  } catch (error) {
    console.error('Error message:', error.message);
    return null;
  }
}

export function GenerateHTMLFromJson({ meal, mealName }) {
  const t = useTranslations('HomePage');
  const {
    recipe_ingredients,
    recipe_instructions,
    recipe_name,
    recipe_calories_cant,
    recipe_fat_cant,
    recipe_protein_cant,
    recipe_time_preparation
  } = meal;

  return (
    <div className="">
      <Card key={recipe_name} className="w-1/1 p-2 lg:p-3  mb-8 md:mb-8 block">
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="w-14 h-14 mr-2">
              <AvatarImage src="food.webp" alt="User Avatar" />
              <AvatarFallback>FD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xl md:text-2xl font-medium   ">
                {t(mealName)}
              </p>
              <p className="text-sm md:text-xl font-medium leading-none text-muted-foreground">
                {recipe_name}
              </p>
              <div className="mb-0 text-sm font-normal flex flex-row leading-3 items-start pb-4 last:mb-0 last:pb-0">
                <div className="space-y-1">
                  <div className="text-sm font-normal text-muted-foreground">
                    {t('preparation_time')}: {recipe_time_preparation}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* Nutrition Facts */}
          <h3 className="mb-1  font-medium">{t('nutrition_facts')}</h3>
          <ul className="list-disc ml-5">
            <li>
              <div className="mb-0 text-sm font-normal flex flex-row leading-3 items-start pb-4 last:mb-0 last:pb-0">
                <Flame size={18} className="mr-2 text-primary" />
                <div className="space-y-1">
                  <p className="text-sm font-normal text-muted-foreground">
                    {t('calories')}: {recipe_calories_cant}
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="mb-0 text-sm font-normal flex flex-row leading-3 items-start pb-4 last:mb-0 last:pb-0">
                <Egg size={17} className="mr-2 text-primary" />
                <div className="space-y-1">
                  <p className="text-sm font-normal text-muted-foreground">
                    {t('fat')}: {recipe_fat_cant}
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="mb-0 text-sm font-normal flex flex-row leading-3 items-start pb-4 last:mb-0 last:pb-0">
                <Drumstick size={19} className="mr-2 text-primary" />
                <div className="space-y-1">
                  <p className="text-sm font-normal text-muted-foreground">
                    {t('protein')}: {recipe_protein_cant}
                  </p>
                </div>
              </div>
            </li>
          </ul>

          {/* Ingredients */}
          <h3 className="mb-1  font-medium">{t('ingredients')}</h3>
          <ul className="list-disc ml-5">
            {recipe_ingredients.map((ingredient, index) => (
              <li key={index}>
                <div
                  key={index}
                  className="mb-0 text-sm font-normal flex flex-row leading-3 items-start pb-4 last:mb-0 last:pb-0"
                >
                  <Check size={18} className="mr-2 text-primary" />
                  <div className="space-y-1">
                    <p className="text-sm font-normal text-muted-foreground">
                      {ingredient}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Instructions */}
          <h3 className="mb-1 mt-2 font-medium">{t('instructions')}</h3>
          <ol className="list-decimal ml-5">
            {recipe_instructions.map((instruction, index) => (
              <li key={index}>
                <div
                  key={index}
                  className="mb-0 flex flex-row pr-3 items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="text-sm font-normal leading-3 text-primary">
                    {index + 1}.{' '}
                  </span>
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-normal leading-3 text-muted-foreground">
                      {instruction}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
        <CardFooter className="flex justify-end"></CardFooter>
      </Card>
    </div>
  );
}
