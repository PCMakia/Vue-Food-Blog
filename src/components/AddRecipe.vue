<template>
  <div class="add-recipe-form">
    <h1>Add New Food Recipe</h1>
    <form @submit.prevent="submitRecipe" class="recipe-form">
      <!-- Basic Recipe Info -->
      <div>
        <label for="name">Recipe Name:</label>
        <input type="text" id="name" v-model="recipe.name" required />
      </div>

      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="recipe.description" required></textarea>
      </div>

      <!-- Cuisine -->
      <div>
        <label for="series">Cuisine:</label>
        <select id="series" v-model="recipe.series" required>
          <option value="" disabled>Select Cuisine</option>
          <option value="american">American</option>
          <option value="african">African</option>
          <option value="asian">Asian</option>
          <option value="european">European</option>
        </select>
      </div>

      <!-- Type -->
      <div>
        <label for="type">Type:</label>
        <select id="type" v-model="recipe.type" required>
          <option value="" disabled>Select Type</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="dessert">Dessert</option>
        </select>
      </div>

      <!-- Ingredients Section -->
      <div class="ingredients-section">
        <h3>Ingredients</h3>
        <div v-for="(items, part, index) in recipe.ingredient" :key="part">
          <label :for="'ingredient-' + part">Part {{ index + 1 }}:</label>
          <input
            type="text"
            :id="'ingredient-' + part"
            v-model="recipe.ingredient[part]"
            placeholder="Comma-separated ingredients, first element is title"
          />
          <button class="more-button" type="button" @click="removeIngredientPart(part)">Remove Part</button>
        </div>
        <button class="more-button" type="button" @click="addIngredientPart">Add More Part</button>
      </div>

      <!-- Instructions Section -->
      <div class="instructions-section">
        <h3>Instructions</h3>
        <div v-for="(steps, part, index) in recipe.instructions" :key="part">
          <label :for="'instruction-' + part">Part {{ index + 1 }}:</label>
          <textarea
            :id="'instruction-' + part"
            v-model="recipe.instructions[part]"
            placeholder="Comma-separated instructions, first element is title"
          ></textarea>
          <button class="more-button" type="button" @click="removeInstructionPart(part)">Remove Part</button>
        </div>
        <button class="more-button" type="button" @click="addInstructionPart">Add More Part</button>
      </div>

      <!-- Submit Button -->
      <button type="submit" :disabled="loading" class="submit-button">Submit Recipe</button>
    </form>

    <div v-if="loading" class="loading">Saving recipe...</div>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
  </div>
</template>

<script>
import { db } from "../../firebase/init";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


export default {
  name: "AddFoodRecipe",
  data() {
    return {
      recipe: {
        name: "",
        description: "",
        series: "",
        type: "",
        image: "", // Firebase Storage URL
        ingredient: { part1: "" },
        instructions: { part1: "" },
      },
      imageFile: null, // Holds the selected image file
      imagePreview: null, // For showing the image preview
      loading: false,
      successMessage: "",
    };
  },
  methods: {
    // Image Upload Handling
    onImageUpload(event) {
      this.imageFile = event.target.files[0];
      if (this.imageFile) {
        this.imagePreview = URL.createObjectURL(this.imageFile);
      }
    },
    async uploadImage() {
      if (!this.imageFile) return null;

      try {
        const storage = getStorage();
        const storageRef = ref(storage, `images/${this.imageFile.name}`);

        // Upload the image
        await uploadBytes(storageRef, this.imageFile);

        // Get the download URL
        return await getDownloadURL(storageRef);
      } catch (error) {
        console.error("Error uploading image:", error);
        throw new Error("Image upload failed");
      }
    },

    // Dynamic Ingredient Parts
    addIngredientPart() {
      const newPart = `part${Object.keys(this.recipe.ingredient).length + 1}`;
      this.recipe.ingredient = {
        ...this.recipe.ingredient,
        [newPart]: "",
      };
    },
    removeIngredientPart(part) {
      const { [part]: _, ...remainingParts } = this.recipe.ingredient;
      this.recipe.ingredient = remainingParts;
    },

    // Dynamic Instruction Parts
    addInstructionPart() {
      const newPart = `part${Object.keys(this.recipe.instructions).length + 1}`;
      this.recipe.instructions = {
        ...this.recipe.instructions,
        [newPart]: "",
      };
    },
    removeInstructionPart(part) {
      const { [part]: _, ...remainingParts } = this.recipe.instructions;
      this.recipe.instructions = remainingParts;
    },

    // Form Submission
    async submitRecipe() {
      this.loading = true;
      try {
        // Upload image to Firebase Storage and get its URL
        const imageUrl = await this.uploadImage();
        if (imageUrl) {
          this.recipe.image = imageUrl;
        }

        // Transform ingredients and instructions
        const ingredients = Object.fromEntries(
          Object.entries(this.recipe.ingredient).map(([part, value]) => [
            part,
            value.split(",").map((item) => item.trim()),
          ])
        );

        const instructions = Object.fromEntries(
          Object.entries(this.recipe.instructions).map(([part, value]) => [
            part,
            value.split(",").map((item) => item.trim()),
          ])
        );

        const newRecipe = {
          ...this.recipe,
          ingredient: ingredients,
          instructions: instructions,
        };

        // Add the recipe to Firestore
        const recipeRef = collection(db, "foods");
        await addDoc(recipeRef, newRecipe);

        // Success message
        this.successMessage = "Recipe added successfully!";
        this.resetForm();
      } catch (error) {
        console.error("Error adding recipe:", error);
        this.successMessage = "There was an error adding the recipe.";
      } finally {
        this.loading = false; // Ensure loading stops in both success and failure cases
      }
    },

    // Reset the form
    resetForm() {
      this.recipe = {
        name: "",
        description: "",
        series: "",
        type: "",
        image: "",
        ingredient: { part1: "" },
        instructions: { part1: "" },
      };
      this.imageFile = null;
      this.imagePreview = null;
    },
  },
};
</script>




<style scoped>
.add-recipe-form {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fce0d1;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1rem;
  color: #6a3903;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
  color: #663e11;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  resize: none;
}
.more-button {
  width: 45%;
  margin: 5px;
  padding: 0.75rem;
  background-color: #b98159;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.more-button:hover {
  background-color: #daa64d;
}


.submit-button {
  width: 100%;
  margin: 10px;
  padding: 0.75rem;
  background-color: #6f350c;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #ca8308;
}
</style>


<style scoped>
.add-recipe-form {
  max-width: 80%; /* Make form span across viewport */
  margin: 2rem auto;
  padding: 5rem;
  background-color: #f9dac5;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  border-radius: 8px;
  
}

h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.form-horizontal {
  display: flex;
  flex-wrap: wrap; /* Allows wrapping of form elements */
  gap: 1rem;
  justify-content: space-between; /* Space out form items */
  align-items: center;
}

.form-group {
  display: flex;
  flex-direction: column; /* Default layout for label and input */
  flex: 1 1 calc(33% - 1rem); /* Allows 3 items per row with a gap */
  min-width: 200px; /* Prevents items from shrinking too much */
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  resize: none;
}

.submit-button {
  padding: 0.75rem 2rem;
  background-color: #8c4312;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #e08f1e;
}

</style>

