const yup = require("yup");

module.exports = yup.object().shape({
  email: yup.string().required().email(),
  username: yup.string().trim().required(),
  password: yup.string().min(6).required(),
});
