import {
  PrismaClient,
  FoodCategory,
  UserGender,
  PhysicalActivityLevel,
  UserStatus,
  UserRole
} from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 🔹 Hash the password
  const hashedPassword = await bcrypt.hash('passwordSeguro123', 10);

  // 🔹 List of common afflictions
  const afflictionsItems = [
    'Diabetes',
    'Hypertension',
    'High Cholesterol',
    'Lactose Intolerance',
    'Celiac Disease',
    'Irritable Bowel Syndrome (IBS)',
    'Heart Disease',
    'Acid Reflux (GERD)',
    'Chronic Kidney Disease',
    'Gout',
    'Anemia',
    'Osteoporosis',
    'Thyroid Disorders',
    'Crohn’s Disease',
    'Ulcerative Colitis',
    'Asthma',
    'Polycystic Ovary Syndrome (PCOS)',
    'Migraine',
    'Food Allergies',
    'Liver Disease',
    'Chronic Fatigue Syndrome',
    'Arthritis',
    'Depression',
    'Anxiety Disorders',
    'Autism Spectrum Disorder',
    'Multiple Sclerosis',
    'Parkinson’s Disease',
    'Alzheimer’s Disease'
  ];

  // 🔹 Insert afflictions into DB
  for (const name of afflictionsItems) {
    await prisma.affliction.upsert({
      where: { name },
      update: {},
      create: { name }
    });
  }

  console.log('✅ Afflictions seeded successfully');

  // 🔹 Full Food Catalog
  const foodItems = [
    // FRUITS
    { name: 'Apple', category: FoodCategory.FRUITS },
    { name: 'Banana', category: FoodCategory.FRUITS },
    { name: 'Orange', category: FoodCategory.FRUITS },
    { name: 'Mango', category: FoodCategory.FRUITS },
    { name: 'Pineapple', category: FoodCategory.FRUITS },
    { name: 'Strawberry', category: FoodCategory.FRUITS },
    { name: 'Blueberry', category: FoodCategory.FRUITS },
    { name: 'Raspberry', category: FoodCategory.FRUITS },
    { name: 'Blackberry', category: FoodCategory.FRUITS },
    { name: 'Cherry', category: FoodCategory.FRUITS },
    { name: 'Grapefruit', category: FoodCategory.FRUITS },
    { name: 'Watermelon', category: FoodCategory.FRUITS },
    { name: 'Cantaloupe', category: FoodCategory.FRUITS },
    { name: 'Papaya', category: FoodCategory.FRUITS },
    { name: 'Pear', category: FoodCategory.FRUITS },
    { name: 'Plum', category: FoodCategory.FRUITS },
    { name: 'Kiwi', category: FoodCategory.FRUITS },
    { name: 'Dragon fruit', category: FoodCategory.FRUITS },
    { name: 'Pomegranate', category: FoodCategory.FRUITS },
    { name: 'Persimmon', category: FoodCategory.FRUITS },
    { name: 'Lychee', category: FoodCategory.FRUITS },
    { name: 'Fig', category: FoodCategory.FRUITS },
    { name: 'Guava', category: FoodCategory.FRUITS },
    { name: 'Coconut', category: FoodCategory.FRUITS },
    { name: 'Apricot', category: FoodCategory.FRUITS },
    { name: 'Nectarine', category: FoodCategory.FRUITS },
    { name: 'Passion fruit', category: FoodCategory.FRUITS },
    { name: 'Cranberry', category: FoodCategory.FRUITS },
    { name: 'Gooseberry', category: FoodCategory.FRUITS },
    { name: 'Mulberry', category: FoodCategory.FRUITS },
    { name: 'Starfruit', category: FoodCategory.FRUITS },

    // VEGETABLES
    { name: 'Carrot', category: FoodCategory.VEGETABLES },
    { name: 'Broccoli', category: FoodCategory.VEGETABLES },
    { name: 'Spinach', category: FoodCategory.VEGETABLES },
    { name: 'Kale', category: FoodCategory.VEGETABLES },
    { name: 'Cabbage', category: FoodCategory.VEGETABLES },
    { name: 'Cauliflower', category: FoodCategory.VEGETABLES },
    { name: 'Zucchini', category: FoodCategory.VEGETABLES },
    { name: 'Eggplant', category: FoodCategory.VEGETABLES },
    { name: 'Tomato', category: FoodCategory.VEGETABLES },
    { name: 'Bell pepper', category: FoodCategory.VEGETABLES },
    { name: 'Cucumber', category: FoodCategory.VEGETABLES },
    { name: 'Onion', category: FoodCategory.VEGETABLES },
    { name: 'Garlic', category: FoodCategory.VEGETABLES },
    { name: 'Leek', category: FoodCategory.VEGETABLES },
    { name: 'Celery', category: FoodCategory.VEGETABLES },
    { name: 'Asparagus', category: FoodCategory.VEGETABLES },
    { name: 'Beetroot', category: FoodCategory.VEGETABLES },
    { name: 'Radish', category: FoodCategory.VEGETABLES },
    { name: 'Sweet potato', category: FoodCategory.VEGETABLES },
    { name: 'Pumpkin', category: FoodCategory.VEGETABLES },
    { name: 'Mushroom', category: FoodCategory.VEGETABLES },
    { name: 'Artichoke', category: FoodCategory.VEGETABLES },
    { name: 'Turnip', category: FoodCategory.VEGETABLES },
    { name: 'Brussels sprouts', category: FoodCategory.VEGETABLES },
    { name: 'Okra', category: FoodCategory.VEGETABLES },
    { name: 'Bok choy', category: FoodCategory.VEGETABLES },
    { name: 'Arugula', category: FoodCategory.VEGETABLES },
    { name: 'Watercress', category: FoodCategory.VEGETABLES },
    { name: 'Fennel', category: FoodCategory.VEGETABLES },
    { name: 'Endive', category: FoodCategory.VEGETABLES },

    // GRAINS
    { name: 'Rice', category: FoodCategory.GRAINS },
    { name: 'Wheat', category: FoodCategory.GRAINS },
    { name: 'Quinoa', category: FoodCategory.GRAINS },
    { name: 'Oats', category: FoodCategory.GRAINS },
    { name: 'Barley', category: FoodCategory.GRAINS },
    { name: 'Corn', category: FoodCategory.GRAINS },
    { name: 'Millet', category: FoodCategory.GRAINS },
    { name: 'Rye', category: FoodCategory.GRAINS },
    { name: 'Bulgur', category: FoodCategory.GRAINS },
    { name: 'Farro', category: FoodCategory.GRAINS },
    { name: 'Couscous', category: FoodCategory.GRAINS },
    { name: 'Amaranth', category: FoodCategory.GRAINS },
    { name: 'Sorghum', category: FoodCategory.GRAINS },
    { name: 'Teff', category: FoodCategory.GRAINS },
    { name: 'Buckwheat', category: FoodCategory.GRAINS },

    // PROTEINS
    { name: 'Chicken breast', category: FoodCategory.PROTEINS },
    { name: 'Turkey', category: FoodCategory.PROTEINS },
    { name: 'Beef', category: FoodCategory.PROTEINS },
    { name: 'Pork', category: FoodCategory.PROTEINS },
    { name: 'Salmon', category: FoodCategory.PROTEINS },
    { name: 'Tuna', category: FoodCategory.PROTEINS },
    { name: 'Shrimp', category: FoodCategory.PROTEINS },
    { name: 'Lobster', category: FoodCategory.PROTEINS },
    { name: 'Eggs', category: FoodCategory.PROTEINS },
    { name: 'Duck', category: FoodCategory.PROTEINS },
    { name: 'Lamb', category: FoodCategory.PROTEINS },
    { name: 'Cod', category: FoodCategory.PROTEINS },
    { name: 'Sardines', category: FoodCategory.PROTEINS },
    { name: 'Tilapia', category: FoodCategory.PROTEINS },
    { name: 'Mussels', category: FoodCategory.PROTEINS },
    { name: 'Crab', category: FoodCategory.PROTEINS },
    { name: 'Venison', category: FoodCategory.PROTEINS },
    { name: 'Ostrich', category: FoodCategory.PROTEINS },
    { name: 'Quail', category: FoodCategory.PROTEINS },
    { name: 'Goose', category: FoodCategory.PROTEINS },

    // DAIRY
    { name: 'Milk', category: FoodCategory.DAIRY },
    { name: 'Cheese', category: FoodCategory.DAIRY },
    { name: 'Yogurt', category: FoodCategory.DAIRY },
    { name: 'Butter', category: FoodCategory.DAIRY },
    { name: 'Ghee', category: FoodCategory.DAIRY },
    { name: 'Cream cheese', category: FoodCategory.DAIRY },
    { name: 'Cottage cheese', category: FoodCategory.DAIRY },
    { name: 'Kefir', category: FoodCategory.DAIRY },
    { name: 'Whipping cream', category: FoodCategory.DAIRY },
    { name: 'Ricotta cheese', category: FoodCategory.DAIRY },

    // LEGUMES
    { name: 'Lentils', category: FoodCategory.LEGUMES },
    { name: 'Chickpeas', category: FoodCategory.LEGUMES },
    { name: 'Black beans', category: FoodCategory.LEGUMES },
    { name: 'Kidney beans', category: FoodCategory.LEGUMES },
    { name: 'Pinto beans', category: FoodCategory.LEGUMES },
    { name: 'Navy beans', category: FoodCategory.LEGUMES },
    { name: 'Lima beans', category: FoodCategory.LEGUMES },
    { name: 'Green peas', category: FoodCategory.LEGUMES },
    { name: 'Split peas', category: FoodCategory.LEGUMES },
    { name: 'Mung beans', category: FoodCategory.LEGUMES },
    { name: 'Soybeans', category: FoodCategory.LEGUMES },
    { name: 'Edamame', category: FoodCategory.LEGUMES },

    // NUTS & SEEDS
    { name: 'Almonds', category: FoodCategory.NUTS_SEEDS },
    { name: 'Walnuts', category: FoodCategory.NUTS_SEEDS },
    { name: 'Cashews', category: FoodCategory.NUTS_SEEDS },
    { name: 'Pistachios', category: FoodCategory.NUTS_SEEDS },
    { name: 'Peanuts', category: FoodCategory.NUTS_SEEDS },
    { name: 'Hazelnuts', category: FoodCategory.NUTS_SEEDS },
    { name: 'Brazil nuts', category: FoodCategory.NUTS_SEEDS },
    { name: 'Macadamia nuts', category: FoodCategory.NUTS_SEEDS },
    { name: 'Chia seeds', category: FoodCategory.NUTS_SEEDS },
    { name: 'Flaxseeds', category: FoodCategory.NUTS_SEEDS },
    { name: 'Sunflower seeds', category: FoodCategory.NUTS_SEEDS },
    { name: 'Pumpkin seeds', category: FoodCategory.NUTS_SEEDS },
    { name: 'Sesame seeds', category: FoodCategory.NUTS_SEEDS },
    { name: 'Hemp seeds', category: FoodCategory.NUTS_SEEDS },
    { name: 'Pine nuts', category: FoodCategory.NUTS_SEEDS },

    // FATS & OILS
    { name: 'Olive oil', category: FoodCategory.FATS_OILS },
    { name: 'Coconut oil', category: FoodCategory.FATS_OILS },
    { name: 'Avocado oil', category: FoodCategory.FATS_OILS },
    { name: 'Butter', category: FoodCategory.FATS_OILS },
    { name: 'Ghee', category: FoodCategory.FATS_OILS },
    { name: 'Lard', category: FoodCategory.FATS_OILS },
    { name: 'Tallow', category: FoodCategory.FATS_OILS },
    { name: 'Sesame oil', category: FoodCategory.FATS_OILS },
    { name: 'Peanut oil', category: FoodCategory.FATS_OILS },
    { name: 'Sunflower oil', category: FoodCategory.FATS_OILS },
    { name: 'Canola oil', category: FoodCategory.FATS_OILS },
    { name: 'Palm oil', category: FoodCategory.FATS_OILS },
    { name: 'Walnut oil', category: FoodCategory.FATS_OILS },
    { name: 'Flaxseed oil', category: FoodCategory.FATS_OILS },

    // SWEETS & DESSERTS
    { name: 'Chocolate', category: FoodCategory.SWEETS_DESSERTS },
    { name: 'Ice cream', category: FoodCategory.SWEETS_DESSERTS },
    { name: 'Cake', category: FoodCategory.SWEETS_DESSERTS },
    { name: 'Cookies', category: FoodCategory.SWEETS_DESSERTS },
    { name: 'Brownies', category: FoodCategory.SWEETS_DESSERTS },
    { name: 'Pudding', category: FoodCategory.SWEETS_DESSERTS },
    { name: 'Pastries', category: FoodCategory.SWEETS_DESSERTS },
    { name: 'Cheesecake', category: FoodCategory.SWEETS_DESSERTS },
    { name: 'Doughnuts', category: FoodCategory.SWEETS_DESSERTS },
    { name: 'Hard candy', category: FoodCategory.SWEETS_DESSERTS },
    { name: 'Gummies', category: FoodCategory.SWEETS_DESSERTS },
    { name: 'Tarts', category: FoodCategory.SWEETS_DESSERTS },
    { name: 'Muffins', category: FoodCategory.SWEETS_DESSERTS },
    { name: 'Pancakes', category: FoodCategory.SWEETS_DESSERTS },
    { name: 'Waffles', category: FoodCategory.SWEETS_DESSERTS },
    { name: 'Custard', category: FoodCategory.SWEETS_DESSERTS },
    { name: 'Fudge', category: FoodCategory.SWEETS_DESSERTS },
    { name: 'Macarons', category: FoodCategory.SWEETS_DESSERTS },

    // BEVERAGES
    { name: 'Water', category: FoodCategory.BEVERAGES },
    { name: 'Coffee', category: FoodCategory.BEVERAGES },
    { name: 'Green tea', category: FoodCategory.BEVERAGES },
    { name: 'Black tea', category: FoodCategory.BEVERAGES },
    { name: 'Herbal tea', category: FoodCategory.BEVERAGES },
    { name: 'Juice', category: FoodCategory.BEVERAGES },
    { name: 'Smoothies', category: FoodCategory.BEVERAGES },
    { name: 'Cow milk', category: FoodCategory.BEVERAGES },
    { name: 'Almond milk', category: FoodCategory.BEVERAGES },
    { name: 'Soy milk', category: FoodCategory.BEVERAGES },
    { name: 'Oat milk', category: FoodCategory.BEVERAGES },
    { name: 'Energy drinks', category: FoodCategory.BEVERAGES },
    { name: 'Sports drinks', category: FoodCategory.BEVERAGES },
    { name: 'Coconut water', category: FoodCategory.BEVERAGES },
    { name: 'Kombucha', category: FoodCategory.BEVERAGES },
    { name: 'Lemonade', category: FoodCategory.BEVERAGES },

    // HERBS & SPICES
    { name: 'Basil', category: FoodCategory.HERBS_SPICES },
    { name: 'Cilantro', category: FoodCategory.HERBS_SPICES },
    { name: 'Oregano', category: FoodCategory.HERBS_SPICES },
    { name: 'Thyme', category: FoodCategory.HERBS_SPICES },
    { name: 'Rosemary', category: FoodCategory.HERBS_SPICES },
    { name: 'Parsley', category: FoodCategory.HERBS_SPICES },
    { name: 'Dill', category: FoodCategory.HERBS_SPICES },
    { name: 'Mint', category: FoodCategory.HERBS_SPICES },
    { name: 'Sage', category: FoodCategory.HERBS_SPICES },
    { name: 'Bay leaves', category: FoodCategory.HERBS_SPICES },
    { name: 'Cinnamon', category: FoodCategory.HERBS_SPICES },
    { name: 'Clove', category: FoodCategory.HERBS_SPICES },
    { name: 'Nutmeg', category: FoodCategory.HERBS_SPICES },
    { name: 'Cardamom', category: FoodCategory.HERBS_SPICES },
    { name: 'Paprika', category: FoodCategory.HERBS_SPICES },
    { name: 'Turmeric', category: FoodCategory.HERBS_SPICES },
    { name: 'Cumin', category: FoodCategory.HERBS_SPICES },
    { name: 'Coriander', category: FoodCategory.HERBS_SPICES },
    { name: 'Ginger', category: FoodCategory.HERBS_SPICES },
    { name: 'Chili powder', category: FoodCategory.HERBS_SPICES },
    { name: 'Black pepper', category: FoodCategory.HERBS_SPICES },
    { name: 'White pepper', category: FoodCategory.HERBS_SPICES },
    { name: 'Mustard seeds', category: FoodCategory.HERBS_SPICES }
  ];

  // 🔹 Insert food first
  for (const food of foodItems) {
    await prisma.food.upsert({
      where: { name: food.name },
      update: {},
      create: {
        name: food.name,
        category: food.category
      }
    });
  }

  console.log('✅ Food Catalog seeded successfully');

  // 🔹 Fetch affliction IDs to use for `connect`
  const afflictionRecords = await prisma.affliction.findMany({
    where: { name: { in: afflictionsItems.map((f) => f) } }
  });

  // Convert array into an object for easy access
  const afflictionMap = afflictionRecords.reduce(
    (acc, affliction) => {
      acc[affliction.name] = affliction.id;
      return acc;
    },
    {} as Record<string, string>
  );

  // 🔹 Fetch affliction IDs to use for `connect`
  const foodRecords = await prisma.food.findMany({
    where: { name: { in: foodItems.map((f) => f.name) } }
  });

  // Convert array into an object for easy access
  const foodMap = foodRecords.reduce(
    (acc, food) => {
      acc[food.name] = food.id;
      return acc;
    },
    {} as Record<string, string>
  );

  // 🔹 Create or update user
  const user = await prisma.user.upsert({
    where: { email: 'paco@example.com' },
    update: {},
    create: {
      firstName: 'Paco',
      lastName: 'López',
      image: 'placeholder-user.jpg',
      email: 'paco@example.com',
      birthDate: new Date('1982-03-15'),
      gender: UserGender.MALE,
      country: 'Mexico',
      state: 'Veracruz',
      physicalActivity: PhysicalActivityLevel.ACTIVE,
      dietaryPreference: 'KETO',
      status: UserStatus.ACTIVE,
      role: UserRole.USER,

      Afflictions: {
        create: afflictionMap['Diabetes']
          ? [{ affliction: { connect: { id: afflictionMap['Diabetes'] } } }]
          : []
      },

      IncludedFoods: {
        create: foodMap['Tomato']
          ? [{ food: { connect: { id: foodMap['Tomato'] } } }]
          : []
      },

      ExcludedFoods: {
        create:
          foodMap['Gluten'] && foodMap['Seafood']
            ? [
                { food: { connect: { id: foodMap['Gluten'] } } },
                { food: { connect: { id: foodMap['Seafood'] } } }
              ]
            : []
      },

      SavedMenus: {
        create: [
          {
            name: 'Healthy Menu',
            items: ''
          }
        ]
      },

      HealthIndicators: {
        create: {
          weight: 110,
          height: 180,
          bmi: 0,
          bodyType: 'STOCKY'
        }
      }
    }
  });

  console.log('✅ User created or updated:', user);

  // 🔹 Create authentication entry for user
  await prisma.auth.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      authType: 'EMAIL',
      passwordHash: hashedPassword,
      isVerified: false
    }
  });

  console.log('✅ Auth entry created or updated');
}

main()
  .catch((error) => {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
