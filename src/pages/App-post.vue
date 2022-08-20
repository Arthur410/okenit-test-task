<template>
  <div class="post-page">
    <div class="post-page__user-wrapper">
      <h1 class="title">User info</h1>
      <div class="post-page__user-info">
        <ul class="user-info">
          <li class="user-info__col_base user-info__col">
            <h1>Base info:</h1>
            <ul>
              <li>User: {{authorName}}</li>
              <li class="email">Email: {{authorEmail}}</li>
              <li>Phone: {{authorPhone}}</li>
              <li>Website: {{authorWebsite}}</li>
            </ul>
          </li>
          <li class="user-info__col_address user-info__col">
            <h1>Address:</h1>
            <ul>
              <li>Street: {{authorAddress.street}}</li>
              <li>Suite: {{authorAddress.suite}}</li>
              <li>City: {{authorAddress.city}}</li>
              <li>Zipcode: {{authorAddress.zipcode}}</li>
              <li>Geo lat: {{authorAddress.geo.lat}}</li>
              <li>Geo lng: {{authorAddress.geo.lng}}</li>
            </ul>
          </li>
          <li class="user-info__col_company user-info__col">
            <h1>Company info:</h1>
            <ul>
              <li>Name: {{authorCompany.name}}</li>
              <li>Catch phrase: {{authorCompany.catchPhrase}}</li>
              <li>Bs: {{authorCompany.bs}}</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="post-page__post-wrapper">
      <h1 class="title">Post info</h1>
      <div class="post-page__post-info">
        <h1>Title: {{postTitle}}</h1>
        <p>Body: {{postBody}}</p>
      </div>
    </div>
    <div class="post-page__comments">
      <form class="comment-form">
        <input required type="text" class="comment-form__add" placeholder="Add a comment" v-model="commentText">
        <div class="comment-form__button">
          <button @click="addComment($event)" type="submit">Send</button>
        </div>
      </form>
      <div class="comment-wrapper">
        <h1 class="comment-wrapper__title">Comments:</h1>
        <div class="comment-wrapper__item" v-for="comment in commentsList" :key="comment">
          <h1>{{comment.name}}</h1>
          <h2 class="email">{{comment.email}}</h2>
          <p>{{comment.body}}</p>
        </div>
      </div>
    </div>
    <div class="notifications">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import getMixin from '../mixins/getMixin'
export default {
  name: "Post-page",
  props: ['id', 'postId'],
  data() {
    return {
      // Текст для уведомления по умолчанию
      notification: 'Comment added successfully!',

      // Переменные для комментариев
      commentsList: [],
      commentText: '',

      // Переменные с данными о пользвателе / посте
      authorName: '',
      authorUserName: '',
      authorEmail: '',
      authorAddress: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: '',
        }
      },
      authorPhone: '',
      authorWebsite: '',
      authorCompany: {
        name: '',
        catchPhrase: '',
        bs: ''
      },
      postBody: '',
      postTitle: '',
    }
  },
  methods: {
    async getData() {
      let users = [];

      // Находим нужного пользователя, чтобы вывести данные
      getMixin(users, 'https://jsonplaceholder.typicode.com/users').then(() => {
        const currentUser = users[this.id - 1];
        this.authorName = currentUser.name;
        this.authorUserName = currentUser.username;
        this.authorEmail = currentUser.email;

        // address data
        this.authorAddress.street = currentUser.address.street;
        this.authorAddress.suite = currentUser.address.suite;
        this.authorAddress.city = currentUser.address.city;
        this.authorAddress.zipcode = currentUser.address.zipcode;
        this.authorAddress.geo.lat = currentUser.address.geo.lat;
        this.authorAddress.geo.lng = currentUser.address.geo.lng;

        this.authorPhone = currentUser.phone;
        this.authorWebsite = currentUser.website;

        // company data
        this.authorCompany.name = currentUser.company.name;
        this.authorCompany.catchPhrase = currentUser.company.catchPhrase;
        this.authorCompany.bs = currentUser.company.bs;
      })

      // Получаем список комментариев
      await getMixin(this.commentsList, `https://jsonplaceholder.typicode.com/posts/${this.postId}/comments`);

      let posts = [];

      // Получаем нужный пост
      getMixin(posts, 'https://jsonplaceholder.typicode.com/posts').then(() => {
        posts.forEach(post => {
          if (post.id === parseInt(this.postId)) {
            this.postBody = post.body;
            this.postTitle = post.title;
          }
        })
      })

    },
    addComment(e) {
      if (!this.commentText) {
        e.checkValidity();
        return;
      }
      const notificationBlock = document.querySelector('.notifications');
      const notification = document.createElement('div');
      notification.classList.add('notification');
      e.preventDefault();
      axios.post('https://jsonplaceholder.typicode.com/comments', {
        postId: this.postId,
        name: 'guest',
        email: 'unset',
        body: this.commentText,
      }).then(() => {
        notification.innerHTML = this.notification;
        notificationBlock.appendChild(notification);
        setTimeout(() => {
          notificationBlock.removeChild(notification);
        }, 3000)
        this.commentText = '';
      }).catch(error => {
        alert(error);
      })
    }
  },
  created() {
    this.getData();
  },
}
</script>

