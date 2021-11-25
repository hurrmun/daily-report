exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("material")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("material").insert([
        { material: "10mm" },
        { material: "20mm" },
        { material: "Sand" },
        { material: "Dust" },
        { material: "OPC" },
        { material: "Slag" },
      ]);
    });
};
