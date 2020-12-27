require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});

function searchShoppingList(searchTerm) {
  knexInstance
    .select()
    .from("shopping_list")
    .where("name", "ILIKE", `%${searchTerm}%`)
    .then((result) => {
      console.log(result);
    });
}

// searchShoppingList("burg");

function paginateShoppingList(pageNumber) {
  const itemsPerPage = 6;
  const offset = itemsPerPage * (pageNumber - 1);

  knexInstance
    .select()
    .from("shopping_list")
    .limit(itemsPerPage)
    .offset(offset)
    .then((result) => {
      console.log(result);
    });
}

// paginateShoppingList(2);

function itemsAddedAfter(daysAgo) {
  knexInstance
    .select()
    .from("shopping_list")
    .where(
      "date_added",
      ">",
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    //.orderBy({ column: "date_added", order: "DESC" })
    .then((result) => {
      console.log(result);
    });
}

itemsAddedAfter(10);
