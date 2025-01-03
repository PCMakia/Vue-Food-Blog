<template>
  <div class="african-recipes">
    <h1>African Recipes</h1>
    <div v-if="loading" class="loading">Loading recipes...</div>
    <div v-else-if="recipes.length === 0" class="no-recipes">
      No African recipes found.
    </div>
    <div v-else class="recipes-grid">
      <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card">
        <img :src="recipe.image" alt="Recipe Image" class="recipe-image" />
        <div class="recipe-details">
          <h2 class="recipe-name">{{ recipe.name }}</h2>
          <p class="recipe-description">{{ recipe.description }}</p>
          <p class="recipe-type"><strong>Type:</strong> {{ recipe.type }}</p>
          <router-link
            :to="{ name: 'RecipeDetail', params: { id: recipe.id } }"
            class="view-details-button"
          >
            View Details
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/init";

export default {
  name: "African",
  data() {
    return {
      recipes: [],
      loading: true,
    };
  },
  async created() {
    try {
      const q = query(collection(db, "foods"), where("series", "==", "african"));
      const querySnapshot = await getDocs(q);
      this.recipes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching African recipes:", error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.all-recipes {
  padding: 2rem;
  background-color: #fce0d1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #6a3903;
}

.loading {
  font-size: 1.5rem;
  color: #6a3903;
}

.no-recipes {
  font-size: 1.5rem;
  color: #6a3903;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
}

.recipe-card {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.recipe-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.recipe-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.recipe-details {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.recipe-name {
  font-size: 1.5rem;
  color: #6a3903;
  margin: 0;
}

.recipe-description {
  font-size: 1rem;
  color: #663e11;
  margin: 0;
}

.recipe-series,
.recipe-type {
  font-size: 0.9rem;
  color: #a75c0c;
  margin: 0;
}

.view-details-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #6f350c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.view-details-button:hover {
  background-color: #ca8308;
}
.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto; /* Center the grid */
  padding: 2rem; /* Add padding from the edges */
  box-sizing: border-box; /* Ensure padding does not affect width */
}

</style>

