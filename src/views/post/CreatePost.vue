<script setup>
import { ref, computed, reactive } from 'vue';
import { usePostsStore } from '@/stores/posts';
import { useRouter } from 'vue-router';

const router = useRouter();
const postsStore = usePostsStore();
const post=reactive({
    title: "",
    body: "",
    author: "",
});
const isFormInvalid = computed(()=> {
    return post.title === "" || post.body === "" || post.author === ""
})

const submit = () => {
    console.log("title : ", post.title, " --- body : ", post.body )
    postsStore.addPost(post);
    // router.push({ name: 'home'})
}

</script>

<template>

    <h1>Create Post</h1>
    <!-- {{ post.title }} == {{ isFormInvalid }} -->
    <form @submit.prevent="submit()">
        <div>
            <label>Post Author</label><br>
            <input type="text" v-model="post.author">
            <!-- <input type="text" :value="post.title" @input="(e) => (post.title = e.target.value)"> -->
        </div>
        <div>
            <label>Post title</label><br>
            <input type="text" v-model="post.title">
            <!-- <input type="text" :value="post.title" @input="(e) => (post.title = e.target.value)"> -->
        </div>
        <div>
            <label>Post Body</label><br>
            <textarea rows="7" v-model="post.body"></textarea>
        </div>
        <div>
            <button :disabled="isFormInvalid">Add</button>
        </div>

    </form>

</template>