function validateDto(schema) {
  return async (req, res, next) => {
    try {
      const validatedBody = await schema.validate(req.body);
      req.body = validatedBody;
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = validateDto;
