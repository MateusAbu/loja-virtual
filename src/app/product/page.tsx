'use client'
import { useSearchParams } from 'next/navigation'
import useGetProducts from '../../hooks/useGetProducts'
import Image from 'next/image'
import {
    Card,
    Rating,
    CardBody,
    CardFooter,
    Button,
    Typography,
    Input,
    Spinner
} from "../../materialTw"
import {
    ShoppingCartIcon,
} from "@heroicons/react/24/outline"
import { useContext, useState } from 'react'
import { CartContext } from '@/hooks/useCart'
import ConfirmationModal from '../../components/confirmationModal/Modal'

export default function Product() {
    const params = useSearchParams()

    const [open, setOpen] = useState(false)
 
  const handleOpen = () => setOpen(!open)

    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const day = String(currentDate.getDate()).padStart(2, '0')

    const id = params.get('id') || undefined
    const { product, loading, error } = useGetProducts(id)

    const [quantity, setQuantity] = useState<string>('1')
    const { addToCart, cart } = useContext(CartContext)

    const handleAddToCart = () => {
        const item = {
            userId: 10,
            date: `${year}-${month}-${day}`,
            products: [
                {
                    productId: Number(id),
                    quantity: Number(quantity)
                }
            ]
        }
        addToCart(item)
        handleOpen()
    }

    return (
        <div className='flex justify-center my-10'>
            {loading ? (
                <Spinner className="h-12 w-12" />
            ) : (
                <>
                    {error && <p>Ocorreu um erro na requisição.</p>}
                    <Image
                        src={product?.image || '/placeholder-image.png'}
                        alt={product?.title || ''}
                        width={500}
                        height={400}
                        className="rounded-lg"
                    />
                    <Card className="w-[800px] ml-3 flex justify-between">
                        <CardBody>
                            <Typography variant="h2" color="black" className="mb-2">
                                {product?.title}
                            </Typography>
                            <hr />
                            <Typography className='my-3' variant="h4" color="gray">
                                Category: {product?.category}
                            </Typography>
                            <Typography className='my-3' variant="h4" color="blue-gray">
                                Description: {product?.description}
                            </Typography>
                            <Typography
                                color="blue-gray"
                                className="flex items-center gap-1.5 font-normal my-3"
                                variant="h4"
                            >
                                <Rating value={Math.round(product?.rating.rate || 0)} readonly />
                                ({product?.rating.count})
                            </Typography>
                            <Typography variant="h3" className="mt-3" color="blue-gray">
                                Price: ${product?.price}
                            </Typography>
                        </CardBody>
                        <CardFooter className="flex justify-between">
                            <div className='flex '>
                                <Input type='number' size='lg' label="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                            <div className="flex">
                                <Button className="flex items-center gap-3 mr-2" onClick={handleAddToCart}>
                                    Add to Cart <ShoppingCartIcon strokeWidth={2} className="h-5 w-5" />
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                    <ConfirmationModal open={open} handleOpen={handleOpen}/>
                </>
            )}
        </div>
    )
}
