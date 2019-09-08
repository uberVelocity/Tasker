<template>
  <div id="app">
    <AddTodo v-on:add-todo="addTodo"/>
    <!-- To get the todo list in the template you use the v-bind directive -->
    <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo"/>
    <!--                   ^ this pertains to the todos list found in 'data()'. they get passed in as props -->
  </div>
</template>

<script>
import Todos from '../components/Todos';
import AddTodo from '../components/AddTodo';
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    Todos,
    AddTodo
  },
  data() {
    return {
      todos: [] 
    }
  },
  methods: {
    deleteTodo(id) {
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.todos = this.todos.filter(todo => todo.id !== id))
      .catch(err => console.log(err));
    },
    addTodo(newTodo) {
      const { title, completed } = newTodo;
      
      // Mimic back-end API (will be implemented using Node)
      axios.post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed
      })
      .then(res => this.todos = [...this.todos, newTodo])
      .catch(err => console.log(err));
    
    }
  },
  created() {
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
  .then(res => this.todos = res.data)
  .catch(err => console.log(err));
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

  .btn {
    display: inline-block;
    border: none;
    background: #555;
    color: #fff;
    padding: 7px 20px;
    cursor: pointer;
  }
</style>
