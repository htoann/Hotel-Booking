const APIFeatures = require("./apiFeatures");

exports.deleteOne = (Model, username) => async (req, res, next) => {
  try {
    if (req.params.username == "admin") {
      return res.status(404).send({ error: "Can not delete admin" });
    }
    const doc = username
      ? await Model.findOneAndDelete({ username: req.params.username })
      : await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return res.status(404).send({ error: "No document found with that id" });
    }

    res.status(200).json("Deleted successfully");
  } catch (error) {
    next(error);
  }
};

exports.updateOne = (Model, username) => async (req, res, next) => {
  try {
    const doc = username
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

exports.createOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: doc,
    });
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
