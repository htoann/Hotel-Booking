const APIFeatures = require("./apiFeatures");

exports.deleteOne = (Model, callback) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id, callback);

    if (!doc) {
      return res.status(404).send({ error: "No document found with that id" });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return res.status(404).send({ error: "No document found with that id" });
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

exports.createOne = (Model, callback) => async (req, res, next) => {
  try {
    const doc = await Model.create(req.body, callback);

    res.status(201).json({
      status: "success",
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

exports.getOne = (Model, callback) => async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id, callback);

    if (!doc) {
      return res.status(404).send({ error: "No document found with that id" });
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAll = (Model) => async (req, res, next) => {
  try {
    const features = new APIFeatures(Model.find(), req.query).sort().paginate();

    const doc = await features.query;

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};