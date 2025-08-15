import ProductInfo from "@/components/productDetail/ProductionInfo";
import RatingProgressBar from "@/components/productDetail/RatingProgressBar";
import ReviewCardContainer from "@/components/productDetail/ReviewCardContainer";
import ReviewForm from "@/components/productDetail/ReviewForm";
import ProductSection from "@/components/home/ProductSection";
import Modal from "@/components/uiComponentes/Modal";
import { Star } from "lucide-react";
import React from "react";

// Fetch product
const getProduct = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Product not found");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

// Page component
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = await Promise.resolve(params); 
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className=" min-h-screen text-center text-red-500 py-20 text-xl">
        Product not found
      </div>
    );
  }

  return (
    <>
      <ProductInfo product={product} />

      <div className="main-max-width padding-x mx-auto min-h-screen">
        <h3 className="font-semibold text-xl text-center my-6 text-gray-800">
          Customer Reviews
        </h3>

        <div className="w-full flex py-6 gap-6 flex-wrap items-center justify-between max-md:justify-center">
          <div className="w-[250px] h-[250px] bg-gray-100 rounded-lg px-4 py-6 flex flex-col gap-3 items-center justify-center shadow-lg">
            <h1 className="text-5xl font-bold text-gray-800">5.0</h1>
            <small className="text-gray-600 text-sm">of 10 review(s)</small>
            <div className="flex gap-2">
              <Star className="fill-black w-5 h-5" />
              <Star className="fill-black w-5 h-5" />
              <Star className="fill-black w-5 h-5" />
              <Star className="fill-black w-5 h-5" />
              <Star className="fill-gray-100 w-5 h-5" />
            </div>
          </div>

          <div className="flex flex-col gap-6 w-[700px] max-md:w-full">
            <RatingProgressBar rating="Excellent" numRating={10} />
            <RatingProgressBar rating="Very Good" numRating={8} />
            <RatingProgressBar rating="Good" numRating={6} />
            <RatingProgressBar rating="Fair" numRating={5} />
            <RatingProgressBar rating="Poor" numRating={3} />
          </div>
        </div>

        <div className="flex justify-center items-center w-full mb-5">
          <Modal>
            <ReviewForm />
          </Modal>
        </div>
      </div>

      <ReviewCardContainer />
      <ProductSection title="Products from the same category" />
    </>
  );
}
