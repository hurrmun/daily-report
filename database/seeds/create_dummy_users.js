exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "John Doe",
          email: "johndoe@example.com",
          password_hash: "johndoe",
        },
        {
          username: "Jane Doe",
          email: "janedoe@example.com",
          password_hash: "janedoe",
        },
      ]);
    });
};
