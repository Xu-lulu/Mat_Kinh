import { useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbars from "../components/Navbars/Navbars";
import {
  NavbarAdmin,
  NavbarAdminLogout,
} from "../components/admin/Products/NavbarAdmin";
export const NavbarFood = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/Login" || location.pathname === "/Register" ? (
        <div hidden>
          <Navbars />
        </div>
      ) : (
        <div>
          <Navbars />
        </div>
      )}{" "}
    </>
  );
};

export const FooterFood = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/Login" || location.pathname === "/Register" ? (
        <div className="Footer" hidden>
          <Footer />
        </div>
      ) : (
        <div className="Footer">
          <Footer />
        </div>
      )}{" "}
    </>
  );
};
export const NavbarAdminHidden = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/Login" || location.pathname === "/Register" ? (
        <div className="NavbarAdmin" hidden>
          <NavbarAdmin />
        </div>
      ) : (
        <div className="NavbarAdmin">
          <NavbarAdmin />
        </div>
      )}{" "}
    </>
  );
};
export const NavbarAdminLogoutHidden = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/Login" || location.pathname === "/Register" ? (
        <div hidden>
          <NavbarAdminLogout />
        </div>
      ) : (
        <div>
          <NavbarAdminLogout />
        </div>
      )}{" "}
    </>
  );
};
