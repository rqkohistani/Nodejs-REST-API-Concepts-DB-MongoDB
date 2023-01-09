const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

/**
 * mongoose.model"Just like the name of the file Employee.js
 * By default mongoose when it creates Employee model will set the Employee to lowercase and plural. so it will look for an employees collection in mongodb.
 * Mongoose automatically looks for the plural,lowercased version of the model name.
 * https://mongoosejs.com/docs/models.html
 */
module.exports = mongoose.model("Employee", employeeSchema);
