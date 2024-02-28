import { Link } from "react-router-dom";
import mainLogo from "../../public/images/logoMain.jpg";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className=" shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto  py-2">
        <div className="logo ">
          <img src={mainLogo} alt="logo" className="w-[85px]" />
        </div>
        <nav dir="rtl">
          <ul className="flex items-center gap-4 font-semibold">
            <li>
              <NavLink className="py-[10px] px-[15px]" to="instructions">
                الرئيسية
              </NavLink>
            </li>
            <li>
              <NavLink className="py-[10px] px-[15px]" to="result">
                نتائج الاختبار
              </NavLink>
            </li>
          </ul>
        </nav>

        <p className="font-semibold text-blue-600"> ziad,مرحبا</p>
      </div>
    </header>
  );
}

export default Header;
