<template>
  <div class="aboutpage">
    <div class="background-section">
      <img src="@/assets/Project2Image/background.jpeg" alt="Background" class="background-image" />
    </div>
    <div class="about-header">
      <h1>Welcome to The Global Recipe Sharing Platform</h1>
    </div>
    <div class="about-content">
      <p>
        Here, we celebrate the diversity of cuisines from every corner of the globe. 
        Whether you’re in the mood for a hearty breakfast, a delightful lunch, a comforting dinner, or a sweet dessert, 
        you’ll find a curated collection of authentic recipes categorized by continent – Asian, European, American, and African dishes all await you.
      </p>
      <p>
        Our mission is simple: to bring people together through the universal language of food. By sharing authentic, easy-to-follow recipes, 
        we aim to inspire a love for global cuisines and create a space where culinary exploration and cultural exchange thrive.
      </p>
      <p>
        Why did we choose this path? Because food has the unique power to bridge cultural gaps and spark curiosity. 
        With the growing interest in trying recipes from around the world, we wanted to create a platform where food enthusiasts and novice cooks alike can discover, create, and share their favorite dishes.
      </p>
      <p>
        We’re dedicated to making this platform visually appealing, easy to use, and packed with high-quality content. 
        Whether you're here to find a recipe or share one of your own, we hope you feel at home in this vibrant community of food lovers.
      </p>
      <p class="call-to-action">
        So, grab your apron, explore, and let’s cook up something amazing together! 🥘🌟
      </p>
    </div>    
  </div>
</template>
<script>


export default {
  name: 'About',
  
}
</script>
<style scoped>
.aboutpage {
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
.about-header h1 {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #6f350c; /* Rich brown color for text */
  margin-bottom: 2rem;
  margin-top: 1rem;
}

.about-content p {
  margin-bottom: 1rem;
  color: #3e2723; /* Darker brown for content text */
  font-size: 1rem;
}

.about-content p.call-to-action {
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #a75c0c; /* Bright accent for the call-to-action */
}

.about-content p.call-to-action:hover {
  color: #ca8308; /* Subtle hover effect for call-to-action */
}
</style>