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
            <button class="btn waves-effect waves-light blue">Sign up!</button>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    name: 'HomeComponent',
    methods: {
        goAbout() {
            this.$router.push('/about');
        },
        goServers() {
            this.$router.push('/servers');
        }
    }
}
</script>

<style scoped>

</style>