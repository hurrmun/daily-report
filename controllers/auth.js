exports.register = async (req, res, next) => {
  res.send("register route");
};

exports.login = async (req, res, next) => {
  res.send("login route");
};

exports.forgotpassword = async (req, res, next) => {
  res.send("forgot password route");
};

exports.resetpassword = async (req, res, next) => {
  res.send("resetpassword route");
};
