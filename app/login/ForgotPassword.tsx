import { createClient } from "@/utils/supabase/server";

export default function ForgotPassword() {
  const supabase = createClient();

  const handleForgotPassword = async () => {
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const email = emailInput.value;

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        throw new Error("Failed to send password reset email.");
      }

      alert("Password reset email sent successfully.");
    } catch (error:any) {
      console.error("Error sending password reset email:", error.message);
    }
  };

  return (
    <div>
      <input
        id="email"
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        placeholder="Enter your email"
        required
      />
      <button onClick={handleForgotPassword}>Reset Password</button>
    </div>
  );
}
