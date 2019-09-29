const mongoose = require("mongoose");

const connection1 = mongoose.createConnection("mongodb://localhost/db1");
const connection2 = mongoose.createConnection("mongodb://localhost/db2");

const testSchema = new mongoose.Schema(
  {
    text: String,
    number: Number
  },
  {
    collection: "test"
  }
);

const TestModel1 = connection1.model("TestModel", testSchema);
const TestModel2 = connection2.model("TestModel", testSchema);

new TestModel1({ text: "text", number: 13 })
  .save()
  .then(() => console.log("test model 1 saved"))
  .catch(error => console.log(error));

  new TestModel2({ text: "text", number: 13 })
  .save()
  .then(() => console.log("test model 2 saved"))
  .catch(error => console.log(error));
