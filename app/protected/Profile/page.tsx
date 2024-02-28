"use client"
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface UserData {
  email: string;
  phone: string;
}

export default function ProfilePage() {
  const supabase = createClient();
  const [userData, setUserData] = useState<UserData>({
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user data:", error.message);
        return; // Exit early if there's an error
      }
      if (data && data.user) {
        const { email, phone } = data.user;
        setUserData({
          email: email || "",
          phone: phone || "",
        });
      } else {
        console.error("No user data found.");
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, phone } = userData;
    const { error } = await supabase.auth.updateUser({
      email,
      phone,
    });
    if (error) {
      alert("Could not update profile");
    } else {
      alert("Profile updated successfully");
    }
  };

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return userData ? (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <div className=" text-center">
        <Link href="/protected">
          Hey, click here to go to your profile page!
        </Link>
      </div>
      <div className="mb-4">
        <form onSubmit={handleUpdate}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
            className="rounded-md px-4 py-2 bg-inherit border mb-4"
          />
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
          />
          <button
            type="submit"
            className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          >
            Update Profile
          </button>
        </form>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={signOut}
          className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
        >
          Logout
        </button>
      </div>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
