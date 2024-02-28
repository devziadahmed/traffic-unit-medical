import Header from "./Header";
import Footer from "./Footer";

import { Outlet } from "react-router-dom";
import Aside from "./Aside";

function Layout() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      <Header />

      <main className="max-w-7xl mx-auto overflow-auto w-full h-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
