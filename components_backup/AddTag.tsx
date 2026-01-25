import { useState } from "react";
import type { AddTagProps } from "@/app/types";
import { IoClose } from "react-icons/io5";

export default function AddTag({ onChange, handleAddNew }: AddTagProps) {
  const [inputTag, setInputTag] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setInputTag(e.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleAddNew(inputTag);
    setInputTag("");
  };

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <button
          onClick={handleOpen}
          className="border-1 rounded-md px-2 py-1 cursor-pointer hover:bg-neutral-100"
        >
          + Add tag
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col border px-2 min-w-32 justify-center items-center bg-black/30">
          <div className="w-[520px] max-w-[92-vw] bg-white rounded-3xl p-6 shadow-xl">
            <div className="relative flex items-center justify-center mb-5">
              <h1 className="text-bold text-xl">Create New Tag</h1>
              <button
                onClick={handleClose}
                className="absolute right-0 text-bold text-xl cursor-pointer rounded-full px-3 py-1 hover:bg-gray-100"
              >
                <IoClose />
              </button>
            </div>
            <div className="rounded-2xl border bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  name="name"
                  value={inputTag}
                  placeholder="Tag name..."
                  className="h-10 w-full border rounded-xl bg-white px-4 outline-none focus:ring-2 focus:ring-[#CE3E97]"
                  onChange={handleInputChange}
                />
                <button
                  className="h-10 text-md bg-[#CE3E97] rounded-xl text-white px-6 font-medium cursor-pointer"
                  onClick={handleClick}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
