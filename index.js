const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");

const config = require("./config/key");

//application/x-www-form-urlencoded 을 분석해서 가져옴
app.use(bodyParser.urlencoded({ extended: true }));

//application/json 을 분석해서 가져옴
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! 오늘은?? 입니다. ~");
});

app.post("/register", (req, res) => {
  //회원 가입 시 필요한 정보 client 에서 가져오면 그걸 DB에 넣어준다.

  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
