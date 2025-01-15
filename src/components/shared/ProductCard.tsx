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

const ProductCard = ({ product }: { product: Product }) => {

  return (
    <Card className="flex flex-col">
      <AspectRatio ratio={4 / 3} className="overflow-hidden">
        <img src={product.thumbnail} alt={product.title} className="w-full" />
      </AspectRatio>
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <div className="px-6 pt-0">
        <p>${product.price}</p>
      </div>
      <CardFooter className="flex justify-between mt-auto">
        <Button className="ml-auto">Add to cart</Button>
      </CardFooter>
    </Card>
  )
}

ProductCard.Loader = () => {
  return (
    <Card className="flex flex-col space-y-3">
      <Skeleton className="rounded-none aspect-square" />
      <CardContent className="space-y-2 pb-0">
        <Skeleton className="h-4 w-x-65%]" />
        <Skeleton className="h-3 w-[95%]" />
        <Skeleton className="h-3 w-[80%]" />
        <Skeleton className="h-3 w-[85%]" />
      </CardContent>
      <div className="space-y-2 px-6">
        <Skeleton className="h-3 w-[100px] mt-3" />
      </div>
      <CardFooter className="flex justify-between mt-auto">
        <Skeleton className="h-[36px] w-[103px] mt-[24px] ml-auto" />
      </CardFooter>
    </Card>
  )
}

export default ProductCard