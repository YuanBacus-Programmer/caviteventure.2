"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          city,
          gender,
          password,
          confirmPassword,
          acceptTerms,
        }),
      });

      // parse JSON
      const data = await res.json();

      if (res.ok) {
        // On success, navigate to /verify-email?email=...
        router.push(`/verify-email?email=${encodeURIComponent(email)}`);
      } else {
        setStatus(data.message || "Sign up error.");
      }
    } catch (err) {
      console.error(err);
      setStatus("An error occurred during sign up.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign Up</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Name */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* City */}
          <div style={styles.formGroup}>
            <label style={styles.label}>City</label>
            <input
              type="text"
              style={styles.input}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          {/* Gender */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as "male" | "female")}
              style={styles.input}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Email */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Password (8 chars)</label>
            <div style={styles.inputWithButton}>
              <input
                type={showPassword ? "text" : "password"}
                style={{ ...styles.input, flex: 1 }}
                value={password}
                onChange={(e) => {
                  if (e.target.value.length <= 8) {
                    setPassword(e.target.value);
                  }
                }}
                required
              />
              <button
                type="button"
                style={styles.toggleButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              style={styles.input}
              value={confirmPassword}
              onChange={(e) => {
                if (e.target.value.length <= 8) {
                  setConfirmPassword(e.target.value);
                }
              }}
              required
            />
          </div>

          {/* Terms */}
          <div style={styles.checkboxGroup}>
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              style={{ marginRight: "0.5rem" }}
            />
            <label>I accept the Terms and Conditions</label>
          </div>

          {status && <p style={styles.status}>{status}</p>}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...styles.submitButton,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

// Inline Styles
const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f4f4f4",
    padding: "1rem",
  },
  card: {
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    maxWidth: "450px",
    width: "100%",
    padding: "2rem",
  },
  title: {
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: 500,
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  inputWithButton: {
    display: "flex",
    alignItems: "center",
  },
  toggleButton: {
    marginLeft: "0.5rem",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    background: "#ddd",
  },
  checkboxGroup: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  },
  status: {
    margin: "0.5rem 0",
    fontWeight: "bold",
    color: "#333",
  },
  submitButton: {
    padding: "0.75rem",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    marginTop: "1rem",
    background: "#0070f3",
    color: "#fff",
  },
};
