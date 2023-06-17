'use client'
import React, { createContext, useState, useEffect, ReactNode } from 'react'

type Product = {
    productId: number
    quantity: number
}

type CartItem = {
    userId: number
    date: string
    products: Product[]
}

type ProductDetails = {
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

type CartContextType = {
    cart: CartItem[]
    cartDetails: ProductDetails[]
    addToCart: (item: CartItem) => void
    updateCartItem: (item: CartItem) => void
    handleDelete: (userId: number, productId: number) => void
}

export const CartContext = createContext<CartContextType>({
    cart: [],
    cartDetails: [],
    addToCart: () => { },
    updateCartItem: () => { },
    handleDelete: () => { },
})

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([])
    const [cartDetails, setCartDetails] = useState<ProductDetails[]>([])

    useEffect(() => {
        const storedCart = localStorage.getItem('cart')
        if (storedCart) {
            setCart(JSON.parse(storedCart))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        const fetchProductDetails = async () => {
            const productIds = cart.flatMap((item) => item.products.map((product) => product.productId))
            const requests = productIds.map((productId) => fetch(`https://fakestoreapi.com/products/${productId}`))
            const responses = await Promise.all(requests)
            const products = await Promise.all(responses.map((response) => response.json()))
            setCartDetails(products)
        }

        fetchProductDetails()
    }, [cart])

    const addToCart = async (item: CartItem) => {
        try {
            const existingCart = cart.find((cartItem) => cartItem.userId === item.userId)

            if (existingCart) {
                const updatedCart = existingCart.products.concat(item.products)
                await fetch(`https://fakestoreapi.com/carts/${existingCart.userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...existingCart, products: updatedCart }),
                })
                setCart((prevCart) =>
                    prevCart.map((cartItem) => (cartItem.userId === item.userId ? { ...cartItem, products: updatedCart } : cartItem))
                )
            } else {
                await fetch('https://fakestoreapi.com/carts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(item),
                })
                setCart((prevCart) => [...prevCart, item])
            }
        } catch (error) {
            console.error('Error adding item to cart:', error)
        }
    }

    const updateCartItem = async (item: CartItem) => {
        const existingCart = cart.find((cartItem) => cartItem.userId === item.userId)
        if (existingCart) {
            try {
                const updatedCart = existingCart.products.map((product) => {
                    if (product.productId === item.products[0].productId) {
                        // Atualiza a quantidade do produto no carrinho
                        return { ...product, quantity: item.products[0].quantity }
                    }
                    return product
                })

                await fetch(`https://fakestoreapi.com/carts/${existingCart.userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...existingCart, products: updatedCart }),
                })

                setCart((prevCart) =>
                    prevCart.map((cartItem) =>
                        cartItem.userId === item.userId ? { ...cartItem, products: updatedCart } : cartItem
                    )
                )
            } catch (error) {
                console.error('Error updating item in cart:', error)
            }
        }
    }

    const handleDelete = async (userId: number, productId: number) => {
        try {
            const existingCart = cart.find((cartItem) => cartItem.userId === userId)

            if (existingCart) {
                const updatedProducts = existingCart.products.filter((product) => product.productId !== productId)

                await fetch(`https://fakestoreapi.com/carts/${existingCart.userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...existingCart, products: updatedProducts }),
                })

                setCart((prevCart) =>
                    prevCart.map((cartItem) =>
                        cartItem.userId === userId ? { ...cartItem, products: updatedProducts } : cartItem
                    )
                )
            }
        } catch (error) {
            console.error('Error deleting item from cart:', error)
        }
    }


    return (
        <CartContext.Provider value={{ cart, cartDetails, addToCart, updateCartItem, handleDelete }}>
            {children}
        </CartContext.Provider>
    )
}
