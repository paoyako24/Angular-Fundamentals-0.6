export function handleErrors(err, _, res, next) {
    const { status = 500, message } = err;
    return res.status(status).send(message);
}
