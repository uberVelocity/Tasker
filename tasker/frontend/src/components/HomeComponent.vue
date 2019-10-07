<template>
    <div>
        <nav class="nav-wrapper white z-depth-0">
        <button class="btn waves-effect waves-ligh blue" @click="goAbout">About</button>
        <button class="btn waves-effect waves-ligh blue" @click="goServers">Servers</button>
        <form action="">
            <ul class="right">
                <li><input type="text" placeholder="Username"></li>
                <li><input type="password" placeholder="Password"></li>
                <li>
                    <a class="btn waves-effect waves-light blue">
                        Log in
                    </a>
                </li>
            </ul>
        </form>
    </nav>
    <div class="row">
        <div class="col s7">
                <img src="../assets/undraw_through_the_window_51ew.svg" alt="" class="responsive-img">
        </div>
        <div class="col s5">
            <h2>Run tasks. Smartly.</h2>
            <h4>Join Tasker to run your tasks today!</h4>
            <form @submit.prevent="getHistory">
                <button>Get History</button>
                <button class="btn waves-effect waves-light blue">Sign up!</button>
            </form>
        </div>
    </div>
    </div>
</template>

<script>
import io from 'socket.io-client';

export default {
    
    name: 'HomeComponent',
    data() {
        return {
            isConnected: 'false',
            socket: io('localhost:4001')
        }
    },
    methods: {
        goAbout() {
            this.$router.push('/about');
        },
        goServers() {
            this.$router.push('/servers');
        },
        getHistory(e) {
            e.preventDefault();
            
            this.socket.emit('HELLO_MESSAGE', {
                message: 'hello'
            });

        }
    }
    
}
</script>

<style scoped>

</style>