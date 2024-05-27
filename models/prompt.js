 import mongoose, {Schema, model, models} from 'mongoose';

const PromptSchema = new Schema({
  creator:{
    type: Schema.Types.ObjectId,
    ref:'User', // one to many relationship: one user can have many prompts
  },
  prompt:{
    type: String,
    required: [true, 'Please provide a prompt'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required'],
  }
})
 // the creator is going to be a document in the database, more specifically the user type

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;
