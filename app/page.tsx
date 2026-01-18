import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import ExampleImg from "@/public/landing-page.png";
import { FaFeatherAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaSyncAlt } from "react-icons/fa";

export default async function Homepage() {
  return (
    <div>
      <Header />
      <div className="h-screen lg:py-16 flex flex-col gap-8 items-center landing-page">
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-20 lg:w-2/3 p-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl">
              Capture and organize your thoughts effortlessly
            </h1>
            <p>
              Write down notes, add tags to stay organized, and find anything in
              seconds.
            </p>
            <div className="flex flex-col items-center lg:flex-row gap-4 justify-center">
              <Link href={"/sign-up"}>
                <button className="bg-[#CE3E97] min-w-60 text-white border rounded-md px-2 py-1 shadow-lg">
                  Get started for free
                </button>
              </Link>
              <Link href={"/notes"}>
                <button className="border rounded-md min-w-60 px-2 py-1 shadow-lg">
                  Continue where you left off
                </button>
              </Link>
            </div>
          </div>

          <Image
            src={ExampleImg}
            alt="example notes page"
            width={800}
            height={533}
            className="rounded-lg border-2"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="font-semibold text-2xl">
            Features that feel effortless
          </h1>
          <p className="text-center">
            Designed for speed + calm. Everything stays discoverable.
          </p>
        </div>
        <div className="flex flex-col w-4/5 gap-4 lg:grid lg:grid-cols-3 lg:w-3/4">
          <div className="flex flex-col gap-1 border rounded-lg px-4 py-4 shadow-lg">
            <h1 className="flex gap-2 items-center justify-center text-lg font-semibold">
              <FaFeatherAlt className="text-[#CE3E97]" />
              Flexible notes
            </h1>
            <p>
              Write down ideas in seconds. Add tags and organize everything
              exactly how you want.
            </p>
          </div>

          <div className="flex flex-col gap-1 border rounded-lg px-4 py-4 shadow-lg">
            <h1 className="flex gap-2 items-center justify-center text-lg font-semibold">
              <FaSearch className="text-[#CE3E97]" />
              Quick Search
            </h1>
            <p>
              Find any note with powerful tag filtering. Search by title or
              content in an instant.
            </p>
          </div>
          <div className="flex flex-col gap-1 border rounded-lg px-4 py-4 shadow-lg">
            <h1 className="flex gap-2 items-center justify-center text-lg font-semibold">
              <FaSyncAlt className="text-[#CE3E97]" />
              Sync + secure
            </h1>
            <p>
              Your notes sync securely across devices. Only you can access and
              read them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
