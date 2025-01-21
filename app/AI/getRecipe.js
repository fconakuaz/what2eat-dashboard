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
  return (
    <div>
      {Object.entries(json).map(([meal, recipe]) => (
        <div key={meal} className="meal-container">
          {/* Título de la receta */}
          <CardTitle className="py-1">
            {meal.charAt(0).toUpperCase() + meal.slice(1)}
          </CardTitle>

          {/* Descripción de la receta */}
          <CardDescription className="mb-6 font-medium">
            {recipe.recipe_name}
          </CardDescription>

          {/* Ingredientes */}
          <h3 className="mb-6 font-medium">Ingredientes:</h3>
          <ul>
            {recipe.recipe_ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          {/* Instrucciones */}
          <h3>Instrucciones:</h3>
          <ol>
            {recipe.recipe_instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
          <br></br>
        </div>
      ))}
    </div>
  );
}
