const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../model/User");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
  "/signup",
  [
    check("username", "Please Enter a Valid Username").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { username, password } = req.body;
    var { email } = req.body;
    try {
      let user = await User.findOne({
        email,
      });
      if (user) {
        return res.status(400).json({
          msg: "User Already Exists",
        });
      }
      email = email.toLowerCase();

      user = new User({
        username,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { password } = req.body;
    var { email } = req.body;
    email = email.toLowerCase();

    try {
      let user = await User.findOne({
        email,
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist",
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !",
        });

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
            useremail: user.email,
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json({ user: user, msg: "Authorization Success" });
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

//add to cart
router.post("/additem", async (req, res) => {
  const userinfo = await User.findOne({ email: req.body.email });
  const findtarget = userinfo.order.find(
    (item) => item.id === req.body.item.id
  );

  if (!findtarget) {
    User.updateOne(
      { email: req.body.email },
      {
        $addToSet: { order: req.body.item },
      },
      function () {
        User.findOne({ email: req.body.email }).exec(function (error, use) {
          if (error) {
            throw error;
          } else {
            res.json({ sum: use.calsum(), id: req.body.item.id, order: use });
          }
        });
      }
    );
  } else {
    User.updateOne(
      {
        email: req.body.email,
        "order.id": req.body.item.id,
        // "order.quantity": { $gt: 0 },
      },
      {
        $inc: {
          "order.$.quantity": 1,
        },
      },
      function () {
        User.findOne({ email: req.body.email }).exec(function (error, use) {
          if (error) {
            throw error;
          } else {
            res.json({ sum: use.calsum(), id: req.body.item.id, order: use });
          }
        });
      }
    );
  }
});

//remove item
router.post("/removeitem", async (req, res) => {
  await User.updateOne(
    {
      email: req.body.email,
    },
    {
      $pull: {
        order: { id: req.body.item.id },
      },
    }
  );

  const arr = await User.findOne({ email: req.body.email });
  res.json({ sum: arr.calsum(), id: req.body.item.id, order: arr });
});

//add quantity
router.post("/addquantity", async (req, res) => {
  const userinfo = await User.findOne({ email: req.body.email });
  const findtarget = userinfo.order.find(
    (item) => item.id === req.body.item.id
  );

  if (findtarget) {
    User.findOneAndUpdate(
      {
        email: req.body.email,
        "order.title": findtarget.title,
      },
      {
        $inc: {
          "order.$.quantity": 1,
        },
      },
      { new: true },
      function (err, arr) {
        if (err) {
          throw err;
        }
        res.json({ sum: arr.calsum(), id: req.body.item.id, order: arr });
      }
    );
  }
});

//sub quantity
router.post("/subquantity", async (req, res) => {
  const userinfo = await User.findOne({ email: req.body.email });
  const findtarget = userinfo.order.find(
    (item) => item.id === req.body.item.id
  );

  if (findtarget) {
    User.findOneAndUpdate(
      {
        email: req.body.email,
        "order.id": req.body.item.id,
      },
      {
        $inc: {
          "order.$.quantity": -1,
        },
      },
      { new: true },
      function (err, arr) {
        if (err) {
          throw err;
        }
        User.findOneAndUpdate(
          { email: req.body.email, "order.quantity": 0 },
          {
            $pull: {
              order: { id: req.body.item.id },
            },
          },
          { new: true },
          function (err, findzero) {
            if (err) {
              throw err;
            }
            // console.log("111111111111111111111111111111111111111", findzero);

            if (findzero !== null)
              res.json({
                sum: findzero.calsum(),
                id: req.body.item.id,
                order: findzero,
              });
            else {
              res.json({ sum: arr.calsum(), id: req.body.item.id, order: arr });
            }
          }
        );
      }
    );
  }
});

//FIXME:
router.post("/addshipment",  (req, res) => {
   User.findOneAndUpdate(
    {
      email: req.body.email,
    },
    { $set: { shipment: true } },
    { new: true },
    function (error, use) {
      if (error) {
        throw error;
      } else {
        res.json({ sum: use.calsum() + 10, order: use });
      }
    }
  );
});

//FIXME:
router.post("/subshipment",  (req, res) => {
   User.findOneAndUpdate(
    {
      email: req.body.email,
    },
    { $set: { shipment: false } },
    { new: true },
    function (error, use) {
      if (error) {
        throw error;
      } else {
        res.json({ sum: use.calsum() , order: use });
      }
    }
  );
});

// router.post("/toggleitem", async (req, res) => {
//   User.findOne(
//     {
//       email: req.body.email,
//     },
//     function (err, use) {
//       if (err) {
//         throw err;
//       } else {
//         use.shipment = !use.shipment;
//         use.save();
//       }
//     }
//   );

//   await User.findOne({ email: req.body.email }).exec(function (error, use) {
//     if (error) {
//       throw error;
//     } else {
//       if (use.shipment) {
//         res.json({ sum: use.calsum() + 10, id: req.body.item.id });
//       } else {
//         res.json({ sum: use.calsum(), id: req.body.item.id });
//       }
//     }
//   });
// });

module.exports = router;
