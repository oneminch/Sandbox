const basicAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.setHeader("WWW-Authenticate", "Basic")
    return res.status(401).send("Authentication Required.");
  }

  const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');

  if (username === "admin" && password === "P4ss-w0rd") {
    return res.redirect(301, "/account")
  }

  res.status(401).send("Invalid credentials.");
}

module.exports = basicAuth;
