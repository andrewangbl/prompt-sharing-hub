import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// req: Represents the incoming request object.
export const GET = async (req, {params}) => { // params gets populated if you pass dynamic variables to the url
  try {
    await connectToDB();//

    const prompts = await Prompt.find({
      creator: params.id
    }).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
}

// Retrieves all "prompt" documents from the database and populates the creator field.
// This endpoint is used to fetch all prompts created by a specific user.
