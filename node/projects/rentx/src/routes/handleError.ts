const handleError = (err, req, res, next) => {
    console.error(err.stack);
    res.status(400).send({ error: err.message });
};


export { handleError };