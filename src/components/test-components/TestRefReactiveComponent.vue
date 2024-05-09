<template>
    
    <div>{{ count_reactive.counter }}</div>
    <div>{{ count }}</div>
    <button @click="decrement">-</button>
    <button @click="increment">+</button>

</template>

<script setup>
import { ref, reactive } from 'vue';

const count = ref(0);
const count_reactive = reactive({
    counter: 0
})

const increment = () => {
    count.value++;
    count_reactive.counter++;
}

const decrement = () => {
    count.value--;
    count_reactive.counter--;
}

</script>