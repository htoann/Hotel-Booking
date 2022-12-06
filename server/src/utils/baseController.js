const APIFeatures = require("./apiFeatures");
const { createError, createMessage } = require("./createMessage");

exports.deleteOne = (Model) => async (req, res) => {

  try {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return createError(res, 404, "No document found with that id");
    }

    return createMessage(res, 200, "Deleted successfully");
  } catch (error) {
    return createError(res, 404, error || "No document found with that id");
  }
};

exports.updateOne = (Model, reqUser) => async (req, res) => {
  if (req.body.isAdmin) {
    return createError(res, 404, "You can't update the role");
  }
  try {
    const doc = await Model.findByIdAndUpdate(
          reqUser ? req.user.id : req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

    if (!doc) {
      return createError(res, 404, "No document found with that id");
    }

    res.status(200).json(doc);
  } catch (error) {
    return createError(res, 404, error || "No document found with that id");
  }
};

exports.createOne = (Model) => async (req, res) => {
  try {
    const doc = await Model.create(req.body);

    res.status(201).json(doc);
  } catch (error) {
    return createError(res, 404, error || "No document found with that id");
  }
};

exports.getOne = (Model, newParams) => async (req, res) => {
  try {
    const doc = newParams
      ? await Model.findOne({ username: req.params.username })
      : await Model.findById(req.params.id);
    if (!doc) {
      return createError(res, 404, "No document found with that id");
    }

    res.status(200).json(doc);
  } catch (error) {
    return createError(res, 404, error || "No document found with that id");
  }
};

exports.getAll = (Model) => async (req, res, next) => {
  try {
    const features = new APIFeatures(Model.find(req.query), req.query)
      .sort()
      .paginate();

    const doc = await features.query;

    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};

// exports.deleteField = (Model, field) => async (req, res, next) => {
//   try {
//     await Model.updateMany({}, { $unset: `{ ${field}: 1 }` }, { multi: true });

//     return createMessage(res, 200, "Delete field successfully");
//   } catch (error) {
//     return createError(res, 404, error || "No document found with that id");
//   }
// };