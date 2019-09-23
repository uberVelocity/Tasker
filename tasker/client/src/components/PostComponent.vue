<template>
  <div class="container">
    <div class="nav">
        <button class="waves-effect waves-default btn" @click="goHome">Home</button>
        <button class="waves-effect waves-light btn" @click="goAbout">About</button>
        <button class="waves-effect waves-light btn" @click="goLogin">Login</button>
        <button class="waves-effect waves-light btn" @click="goRegister">Register</button>
    </div>
    <h1>Latest Posts</h1>
    <!-- CREATE POST HERE -->
    <div class="create-post">
      <label for="create-post">Say Something...</label>
      <input type="text" id="create-post" v-model="text" text-darken-2 placeholder="Create a post">
      <button class="waves-effect waves-light btn" v-on:click="createPost">Post!</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div class="post"
      v-for="(post, index) in posts"
      v-bind:item="post"
      v-bind:index="index"
      v-bind:key="post._id"
      v-on:dblclick="deletePost(post._id)"
      >
      {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getYear()}` }}
      <p class="text white-text">{{post.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../services/PostService';

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      text: ''
    }
  },
  // Lifecycle method that runs automatically when your component is initialized.
  // As you hit the web-page, we want the current posts stored in the db displayed
  // to the user. As such, we use axios to hit our back-end to retrieve the posts and
  // insert the posts into the 'posts' variable found in the data() {} function.
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
    goHome() {
      this.$router.push('/');
    },
    goAbout() {
      this.$router.push('/about');
    },
    goLogin() {
      this.$router.push('/login');
    },
    goRegister() {
      this.$router.push('/register');
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #6C63FF;
  background-color: #6C63FF;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at{
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15 px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

button {
  background-color: #6C63FF
}
.btn:hover {
  background-color: lightgrey;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

</style>
