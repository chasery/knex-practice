require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});

function searchShoppingList(term) {
  knexInstance
    .select()
    .from("shopping_list")
    .where("name", "ILIKE", `%${term}%`)
    .then((result) => {
      console.log(result);
    });
}

searchShoppingList("burg");
