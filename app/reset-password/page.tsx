import Image from "next/image";
import FeatherImg from "@/public/feather.png"
import EyeImg from "@/public/show.png"
import InfoImg from "@/public/info.png"

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center items-center px-4">
      <div className="flex flex-col border border-neutral-200 rounded-xl bg-white/80 p-12 md:min-w-lg">
        <div className="flex gap-2 items-center justify-center">
          <Image src={FeatherImg} alt="feather logo" className="w-8"/>
          <h1 className="font-pacifico text-2xl">LumiNote</h1>
        </div>
        <h1 className="font-montserrat text-2xl font-medium text-center mt-8">Reset Your Password</h1>
        <p className="font-albert text-sm text-center font-light">Choose a new password to secure your account.</p>
        <form className="flex flex-col font-albert gap-2 my-6">
          <label className="text-sm">New Password</label>
          <div className="relative">
              <input placeholder="******" name="password" type="password" className="w-full border border-neutral-200 rounded-lg px-2 py-2"/>
              <Image src={EyeImg} alt="eye symbol" className="w-4 absolute right-3 top-3"/>
          </div>
          <div className="flex gap-2 mb-2">
                <Image src={InfoImg} alt="info icon" className="w-4"/>
                <p className="text-xs text-neutral-600">At least 8 characters</p>
          </div>
          <label className="text-sm">Confirm New Password</label>
          <div className="relative">
              <input placeholder="******" name="password" type="password" className="w-full border border-neutral-200 rounded-lg px-2 py-2"/>
              <Image src={EyeImg} alt="eye symbol" className="w-4 absolute right-3 top-3"/>
          </div>
          <button className="bg-fuchsia-500/75 text-white py-2 text-sm rounded-lg cursor-pointer">Reset Password</button>
        </form>
      </div>
      
    </div>
  );
}
