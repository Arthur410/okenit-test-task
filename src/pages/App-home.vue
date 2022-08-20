<template>
  <header class="users">
    <div class="select">
      <select class="users__select" @change="sortPosts()" v-model="currentUser">
        <option value="All users">All users</option>
        <option :value="user.name" v-for="user in users" :key="user">{{user.name}}</option>
      </select>
    </div>
  </header>
  <div class="posts">
    <post v-for="post in posts" :postTitle="post.title" :postBody="post.body" :key="post" :userId="post.userId" :postId="post.id"></post>
  </div>
</template>

<script>
import post from '../components/App-postBlock'
import getMixin from '../mixins/getMixin'

export default {
  name: "Home-page",
  components: {
    post
  },
  data() {
    return {
      users: [],
      posts: [],
      currentUser: 'All users'
    }
  },
  methods: {
    getData() {
      getMixin(this.users, 'https://jsonplaceholder.typicode.com/users');
      getMixin(this.posts, 'https://jsonplaceholder.typicode.com/posts');
    },
    sortPosts() {
      // Сортировка со стороны сервера, нужно указать только правильную ссылку
      let userId;
      if (this.currentUser === 'All users') {
        getMixin(this.posts, `https://jsonplaceholder.typicode.com/posts`);
        return;
      }
      this.users.forEach(user => {
        if (user.name === this.currentUser) {
          userId = user.id;
        }
      })
      getMixin(this.posts, `https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    }
  },
  created() {
    this.getData();
  }
}
</script>

<style scoped>

/* Users select */

.users {
  padding:25px 0;
  border-bottom: 2px solid #fff;
}
select {
  appearance: none;
  outline: 0;
  border: 0;
  box-shadow: none;
  flex: 1;
  padding: 0 1em;
  color: #fff;
  background-color: #242F3D;
  background-image: none;
  cursor: pointer;
}

select::-ms-expand {
  display: none;
}

.select {
  position: relative;
  display: flex;
  width: 20em;
  height: 3em;
  border-radius: .25em;
  overflow: hidden;
}

.select::after {
  content: '\25BC';
  position: absolute;
  top: 0;
  right: 0;
  padding: 1em;
  background-color: #34495e;
  transition: .25s all ease;
  pointer-events: none;
}
.select:hover::after {
  color: #fff;
}


/* Posts */
.posts {
  padding: 50px 0;
}

</style>