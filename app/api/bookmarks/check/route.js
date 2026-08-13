import connectDB from "@/config/db";

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
    const isBookmarked = user.bookmarks.includes(propertyId);

    return new Response(
      JSON.stringify({
        isBookmarked,
      }),
    );
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
