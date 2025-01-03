<template>
  <div class="homepage">
    <!-- Background Image Section -->
    <div class="background-section">
      <img src="@/assets/Project2Image/background.jpeg" alt="Background" class="background-image" />
    </div>
    <!-- Cuisine Squares Section -->
    <div class="cuisine-container">
      <div class="cuisine-card" @click="navigateTo('asian')">
        <img src="@/assets/Project2Image/asianBG.jpg" alt="Asian Cuisine" class="cuisine-image" />
        <h3>Asian Cuisine</h3>
      </div>
      <div class="cuisine-card" @click="navigateTo('european')">
        <img src="@/assets/Project2Image/europeanBG.avif" alt="European Cuisine" class="cuisine-image" />
        <h3>European Cuisine</h3>
      </div>
      <div class="cuisine-card" @click="navigateTo('american')">
        <img src="@/assets/Project2Image/americanBG.jpg" alt="American Cuisine" class="cuisine-image" />
        <h3>American Cuisine</h3>
      </div>
      <div class="cuisine-card" @click="navigateTo('african')">
        <img src="@/assets/Project2Image/africanBG.jpg" alt="African Cuisine" class="cuisine-image" />
        <h3>African Cuisine</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo(cuisine) {
      this.$router.push(`/${cuisine}`); // Dynamically navigate based on cuisine
    },
  },
};
</script>

<style scoped>
.homepage {
  padding: 2rem;
  text-align: center;
}
.background-section {
  width: 100%;
  height: 300px; /* Adjust height based on your preference */
  overflow: hidden;
  position: relative;
}
.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image scales nicely */
}
.cuisine-container {
  display: flex;
  justify-content: center; /* Centers the squares horizontally */
  gap: 2rem; /* Space between the squares */
  margin-top: 2rem;
  padding: 0 2rem;
}

.cuisine-card {
  position: relative;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 300px; /* Fixed width for the squares */
  height: 350px; /* Fixed height for the squares */
}

.cuisine-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.cuisine-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image fits nicely in the square */
}


h3 {
  position: absolute; /* Overlay title on top of the image */
  bottom: 0;
  width: 100%;
  margin: 0;
  padding: 0.5rem;
  background: #441b09;
  color: white;
  font-size: 1rem;
  text-transform: uppercase;
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
}
</style>

