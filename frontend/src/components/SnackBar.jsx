import { useRef, useState } from "react";
import { MdClose } from "react-icons/md";

function SnackBar({ message, type }) {
  const backRef = useRef();
  const [opened, setOpened] = useState(true);

  function getType() {
    switch (type) {
      case "success":
        return "bg-[#3758D0] text-white";
      case "alert":
        return "bg-yellow-500 text-black";
      case "danger":
        return "bg-red-500 text-white";
      default:
        return "bg-white text-black";
    }
  }

  return (
    <>
      {opened && (
        <div
          ref={backRef}
          className={
            "fixed w-[40%] inset-x-0 bottom-4 mx-auto p-4 flex rounded-2xl " +
            getType()
          }
        >
          <div className="flex justify-between self-end w-full">
            <p className="text-md font-medium">{message}</p>
            <button onClick={() => setOpened(false)}>
              <MdClose />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SnackBar;
