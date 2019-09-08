<template>
    <div>
        <div v-bind:key="todo.id" v-for="todo in todos">
            <TodoItem v-bind:todo="todo" v-on:del-todo="$emit('del-todo', todo.id)"/>
        </div>
    </div>    
</template>

<script>
import TodoItem from './TodoItem.vue'

export default {
    name: "Todos",
    props: ["todos"],  //they are an array so you want to loop through them using v-for directive
    components: {
        TodoItem
    }
}
</script>

<style scoped>

</style>