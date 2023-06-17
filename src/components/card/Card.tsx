import Image from "next/image"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "../../materialTw"
import {
    StarIcon,
} from "@heroicons/react/24/solid"
import Link from "next/link"

interface CardProductProps {
    product: {
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
}

export default function ProductCard({ product }: CardProductProps) {

    function truncateTitle(title: string) {
        if (title.length <= 30) {
            return title
        }

        return title.substring(0, 30).trim() + "..."
    }

    return (
        <Card className="w-full max-w-[26rem] h-[500px] shadow-lg flex">
            <CardHeader floated={false}>
                <Image
                    src={product.image}
                    alt={product.title}
                    className="object-fit w-auto h-60 mx-auto"
                    width={1470}
                    height={400}
                />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </CardHeader>
            <CardBody className="">
                <div className="mb-3 flex flex-col justify-between h-full">
                    <div>
                        <Link href={{ pathname: '/product', query: { id: product.id } }}>
                            <Typography id={product.id} variant="h3" color="blue-gray" className="font-bold"
                                onMouseOver={(e: any) => e.target.style.textDecoration = 'underline'}
                                onMouseOut={(e: any) => e.target.style.textDecoration = 'none'}>
                                {truncateTitle(product.title)}
                            </Typography>
                        </Link>
                        <Typography
                            color="blue-gray"
                            className="flex items-center gap-1.5 font-normal"
                            variant="h4"
                        >
                            <StarIcon className="-mt-0.5 h-7 w-7 text-yellow-700" />
                            {`${product.rating.rate} (${product.rating.count})`}
                        </Typography>
                    </div>
                </div>
            </CardBody>
            <CardFooter className="pt-3 flex justify-end" style={{ position: 'absolute', bottom: 0 }}>
                <Typography variant="h3" className="" color="blue-gray">
                    Price: ${product.price}
                </Typography>
            </CardFooter>
        </Card>
    )
}