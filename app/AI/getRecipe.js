const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold
} = require('@google/generative-ai');
import { responseSchema } from './modelRecipe';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
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

export async function runGemini() {
  const chatSession = model.startChat({
    generationConfig,
    history: []
  });

  const result = await chatSession.sendMessage(
    ' Genera una lista de recetas para un menú del día\n' +
      ' pero evitando los ingredientes: cacahuate, harina.\n' +
      ' incluir ingredientes: tomate, lechuga, rábanos.\n' +
      ' debe ser un tipo de comida: vegetariana\n' +
      ' debe considerarse para personas de edad de: 41 años\n' +
      ' de una altura de: 170 cm\n' +
      ' de un peso de: 110 kg\n' +
      ' debe ser un menú adaptado para personas que tienen: diabetes, colesterol alto, hipertensión.\n' +
      ' genero: masculino\n' +
      ' idioma: español'
  );

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
    <div>
      {Object.entries(json).map(([meal, recipe]) => (
        <div key={meal} className="meal-container">
          <CardTitle className="py-1 font-bold">
            {t(meal.charAt(0).toUpperCase() + meal.slice(1))}
          </CardTitle>

          <CardDescription className="mb-6 font-medium">
            {recipe.recipe_name}
          </CardDescription>

          {/* Ingredients */}
          <br></br>
          <h3 className="mb-6 font-medium">{t('ingredients')}</h3>
          <ul className="list-disc ml-5">
            {recipe.recipe_ingredients.map((ingredient, index) => (
              <li key={index}>🔹 {ingredient}</li>
            ))}
          </ul>

          {/* Instructions */}
          <br></br>
          <h3 className="mb-6 font-medium">{t('instructions')}</h3>
          <ol className="list-decimal ml-5">
            {recipe.recipe_instructions.map((instruction, index) => (
              <li key={index}>
                {index + 1}. {instruction}
              </li>
            ))}
          </ol>
          <br></br>
          <br></br>
          <div className="my-4 h-px bg-gray-300"></div>
        </div>
      ))}
    </div>
  );
}
