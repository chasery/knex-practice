require("dotenv").config();
const { expect } = require("chai");
const supertest = require("supertest");
const ShoppingListService = require("../src/shopping-list-service");
const knex = require("knex");

describe(`Shopping list service object`, function () {
  let db;
  let testProducts = [
    {
      id: 1,
      name: "Fish Tricks",
      price: "14.99",
      date_added: new Date("2029-01-22T16:28:32.615Z"),
      checked: false,
      category: "Main",
    },
    {
      id: 2,
      name: "Peppy Long Stockings",
      price: "5.99",
      date_added: new Date("2100-05-22T16:28:32.615Z"),
      checked: true,
      category: "Snack",
    },
    {
      id: 3,
      name: "Salsy",
      price: "2.99",
      date_added: new Date("1919-12-22T16:28:32.615Z"),
      checked: false,
      category: "Breakfast",
    },
  ];

  before(() => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
  });

  before(() => db("shopping_list").truncate());
  afterEach(() => db("shopping_list").truncate());

  after(() => db.destroy());

  context(`Given 'shopping_list' has data`, () => {
    beforeEach(() => {
      return db.into("shopping_list").insert(testProducts);
    });

    it(`getAllProducts() resolves all products from 'shopping_list' table`, () => {
      return ShoppingListService.getAllProducts(db).then((actual) => {
        expect(actual).to.eql(testProducts);
      });
    });

    it(`getById() resolves a product by id from 'shopping_list' table`, () => {
      const thirdId = 3;
      const thirdTestProduct = testProducts[thirdId - 1];
      return ShoppingListService.getById(db, thirdId).then((actual) => {
        expect(actual).to.eql({
          id: thirdId,
          name: thirdTestProduct.name,
          price: thirdTestProduct.price,
          date_added: thirdTestProduct.date_added,
          checked: thirdTestProduct.checked,
          category: thirdTestProduct.category,
        });
      });
    });

    it(`deleteProduct() removes a product by id from 'shopping_list' table`, () => {
      const productId = 3;
      return ShoppingListService.deleteProduct(db, productId)
        .then(() => ShoppingListService.getAllProducts(db))
        .then((allProducts) => {
          const expected = testProducts.filter(
            (product) => product.id !== productId
          );
          expect(allProducts).to.eql(expected);
        });
    });

    it(`updateProduct() updates a product from the 'shopping_list' table`, () => {
      const idOfProductToUpdate = 3;
      const newProductData = {
        name: "updated name",
        price: "3.99",
        date_added: new Date(),
        checked: true,
        category: "Snack",
      };
      return ShoppingListService.updateProduct(
        db,
        idOfProductToUpdate,
        newProductData
      )
        .then(() => ShoppingListService.getById(db, idOfProductToUpdate))
        .then((product) => {
          expect(product).to.eql({
            id: idOfProductToUpdate,
            ...newProductData,
          });
        });
    });
  });

  context(`Given 'shopping_list' has no data`, () => {
    it(`getAllProducts() resolves an empty array`, () => {
      return ShoppingListService.getAllProducts(db).then((actual) => {
        expect(actual).to.eql([]);
      });
    });

    it(`insertProduct() inserts a new product and resolves the new product with an 'id'`, () => {
      const newProduct = {
        name: "Test new product",
        price: "2.99",
        date_added: new Date("2020-01-01T00:00:00.000Z"),
        checked: false,
        category: "Main",
      };

      return ShoppingListService.insertProduct(db, newProduct).then(
        (actual) => {
          expect(actual).to.eql({
            id: 1,
            name: newProduct.name,
            price: newProduct.price,
            date_added: newProduct.date_added,
            checked: newProduct.checked,
            category: newProduct.category,
          });
        }
      );
    });
  });
});
