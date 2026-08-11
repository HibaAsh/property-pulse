import connectDB from "@/config/db";
import Property from "@/models/Property";

// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB()

    const properties = await Property.find({})

    return new Response(JSON.stringify({
      success: true,
      data: properties
    }));
  } catch (error) {
    console.error("error: ", error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
