import { IoSunnyOutline } from "react-icons/io5";
import { AiOutlineFontSize } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";

export default function SettingsNav() {
  return (
    <div className="w-full h-full lg:flex lg:flex-col lg:w-72 text-neutral-700 flex-shrink-0 px-4 py-4 lg:border-b-2 lg:border-r-2 border-dark-pink overflow-hidden">
      <button className="flex gap-2 items-center ">
        <IoSunnyOutline />
        Color Theme
      </button>
      <button className="flex gap-2 items-center ">
        <AiOutlineFontSize />
        Font Theme
      </button>
      <button className="flex gap-2 items-center ">
        <RiLockPasswordLine />
        Change Password
      </button>
      <button className="flex gap-2 items-center ">
        <TbLogout />
        Logout
      </button>
    </div>
  );
}
