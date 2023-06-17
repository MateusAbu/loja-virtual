'use client'
import CustomCarousel from "@/components/carrousel/Carousel"
import useGetProducts from "../hooks/useGetProducts"
import ProductCard from "@/components/card/Card"
import useGetGategory from "@/hooks/useGetCategory"
import { Select, Option, Spinner, Typography } from "./../materialTw"
import { useState } from "react"

export default function Home() {
  const { products, loading, error } = useGetProducts()
  const { categories } = useGetGategory()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredProducts = selectedCategory && selectedCategory !== 'all'
    ? products.filter((product) => product.category === selectedCategory)
    : products

  const handleOptionChange = (event: any) => {
    setSelectedCategory(event)
  }

  return (
    <main className="flex flex-col">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <Spinner className="h-12 w-12" />
        </div>
      ) : (
        <>
          {error &&
            <div className="flex items-center justify-center h-screen">
              <Typography variant="h1">Ocorreu um erro na requisição.</Typography>
            </div>
          }

          <div className="mt-5">
            <CustomCarousel products={products} />
          </div>

          <div className="flex flex-col mt-5">
            <div className="w-full sm:w-2/4 mx-auto mb-5 sm:mb-0 sm:pr-5 my-3 flex justify-end">
              <div className="w-full sm:w-auto">
                <Select label="Categories" value={selectedCategory} onChange={handleOptionChange}>
                  <Option key="all" value="all">All</Option>
                  {categories.map((option) => (
                    <Option key={option} value={option}>{option}</Option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="w-full sm:w-3/4 flex flex-wrap justify-center mx-auto">
              {filteredProducts.map((product) => (
                <div className="flex my-5 mx-3 w-full md:w-1/2 lg:w-1/3 xl:w-1/5" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  )
}
