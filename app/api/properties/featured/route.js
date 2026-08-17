import connectDB from "@/config/db";
import Property from "@/models/Property";

// GET /api/properties/featured
export const GET = async (request) => {
    try {
        await connectDB();

        const properties = await Property.find({ is_featured: true });

        return new Response(JSON.stringify(properties));
    } catch (error) {
        console.error("error: ", error);
        return new Response("Something went wrong", {
            status: 500,
        });
    }
};