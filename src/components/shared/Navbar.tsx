import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { persistor } from "@/store";
import { logout } from "@/store/features/Auth";
import { resetProductState } from "@/store/features/Product";
import { AppDispatch, RootState } from "@/store/rootState";
import { LogOut, ShoppingBasket } from "lucide-react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navItems = [
    { id: nanoid(), title: "Home", route: "/", },
    { id: nanoid(), title: "Products", route: "/product-list" },
  ];

  const handleLogout = () => {
    dispatch(resetProductState());
    dispatch(logout());
    persistor.purge();
  }

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
        <Button variant="outline" size="icon" className="relative mt-0" onClick={() => navigate('/cart')}>
          <ShoppingBasket />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
        </Button>
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