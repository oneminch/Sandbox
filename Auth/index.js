const path = require("path");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");

const basicAuth = require("./middleware/basicAuth");
const sessionAuth = require("./middleware/sessionAuth");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sessionAuth.config))

app.get("/auth/basic", basicAuth);

app.post("/auth/session/login", sessionAuth.logIn);
app.post("/auth/session/logout", sessionAuth.logOut);

// app.post("/auth/oauth", (req, res) => { });
// app.post("/auth/oidc", (req, res) => { });

app.get("/account", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public", "account.html"));
});

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("*", (req, res) => {
  res.redirect(200, "/");
});

app.listen(8888, () => {
  console.log("Listening on port 8888");
})
