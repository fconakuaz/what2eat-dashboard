export const responseSchema = {
  type: 'object',
  description: 'Return some of the most popular cookie recipes',
  properties: {
    Breakfast: {
      type: 'object',
      properties: {
        recipe_name: {
          type: 'string'
        },
        recipe_description: {
          type: 'string'
        },
        recipe_ingredients: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        recipe_instructions: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        recipe_time_preparation: {
          type: 'string'
        },
        recipe_calories_cant: {
          type: 'string'
        },
        recipe_protein_cant: {
          type: 'string'
        },
        recipe_fat_cant: {
          type: 'string'
        },
        recipe_full_nutrition_facts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              recipe_nutrition_fact_name: {
                type: 'string'
              },
              recipe_nutrition_fact_cant: {
                type: 'string'
              }
            },
            required: [
              'recipe_nutrition_fact_name',
              'recipe_nutrition_fact_cant'
            ]
          }
        }
      },
      required: [
        'recipe_name',
        'recipe_description',
        'recipe_ingredients',
        'recipe_instructions'
      ]
    },
    snack1: {
      type: 'object',
      properties: {
        recipe_name: {
          type: 'string'
        },
        recipe_description: {
          type: 'string'
        },
        recipe_ingredients: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        recipe_instructions: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        recipe_time_preparation: {
          type: 'string'
        },
        recipe_calories_cant: {
          type: 'string'
        },
        recipe_protein_cant: {
          type: 'string'
        },
        recipe_fat_cant: {
          type: 'string'
        },
        recipe_full_nutrition_facts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              recipe_nutrition_fact_name: {
                type: 'string'
              },
              recipe_nutrition_fact_cant: {
                type: 'string'
              }
            },
            required: [
              'recipe_nutrition_fact_name',
              'recipe_nutrition_fact_cant'
            ]
          }
        }
      },
      required: [
        'recipe_name',
        'recipe_description',
        'recipe_ingredients',
        'recipe_instructions'
      ]
    },
    lunch: {
      type: 'object',
      properties: {
        recipe_name: {
          type: 'string'
        },
        recipe_description: {
          type: 'string'
        },
        recipe_ingredients: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        recipe_instructions: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        recipe_time_preparation: {
          type: 'string'
        },
        recipe_calories_cant: {
          type: 'string'
        },
        recipe_protein_cant: {
          type: 'string'
        },
        recipe_fat_cant: {
          type: 'string'
        },
        recipe_full_nutrition_facts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              recipe_nutrition_fact_name: {
                type: 'string'
              },
              recipe_nutrition_fact_cant: {
                type: 'string'
              }
            },
            required: [
              'recipe_nutrition_fact_name',
              'recipe_nutrition_fact_cant'
            ]
          }
        }
      },
      required: [
        'recipe_name',
        'recipe_description',
        'recipe_ingredients',
        'recipe_instructions'
      ]
    },
    snack2: {
      type: 'object',
      properties: {
        recipe_name: {
          type: 'string'
        },
        recipe_description: {
          type: 'string'
        },
        recipe_ingredients: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        recipe_instructions: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        recipe_time_preparation: {
          type: 'string'
        },
        recipe_calories_cant: {
          type: 'string'
        },
        recipe_protein_cant: {
          type: 'string'
        },
        recipe_fat_cant: {
          type: 'string'
        },
        recipe_full_nutrition_facts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              recipe_nutrition_fact_name: {
                type: 'string'
              },
              recipe_nutrition_fact_cant: {
                type: 'string'
              }
            },
            required: [
              'recipe_nutrition_fact_name',
              'recipe_nutrition_fact_cant'
            ]
          }
        }
      },
      required: [
        'recipe_name',
        'recipe_description',
        'recipe_ingredients',
        'recipe_instructions'
      ]
    },
    dinner: {
      type: 'object',
      properties: {
        recipe_name: {
          type: 'string'
        },
        recipe_description: {
          type: 'string'
        },
        recipe_ingredients: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        recipe_instructions: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        recipe_time_preparation: {
          type: 'string'
        },
        recipe_calories_cant: {
          type: 'string'
        },
        recipe_protein_cant: {
          type: 'string'
        },
        recipe_fat_cant: {
          type: 'string'
        },
        recipe_full_nutrition_facts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              recipe_nutrition_fact_name: {
                type: 'string'
              },
              recipe_nutrition_fact_cant: {
                type: 'string'
              }
            },
            required: [
              'recipe_nutrition_fact_name',
              'recipe_nutrition_fact_cant'
            ]
          }
        }
      },
      required: [
        'recipe_name',
        'recipe_description',
        'recipe_ingredients',
        'recipe_instructions'
      ]
    }
  },
  required: ['Breakfast', 'snack1', 'lunch', 'snack2', 'dinner']
};
