<template>
    <div>
      <div class="">
        <router-link v-if="currentUser" to="/create-posts" class="nav-link">New Post</router-link>
      </div>
      <div class="row">
        <div class="card col-sm-6" v-for="post in posts" :key="post._id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.description }}</p>
          <p>Created At: {{ formatDate(post.createdAt) }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useQuery, useSubscription } from '@vue/apollo-composable';
  import gql from 'graphql-tag';
  import { watch, computed } from 'vue';
  
  export default {
    name: 'PostComp',
    setup() {
      // Fetch posts using useQuery
      const { result: postsResult } = useQuery(gql`
        query {
          posts {
            _id
            title
            description
            createdAt
          }
        }
      `);
  
      const posts = computed(() => {
        if (postsResult.value.posts) {
          return postsResult.value.posts;
        } else {
          return [];
        }
      });
  
      // Subscribe to new posts using useSubscription
      const { result: newPostResult, loading, error } = useSubscription(gql`
        subscription {
          newPost {
            _id
            title
            description
            createdAt
          }
        }
      `);
  
      console.log('Loading:', loading);
      console.log('Error:', error);
      console.log('New Post Result:', newPostResult);
  
      // Watch for changes in the newPost subscription result and update the posts array.
      watch(newPostResult, (newValue) => {
        if (newValue.data.newPost) {
          posts.value.push(newValue.data.newPost);
        }
      });
  
      return { posts };
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      },
    },
    methods: {
      formatDate(createdAt) {
        const date = new Date(parseInt(createdAt));
        return date.toLocaleString();
      },
    },
  };
  </script>
  
  
  

  <!-- <script>
  import UserService from "../services/user.service";
  export default {
    data(){
        return{
        posts:[]
        }
    },
    name: 'PostsComponent',
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    mounted() {
      if (!this.currentUser) {
        this.$router.push('/');
      }
      UserService.getPosts().then(
      (response) => {
        this.posts = response.data.data.posts;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    },
    methods: {
    formatDate(createdAt) {
      const date = new Date(parseInt(createdAt));
      return date.toLocaleString();
    }
  }
  };
  </script> -->