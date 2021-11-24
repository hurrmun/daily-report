exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("supplier")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("supplier").insert([
        { name: "YTL" },
        { name: "Asia" },
        { name: "KKL" },
        { name: "Kwong Fong" },
        { name: "HDB Site A" },
        { name: "HDB Site B" },
        { name: "HDB Site C" },
      ]);
    });
};
