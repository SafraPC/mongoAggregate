const mongoose = require("mongoose");

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });
  console.log("Database Connected");
};
module.exports = connect;
