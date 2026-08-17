"use client"

import { useState, useEffect } from "react";

import PropertyCard from "@/components/PropertyCard";

import Spinner from "./Spinner";
import Pagination from "./Pagination";

const Properties = () => {
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [totalItems, setTotalItems] = useState(0)

    const handlePageChange = (newPage) => {
        setPage(newPage)
    }

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await fetch(`/api/properties/?page=${page}&pageSize=${pageSize}`)

                if (!res.ok) {
                    throw new Error("Failed to fetch properties")
                }

                const prop = await res.json()
                setProperties(prop.data)
                setTotalItems(prop.total)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        }

        fetchProperties()
    }, [page, pageSize])

    if (loading) {
        return <Spinner loading={loading} />;
    }

    if (properties.length === 0) {
        return <p>No Property Listing yet.</p>;
    }

    return (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
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

            <Pagination page={page} pageSize={pageSize} totalItems={totalItems} onPageChange={handlePageChange} />
        </section>
    )
}

export default Properties