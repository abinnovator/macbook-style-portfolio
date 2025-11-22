import React from "react";
import { navLinks, navIcons } from "#constants";
import dayjs from "dayjs";
const Navbar = () => {
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt=" apple logo" />
        <p className="font-bold">Aadit's Portfolio</p>
        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`}>{link.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {navIcons.map((icon) => (
            <li key={icon.id}>
              <img src={icon.img} alt={icon.name} className="icon-hover" />
            </li>
          ))}
        </ul>
        <time>{dayjs().format("dd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
