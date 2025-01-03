<template>
  <div id="app" class="app-background">
    <NavBar @apply-filters="applyFilters" />
    <router-view :filters="filters" />
    <Footer />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
export default {
  data() {
    return {
      filters: {},
    };
  },
  components: {
    NavBar,
    Footer,
  },
  methods: {
    handleFilter(filters) {
      console.log("Applied filters:", filters);
      // Use these filters to filter recipes in your application
    },
    applyFilters(filters) {
      console.log("Received filters in parent:", filters); // Debug log
      this.filters = filters;
      this.$router.push({ name: "ViewAll" }); // Redirect to "ViewAll" to show filtered results
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.app-background {
  background-image: url('@/assets/Project2Image/background.jpeg'); /* Replace with your actual background image */
  
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Prevent the image from repeating */
  min-height: 100vh; /* Ensure the background spans the full height of the viewport */
  display: flex;
  flex-direction: column; /* Keeps content stacked vertically */
  position: relative; /* Ensure nothing overlaps unintentionally */
  overflow: hidden; /* Prevent scrolling issues */
  
}

/* Content wrapper ensures content doesn’t overlap */
</style>
