exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("entry")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("entry").insert([
        {
          date: new Date(),
          user_id: 1,
          material_id: 4,
          supplier_id: 2,
          ordered_load: 3,
          received_load: 3,
          "quantity(MT)": 4.23,
          remarks: "",
        },
        {
          date: new Date(),
          user_id: 1,
          material_id: 4,
          supplier_id: 3,
          ordered_load: 2,
          received_load: 2,
          "quantity(MT)": 8.62,
          remarks: "",
        },
        {
          date: new Date(),
          user_id: 2,
          material_id: 5,
          supplier_id: 1,
          ordered_load: 5,
          received_load: 3,
          "quantity(MT)": 10.22,
          remarks: "",
        },
        {
          date: new Date(2021, 11, 23),
          user_id: 1,
          material_id: 4,
          supplier_id: 2,
          ordered_load: 3,
          received_load: 3,
          "quantity(MT)": 4.23,
          remarks: "",
        },
        {
          date: new Date(2021, 11, 23),
          user_id: 1,
          material_id: 4,
          supplier_id: 3,
          ordered_load: 2,
          received_load: 2,
          "quantity(MT)": 8.62,
          remarks: "",
        },
        {
          date: new Date(2021, 11, 21),
          user_id: 2,
          material_id: 5,
          supplier_id: 1,
          ordered_load: 5,
          received_load: 3,
          "quantity(MT)": 10.22,
          remarks: "",
        },
      ]);
    });
};
