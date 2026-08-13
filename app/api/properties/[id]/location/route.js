import { NextResponse } from "next/server";

import connectDB from "@/config/db";
import Property from "@/models/Property";

export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json(
        {
          message: "Property not found",
          id,
        },
        { status: 404 },
      );
    }

    // Coordinates already exist.
    // Don't call/update them again.
    if (
      property.location?.latitude != null &&
      property.location?.longitude != null
    ) {
      return NextResponse.json({
        message: "Coordinates already exist",
        coordinates: {
          latitude: property.location.latitude,
          longitude: property.location.longitude,
        },
      });
    }

    const body = await request.json();

    const { latitude, longitude } = body;

    if (
      typeof latitude !== "number" ||
      typeof longitude !== "number"
    ) {
      return NextResponse.json(
        {
          message: "Latitude and longitude must be numbers",
        },
        { status: 400 },
      );
    }

    property.location.latitude = latitude;
    property.location.longitude = longitude;

    await property.save();

    return NextResponse.json({
      message: "Coordinates saved successfully",
      coordinates: {
        latitude: property.location.latitude,
        longitude: property.location.longitude,
      },
      property,
    });
  } catch (error) {
    console.error("SAVE COORDINATES ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to save coordinates",
        error: error.message,
      },
      { status: 500 },
    );
  }
}