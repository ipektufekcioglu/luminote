import Header from "@/components/Header"
import Link from "next/link"

export default async function Homepage() {

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center gap-2 mt-48">
        <h1 className="font-pacifico text-2xl">Welcome To LumiNote</h1>
        <Link href={"/notes"}><h1 className="border-2 border-dark-pink rounded-lg px-2 py-1 ">Your Notes</h1></Link>
      </div>
    </div>
  )
}