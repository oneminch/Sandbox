const config = {
  secret: "MY_SUPER_SECRET_KEY",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: true
  },
  resave: true,
  saveUninitialized: false
};

const logIn = (req, res, next) => {
  if (req.session.userId) {
    return res.redirect("/account");
  }
  const { sessionUsername, sessionPassword } = req.body;

  if (sessionUsername === "admin" && sessionPassword === "P4ss-w0rd") {
    req.session.userId = sessionUsername;
    return res.redirect(301, "/account")
  }

  res.status(401).send("Invalid credentials.");
}

const logOut = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send("Error Logging Out.");
    }
    return res.redirect(301, "/");
  });
}

module.exports = { config, logIn, logOut };
