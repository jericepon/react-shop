import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Product } from "@/models/Product"
import { PopoverArrow } from "@radix-ui/react-popover"
import { Plus, ShoppingBasket } from "lucide-react"
import { AspectRatio } from '../ui/aspect-ratio'
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Skeleton } from "../ui/skeleton"
import { useState } from "react"
import { AddedToCartData } from "@/models/Cart"

const ProductCard = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState<string | number>(1)
  const [addedToCartData, setAddedToCartData] = useState<AddedToCartData[]>()
  const handleAddToCart = (product: Product) => {
    console.log(product);
    // dispatch(addCart({ userId: 1, productId: [{ id: product.id, quantity: Number(quantity) }] }))
  }
  return (
    <>
      <Card className="flex flex-col">
        <AspectRatio ratio={1 / 1} className="overflow-hidden p-6">
          <img src={product.thumbnail} alt={product.title} className="w-full bg-muted rounded-xl" />
        </AspectRatio>
        <CardHeader className="pt-0 mt-auto">
          <div className="flex gap-2">
            <div className="flex flex-col space-y-2 col-span-2">
              <CardTitle>{product.title}</CardTitle>
              <div className="text-sm text-muted-foreground col-span-2">{product.brand}</div>
            </div>
            <div className="w-[36px] ml-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="my-auto ml-auto">
                    <ShoppingBasket />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-4 rounded-md shadow-md w-auto">
                  <div className="flex items-center space-x-3 justify-center">
                    <Label>Quantity</Label>
                    <Input type="number" className="w-20" onChange={(e) => setQuantity(e.target.value)} value={quantity} />
                    <Button variant="outline" size="icon" className="my-auto ml-auto" onClick={() => handleAddToCart(product)}>
                      {/* {loading && <Loader2 className="animate-spin" />} */}
                      <Plus />
                    </Button>
                  </div>
                  <PopoverArrow height={9} className="fill-muted stroke-muted" />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div>${product.price}</div>
            <span className="text-sm text-muted-foreground">In Stock: {product.stock}</span>
          </div>
        </CardHeader>
      </Card>
    </>
  )
}

ProductCard.Loader = () => {
  return (
    <Card className="flex flex-col">
      <Skeleton className="aspect-square m-6" />
      <CardHeader className="pt-0 mt-auto">
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col space-y-2 col-span-2">
            <Skeleton className="h-4 w-[65%]" />
            <Skeleton className="h-3" />
          </div>
          <Skeleton className="h-[36px] w-[36px] my-auto ml-auto" />
        </div>
        <Skeleton className="h-4 w-[60px] mt-4" />
      </CardHeader>
    </Card>
  )
}

export default ProductCard