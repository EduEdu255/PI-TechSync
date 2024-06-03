import { BsGraphUp, BsFillAirplaneFill, BsBagFill } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaBagShopping } from "react-icons/fa6";

import { Link, Outlet } from "react-router-dom";

function SidebarMenuItem({ icon, text, to }) {
  return (
    <Link
      to={to}
      className="flex gap-5 items-center px-5 py-3 hover:bg-[#3758D0] hover:text-white font-[Poppins] rounded-2xl transition-all text-lg"
    >
      <span>{icon}</span>
      <span>{text}</span>
    </Link>
  );
}

function MenuCia() {
  const menuItems = [
    { icon: <BsGraphUp />, text: "Relatórios", to: "/cia/dashboard" },
    { icon: <BsFillAirplaneFill />, text: "Aeronaves", to: "/cia/aeronave" },
    { icon: <BsBagFill />, text: "Vôos", to: "/cia/voo" },
    { icon: <FaBagShopping />, text: "Planos", to: "/planos" },
    { icon: <HiOutlineLogout />, text: "Sair", to: "/logout" },
  ];

  return (
    <div className="flex gap-1">
      <div className="flex flex-col gap-3 w-[15%] px-7 items-center">
        <img src="/images/logo pousar.svg" className="h-[80px]"></img>
        <div>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.text} {...item} />
          ))}
        </div>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default MenuCia;
