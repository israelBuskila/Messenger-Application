exports.saveToken = (token) => {
  sessionStorage["token"] = token;
};

exports.getToken = () => {
  return sessionStorage["token"];
};
