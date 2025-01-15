import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingBasket } from "lucide-react";
import { nanoid } from "nanoid";
import { NavLink, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const navItems = [
    { id: nanoid(), title: "Home", route: "/", },
    { id: nanoid(), title: "Products", route: "/product-list" },
  ];

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

      <div className="flex items-center">
        {/* <Button variant="secondary" className="hidden md:block px-2" onClick={() => navigate('/login')}>
          Login
        </Button>
        <Button className="hidden md:block ml-2 mr-2">Register</Button> */}
        <Button variant="outline" size="icon" className="relative" onClick={() => navigate('/cart')}>
          <ShoppingBasket />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
        </Button>
      </div>
    </Card>
  );
};

const landings = [
  {
    id: nanoid(),
    title: "Landing 01",
    route: "/project-management",
  },
  {
    id: nanoid(),
    title: "Landing 02",
    route: "/crm-landing",
  },
  {
    id: nanoid(),
    title: "Landing 03",
    route: "/ai-content-landing",
  },
  {
    id: nanoid(),
    title: "Landing 04",
    route: "/new-intro-landing",
  },
  {
    id: nanoid(),
    title: "Landing 05",
    route: "/about-us-landing",
  },
  {
    id: nanoid(),
    title: "Landing 06",
    route: "/contact-us-landing",
  },
  {
    id: nanoid(),
    title: "Landing 07",
    route: "/faqs-landing",
  },
  {
    id: nanoid(),
    title: "Landing 08",
    route: "/pricing-landing",
  },
  {
    id: nanoid(),
    title: "Landing 09",
    route: "/career-landing",
  },
];

export default Navbar;