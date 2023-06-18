import React, { useContext } from 'react'
import { CartContext } from '../../hooks/useCart'
import { Card, CardBody, IconButton, Input, Typography } from '@/materialTw'
import Image from 'next/image'
import Modal from './Modal'
import { TrashIcon } from "@heroicons/react/24/outline"

type Product = {
    productId: number
    quantity: number
}

type CartItem = {
    userId: number
    date: string
    products: Product[]
}

const CartCard: React.FC = () => {
    const { cart, cartDetails, updateCartItem, handleDelete } = useContext(CartContext)

    const calculateTotalPrice = () => {
        let totalPrice = 0

        cart.forEach((item) => {
            item.products.forEach((cartItem) => {
                const product = cartDetails.find((product) => product.id === cartItem.productId)

                if (product) {
                    totalPrice += product.price * cartItem.quantity
                }
            })
        })

        return totalPrice.toFixed(2)
    }

    const handleQuantityChange = (item: CartItem, quantity: number) => {
        const updatedItem = { ...item }
        updatedItem.products[0].quantity = quantity
        updateCartItem(updatedItem)
    }

    return (
        <div className="flex flex-col md:flex-row">
            <div className="md:w-3/4">
                {cart.map((item) => (
                    item.products.length === 0 ? (
                        <div key={item.userId} className="flex justify-center items-center h-screen">
                            <Typography variant="h2">Empty Cart</Typography>
                        </div>
                    ) : (
                        item.products.map((cartItem) => {
                            const product = cartDetails.find((product) => product.id === cartItem.productId)

                            return (
                                <Card key={cartItem.productId} data-testid="cart-item" className="flex flex-col md:flex-row items-center gap-4 my-4">
                                    <div>
                                        <Image
                                            className="rounded-lg"
                                            src={product?.image || ''}
                                            alt={product?.title || ''}
                                            height={300}
                                            width={300}
                                        />
                                    </div>
                                    <CardBody className="mx-5 flex flex-col">
                                        <div className="flex flex-row md:flex-col items-start justify-between">
                                            <div className="gap-2">
                                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                                    {product?.title}
                                                </Typography>
                                                <Typography variant="h5" color="black">
                                                    Price: ${product?.price}
                                                </Typography>
                                            </div>
                                            <div className="flex items-start gap-2 mt-2">
                                                <Typography variant="h5" color="black">
                                                    Quantity:
                                                </Typography>
                                                <Input
                                                    label="Quantity"
                                                    data-testid="quantity-input"
                                                    type="number"
                                                    value={cartItem.quantity}
                                                    onChange={(e) =>
                                                        handleQuantityChange(
                                                            { userId: item.userId, date: item.date, products: [{ ...cartItem }] },
                                                            Number(e.target.value)
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <IconButton
                                            color="red"
                                            className="mt-4 self-end"
                                            data-testid="trash-icon"
                                            onClick={() => handleDelete(item.userId, cartItem.productId)}
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </IconButton>
                                    </CardBody>
                                </Card>
                            )
                        })
                    )
                ))}
            </div>
                <div className="flex justify-center items-start md:w-1/4">
                    <Card className="pl-3 ml-2 mt-4">
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                Total Price: ${calculateTotalPrice()}
                            </Typography>
                            <Modal totalPrice={calculateTotalPrice()} />
                        </CardBody>
                    </Card>
                </div>
        </div>
    )
}
export default CartCard
