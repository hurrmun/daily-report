exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("material")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("material").insert([
        { name: "10mm" },
        { name: "20mm" },
        { name: "Sand" },
        { name: "Dust" },
        { name: "OPC" },
        { name: "Slag" },
      ]);
    });
};
