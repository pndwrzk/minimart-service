import { DB } from "../index";
import { faker } from "@faker-js/faker";

async function seedProducts() {
  try {
    await DB.sequelize.authenticate();

    const categories = await DB.Category.findAll();
    if (categories.length === 0) {
      console.log("No categories found. Please run categorySeeder first!");
      process.exit(1);
    }

    const totalProducts = 20;
    const totalImages = 5;
    const products = Array.from({ length: totalProducts }, (_, idx) => {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const imageNumber = (idx % totalImages) + 1;

 
  return {
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    stock: Math.floor(Math.random() * 100),
    category_id: category.id as number,
    description: faker.commerce.productDescription(),
    image_path: `uploads/products/product-${imageNumber}.jpg`
  };
});


    await DB.Product.bulkCreate(products);
    console.log(`${products.length} products inserted successfully!`);
  } catch (err) {
    console.error("Product seeding failed:", err);
  } finally {
    await DB.sequelize.close();
  }
}

seedProducts();
