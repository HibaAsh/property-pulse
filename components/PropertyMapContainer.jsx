"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import Spinner from "./Spinner";

const Map = dynamic(() => import("./PropertyMap"), {
  ssr: false,
});

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(
    property.location?.latitude ?? null
  );

  const [lng, setLng] = useState(
    property.location?.longitude ?? null
  );

  const [isApproximate, setIsApproximate] = useState(false);

  const [loading, setLoading] = useState(
    property.location?.latitude == null ||
      property.location?.longitude == null
  );

  useEffect(() => {
    const geocodeAddress = async () => {
      // Coordinates already exist in MongoDB.
      // Don't call Nominatim.
      if (
        property.location?.latitude != null &&
        property.location?.longitude != null
      ) {
        setLat(property.location.latitude);
        setLng(property.location.longitude);
        setLoading(false);
        return;
      }

      try {
        const {
          street,
          city,
          state,
          zipcode,
        } = property.location;

        // --------------------------------------------------
        // 1. Try the complete address
        // --------------------------------------------------

        const params = new URLSearchParams({
          street: street || "",
          city: city || "",
          state: state || "",
          postalcode: zipcode || "",
          country: "United States",
          format: "jsonv2",
          limit: "1",
        });

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?${params}`
        );

        if (!response.ok) {
          throw new Error("Failed to geocode address");
        }

        let data = await response.json();

        console.log("Full address result:", data);

        // --------------------------------------------------
        // 2. If exact address wasn't found,
        //    try city + state
        // --------------------------------------------------

        if (!data.length) {
          console.log(
            "Exact address not found. Trying city/state..."
          );

          const fallbackParams = new URLSearchParams({
            city: city || "",
            state: state || "",
            country: "United States",
            format: "jsonv2",
            limit: "1",
          });

          const fallbackResponse = await fetch(
            `https://nominatim.openstreetmap.org/search?${fallbackParams}`
          );

          if (!fallbackResponse.ok) {
            throw new Error(
              "Failed to find fallback location"
            );
          }

          data = await fallbackResponse.json();

          console.log("City/state result:", data);

          if (!data.length) {
            throw new Error("Location not found");
          }

          setIsApproximate(true);
        }

        // --------------------------------------------------
        // 3. Get coordinates
        // --------------------------------------------------

        const latitude = Number(data[0].lat);
        const longitude = Number(data[0].lon);

        setLat(latitude);
        setLng(longitude);

        // --------------------------------------------------
        // 4. Save coordinates to MongoDB
        // --------------------------------------------------

        const saveResponse = await fetch(
          `/api/properties/${property._id}/location`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              latitude,
              longitude,
            }),
          }
        );

        if (!saveResponse.ok) {
          throw new Error(
            "Coordinates found but failed to save them"
          );
        }

        console.log("Coordinates saved successfully");
      } catch (error) {
        console.error("Geocoding error:", error);
      } finally {
        setLoading(false);
      }
    };

    geocodeAddress();
  }, [property]);

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (loading) {
    return <Spinner loading={loading} />;
  }

  // --------------------------------------------------
  // Location couldn't be found
  // --------------------------------------------------

  if (lat == null || lng == null) {
    return (
      <p>
        Unable to find the location of this property.
      </p>
    );
  }

  // --------------------------------------------------
  // Map
  // --------------------------------------------------

  return (
    <div>
      {isApproximate && (
        <p className="mb-2 text-sm text-gray-500">
          Showing approximate location for {property.location.city}.
        </p>
      )}

      <Map
        lat={lat}
        lng={lng}
        address={property.location}
      />
    </div>
  );
};

export default PropertyMap;