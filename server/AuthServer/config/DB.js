const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

mongoose.set('strictQuery', false);

exports.connect = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to DB successfully!");
    })
    .catch((err) => {
      console.log("ERROR WHILE CONNECTING TO DB");
      console.error(err);
      process.exit(1);
    });
};