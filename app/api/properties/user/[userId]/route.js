import connectDB from "@/config/db";
import Property from "@/models/Property";

// GET /api/properties/user/:userId
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const { userId } = await params;

    if (!userId)
      return new Response("User ID is required", {
        status: 400,
      });

    const properties = await Property.find({ owner: userId });

    return new Response(JSON.stringify(properties));
  } catch (error) {
    console.error("error: ", error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
