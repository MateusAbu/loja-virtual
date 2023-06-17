import Image from "next/image"
import { Carousel } from "../../materialTw"

type Product = {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        count: number
        rate: number
    }
}

type Props = {
    products: Product[]
}

export default function CustomCarousel({ products }: Props) {
    function getTopRatedProducts(products: Product[]): Product[] {
        const sortedProducts = [...products].sort(
            (a, b) => b.rating.rate - a.rating.rate
        )

        return sortedProducts.slice(0, 3)
    }

    const topRatedProducts = getTopRatedProducts(products)

    return (
        <div className="flex justify-center">
            <Carousel className="w-full lg:w-2/4 rounded-xl">
                {topRatedProducts.map((product) => (
                    <div
                        key={product.id}
                        className="w-full h-full flex items-center justify-center"
                    >
                        <div className="flex items-center justify-center h-[400px]">
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={400}
                                height={400}
                                className="object-fit w-full h-full"
                            />
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}
