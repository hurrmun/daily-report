const queries = require("../database/dbqueries");
// const ErrorResponse = require("../utils/errorResponse");

exports.getReportsByDate = async (req, res, next) => {
  const { date } = req.params;
  // console.log(date);
  // const user = await queries.findUserByUsername(req.user[0].username);
  const entries = await queries.getEntriesByDate(new Date(date));
  const allEntries = {};
  for (const entry of entries) {
    const username = entry.username;
    if (!allEntries[username]) {
      allEntries[username] = 0;
    }
    allEntries[username] += 1;
  }
  try {
    res.status(200).json({
      success: true,
      data: {
        user: req.user,
        date: date,
        entries: allEntries,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getReportByUser = async (req, res, next) => {
  const { date, username } = req.params;
  // console.log(date);
  // const user = await queries.findUserByUsername(req.user[0].username);
  const entries = await queries.getEntriesByUser(new Date(date), username);

  try {
    res.status(200).json({
      success: true,
      data: {
        user: req.user,
        date: date,
        entries: entries,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getOptions = async (req, res, next) => {
  const options = {};
  options.materials = await queries.getMaterials();
  options.suppliers = await queries.getSuppliers();

  try {
    res.status(200).json({
      success: true,
      data: {
        user: req.user,
        options: options,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.submitReport = async (req, res, next) => {
  const report = req.body.entries;
  console.log(report);
  for (const entry of report) {
    queries.createEntry(entry, req.user);
  }
  try {
    res.status(200).json({
      success: true,
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.submitReport = async (req, res, next) => {
  const report = req.body.entries;
  for (const entry of report) {
    queries.createEntry(entry, req.user);
  }
  try {
    res.status(200).json({
      success: true,
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.editReport = async (req, res, next) => {
  const { date } = req.params;
  const report = req.body.entries;
  // console.log("date", date, new Date(date));
  queries.deleteEntry(new Date(date), req.user);
  for (const entry of report) {
    queries.createEntry(entry, req.user);
  }
  try {
    res.status(200).json({
      success: true,
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
