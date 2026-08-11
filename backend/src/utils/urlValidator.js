const validUrl = require("valid-url");

const validateUrl = (url) => {
  if (!url) return false;
  if (validUrl.isUri(url)) return true;
  return false;
};

module.exports = { validateUrl };
