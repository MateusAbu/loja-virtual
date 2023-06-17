import { useState, useLayoutEffect } from 'react'

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
};

const useGetProducts = (id?: string): {
    products: Product[]
    product: Product | null
    loading: boolean
    error: string | null
} => {
    const [products, setProducts] = useState<Product[]>([])
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useLayoutEffect(() => {
        const fetchProducts = async () => {
            try {
                if (id) {
                    const url = `https://fakestoreapi.com/products/${id}`
                    const response = await fetch(url)
                    const data = await response.json()
                    setProduct(data)
                } else {
                    const url = 'https://fakestoreapi.com/products'
                    const response = await fetch(url)
                    const data = await response.json()
                    setProducts(data)
                }
                setLoading(false)
            } catch (error) {
                setError('Error fetching products')
                setLoading(false)
            }
        }

        fetchProducts()
    }, [id])

    return { products, product, loading, error }
};

export default useGetProducts
