<template>
  <footer class="footer">
    <div class="footer-content">
      <h3>Get My Best Recipes</h3>
      <p>Subscribe to receive our latest recipes directly to your inbox!</p>
      <div class="subscribe-form">
        <input
          type="email"
          v-model="email"
          placeholder="Enter your email"
          class="email-input"
        />
        <button @click="handleSubscribe" class="subscribe-button">Subscribe</button>
      </div>
    </div>
  </footer>
</template>

<script>
import {db} from '../../firebase/init'
import { collection, addDoc } from "firebase/firestore";
export default {
  data() {
    return {
      email: "",
      successMessage: "",
    };
  },
  methods: {
    async handleSubscribe() {
      if (!this.email || !this.email.includes("@")) {
        alert("Please enter a valid email address.");
        return;
      }
      try {
        await addDoc(collection(db, "subscribers"), {
            email: this.email,
          });
      }
      catch (error) {
        console.error("Error adding your email:", error);
        this.successMessage = "There was an error adding you to the list";
      } finally {
        // Simulate subscription logic
      console.log("Subscribed with email:", this.email);
      alert("Thank you for subscribing!");
      this.email = ""; // Clear input field after subscribing
      }
      
    },
  },
};
</script>

<style scoped>
.footer {
  background-color: #f9dac5;
  padding: 2rem;
  text-align: center;
  border-top: 1px solid #ddd;
}

.footer-content {
  max-width: 600px;
  margin: 0 auto;
}

.footer h3 {
  font-size: 1.8rem;
  color: #663e11;
  margin-bottom: 0.5rem;
}

.footer p {
  font-size: 1rem;
  color: #6f350c;
  margin-bottom: 1rem;
}

.subscribe-form {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.email-input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 60%;
}

.subscribe-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #8c4312;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.subscribe-button:hover {
  background-color: #e08f1e;
}
</style>
