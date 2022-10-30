export const createError = (res, status, message) => {
    const err = new Error();
    err.status = status || 500;
    err.message = message || "Something went wrong";
    return res.status(status).send({
        message,
    });
};

export const createMessage = (res, status, message) => {
    const err = new Error();
    err.status = status || 200;
    err.message = message || "Successfully";
    return res.status(status).send({
        message,
    });
};
