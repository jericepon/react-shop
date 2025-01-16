import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { persistor } from "@/store";
import { logout } from "@/store/features/Auth";
import { resetProductState } from "@/store/features/Product";
import { AppDispatch, RootState } from "@/store/rootState";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { PopoverArrow } from "@radix-ui/react-popover";
import { LogOut, ShoppingBasket } from "lucide-react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { cartList } = useSelector((state: RootState) => state.cart);
  const { addToCartPending } = useSelector((state: RootState) => state.cart)

  const [isCartListOpen, setIsCartListOpen] = useState(false);
  const [productAdded, setProductAdded] = useState(false);


  const navItems = [
    { id: nanoid(), title: "Home", route: "/", },
    { id: nanoid(), title: "Products", route: "/product-list" },
  ];

  const handleLogout = () => {
    dispatch(resetProductState());
    dispatch(logout());
    persistor.purge();
  }

  useEffect(() => {
    if (!addToCartPending)
    {
      setProductAdded(true)
    }

    setTimeout(() => {
      setProductAdded(false)
    }, 1000)
  }, [addToCartPending])

  useEffect(() => {
    productAdded && setIsCartListOpen(true);
    setTimeout(() => {
      setProductAdded(false)
    }, 1000)
  }, [productAdded]);

  return (
    <Card className="bg-card py-3 px-4 border-0 flex items-center justify-between gap-6 rounded-none fixed w-full z-10">
      <ul className="hidden md:flex items-center gap-10 text-card-foreground">
        {navItems.map((item) => (
          <li key={item.id}>
            <NavLink to={item.route} className={({ isActive }) => isActive ? "hover:text-primary text-primary" : "hover:text-primary"}>
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center space-x-4">
        <Popover open={isCartListOpen} onOpenChange={(isOpen) => setIsCartListOpen(isOpen)}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative mt-0">
              <ShoppingBasket />
              <span className={`absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 ${productAdded && 'animate-ping'} ${!cartList.length && 'hidden'}`} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            {cartList.length ? (
              <div className="space-y-3">
                {cartList.slice(0, 3).map((item) => (
                  <div key={item.id} className="rounded-lg bg-card text-card-foreground grid grid-cols-3 p-4 space-x-3 hover:bg-muted hover:text-card-foreground">
                    <AspectRatio ratio={1 / 1}>
                      <img src={item.thumbnail} alt={item.title} className="w-full bg-muted rounded-xl" />
                    </AspectRatio>
                    <div className="w-full flex flex-col col-span-2">
                      <span className="text-sm">{item.title}</span>
                      <span className="text-sm text-muted-foreground"><span className="italic mr-1">Qty:</span>{item.quantity}</span>
                      <span className="text-sm text-muted-foreground"><span className="italic mr-1">Price:</span><strong>${item.price}</strong></span>
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center">
                  <span className={`text-sm text-muted-foreground ${cartList.length <= 3 && 'hidden'}`}>{cartList.length - 3} more item{cartList.length - 3 > 1 ? `s` : ''} in cart</span>
                  <Button variant="link" onClick={() => { navigate("/cart"); setIsCartListOpen(false) }}>View Cart</Button>
                </div>
              </div>
            ) : (
              <p className="text-foreground text-center">Your cart is empty.</p>
            )}
            <PopoverArrow height={10} className="fill-muted" />
          </PopoverContent>
        </Popover>
        {
          isAuthenticated && <Navbar.AvatarDropdown handleLogout={handleLogout} />
        }
      </div>
    </Card>
  );
};

Navbar.AvatarDropdown = ({ handleLogout }: { handleLogout: () => void }) => {
  const { authInfo } = useSelector((state: RootState) => state.auth);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={authInfo.image} />
          <AvatarFallback>
            <img src={`https://ui-avatars.com/api/?name=${authInfo.firstName}+${authInfo.lastName}`} alt={`${authInfo.firstName} ${authInfo.lastName}`} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleLogout()}>
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Navbar;