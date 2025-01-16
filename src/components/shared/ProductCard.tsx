import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AspectRatio } from '../ui/aspect-ratio'
import { Product } from "@/models/Product"
import { Skeleton } from "../ui/skeleton"
import { Plus } from "lucide-react"

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <>
      <Card className="flex flex-col">
        <AspectRatio ratio={1 / 1} className="overflow-hidden p-6">
          <img src={product.thumbnail} alt={product.title} className="w-full bg-muted rounded-xl" />
        </AspectRatio>
        <CardHeader className="pt-0 mt-auto">
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col space-y-2 col-span-2">
              <CardTitle>{product.title}</CardTitle>
              <div className="text-sm text-muted-foreground col-span-2">{product.brand}</div>
            </div>
            <Button variant="outline" size="icon" className="my-auto ml-auto">
              <Plus />
            </Button>
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