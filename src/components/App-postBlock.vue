<template>
  <router-link class="post" :to="{name: 'user', params: {id: userId, postTitle, postBody, postId}}">
    <h1 class="post__title">{{ postTitle }}</h1>
    <p class="post__body">{{ postBody }}</p>
  </router-link>
</template>

<script>

export default {
  props:['postTitle', 'postBody', 'userId', 'postId']
}

</script>

<style scoped>

.post {
  border-radius: .25em;
  padding: 40px 20px;
  background: #17212B;
  display: block;
  color:#fff;
  cursor: pointer;
  transition: all .2s linear;
  text-decoration: none;
  margin-top: 20px;
}

.post:hover {
  background: #2B5278;
  transform: scale(1.01);
}

.post:first-child {
  margin-top: 0;
}

.post h1 {
  font-size: 30px;
  font-weight: 700;
}

.post p {
  margin-top: 15px;
  font-size: 21px;
}

</style>