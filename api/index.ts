//import { sequelize } from "./src/db";
import app from "./src/app";
import "./db";
//import { createdTest } from "./test";

app.listen(3001, function () {
  console.log("App is listening on port 3001!");
  // createdTest()
});
