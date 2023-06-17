'use client'

import { Typography } from '@/materialTw'
import CartCard from "../../components/cartCard/CartCard"

const Page: React.FC = () => {

    return (
        <div className="flex flex-col justify-center items-center h-full">
            <Typography variant="h1">Cart</Typography>
            <CartCard />
        </div>
    )
}

export default Page
