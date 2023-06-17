import { Fragment, useState } from "react"
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react"

interface ModalProps {
    totalPrice: string
}

export default function Modal({ totalPrice }: ModalProps) {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(!open)

    const handleConfirm = () => {
        localStorage.removeItem("cart")
        handleOpen()
        window.location.reload()
    }

    return (
        <Fragment>
            <Button className='flex mx-auto' onClick={handleOpen} variant="gradient">
                Checkout
            </Button>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Checkout</DialogHeader>
                <DialogBody divider>
                    Confirm your purchase, in total value of $ {totalPrice}?
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleConfirm}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </Fragment>
    )
}
