const payload = function getPayload(req) {
  let payload = {};
  for (const key in req.body) {
    payload[key] = req.body[key];
  }
  return payload;
};

module.exports = payload;
