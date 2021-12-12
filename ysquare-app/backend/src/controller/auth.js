const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role },process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
};

const verifyPassword = async(password,hash_password) => {
  return await bcrypt.compare(password,hash_password);
}

exports.signup = async(req, res) => {
  try{
    const { userName, email, password,role } = req.body;
    var checkUser = await User.findOne({ email: email });
    if(checkUser) {
       res.status(401).json({
         msg:"User already register"
       })
    }
    else {
    const hash_password = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      hash_password,
      userName,
      role
    });
    user.save();
    if (user) {
      const token = generateJwtToken(user._id, user.role);
       res.cookie('jwt',token);
      return res.status(201).json({
        msg: "User signup sucessfully done",
        data: token
      });
    }
  }
  }
  catch(err) {
    console.log("Error",err.message);
    res.status(400).json({
      msg: err.message || 'Something went wrong'
    })
  }
}
exports.signin = async(req, res) => {
  try{
    var user = await User.findOne({ email: req.body.email })
      if(user) {
        const isPassword = await verifyPassword(req.body.password,user.hash_password);
        if(isPassword){
            var token = generateJwtToken(user._id,user.role);
            res.status(200).json({
              msg:"User login success",
              data: token
            })
        }
        else {
          res.status(401).json({
            msg:"User access denied",
            data: token
          })
        }
    }
  }
  catch(err) {
    console.log(err.message);
    res.status(401).json({
      msg:"Something went wrong",
    })
  }
};

exports.getCustomerList = async(req,res) => {
  try{
    const customerList = await User.find({
      role : { $in: [ 'customer' ] },
    }).select('_id userName email role')
    res.status(200).json({
      msg: "Get customer list sucessfully",
      data: customerList
    })
  }
  catch(err) {
    res.status(200).json({
      msg: "Get customer list failed",
      error: err.message
    })
  }
}

exports.getManagerList = async(req,res) => {
  try{
    const managerList = await User.find({
      role : { $in: [ 'manager' ] },
    }).select('_id userName email role')
    res.status(200).json({
      msg: "Get manager list sucessfully",
      data: managerList
    })
  }
  catch(err) {
    res.status(200).json({
      msg: "Get manager list failed",
      error: err.message
    })
  }
}


exports.getAdminList = async(req,res) => {
  try{
    const adminList = await User.find({
      role : { $in: [ 'admin' ] },
    }).select('_id userName email role')
    res.status(200).json({
      msg: "Get admin list sucessfully",
      data: adminList
    })
  }
  catch(err) {
    res.status(200).json({
      msg: "Get admin list failed",
      error: err.message
    })
  }
}
