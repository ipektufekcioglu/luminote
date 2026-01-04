import Image from "next/image"
import Link from "next/link"
import AddNewButton from "@/public/add.png"

export default function Notes() {
    return (
        <div className="static flex flex-col">
            <Link href={"notes/new"}><Image src={AddNewButton} height={48} width={48} alt="plus icon" className="fixed cursor-pointer right-8 bottom-24 lg:hidden"/></Link>
        </div>
    )
}

