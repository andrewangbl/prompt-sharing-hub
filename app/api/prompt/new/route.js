import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// req parameter represents the incoming request object.
export const POST = async (req) => {
  const {userId, prompt, tag} = await req.json();
  // This parses the JSON body of the request and extracts userId, prompt, and tag from it.

  try {
    await connectToDB(); // establishes a connection to the database.
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag
    })
    // A new instance of the Prompt model is created with the extracted data (userId, prompt, and tag).

    await newPrompt.save(); // saves the new prompt to the database.
    return new Response(JSON.stringify(newPrompt), {status: 201}); // returns a successful response with the newly created prompt.

  } catch (error){
    return new Response("Failed to create prompt", {status: 500}); //server error
  }
}
