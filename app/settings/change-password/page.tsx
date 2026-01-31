"use client";

import createSupabaseBrowserClient from "@/lib/supabaseBrowser";
import { useState } from "react";
import { toast } from "sonner";

export default function ChangePassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const supabase = createSupabaseBrowserClient();

  const handleOldChange = (e) => {
    e.preventDefault();
    setOldPass(e.target.value);
  };

  const handleNewChange = (e) => {
    e.preventDefault();
    setNewPass(e.target.value);
  };

  const handleConfirmChange = (e) => {
    e.preventDefault();
    setConfirmPass(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!oldPass || !newPass || !confirmPass) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPass !== confirmPass) {
      toast.error("New Password should match the confirmation password!");
      return;
    }

    if (newPass.length < 6) {
      toast.error("Password must be at least 6 characters");
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.email) {
        toast.error("No user logged in");
        return;
      }
      const { data, error } = await supabase.auth.updateUser({
        password: newPass,
      });

      if (error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.success("Password updated successfully");
        setOldPass("");
        setNewPass("");
        setConfirmPass("");
      }
    } catch (error) {
      toast.error("An unexpected error occured");
      console.error(error);
    }
  };

  return (
    <div className="py-4 px-4 flex-1 overflow-hidden flex flex-col mx-auto max-w-md max-h-screen gap-4 text-popover">
      <h1 className="text-2xl">Change Password</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label htmlFor="old">Old Password</label>
        <input
          type="password"
          id="old"
          value={oldPass}
          onChange={(e) => handleOldChange(e)}
          className="border-2 border-border px-2 py-1 rounded-md"
        />
        <label htmlFor="new">New Password</label>
        <input
          type="password"
          id="new"
          value={newPass}
          onChange={(e) => handleNewChange(e)}
          className="border-2 border-border px-2 py-1 rounded-md"
        />
        <label htmlFor="confirm">Confirm New Password</label>
        <input
          type="password"
          id="confirm"
          value={confirmPass}
          onChange={(e) => handleConfirmChange(e)}
          className="border-2 border-border px-2 py-1 rounded-md"
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 text-sm items-center bg-[#CE3E97] text-white rounded-lg px-2 py-1 md:text-lg cursor-pointer mt-4"
        >
          Save
        </button>
      </form>
    </div>
  );
}
