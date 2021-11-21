const knex = require("../utils/knex");
const express = require("express");
const router = express.Router();

// const test = async () => {
//   const result = await knex.select().from("test").where({ id: 1 });
//   console.log(result);
// };

// test();

router.get("/", async (req, res) => {
  const result = await knex.select().from("test").where({ id: 1 });
  // console.log(result);
  // const dummyData = [
  //   { name: "datapoint new", description: "first test" },
  //   { name: "datapoint old", description: "first test part 2" },
  // ];
  res.json(result);
});

module.exports = router;
