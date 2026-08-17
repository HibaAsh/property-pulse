"use client"

import Image from "next/image";

import { Gallery, Item } from "react-photoswipe-gallery";

const PropertyImages = ({ images }) => {
  if (images.length === 0) return (
    <p>Images are unavailable for now</p>
  )

  return (
    <Gallery>
      <section className="bg-blue-50 sm:p-4">
        <div className="container mx-auto">
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width={1000}
              height={600}
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={images[0]}
                  alt=""
                  className="object-cover h-[400px] w-full sm:rounded-xl cursor-pointer"
                  width={1800}
                  height={600}
                  loading="eager"
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={
                    images.length === 3 && index === 2
                      ? "sm:col-span-2"
                      : "col-span-1"
                  }
                >
                  <Item
                    original={image}
                    thumbnail={image}
                    width={1000}
                    height={600}
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={image}
                        alt=""
                        className="object-cover h-[400px] w-full sm:rounded-xl cursor-pointer"
                        width={1000}
                        height={600}
                        sizes="100vw"
                        loading="eager"
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImages;
