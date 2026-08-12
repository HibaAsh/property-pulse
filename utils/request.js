const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch all properties
async function fetchProperties() {
  try {
    // Handle the case where the domain is not availabe yet
    if (!API_DOMAIN) return [];

    const res = await fetch(`${API_DOMAIN}/properties`, {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
    // throw error
  }
}

// Fetch single property
async function fetchProperty(propertyId) {
  try {
    // Handle the case where the domain is not availabe yet
    if (!API_DOMAIN) return null;

    const res = await fetch(`${API_DOMAIN}/properties/${propertyId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
    // throw error
  }
}

export { fetchProperties, fetchProperty };
