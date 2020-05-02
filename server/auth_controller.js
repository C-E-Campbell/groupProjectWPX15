const bcrypt = require("bcryptjs");
const redis = require("redis");
const client = redis.createClient(6379);

module.exports = {
  register: async (req, res, next) => {
    const { first, last, email, password, campus, status } = req.body;
    const db = req.app.get("db");
    const foundUser = await db.find_user_by_email(email);
    if (foundUser.length) {
      res.status(400).send("user already exist");
    } else {
      const saltRounds = 12;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await db.create_user([
        first,
        last,
        email,
        hashedPassword,
        campus,
        status
      ]);

      req.session.user = req.session.user = {
        id: newUser[0].user_id,
        email: newUser[0].email,
        first: newUser[0].first,
        last: newUser[0].last
      };

      res.status(200).send(req.session.user);
    }
  },
  login: async (req, res, next) => {
    const { email, password } = req.body;
    const db = req.app.get("db");

    try {
      const checkForUser = await db.find_user_by_email([email]);
      if (!checkForUser[0]) {
        res
          .status(401)
          .send("Cant find that account. You may need to register");
      } else {
        client.set(`${email}:password`, password); // store session instead
        let checkPass = bcrypt.compareSync(password, checkForUser[0].password);
        if (checkPass) {
          req.session.user = {
            id: checkForUser[0].user_id,
            email: checkForUser[0].email,
            first: checkForUser[0].first,
            last: checkForUser[0].last
          };
          res.status(200).send(req.session.user);
        } else {
          res.status(401).send("not valid email/pass");
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  logout: (req, res, next) => {
    req.session.destroy();
    res.status(200).send("Logout successful");
  },
  getNames: async (req, res, next) => {
    const db = req.app.get("db");
    const result = await db.get_names_by_id();
    return res.status(200).send(result);
  },
  getCampusAndEmail: async (req, res, next) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const result = await db.get_campus_email([+id]);
    return res.status(200).send(result);
  },
  checkCache: (req, res, next) => {
    const { email } = req.body;

    if (client.get(`${email}:password`)) {
      client.get(`${email}:password`, (err, data) => {
        res.send(data);
      });
    } else {
      res.send("no cache");
    }
  }
};
