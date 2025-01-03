<template>
  <nav class="navbar">
    <!-- Logo -->
    <div class="nav-logo">
      <img src="@/assets/Project2Image/logo.png" alt="Logo" class="logo" />
    </div>

    <!-- Navigation Links -->
    <div class="nav-links">
      <router-link to="/home"><strong>Home</strong></router-link>
      <router-link to="/about"><strong>About</strong></router-link>
      <router-link to="/view-all"><strong>View All Recipes</strong></router-link>
      <router-link v-if="authStore.isAuthenticated" to="/add-recipe" class="add-recipe"><strong>Add Recipe</strong></router-link>
      <button v-else @click="handleAddRecipe" class="add-recipe"><strong>Add Recipe</strong></button>
    </div>

    <!-- Search Bar and Filter -->
    <div class="search-auth">
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search recipes..."
        />
        <button class="search-button" @click="filterRecipes"><strong>Search</strong></button>
        <div class="filter-icon-container" @click="toggleFilterDropdown">
          <i class="fas fa-filter"></i>
        </div>
        <div v-if="showFilterDropdown" class="filter-dropdown" @click.stop>
          <div class="filter-option">
            <label for="type">Meal:</label>
            <select id="type" v-model="selectedType">
              <option value="">Select Meal</option>
              <option value="">All</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>
          <div class="filter-option">
            <label for="series">Cuisine:</label>
            <select id="series" v-model="selectedSeries">
              <option value="">Select Cuisine</option>
              <option value="">All</option>
              <option value="african">African</option>
              <option value="asian">Asian</option>
              <option value="european">European</option>
              <option value="american">American</option>
            </select>
          </div>
          <button @click="filterRecipes" class="apply-filters">Apply Filters</button>
        </div>
      </div>
    </div>

    <!-- Auth Buttons -->
    <div class="auth-buttons">
      <button
        v-if="!authStore.isAuthenticated"
        @click="authStore.toggleAuthModal('login')"
        class="auth-button login"
      >
        <strong>Login</strong>
      </button>
      <button v-else @click="authStore.handleLogout(router)" class="auth-button logout">
        <strong>Logout</strong>
      </button>
      <button
        v-if="!authStore.isAuthenticated"
        @click="authStore.toggleAuthModal('signup')"
        class="auth-button signup"
      >
        <strong>Sign Up</strong>
      </button>
    </div>

    <!-- Authentication Modal -->
    <div v-if="authStore.authModalVisible" class="auth-modal">
      <div class="modal-overlay" @click="authStore.authModalVisible = false"></div>
      <div class="modal-content" @click.stop>
        <h3 v-if="authStore.authMode === 'login'">Login</h3>
        <h3 v-if="authStore.authMode === 'signup'">Sign Up</h3>
        <input
          type="text"
          v-model="authStore.authData.email"
          placeholder="Email"
        />
        <input
          type="password"
          v-if="authStore.authMode !== 'forgot-password'"
          v-model="authStore.authData.password"
          placeholder="Password"
        />
        <button @click="authStore.handleAuth" class="submit-button">
          {{ authStore.authMode === 'login' ? 'Login' : 'Sign Up' }}
        </button>
        <button
          @click="authStore.authModalVisible = false"
          class="close-button"
        >
          Close
        </button>
        <div class="auth-options" v-if="authStore.authMode === 'login'">
          <p>
            Don't have an account?
            <span @click="authStore.toggleAuthModal('signup')">Sign Up</span>
          </p>
        </div>
        <div class="auth-options" v-if="authStore.authMode === 'signup'">
          <p>
            Already have an account?
            <span @click="authStore.toggleAuthModal('login')">Login</span>
          </p>
        </div>
      </div>
    </div>
  </nav>
</template>


