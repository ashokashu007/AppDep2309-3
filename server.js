const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/uploads", express.static("uploads"));

let connectToMDB = async () => {
  try {
    mongoose.connect(process.env.dbPath);
    console.log("Connected to MDB");
  } catch (err) {
    console.log("Unable to connect MDB");
    console.log(err);
  }
};

app.post("/signup", upload.array("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  let userArr = await User.find().and({ email: req.body.email });

  if (userArr.length > 0) {
    req.json({ status: "failure", msg: "User already exist." });
  } else {
    let hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
      let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: parseInt(req.body.age),
        email: req.body.email,
        password: hashedPassword,
        profilePic: req.files[0].path,
      });

      await newUser.save();
      res.json({ status: "success", msg: "User Created Successfully" });
    } catch (err) {
      res.json({ status: "failure", err: err });
    }
  }
});

app.post("/login", upload.none(), async (req, res) => {
  console.log(req.body);

  let fetchedData = await User.find().and({ email: req.body.email });

  console.log(fetchedData);

  if (fetchedData.length > 0) {
    let passwordResult = await bcrypt.compare(
      req.body.password, //user typed
      fetchedData[0].password //from DB stored
    );

    if (passwordResult == true) {
      let token = jwt.sign(
        { email: req.body.email, password: req.body.password },
        "ashu",
        { expiresIn: "60secs" }
      ); //username and password are given into object and then that object and secret (or) private key both are given into the sign method
      //then by that sign method we generates a token
      let dataToSend = {
        firstName: fetchedData[0].firstName,
        lastName: fetchedData[0].lastName,
        age: fetchedData[0].age,
        email: fetchedData[0].email,
        profilePic: fetchedData[0].profilePic,
        token: token, //after generating the token we send that token to the client along with the user details
      };

      res.json({ status: "success", data: dataToSend });
    } else {
      res.json({ status: "failure", msg: "Invalid Password" });
    }
  } else {
    res.json({ status: "failure", msg: "User doesnot exist" });
  }
});

app.put("/updateProfile", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);

  console.log(req.file);
  try {
    if (req.body.firstName.length > 0) {
      await User.updateMany(
        { email: req.body.email },
        { firstName: req.body.firstName }
      );
    }

    if (req.body.lastName.length > 0) {
      await User.updateMany(
        { email: req.body.email },
        { lastName: req.body.lastName }
      );
    }

    if (req.body.age.length > 0) {
      await User.updateMany({ email: req.body.email }, { age: req.body.age });
    }

    if (req.body.password.length > 0) {
      await User.updateMany(
        { email: req.body.email },
        { password: req.body.password }
      );
    }

    if (req.file && req.file.path) {
      await User.updateMany(
        { email: req.body.email },
        { profilePic: req.file.path }
      );
    }

    res.json({ status: "success", msg: "User updated successfully" });
  } catch (err) {
    res.json({ status: "failure", msg: "Something went Wrong", err: err });
  }
});

app.delete("/deleteProfile", async (req, res) => {
  console.log(req.query.email);
  try {
    await User.deleteMany({ email: req.query.email });

    res.json({ status: "success", msg: "User deleted successfully" });
  } catch (err) {
    res.json({ status: "failure", msg: "Unable to delet profile", err: err });
  }
});

app.post("/validateToken", upload.none(), async (req, res) => {
  console.log(req.body.token);

  try {
    let decryptedObj = jwt.verify(req.body.token, "ashu");

    console.log(decryptedObj);

    let fetchedData = await User.find().and({ email: decryptedObj.email });

    console.log(fetchedData);

    if (fetchedData.length > 0) {
      if (fetchedData[0].password === decryptedObj.password) {
        let dataToSend = {
          firstName: fetchedData[0].firstName,
          lastName: fetchedData[0].lastName,
          age: fetchedData[0].age,
          email: fetchedData[0].email,
          profilePic: fetchedData[0].profilePic,
        };

        res.json({ status: "success", data: dataToSend });
      } else {
        res.json({ status: "failure", msg: "Invalid Password" });
      }
    } else {
      res.json({ status: "failure", msg: "User doesnot exist" });
    }
  } catch (err) {
    res.json({ status: "failure", msg: "Invalid token", err: err });
  }
});

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  profilePic: String,
});

let User = new mongoose.model("user5", userSchema);

app.listen(process.env.port, (req, res) => {
  console.log(`Listening to port ${process.env.port}`);
});

connectToMDB();
