const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("login");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("./keys");

require("dotenv").config();

const nodemailer = require("nodemailer");

//Email Configuration..

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  logger: true,
  debug: true,

  auth: {
    user: "",//write email
    pass: "",//write google app password eg: "abcd efgh ijkl mnop"
  },
  tls: {
    rejectUnauthorized: true,
  },
});

router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/SignUp", (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  if (!name || !email || !password) {
    res.status(422).json({ error: "Please Add All The Fields" });
  }

  USER.findOne({ $or: [{ email: email }, { name: name }] }).then(
    (savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User Already Exists With That Email Id Or Name" });
      }

      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new USER({
          name,
          email,
          password: hashedPassword,
        });

        user
          .save()
          .then((user) => {
            res.json({ message: "Registered Sucessfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  );
});

router.post("/admin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please Add Email Id And Password" });
  }
  USER.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(401).json({ error: "Email Id Is Not Registered" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((match) => {
        if (match) {
          const token = jwt.sign({ _id: savedUser.id }, Jwt_secret);

          if (email == "admin@gmail.com" && password == "Admin@123") { //set admin email and password for login to admin panel
            const { _id, name, email } = savedUser;
            res.json({ token, user: { _id, name, email } });
            console.log({ token, user: { _id, name, email } });
          } else {
            return res
              .status(422)
              .json({ error: "Invalid Password or Invalid Email Id " });
          }
        } else {
          return res.status(422).json({ error: "Invalid Password " });
        }
      })
      .catch((err) => console.log(err));
  });
});
router.post("/SignIn", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please Add Email Id And Password" });
  }
  USER.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(401).json({ error: "Email Is Not Registered" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((match) => {
        if (match) {
          const token = jwt.sign({ _id: savedUser.id }, Jwt_secret);
          const { _id, name, email } = savedUser;
          res.json({ token, user: { _id, name, email } });
          console.log({ token, user: { _id, name, email } });
        } else {
          return res.status(422).json({ error: "Invalid Password " });
        }
      })
      .catch((err) => console.log(err));
  });
});

router.get("/SignUp", (req, res) => {
  res.redirect("/");
});

//Send Email Link for Reset Password

router.post("/sendpasswordlink", async (req, res) => {
  console.log(req.body);

  const { email } = req.body;

  if (!email) {
    res.status(401).json({ status: 401, message: "Enter Your Email Id" });
  }

  try {
    const userfind = await USER.findOne({ $or: [{ email: email }] });

    //token geenrate for reset password

    const token = jwt.sign({ _id: userfind._id }, Jwt_secret, {
      expiresIn: "120s",
    });

    const setusertoken = await USER.findByIdAndUpdate(
      { _id: userfind._id },
      { verfiytoken: token },
      { new: true }
    );

    if (setusertoken) {
      const mailOptions = {
        from: "",//write email
        to: email,
        subject: "Sending Email For Password Reset",
        text: `This Link Valid For 2 MINUTES http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verfiytoken}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(401).json({ status: 401, message: "Email Not Sent" });
        } else {
          console.log("Email Sent", info.response);
          res
            .status(201)
            .json({ status: 201, message: "Email Sent Sucessfully." });
        }
      });
    }

    console.log("userfind", userfind);
  } catch (error) {
    res.status(401).json({ status: 401, message: "Invalid User" });
  }
});

//Verify user for Forgot Password Time

router.get("/forgotpassword/:id/:token", async (req, res) => {
  const { id, token } = req.params;

  try {
    const validuser = await USER.findOne({ _id: id, verfiytoken: token });

    const verfiyToken = jwt.verify(token, Jwt_secret);

    if (validuser && verfiyToken._id) {
      res.status(201).json({ status: 201, validuser });
    } else {
      res.status(401).json({ status: 401, message: "User Does Not Exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

//change Password

router.post("/:id/:token", async (req, res) => {
  const { id, token } = req.params;

  const { password } = req.body;

  try {
    const validuser = await USER.findOne({ _id: id, verfiytoken: token });

    const verfiyToken = jwt.verify(token, Jwt_secret);

    if (validuser && verfiyToken._id) {
      const newpassword = await bcrypt.hash(password, 12);

      const setnewuserpass = await USER.findByIdAndUpdate(
        { _id: id },
        { password: newpassword }
      );

      setnewuserpass.save();

      res.status(201).json({ status: 201, setnewuserpass });
    } else {
      res.status(401).json({ status: 401, message: "User Does Not Exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

router.post("/googleLogin", (req, res) => {
  const { email_verified, email, name, clientId, userName, Photo } = req.body;

  if (email_verified) {
    USER.findOne({ email: email }).then((savedUser) => {
      if (savedUser) {
        const token = jwt.sign({ _id: savedUser.id }, Jwt_secret);
        const { _id, name, email } = savedUser;
        res.json({ token, user: { _id, name, email } });
        console.log({ token, user: { _id, name, email } });
      } else {
        const password = email + clientId;

        const user = new USER({
          name,
          email,
          userName,
          password: password,
          Photo,
        });

        user
          .save()
          .then((user) => {
            let userId = user._id.toString();

            const token = jwt.sign({ _id: userId }, Jwt_secret);
            const { _id, name, email } = user;
            res.json({ token, user: { _id, name, email } });
            console.log({ token, user: { _id, name, email } });
          })

          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
});

module.exports = router;
