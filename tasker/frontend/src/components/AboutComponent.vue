<template>
    <div>
        <h1> {{title}} </h1>
        <button @click="getTitle">Change title</button>
    </div>
    
    
</template>

<script>
import ServerService from '../services/ServerService';

export default {
    data() {
        return {
            title: 'About'
        }
    },
    methods: {
        async getTitle() {
            const response = await ServerService.getAbout();
            this.title = response.data.text;
        }
    }
}
</script>

<style scoped>

</style>