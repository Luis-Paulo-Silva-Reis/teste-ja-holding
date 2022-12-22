const User = require("../models/User");
const Login = require("../models/Login");
const bcrypt = require("bcryptjs");

module.exports = {
  async store(req, res) {
    // Validate the request body
    if (!req.body.name || !req.body.username || !req.body.password) {
      return res
        .status(400)
        .json({ error: "Name, username, and password are required" });
    }
    if (req.body.username.length < 3) {
      return res
        .status(400)
        .json({ error: "Username must be at least 3 characters long" });
    }
    if (req.body.password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    const { name, username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    } else {
      return res.status(201).json("Username sucessfull register");
    }
    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user
    try {
      const user = await User.create({
        name,
        username,
        password: hashedPassword,
      });
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create user" });
    }
  },
  async index(req, res) {
    const user = await User.findAll();

    return res.json(user);
  },

  async login(req, res) {
    // Make sure the request body exists and has the expected properties
    if (!req.body || !req.body.username || !req.body.password) {
      return res.status(400).send({ message: "Missing username or password" });
    }
    // Get the username and password from the request body
    const { username, password } = req.body;

    // Find the user with the matching username
    try {
      const user = await User.findOne({ username });
      // If no user was found, return a 401 status
      if (!user) {
        return res
          .status(401)
          .send({ message: "Invalid username or password" });
      }
      // Compare the provided password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
      // If the password is incorrect, return a 401 status
      if (!passwordMatch) {
        return res
          .status(401)
          .send({ message: "Invalid username or password" });
      }
    } catch (error) {
      return res.status(500).send({ message: "Error while logging in" });
    }

    // If the username and password are correct, create a JWT
    const token = jwt.sign({ sub: User.username }, "secretkey", {
      expiresIn: "3h",
    });
    // Send the JWT in the response
    res.json({ token });

    console.log(`User ${User.username} logged in successfully`);
  },
};
