import connectDB from "@/config/db";
import Property from "@/models/Property";

import User from "@/models/User";

import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// POST /api/bookmarks
export const POST = async (request) => {
  try {
    await connectDB();

    const { propertyId } = await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId)
      return new Response("User ID is required", { status: 401 });

    const { userId } = sessionUser;

    // Find user in DB
    const user = await User.findById(userId);

    // Check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

    let message;

    if (isBookmarked) {
      // If already bookmarked, remove it
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed successfully";
      isBookmarked = false;
    } else {
      // If not boolkmarked, add it
      user.bookmarks.push(propertyId);
      message = "Bookmark added successfully";
      isBookmarked = true;
    }

    await user.save();

    return new Response(
      JSON.stringify({
        message,
        isBookmarked,
      }),
    );
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// GET /api/bookmarks
export const GET = async (request) => {
  try {
    await connectDB()

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId)
      return new Response("User ID is required", { status: 401 });

    const { userId } = sessionUser;

    // Find user in DB
    const user = await User.findById(userId);

    // Get user's bookmarks
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } })

    return new Response(JSON.stringify(bookmarks))
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 })
  }
}