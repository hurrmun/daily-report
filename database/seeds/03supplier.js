exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("supplier")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("supplier").insert([
        { supplier: "YTL" },
        { supplier: "Asia" },
        { supplier: "KKL" },
        { supplier: "Kwong Fong" },
        { supplier: "HDB Site A" },
        { supplier: "HDB Site B" },
        { supplier: "HDB Site C" },
      ]);
    });
};
