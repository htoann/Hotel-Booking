const APIFeatures = require("./apiFeatures");
const { createError } = require("./createMessage");

exports.deleteOne = (Model, newParams) => async (req, res, next) => {
  try {
    if (req.params.username == "admin") {
      return createError(res, 403, "Can not delete admin");
    }
    const doc = newParams
      ? await Model.findOneAndDelete({ username: req.params.username })
      : await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return createError(res, 404, "No document found with that id");
    }

    return createMessage(res, 200, "Deleted successfully");
  } catch (error) {
    next(error);
  }
};

exports.updateOne = (Model, newParams) => async (req, res, next) => {
  try {
    const doc = newParams
      ? await Model.findOneAndUpdate(
          { username: req.params.username },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        )
      : await Model.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });

    if (!doc) {
      return createError(res, 404, "No document found with that id");
    }

    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};

exports.createOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);

    res.status(201).json(doc);
  } catch (error) {
    next(error);
  }
};

exports.getOne = (Model, newParams) => async (req, res, next) => {
  try {
    const doc = newParams
      ? await Model.findOne({ username: req.params.username })
      : await Model.findById(req.params.id);
    if (!doc) {
      return createError(res, 404, "No document found with that id");
    }

    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};

exports.getAll = (Model) => async (req, res, next) => {
  try {
    const features = new APIFeatures(Model.find(), req.query).sort().paginate();

    const doc = await features.query;

    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};
