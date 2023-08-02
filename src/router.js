import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Posts from "./components/Posts.vue";
import CreatePosts from "./components/CreatePost.vue";
// lazy-loaded

const routes = [
    {
        path: "/",
        component: Login,
    },
    {
        path: "/posts",
        component: Posts,
    },
    {
        path: "/create-posts",
        component: CreatePosts,
    },
    {
        path: "/register",
        component: Register,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;