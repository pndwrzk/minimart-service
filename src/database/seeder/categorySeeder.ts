import { DB } from "../index";

const categories = [
  { name: "Electronics" },
  { name: "Clothing" },
  { name: "Books" },
  { name: "Furniture" },
];

async function seedCategories() {
await DB.sequelize.authenticate();
  await DB.Category.bulkCreate(categories, { ignoreDuplicates: true });
  console.log("Categories inserted!");
  process.exit();
}

seedCategories();
