import connectDB from "@/config/db";
import Property from "@/models/Property";

// GET /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB()

    const { id } = await params

    const property = await Property.findById(id)

    return new Response(JSON.stringify({
      success: true,
      data: property
    }));
  } catch (error) {
    console.error("error: ", error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
