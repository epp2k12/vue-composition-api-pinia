<script setup>
import { onMounted, ref } from 'vue';

import TestRefReactive from '../components/test-components/TestRefReactiveComponent.vue';
import PostCardWrapper from '@/views/wrappers/PostCardWrapper.vue';
import PostCard from '@/components/PostCardComponent.vue'
import { usePostsStore } from '@/stores/posts';
// const posts = [
//   {
//     id: 1,
//     title: "Title 1",
//     body: "this is the sample body 1",
//     author: "John Lennon"
//   },
//   {
//     id: 2,
//     title: "Title 2",
//     body: "this is the sample body 2",
//     author: "Paul McArtney"
//   },
//   {
//     id: 3,
//     title: "Title 3",
//     body: "this is the sample body 3",
//     author: "Ringo Starr"
//   },
//   {
//     id: 4,
//     title: "Title 4",
//     body: "this is the sample body 4",
//     author: "George Harrison"
//   },
// ]

const postStore = usePostsStore();
// console.log(postStore.posts);
onMounted(() => {
  postStore.getPosts();
})

const used_id = ref('');
let used_title = ref('');
let used_author = ref('');
const getID = (data) => {
  used_id.value = data;
}
const getTitle = (data) => {
  used_title.value = data;
}
const getAuthor = (data) => {
  used_author.value = data;
}

const postFilter = ref('all');

const changeFilter = () => {
  postFilter.value = (postFilter.value === 'all') ? 'saved' : 'all';
}

</script>

<template>
  <main>
    THis HOmEView {{ postFilter }}
    <br>
    <!-- <TestRefReactive />  -->

    <!-- Header -->
    <div class="header" style="padding: 10px; background:teal; color:white">
      <div>
        <h3>{{ (postFilter === 'all') ? 'All Posts' : 'Saved Posts' }}</h3>
        <span 
          class="material-icons spinning"
          v-show="postStore.loading">cached</span>
      </div>
      <button @click="changeFilter">{{ (postFilter === 'all') ? 'Show saved posts' : 'Show all posts' }}</button>
    </div>

    <div
      v-if="postStore.errorMsg" 
      class="error" style="background:red; color:white; border-radius: 6px; padding:10px; margin: 10px">
      {{ postStore.errorMsg }}</div>

    <div>
      <ul>
        <li><b>Emitted Data from PostCard</b></li>
        <li>Used ID {{ used_id }}</li>
        <li>Used Title {{ used_title }}</li>
        <li>Used Author {{ used_author }}</li>
      </ul>
    </div>

    <!-- <div v-for="(post, index) in postStore.posts" :key="index"> -->
    <div v-if="postFilter === 'all'">
      <div v-for="(post, index) in postStore.sorted" :key="index">
        <PostCardWrapper>
          <template #card-header>This is the Slot card-header</template>
          <PostCard :post="post" @get-ID="getID" @get-title="getTitle" @getAuthor="getAuthor" />
        </PostCardWrapper>
      </div>
    </div>

    <div v-if="postFilter === 'saved'">
      <div v-for="(post, index) in postStore.saved" :key="index">
        <PostCardWrapper>
          <template #card-header>This is the Slot card-header</template>
          <PostCard :post="post" @get-ID="getID" @get-title="getTitle" @getAuthor="getAuthor" />
        </PostCardWrapper>
      </div>
    </div>



  </main>
</template>

<style>
.header {
  display: flex;
  /* justify-content: space-between; */
  justify-content: space-between;
  gap: 20px;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.material-icons.spinning {
  animation: spin infinite 2s linear; /* Adjust animation duration as needed */
}
</style>
