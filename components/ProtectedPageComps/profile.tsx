"use client"
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { createClient } from "@/utils/supabase/client";


// Defining the user data interface
interface UserData {
  email: string;
  first_name?: string;
  last_name?: string;
  profile_fields?: {
    [key: string]: string;
  };
  darkMode?: boolean;
}

// ProfilePage component
export default function ProfilePage() {
  // Initializing Supabase client
  const supabase = createClient();

  // State variables for user data, notification, and current view (profile, settings, or password)
  const [userData, setUserData] = useState<UserData>({
    email: "",
    first_name: "",
    last_name: "",
    profile_fields: {},
    darkMode: false, // Initialize dark mode as false (light mode)
  });
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);
  const [currentView, setCurrentView] = useState<"profile" | "settings" | "password">("profile");
  const [passwordData, setPasswordData] = useState<{ newPassword: string; }>({
    newPassword: "",
  });

  // Fetching user data on component mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data || !data.user) {
          window.location.href = "/login"; // Redirect to home page if not logged in
          return;
        }
        const { email, user_metadata } = data.user;
        const { first_name, last_name, profile_fields, darkMode } = user_metadata || {};
        setUserData({
          email: email || "",
          first_name: first_name || "",
          last_name: last_name || "",
          profile_fields: profile_fields || {},
          darkMode: darkMode || false,
        });
      } catch (error: any) {
        console.error("Error checking login status:", error.message);
      }
    };
    checkLoggedIn();
  }, []);

  // Handling form input change for profile fields and settings
const handleProfileChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value, type } = e.target;

  // Check if the input type is checkbox or select
  const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

  // If the input type is select, handle its value
  if (type === 'select-one') {
    setUserData({
      ...userData,
      [name]: value === "dark", // Convert value to boolean
    });
  } else {
    // For other input types, update as usual
    setUserData({
      ...userData,
      [name]: newValue,
    });
  }
};


  // Handling form input change for additional profile fields
  const handleAdditionalFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      profile_fields: {
        ...userData.profile_fields,
        [name]: value,
      }
    });
  };

  // Handling form input change for password fields
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, first_name, last_name, profile_fields, darkMode } = userData;
    try {
      const { error } = await supabase.auth.updateUser({
        email,
        data: {
          first_name,
          last_name,
          profile_fields,
          darkMode,
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
  // Handling password update
  const handlePasswordUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { newPassword } = passwordData;
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        throw new Error("Could not update password");
      }
      setNotification({ type: "success", message: "Password updated successfully" });
    } catch (error: any) {
      setNotification({ type: "error", message: error.message });
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut(); // Sign out using Supabase auth
      window.location.href = "/login"; // Redirect to login page
    } catch (error: any) {
      console.error("Error signing out:", error.message);
    }
  };

  // Clearing notification
  const clearNotification = () => {
    setNotification(null);
  };
  // Rendering the profile page content
  return (
    <main className="h-full w-full bg-gray-200 dark:bg-slate-700 text-black dark:text-white">
      <div className="h-screen flex justify-center items-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          {/* Switching between profile, settings, and password */}
          <div className="mb-8">
            <button
              onClick={() => setCurrentView("profile")}
              className={`py-2 px-4 rounded-md ${currentView === "profile" ? "bg-indigo-600 text-black" : "bg-gray-300 text-black"} mr-2`}
            >
              Profile
            </button>
            <button
              onClick={() => setCurrentView("password")}
              className={`py-2 px-4 rounded-md ${currentView === "password" ? "bg-indigo-600 text-gray-700" : "bg-gray-300 text-gray-700"}`}
            >
              Change Password
            </button>
          </div>
           {/* Form for updating profile fields */}
           {currentView === "profile" && (
            <form onSubmit={handleUpdate} className="mb-8">
              <label className="block text-gray-700 mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleProfileChange}
                className="rounded-md px-4 py-2 bg-gray-200 border border-gray-300 mb-4 w-full focus:outline-none focus:border-indigo-500 text-black"
              />
              <label className="block text-gray-700 mb-2">First Name:</label>
              <input
                type="text"
                name="first_name"
                value={userData.first_name}
                onChange={handleProfileChange}
                className="rounded-md px-4 py-2 bg-gray-200 border border-gray-300 mb-4 w-full focus:outline-none focus:border-indigo-500 text-black"
              />
              <label className="block text-gray-700 mb-2">Last Name:</label>
              <input
                type="text"
                name="last_name"
                value={userData.last_name}
                onChange={handleProfileChange}
                className="rounded-md px-4 py-2 bg-gray-200 border border-gray-300 mb-4 w-full focus:outline-none focus:border-indigo-500 text-black"
              />
              {/* Additional profile fields */}
              {Object.entries(userData.profile_fields || {}).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-gray-700 mb-2">{key}</label>
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleAdditionalFieldChange}
                    className="rounded-md px-4 py-2 bg-gray-200 border border-gray-300 mb-4 w-full focus:outline-none focus:border-indigo-500 text-black"
                  />
                </div>
              ))}
              <button
                type="submit"
                className="bg-indigo-600 rounded-md px-4 py-2 text-black mb-2 w-full "
              >
                Update Profile
              </button>
            </form>
          )}

           {/* Form for changing password */}
           {currentView === "password" && (
            <form onSubmit={handlePasswordUpdate} className="mb-8">
              <label className="block text-gray-700 mb-2">New Password:</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                autoComplete="new-password" // Prevent autofilling
                className="rounded-md px-4 py-2 bg-gray-200 border border-gray-300 mb-4 w-full focus:outline-none focus:border-indigo-500 text-black"
              />
              <button
                type="submit"
                className="bg-indigo-600 rounded-md px-4 py-2 text-white mb-2 w-full"
              >
                Update Password
              </button>
            </form>
          )}
          {/* Logout button */}
          <div className="text-center">
            <button
              onClick={handleSignOut} // Handling sign-out button click
              className="py-2 px-4 rounded-md bg-blue-300 text-black hover:bg-gray-800 "
            >
              Logout
            </button>
          </div>
          {/* Notification */}
          {notification && (
            <div className={`absolute bottom-4 right-4 bg-${notification.type === "success" ? "green" : "red"}-500 text-white p-4 rounded-md`}>
              <p>{notification.message}</p>
              <button onClick={() => setNotification(null)} className="ml-2">Close</button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

