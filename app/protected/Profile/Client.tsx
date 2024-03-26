"use client"
// Client.tsx
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

interface UserData {
  email: string;
  first_name?: string;
  last_name?: string;
}

interface Props {
  onSignOut: () => void;
}

export default function Client({ onSignOut }: Props) {
  const supabase = createClient();
  const [userData, setUserData] = useState<UserData>({
    email: "",
    first_name: "",
    last_name: "",
  });
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data || !data.user) {
          window.location.href = "/login";
          return;
        }
        const { email, user_metadata } = data.user;
        const { first_name, last_name } = user_metadata || {};
        setUserData({
          email: email || "",
          first_name: first_name || "",
          last_name: last_name || "",
        });
      } catch (error: any) {
        console.error("Error checking login status:", error.message);
      }
    };
    checkLoggedIn();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, first_name, last_name } = userData;
    try {
      const { error } = await supabase.auth.updateUser({
        email,
        data: {
          first_name,
          last_name,
        }
      });
      if (error) {
        throw new Error("Could not update profile");
      }
      setNotification({ type: "success", message: "Profile updated successfully" });
    } catch (error: any) {
      setNotification({ type: "error", message: error.message });
    }
  };

  const clearNotification = () => {
    setNotification(null);
  };

  return (
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
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={userData.first_name}
            onChange={handleChange}
            className="rounded-md px-4 py-2 bg-inherit border mb-4"
          />
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={userData.last_name}
            onChange={handleChange}
            className="rounded-md px-4 py-2 bg-inherit border mb-4"
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
          onClick={onSignOut}
          className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
        >
          Logout
        </button>
      </div>
      {notification && (
        <div className={`absolute bottom-4 right-4 bg-${notification.type === "success" ? "green" : "red"}-500 text-white p-4 rounded-md`}>
          <p>{notification.message}</p>
          <button onClick={clearNotification} className="ml-2">Close</button>
        </div>
      )}
    </div>
  );
}