<script>
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    return {
      authStore,
      router,
    };
  },
  data() {
    return {
      searchQuery: "",
      selectedType: "",
      selectedSeries: "",
      showFilterDropdown: false,
    };
  },
  methods: {
    toggleFilterDropdown() {
      this.showFilterDropdown = !this.showFilterDropdown;
    },
    filterRecipes() {
      const filters = {
        searchQuery: this.searchQuery || null,
        type: this.selectedType || null,
        series: this.selectedSeries || null,
      };
      console.log("Filters emitted from NavBar.vue:", filters);
      this.$emit("apply-filters", filters);
      this.showFilterDropdown = false;
    },
    handleAddRecipe() {
      if (!this.authStore.isAuthenticated) {
        this.authStore.redirectAfterLogin = "/add-recipe";
        this.authStore.toggleAuthModal("login");
      } else {
        this.$router.push("/add-recipe");
      }
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fce0d1;
  border-bottom: 1px solid #6a3903;
}

.nav-logo {
  display: flex;
  align-items: center;
}

.logo {
  height: 100px;
  width: auto;
  margin-right: 1rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links a {
  text-decoration: none; /* Removes underline */
  color: #663e11; /* Keeps your original color */
  transition: color 0.3s ease; /* Smooth color transition */
  font-size: 1.25rem;
}
.nav-links button {
  text-decoration: none; /* Removes underline */
  transition: color 0.3s ease; /* Smooth color transition */
  font-size: 1rem;
  background-color: #a04f19;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  color: rgb(216, 128, 12);
  cursor: pointer;
}
.nav-links button:hover {
    color: #ca8308;
}

.nav-links a:hover {
  color: #ca8308; /* Optional: Changes color on hover */
}
.auth-button.logout {
  background-color: #aa4c12; /* Red background for logout */
  color: white; /* White text */
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.auth-button.logout:hover {
  background-color: #b02a37; /* Slightly darker red */
  color: white; /* Ensures text stays white on hover */
  transform: scale(1.05); /* Slightly larger on hover */
}

.auth-button.logout:active {
  background-color: #a71d2a; /* Even darker red on click */
  transform: scale(0.95); /* Shrinks slightly when clicked */
}

.search-bar {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.search-button {
  padding: 0.5rem 1rem;
  background-color: #a75c0c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #c68b3e;
}
.filter-container {
  position: relative; /* Ensures the dropdown is positioned relative to the icon */
}

.filter-icon-container {
  cursor: pointer;
  font-size: 1.5rem;
  color: #6f350c;
  position: relative;
}

.filter-dropdown {
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  transform: translateX(-100%);
  background-color: white;
  border: 1px solid #5a2e03;
  border-radius: 4px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 999;
  width: 200px;
}
.filter-dropdown .filter-option {
  margin-bottom: 1rem; /* Space between dropdown options */
}
.filter-dropdown label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.apply-filters {
  padding: 0.5rem;
  background-color: #6f350c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.apply-filters:hover {
  background-color: #ca8308;
}

.auth-buttons {
  display: flex;
  gap: 0.5rem;
}

.auth-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.auth-button.login {
  background-color: #a04f19;
}

.auth-button.signup {
  background-color: #a04f19;
}

.auth-button.login:hover {
  background-color: #e88936;
}

.auth-button.signup:hover {
  background-color: #dda259;
}

.auth-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(69, 25, 25, 0.2);
  width: 400px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}

.submit-button {
  width: 100%;
  padding: 0.5rem;
  background-color: #6f350c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #ca8308;
}

.close-button {
  margin-top: 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #ec98a0;
}
.close-button:active {
  background-color: #a71d2a; /* Darker red when pressed */
  transform: scale(0.95); /* Shrinks slightly when pressed */
}
.modal-content {
  position: relative;
  z-index: 1001;
}

.modal-content button {
  padding: 0.5rem 1rem;
  background-color: #a64f11; /* Default background color */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease; /* Smooth transitions */
}

.modal-content button:hover {
  background-color: #ca8308; /* Brighter hover color */
  transform: scale(1.05); /* Slightly enlarges the button on hover */
}

.modal-content button:active {
  background-color: #a75c0c; /* Darker color on click */
  transform: scale(0.95); /* Shrinks slightly when pressed */
}

</style>
