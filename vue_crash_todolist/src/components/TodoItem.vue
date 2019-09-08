<template>
    <div>
        <p>Todo Item</p>
    </div>
</template>

<script>
export default {
    name: "TodoItem"
}
</script>

<style scoped>
    .todoItem {
        background: #ffffff;
        padding: 10px;
        border-bottom: 1px #ccc dotted;
    }
    .isCompleted {
        text-decoration: line-through;
    }
    .del {
        background: #ff0000;
        color: #ffffff;
        border: none;
        padding: 5px 9px;
        border-radius: 50%;
        cursor: pointer;
        float: right;
    }
</style>