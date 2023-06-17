import Link from "next/link"
import {
    Navbar,
    Typography,
    IconButton,
    Button,
    Input,
} from "../../materialTw"
import { ShoppingCartIcon } from "@heroicons/react/24/solid"

export default function Header() {
    return (
        <Navbar className="mx-auto max-w-screen-xl px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
                <Typography
                    as="a"
                    href="/"
                    variant="h6"
                    className="mr-4 ml-2 cursor-pointer py-1.5 text-xl"
                >
                    Kamel Store
                </Typography>

                <Link href="/cart">
                    <IconButton variant="outlined" color="blue" className="ml-5">
                        <ShoppingCartIcon className="h-4 w-4" />
                    </IconButton>
                </Link>
            </div>
        </Navbar>
    )
}