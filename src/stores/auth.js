import { defineStore } from "pinia";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/init";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    authModalVisible: false,
    authMode: "login",
    authData: {
      email: "",
      password: "",
    },
    redirectAfterLogin: null,
  }),
  actions: {
    toggleAuthModal(mode) {
      this.authMode = mode;
      this.authModalVisible = true;
    },
    async handleAuth() {
      if (!this.authData.email || !this.authData.password) {
        alert("Please fill in all required fields.");
        return;
      }

      if (this.authMode === "signup") {
        try {
          const q = query(
            collection(db, "users"),
            where("email", "==", this.authData.email)
          );
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            alert("This email is already registered.");
            return;
          }

          await addDoc(collection(db, "users"), {
            email: this.authData.email,
            password: this.authData.password,
          });

          this.isAuthenticated = true;
          localStorage.setItem("isAuthenticated", "true");
          alert("Sign-up successful! You are now logged in.");
        } catch (error) {
          console.error("Error signing up:", error);
          alert("An error occurred during sign-up.");
        }
      } else if (this.authMode === "login") {
        try {
          const q = query(
            collection(db, "users"),
            where("email", "==", this.authData.email),
            where("password", "==", this.authData.password)
          );
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            alert("Invalid email or password.");
            return;
          }

          this.isAuthenticated = true;
          localStorage.setItem("isAuthenticated", "true");
          alert("Login successful!");
        } catch (error) {
          console.error("Error logging in:", error);
          alert("An error occurred during login.");
        }
      }

      this.authModalVisible = false;
      this.authData = { email: "", password: "" };

      if (this.redirectAfterLogin && this.isAuthenticated) {
        this.router.push(this.redirectAfterLogin);
        this.redirectAfterLogin = null;
      }
    },
    handleLogout(router) {
      localStorage.removeItem("isAuthenticated");
      this.isAuthenticated = false;
      alert("You have been logged out.");
      if (router) {
        router.push("/home");
      }
    },
  },
});
