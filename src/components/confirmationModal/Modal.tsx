import { Fragment } from "react"
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
} from "@/materialTw"
import { ShoppingCartIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

interface ModalProps {
  open: boolean
  handleOpen: () => void
}
 
export default function ConfirmationModal({open , handleOpen} : ModalProps) {

  return (
    <Fragment>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody divider className="grid place-items-center gap-4">
          <ShoppingCartIcon className="h-16 w-16 text-green-500" />
          <Typography color="green" variant="h4">
            Items Added successfully
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            close
          </Button>
          <Link href="/cart">
                    <Button variant="outlined" color="blue" className="ml-5 flex">
                        <ShoppingCartIcon className="h-4 w-4 mr-2" /> Go to Cart
                    </Button>
                </Link>
        </DialogFooter>
      </Dialog>
    </Fragment>
  )
}