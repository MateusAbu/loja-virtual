import { useState, useLayoutEffect } from 'react'


const useGetGategory = (): {
    categories: string[]
} => {
    const [categories, setCategories] = useState<string[]>([])

    useLayoutEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products/categories')
                const data = await response.json()
                setCategories(data)
            } catch (error) {
                console.error('Error fetching categories')
            }
        }

        fetchCategories()
    }, [])

    return { categories }
}

export default useGetGategory
