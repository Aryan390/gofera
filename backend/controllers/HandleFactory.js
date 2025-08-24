const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

// deleting factory handler
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

// updating factory handler
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

// creating factory handler
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (req.user) req.body.userId = req.user._id;
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

// popOption = populate options
exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // const doc = await Model.findById(req.params.id).populate('reviews');

    let query = Model.findById(req.params.id);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let userId = req?.user?._id;

    if (!userId) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized: user ID not found in request",
      });
    }

    const doc = await Model.find({ userId });

    // console.log(doc);

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
