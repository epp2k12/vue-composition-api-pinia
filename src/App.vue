<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { usePostsStore } from '@/stores/posts'
// const postsStore = usePostsStore();
// onMounted(() => {
//   postsStore.getPosts();
// })



</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink :to="{ name: 'home' }" class="nav-link">Home</RouterLink>
        <RouterLink :to="{ name: 'about' }" class="nav-link">About</RouterLink>
        <RouterLink :to="{ name: 'create-post' }" class="nav-link">Create Post</RouterLink>
      </nav>
    </div>
  </header>

  <section class="main-section">

    <div class="child">
      <RouterView />
    </div>

    <div class="child">
      <HomeView />
    </div>

  </section>

</template>

<style>
.main-section {
  display: flex;
  /* justify-content: space-between; */
}

.child {
  width: 50%;
}



nav {
  padding: 1rem 2rem;
  background: #1e40af;
  border-bottom: 1px solid #60a5fa;
}

.nav-link {
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  margin-right: 1rem;
}

.nav-link:hover {
  color: yellow;
}
</style>
