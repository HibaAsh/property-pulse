"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Link from "next/link";

import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import PropertySearchForm from "@/components/PropertySearchForm";

import { FaArrowAltCircleLeft } from "react-icons/fa";

const searchResultsPage = () => {
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search/?location=${location}&propertyType=${propertyType}`,
        );

        if (res.status === 200) {
          const prop = await res.json();
          setProperties(prop.data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [location, propertyType]);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:underline mb-3 flex items-center"
          >
            <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back to Properties
          </Link>
          <h1 className="text-2xl mb-4">Search Results</h1>
          {properties.length === 0 ? (
            <p>No properties found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <span key={property._id}>
                  <PropertyCard key={property._id} property={property} />
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default searchResultsPage;
