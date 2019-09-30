<template>
    <div>
      <form @submit.prevent="login" class="login">
        <h1>Sign in</h1>
        <label>Username</label>
        <input required v-model="username" type="text" placeholder="Username">
        <br>
        <label>Password</label>
        <input required v-model="password" type="password" placeholder="Password">
        <hr/>
        <button type="submit">Login</button>    
      </form> 
    </div>
</template>

<script>
export default {
    name: 'Login',
    methods: {
        login() {
            
        }
    }
}
</script>

<style scoped>

</style>