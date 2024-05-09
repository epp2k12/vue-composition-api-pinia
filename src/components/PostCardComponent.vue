<script setup>
    import { defineProps, defineEmits } from 'vue';
    import { usePostsStore } from '@/stores/posts';

    const postStore = usePostsStore();

    defineProps({
        post: {
            type: Object,
            required: true,
        }
    });

    const emit = defineEmits(['getID', 'getTitle', 'getAuthor']);

    const getTheTitle = (title) => {
        emit('getTitle', title);
    }

    const getTheAuthor = (author) => {
        emit('getAuthor', author);
    }

</script>

<template>

        <div>
            <button @click="$emit('getID', post.id)">Get ID</button>
            <button @click="getTheTitle(post.title)">Get Title</button>
            <button @click="getTheAuthor(post.author)">Get Author</button>
        </div>


   
        <h1 :class="post.is_saved?'saved':'not-saved'">{{ post.title }}</h1>
        <p>{{ post.body }}</p>
        <h3>{{ post.author }}</h3>
        <h5 style="background: teal; color: white">{{ post.created_at }}</h5>

        <div>
            <button class="material-icons" @click="postStore.deletePost(post.id)">delete</button>
            <button class="material-icons" @click="postStore.savePost(post.id)">bookmark_border</button>
        </div>


</template>

<style scoped>
.saved {
    background: rgb(119, 0, 0);
    color: white;
}
</style>