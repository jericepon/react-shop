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

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navItems = [
    { id: nanoid(), title: "Home", route: "/", },
    { id: nanoid(), title: "Products", route: "/product-list" },
  ];

  const handleLogout = () => {
    persistor.purge();
    dispatch(resetProductState());
    dispatch(logout());
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
        {
          isAuthenticated && <Button variant="secondary" size="sm" className="px-2 w-24" onClick={() => handleLogout()}>
            <LogOut />
            Logout
          </Button>
        }
        <Button variant="outline" size="icon" className="relative mt-0" onClick={() => navigate('/cart')}>
          <ShoppingBasket />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
        </Button>
      </div>
    </Card>
  );
};

export default Navbar;