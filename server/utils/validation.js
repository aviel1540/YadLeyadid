exports.checkEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
};

exports.addSlashes = (text) => {
  return text.replace(/'/g, "\\'");
};

exports.isEmpty = (value) => {
  if (!value) return false;
  return true;
};

exports.checkPassword = (password) => {
  if (password.length <= 8) return false;
  return true;
};

exports.checkUsername = (username) => {
  if (username.length <= 1) return false;
  return true;
};
