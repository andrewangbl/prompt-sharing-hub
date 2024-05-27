import {Schema, model, models} from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    unique: [true, 'This email is already registered'],
  },
  username:{
    type: String,
    required: [true, 'Please provide a username'],
    match:[/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
  },
  image:{
    type: String,
  }
});

// for serverless functions
const User = models.User || model("User", UserSchema);
// Need more explanation this line:
// The 'models' object is provided by Mongoose and it stores all the registered models.
// If a model named "User" already exists in the 'models' object, it assigns that
// existing model to the 'User' variable.
// This prevent redefining the model and ensures that the existing model is reused.

// If a model namsed "User" does not exist in the "models" object, the "model" function
// from Mongoose is called to create a new model
// The newly created model is then assigned to the "User" variable.

export default User;
