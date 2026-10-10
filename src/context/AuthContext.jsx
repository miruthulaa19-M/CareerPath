import { useState } from "react";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("careerpathUser");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const signup = (name, email, password) => {
    if (!name?.trim() || !email?.trim() || !password) {
      return { success: false, message: "Please fill in all fields." };
    }

    const cleanEmail = email.trim().toLowerCase();
    let users = [];
    try {
      const raw = localStorage.getItem("careerpathUsers");
      if (raw) {
        users = JSON.parse(raw);
      }
    } catch {
      // Default to empty array on parse failure
    }

    const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, message: "An account with this email already exists." };
    }

    const newUser = {
      name: name.trim(),
      email: cleanEmail,
      password: password,
    };
    users.push(newUser);

    try {
      localStorage.setItem("careerpathUsers", JSON.stringify(users));
    } catch {
      return { success: false, message: "Could not save user data." };
    }

    const authUser = { name: newUser.name, email: newUser.email };
    setUser(authUser);
    try {
      localStorage.setItem("careerpathUser", JSON.stringify(authUser));
    } catch {
      // Ignore localStorage errors
    }

    return { success: true };
  };

  const signIn = (email, password) => {
    if (!email?.trim() || !password) {
      return { success: false, message: "Please enter both email and password." };
    }

    const cleanEmail = email.trim().toLowerCase();
    let users = [];
    try {
      const raw = localStorage.getItem("careerpathUsers");
      if (raw) {
        users = JSON.parse(raw);
      }
    } catch {
      // Default to empty array on parse failure
    }

    const found = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!found) {
      return { success: false, message: "No account found with this email. Please sign up." };
    }

    if (found.password !== password) {
      return { success: false, message: "Incorrect password. Please try again." };
    }

    const authUser = { name: found.name, email: found.email };
    setUser(authUser);
    try {
      localStorage.setItem("careerpathUser", JSON.stringify(authUser));
    } catch {
      // Ignore localStorage errors
    }

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("careerpathUser");
    } catch {
      // Ignore localStorage errors
    }
  };

  return (
    <AuthContext.Provider value={{ user, signup, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
