<template>
    <div class="container">
        <h1>Register</h1>
        <input name="name" placeholder="name" v-model="name">
        <input type="email" name="email" placeholder="email"
        v-model="email">
        <br>
        <input type="password" name="password" placeholder="password"
        v-model="password">
        <br>
        <button class="waves-effect waves-default btn" @click="register">Register</button>
        <br>
        <label> Response: {{ response }} </label>
    </div>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService';

export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            response: ''
        }
    },
    methods: {
        async register() {
            const response = await AuthenticationService.register({
                name: this.name,
                email: this.email,
                password: this.password
            });
            if (response.data.user) {
              this.$router.push('/login');
            }
            else {
              this.response = 'invalid fields';
            }
        }
    }
}
</script>

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

div.server {
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
  background-color: #6C63FF;
}
.btn:hover {
  background-color: #352fa1;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

select {
  display: flex;
}

input {
  color: #6C63FF !important;
  border-bottom: 1px solid #6C63FF !important;
  -webkit-box-shadow: 0 1px 0 0 #6C63FF !important;
  box-shadow: 0 1px 0 0 #6C63FF !important;
}

.btn:focus {
  background-color: #6C63FF;
}
</style>