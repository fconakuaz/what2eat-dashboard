const { GoogleGenerativeAI } = require('@google/generative-ai');
import { responseSchema } from './modelRecipe';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Asegúrate de tener este componente disponible.

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
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

export async function runGemini(ingredientsToInclude, ingredientsToExclude) {
  const chatSession = model.startChat({
    generationConfig,
    history: []
  });

  const arrIngredientsToInclude =
    ingredientsToInclude.length > 0
      ? ' incluir ingredientes: ' +
        ingredientsToInclude.map(({ name }) => name).join(', ') +
        ' \n'
      : ' incluir cualquier ingrediente';

  const arrIngredientsToExclude =
    ingredientsToExclude.length > 0
      ? ' excluir ingredientes: ' +
        ingredientsToExclude.map(({ name }) => name).join(', ') +
        ' \n'
      : ' no excluir ningún ingrediente';

  const messageToSend =
    ' Genera una lista de recetas para un menú del día\n' +
    arrIngredientsToInclude +
    arrIngredientsToExclude +
    ' debe ser un tipo de comida: omnivora\n' +
    ' debe considerarse para personas de edad de: 41 años\n' +
    ' de una altura de: 170 cm\n' +
    ' de un peso de: 110 kg\n' +
    ' debe ser un menú adaptado para personas que tienen: diabetes, colesterol alto, hipertensión.\n' +
    ' genero: masculino\n' +
    ' debe tener la proteína necesaria según la estatura y peso dicho, ademas de la edad y que sea para una persona con actividad: moderada\n' +
    ' idioma: español\n' +
    ' Con ingredientes fáciles de conseguir en el país de: México' +
    ' y en el estado de : Veracruz\n';

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

export function GenerateHTMLFromJson({ json }) {
  const t = useTranslations('HomePage');

  return (
    <div className="">
      {Object.entries(json).map(([meal, recipe]) => (
        <Card
          key={recipe.recipe_name}
          className="w-1/1 p-2 lg:p-3  mb-8 md:mb-8 block"
        >
          <CardHeader className="flex flex-row items-start justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="w-14 h-14 mr-2">
                <AvatarImage src="food.webp" alt="User Avatar" />
                <AvatarFallback>FD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xl md:text-2xl font-medium   ">
                  {t(meal.charAt(0).toUpperCase() + meal.slice(1))}
                </p>
                <p className="text-sm md:text-xl font-medium leading-none text-muted-foreground">
                  {recipe.recipe_name}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* Ingredients */}
            <h3 className="mb-1  font-medium">{t('ingredients')}</h3>
            <ul className="list-disc ml-5">
              {recipe.recipe_ingredients.map((ingredient, index) => (
                <li key={index}>
                  <div
                    key={index}
                    className="mb-4 text-sm font-normal flex flex-row leading-3 items-start pb-4 last:mb-0 last:pb-0"
                  >
                    🔹
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
              {recipe.recipe_instructions.map((instruction, index) => (
                <li key={index}>
                  <div
                    key={index}
                    className="mb-4 flex flex-row pr-3 items-start pb-4 last:mb-0 last:pb-0"
                  >
                    <span className="text-sm font-normal leading-3 text-sky-500">
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
      ))}
    </div>
  );
}
