import { IoSunnyOutline } from "react-icons/io5";
import { AiOutlineFontSize } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

export default function SettingsNav() {
  return (
    <div className="w-full h-full flex flex-col items-center lg:w-72 text-neutral-700 flex-shrink-0 px-8 py-4 lg:border-b-2 lg:border-r-2 border-dark-pink overflow-hiden">
      <Link
        href={"/settings/color-theme"}
        className="w-full max-w-md lg:max-w-xl border-b px-4 py-4"
      >
        <button className="flex items-center justify-between  w-full max-w-md lg:max-w-xl ">
          <div className="flex items-center gap-2">
            <IoSunnyOutline />
            Color Theme
          </div>
          <IoIosArrowForward />
        </button>
      </Link>
      <Link
        href={"/settings/font-theme"}
        className="w-full max-w-md lg:max-w-xl border-b px-4 py-4"
      >
        <button className="flex items-center justify-between  w-full max-w-md lg:max-w-xl ">
          <div className="flex items-center gap-2">
            <AiOutlineFontSize />
            Font Theme
          </div>
          <IoIosArrowForward />
        </button>
      </Link>
      <button className="flex items-center justify-between w-full max-w-md lg:max-w-2xl border-b px-4 py-4">
        <div className="flex items-center gap-2">
          <RiLockPasswordLine />
          Change Password
        </div>
        <IoIosArrowForward />
      </button>
      <button className="flex items-center justify-between w-full max-w-md lg:max-w-2xl border-b px-4 py-4">
        <div className="flex items-center gap-2">
          <TbLogout />
          Logout
        </div>
        <IoIosArrowForward />
      </button>
    </div>
  );
}
