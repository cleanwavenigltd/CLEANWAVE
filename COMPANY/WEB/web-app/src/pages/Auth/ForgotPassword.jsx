import React, { useState, useCallback } from "react";
import { Mail, Loader, AlertCircle } from "lucide-react";
import Input from "../user/layouts/Input";

/**
 * ForgotPassword Component
 * Handles the user password reset request flow.
 *
 * @param {Object} props
 * @param {Function} props.onSwitch - Navigates back to the login view
 */
export default function ForgotPassword({ onSwitch }) {
  // Use null for empty states to avoid rendering empty strings
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  /**
   * Validates and submits the reset request
   * Wrapped in useCallback to prevent unnecessary re-renders
   */
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Basic validation before hitting the API
      if (!email.includes("@")) {
        setError("Please enter a valid email address.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Mocking an API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Password reset link sent to:", email);
      } catch (err) {
        setError("Network error. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [email]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-lg">
        {/* Header - Semantic & Clear */}
        <div className="mb-8">
          <h1 className="font-bold text-2xl text-gray-900">Forgot password</h1>
          <p className="text-gray-500 text-sm mt-2">
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>

        {/* Error Feedback - Professional Alert Style */}
        {error && (
          <div
            role="alert"
            className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 flex gap-3 animate-in fade-in slide-in-from-top-2"
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span className="text-sm text-red-700 font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            {/* Positioned precisely; z-10 ensures it stays above the input background */}
            <Mail
              className={`absolute left-3 top-[10px] w-5 h-5 z-10 transition-colors 
              ${
                email
                  ? "text-[#8CA566]"
                  : "text-gray-400 group-focus-within:text-[#8CA566]"
              }`}
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. amir@example.com"
              required
              autoComplete="email"
              className="pl-10" // Padding-left to clear the Mail icon
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8CA566] text-white py-3 rounded-xl font-bold
                     hover:bg-[#7a9158] active:scale-[0.98] 
                     disabled:opacity-60 disabled:cursor-not-allowed
                     transition-all flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="animate-spin w-5 h-5" />
                <span>Sending...</span>
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        {/* Navigation Footer */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => onSwitch("login")}
            className="text-sm font-semibold text-gray-600 hover:text-[#8CA566] transition-colors"
          >
            &larr; Back to Login
          </button>
        </div>
      </div> 
    </div>
  );
}
