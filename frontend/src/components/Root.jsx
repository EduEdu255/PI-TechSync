import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

function Root() {
  return (
    <>
      <Header />
      <div id="detais">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Root;
