import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { AnimatePresence } from "framer-motion";

function Root() {
  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <div id="detais">
          <Outlet />
        </div>
      </AnimatePresence>
    </>
  );
}

export default Root;
