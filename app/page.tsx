import Header from "@/components/Header"
import Link from "next/link"

export default function Homepage() {
  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-3xl">Welcome Back</h1>
        <Link href={"/notes"}><h1 className="border-2 border-dark-pink rounded-lg px-2 py-1 ">Your Notes</h1></Link>
      </div>
    </div>
  )
}