<template>
  <div class="recipe-detail">
    <div v-if="loading" class="loading">Loading recipe details...</div>
    <div v-else-if="!recipe" class="no-recipe">Recipe not found!</div>
    <div v-else class="recipe-container">
      <h1 class="recipe-name">{{ recipe.name }}</h1>
      <img :src="recipe.image" alt="Recipe Image" class="recipe-image" @error="onImageError" />
      <div class="recipe-info">
        <p class="recipe-description">
          <strong>Description:</strong> {{ recipe.description }}
        </p>
        <p class="recipe-series">
          <strong>Cuisine:</strong> {{ recipe.series }}
        </p>
        <p class="recipe-type">
          <strong>Type:</strong> {{ recipe.type }}
        </p>
        <h2>Ingredients</h2>
        <div v-for="(ingredientDetails, part) in formattedIngredients" :key="part" class="recipe-ingredients">
            <!-- Display the part label (e.g., Scrambled Eggs:) -->
            <strong>{{ ingredientDetails[1][0] }}</strong>
            <ul v-for="(detail, index) in ingredientDetails.slice(1)"  :key="index">
              <!-- Loop through the remaining items in the ingredient array (excluding the part label) -->
                <p v-for="(details, index) in detail.slice(1)"  :key="index">{{ details }}</p>   
            </ul>
          </div>
        <h2>Instructions</h2>
        <ul  v-for="(instruction, index) in recipe.instructions" :key="index" class="recipe-instructions">
          <strong>{{ instruction[0] }}</strong>
          <li v-for="(instructions1, index) in instruction.slice(1)" :key="index">
            {{ instructions1 }}
          </li>
        </ul>
      </div>
      <router-link :to="backLink" class="back-button">Back to Recipes</router-link>
    </div>
  </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/init";

export default {
  name: "RecipeDetail",
  data() {
    return {
      recipe: null,
      loading: true,
    };
  },
  computed: {
    // Format the ingredients into a list of parts
    formattedIngredients() {
      if (this.recipe?.ingredient) {
        return Object.entries(this.recipe.ingredient);
      }
      return [];
    },
    backLink() {
      // Dynamically set the back link based on the recipe's series
      if (this.recipe?.series) {
        return `/${this.recipe.series.toLowerCase()}`;
      }
      return "/view-all";
    },
  },
  async created() {
    try {
      const recipeId = this.$route.params.id; // Get the ID from route params
      if (!recipeId) {
        console.error("No recipe ID provided.");
        return;
      }

      const docRef = doc(db, "foods", recipeId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.recipe = docSnap.data();
      } else {
        console.error("No such recipe!");
      }
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    viewRecipe(recipe) {
    if (recipe?.id) {
      this.$router.push({ name: "RecipeDetail", params: { id: recipe.id } });
    } else {
      console.error("Recipe ID is missing");
    }
  },
  onImageError(event) {
    console.error("Error loading image:", event.target.src);
    event.target.src = "/pics/fallback.jpg"; // Replace with your fallback image path
  }
}
};
</script>

<style scoped>
.ingredient-part {
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 1rem;
}
.recipe-ingredients li {
  list-style-type: disc;
  margin-left: 1rem;
}
.recipe-detail {
  padding: 2rem;
  background-color: #fce0d1;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading,
.no-recipe {
  font-size: 1.5rem;
  color: #6a3903;
  text-align: center;
}

.recipe-container {
  max-width: 800px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.recipe-image {
  width: 100%;
  max-width: 400px;
  height: 200px;
  border-radius: 8px;
  margin-bottom: 1rem;
  object-fit: cover;
  background-color: #eaeaea;
}

.recipe-name {
  font-size: 2rem;
  color: #6a3903;
  margin-bottom: 1rem;
}

.recipe-info p {
  margin: 0.5rem 0;
}

.recipe-ingredients,
.recipe-instructions {
  margin-top: 1rem;
  color: #663e11;
  font-size: 1rem;
}

.recipe-ingredients ul {
  padding-left: 1.5rem;
  list-style: disc;
}

h2 {
  margin-top: 2rem;
  font-size: 1.5rem;
  color: #6a3903;
}

.back-button {
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  background-color: #6f350c;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #ca8308;
}
</style>
