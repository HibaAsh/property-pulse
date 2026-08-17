import { fetchProperties } from "@/utils/requests"
import FeaturedPropertyCard from "./FeaturedPropertyCard"

const FeaturedProperties = async () => {
    const featuredProperties = await fetchProperties({
        showFeatured: true
    })

    return featuredProperties.length > 0 && (
        <section className="bg-blue-50 px-4 pt-6 pb-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
                    Featured Properties
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredProperties.map((featuredProperty) => (
                        <FeaturedPropertyCard key={featuredProperty._id} featuredProperty={featuredProperty} />
                    ))}
                </div>
            </div>
        </section>

    )
}

export default FeaturedProperties