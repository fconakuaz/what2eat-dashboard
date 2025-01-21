export const responseSchema = {
    type: 'object',
    description: 'Return some of the most popular cookie recipes',
    properties: {
      breackfast: {
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
    required: ['breackfast', 'snack1', 'lunch', 'snack2', 'dinner']
  }