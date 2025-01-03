import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AboutPage from '../views/AboutPage.vue';
import ViewAll from '../components/ViewAll.vue';
import European from '../components/European.vue';
import Asian from '../components/Asian.vue';
import American from '../components/American.vue';
import African from '../components/African.vue';
import AddRecipe from '../components/AddRecipe.vue';
import RecipeDetail from '../components/RecipeDetail.vue';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
  {
    path: '/view-all',
    name: 'ViewAll',
    component: ViewAll,
  },
  {
    path: '/european',
    name: 'european',
    component: European,
  },
  {
    path: '/asian',
    name: 'asian',
    component: Asian,
  },
  {
    path: '/american',
    name: 'american',
    component: American,
  },
  {
    path: '/african',
    name: 'african',
    component: African,
  },
  {
    path: '/add-recipe',
    name: 'AddRecipe',
    component: AddRecipe,
    meta: { requiresAuth: true },
  },
  { 
    path: '/', 
    redirect: '/home' 
  },
  {
    path: '/recipe/:id',
    name: 'RecipeDetail',
    component: RecipeDetail,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"; // Retrieve auth state
    if (to.meta.requiresAuth && !isAuthenticated) {
      alert("Please log in to access this page.");
      next(false); // Redirect to Home instead of login
    } else {
      next(); // Allow navigation
    }
  });
  


export default router;