<style>

.email {
  font-style: italic;
}
/* User Info Section */

.post-page__user-wrapper {
  margin-top: 35px;
  margin-bottom: 40px;
}

.post-page__user-wrapper .title {
  margin-bottom: 10px;
}

.post-page__user-info {
  border-radius: .25em;
  background: #2B5278;
  padding: 30px;
  color:#fff;
}

.post-page__user-info .user-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.post-page__user-info h1 {
  font-size: 30px;
}

.post-page__user-info li {
  margin-top: 15px;
  font-size: 21px;
  word-wrap: break-word;
}

.post-page__post-wrapper {
  margin-top: 30px;
  margin-bottom: 40px;
}

.post-page__post-wrapper .title {
  margin-bottom: 10px;
}

.post-page__post-info {
  border-radius: .25em;
  background: #2B5278;
  padding: 30px;
  color:#fff;
}

.post-page__post-info h1 {
  font-size: 30px;
}

.post-page__post-info p {
  margin-top: 15px;
}


/* Comments Input */

.comment-form {
  display: grid;
  grid-template-columns: 100%;
  row-gap: 15px;
}

.comment-form__add {
  width: 100%;
  box-sizing: border-box;
  background: #242F3D;
  padding:24px 30px;
  font-size: 18px;
  border-radius: .25em;
  font-weight: 300;
  color:#fff;
}

.comment-form__button button {
  background: #17212B;
  width: 220px;
  cursor:pointer;
  padding: 12px 0;
  border-radius: .25em;
  color:#fff;
  font-size: 18px;
  font-weight: 300;
  transition: all .1s linear;
}

.comment-form__button button:hover {
  background: #2B5278;
}

/* Comments Block */

.comment-wrapper {
  padding: 25px 0;
}

.comment-wrapper__title {
  padding-bottom: 5px;
  font-size: 18px;
  border-bottom: 2px solid #fff;
}

.comment-wrapper__item {
  margin-top: 30px;
  background: #17212B;
  padding: 25px;
}

.comment-wrapper__item h1 {
  font-size: 21px;
}

.comment-wrapper__item h2 {
  margin-top: 15px;
  font-size: 18px;
}

.comment-wrapper__item p {
  margin-top: 15px;
  font-size: 16px;
}

/* Notifications Block */

.notifications {
  width: 200px;
  text-align: center;
  position: fixed;
  bottom: 50px;
  right: 50px;
  color:#fff;
}

.notification {
  position: relative;
  padding: 10px 20px;
  background: #1D2C3A;
  margin: 10px 0;
  animation-duration: 3s;
  animation-name: notification;
  opacity: 0;
  border-radius: .25em;
}

@keyframes notification {
  0% {
      bottom: -10px;
  }

  10% {
    bottom: 0;
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }

}

/* Adaptive */

@media (max-width: 1399.98px) {
  .container {
    padding: 0 15px;
  }
  .post-page__user-info .user-info {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

</style>