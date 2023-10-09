import app from "./app.js";
import mongoose from "mongoose";

//4N9FXd3Y4cHgBt7y
//4N9FXd3Y4cHgBt7y

//mongodb+srv://HennadiiBu:4N9FXd3Y4cHgBt7y@cluster0.nj7si8i.mongodb.net/?retryWrites=true&w=majority

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
