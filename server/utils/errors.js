function makeError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function toError(status, message, details) {
  const err = new Error(message);
  err.status = status;
  if (details !== undefined) err.details = details;
  return err;
}

module.exports = { makeError, toError };