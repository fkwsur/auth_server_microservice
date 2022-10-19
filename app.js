const express = require("express");
const app = express();
const { jwt } = require("./utills");
const dotenv = require('dotenv');
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/generate', (req,res) => {
  try {
    let {id, user_id} = req.query
    let rxauth = jwt.createRefreshToken(id.toString());
    let token = jwt.createToken(user_id);
    return res.status(200).json({
      "rxauth" : rxauth,
      "xauth" : token
    })
  } catch (error) {
    console.log(error)
  }
})
app.get('/xauthgenerate', (req,res) => {
  try {
    let {user_id} = req.query
    let token = jwt.createToken(user_id);
    return res.status(200).json({
      "xauth" : token
    })
  } catch (error) {
    console.log(error)
  }
})

app.get('/verify', (req,res) => {
  try {
    let {xauth} = req.headers
    let decoded = jwt.verifyToken(xauth);
    if(decoded){
      return res.status(200).json({
        "user_id" : decoded.user_id
      })
    }
  } catch (error) {
    console.log(error)
  }
})

app.get('/rxauthverify', (req,res) => {
  try {
    let {rxauth} = req.headers
    let decoded = jwt.verifyRefreshToken(rxauth);
    return res.status(200).json({
      "id" : decoded.id
    })
  } catch (error) {
    console.log(error)
  }
})


app.listen(8082, () => console.log('running'))