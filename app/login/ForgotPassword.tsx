"use client"
import { useState } from 'react'; // Importing useState hook
import { createClient } from "@/utils/supabase/client";

export default function ForgotPassword() {
  const [email, setEmail] = useState(""); // Using state to manage email input
  const supabase = createClient();

  const handleForgotPassword = async () => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          

        },
      });

      if (error) {
        throw new Error("Failed to send password reset email.");
      }

      alert("Password reset email sent successfully.");
    } catch (error:any) {
      console.error("Error sending password reset email:", error.message);
    }
  };

  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <input
        id="email"
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        placeholder="Enter your email"
        value={email} // Binding value to email state
        onChange={handleEmailChange} // Handling email input change
        required
      />
      <button onClick={handleForgotPassword}>Reset Password</button>
    </div>
  );
}
