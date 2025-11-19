import React from "react";
import bookLogo from "../assets/bookLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        <div className="grid grid-cols-3 items-center p-4">
          <img src={bookLogo} alt="" className="h-10" />

          <h1 className="text-3xl font-semibold text-center">BOOK STORE</h1>

          <div className="flex items-center justify-end gap-3">
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-2xl hover:text-pink-600 hover:scale-110"
            />
            <FontAwesomeIcon
              icon={faFacebook}
              className="text-2xl hover:text-sky-700 hover:scale-110"
            />
            <FontAwesomeIcon
              icon={faXTwitter}
              className="text-2xl hover:scale-110"
            />
            <button className="border rounded-3xl font-bold hover:bg-black hover:text-white px-3 py-1 ms-3">
              <Link to={"/login"}>Login</Link>
            </button>
          </div>
        </div>
        <nav>
          <ul className="p-3 bg-slate-900 flex text-slate-200 gap-8 items-center justify-center">
            <li className="font-semibold hover:scale-110 hover:text-white">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="font-semibold hover:scale-110 hover:text-white">
              <Link to={"/books"}>Books</Link>
            </li>
            <li className="font-semibold hover:scale-110 hover:text-white">
              <Link to={"/books"}>Careers</Link>
            </li>
            <li className="font-semibold hover:scale-110 hover:text-white">
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
