import Link from "next/link";
import { IoAddCircle } from "react-icons/io5";

export default function Notes() {
  return (
    <div className="static flex flex-col">
      <Link href={"notes/new"}>
        <IoAddCircle className="fixed cursor-pointer right-8 bottom-24 text-fuchsia-600 w-16 h-16 lg:hidden" />
      </Link>
    </div>
  );
}
