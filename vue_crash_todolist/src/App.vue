<template>
  <div id="app">
    <!-- To get the todo list in the template you use the v-bind directive -->
    <h1>Todos</h1>
  </div>
</template>

<script>
import Todos from './components/Todos';

export default {
  name: 'app',
  components: {
    Todos
  },
  data() {
    return {
      todos: [
        {
          id: 1,
          title: 'Learn Node.js',
          completed: 'true'
        },
        {
          id: 2,
          title: 'Learn Express.js',
          completed: 'true'
        },
        {
          id: 3,
          title: 'Learn Vue.js',
          completed: 'false'
        }
      ]
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}
</style>
