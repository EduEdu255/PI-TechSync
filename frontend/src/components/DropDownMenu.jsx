import { useState } from "react";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function DropDownMenu({ text, links }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropDown() {
    setIsOpen(!isOpen);
  }
  function closeDropDown() {
    setIsOpen(false);
  }

  function mapLink(link) {
    return (
      <Link
        to={link.link}
        className="w-full hover:bg-slate-400 px-5 py-3 rounded-lg text-gray-600 transition ease-in-out duration-150"
        key={link.link}
        onClick={closeDropDown}
      >
        {link.text}
      </Link>
    );
  }
  return (
    <div>
      <div className="rounded-lg text-gray-600 px-4 py-2">
        <button onClick={toggleDropDown} className="flex items-center gap-2">
          <div>{text}</div>
          {isOpen ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-[6%] bg-slate-300 rounded-lg w-[10%]">
          <ul className="flex flex-col">{links.map(mapLink)}</ul>
        </div>
      )}
    </div>
  );
}

export default DropDownMenu;
