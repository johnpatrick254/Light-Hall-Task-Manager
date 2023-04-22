const passport = require("passport");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "oshf908wde78t029478ojf";

const { Strategy, ExtractJwt } = require("passport-jwt");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const User = require("../models/User");

const strategy = new Strategy(options, function (jwt_payload, done) {
  User.findById(jwt_payload.id)
    .then((user) => done(null, user))
    .catch((error) => done(error));
});

passport.use(strategy);
passport.initialize();

const requireToken = passport.authenticate("jwt", { session: false });

const createUserToken = (req, user) => {
  if (!user || !req.body.password) {
    if(!user || !req.body.password || !bcrypt.compareSync(req.body.password, user.password)) {
    const error = new Error("The username or password is incorrect");
    error.statusCode = 422;
    throw error;
  }}
  return jwt.sign({ id: user._id }, secret, { expiresIn: 36000 });
};

module.exports = {
  requireToken,
  createUserToken,
};
