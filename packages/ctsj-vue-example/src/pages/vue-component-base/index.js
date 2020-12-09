import Vue from '@ctsj/vue';

Vue.component('button-counter', {
  data() {
    return {
      count: 0,
    };
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>',
});

Vue.component('blog-post', {
  props: ['title', 'content'],
  template: `
    <div class="blog-post">
      <h3>{{ title }}</h3>
      <div v-html="content"></div>
       <button v-on:click="$emit('enlarge-text')">
        Enlarge text
      </button>
    </div>
  `,
});

export default {
  render(id, el) {
    const ins = new Vue({
      el,
      template: `
        <div>
          <div id="components-demo">
            <button-counter></button-counter>
          </div>
          
          <blog-post title="My journey with Vue" v-bind:content="htmlStr"></blog-post>
          <blog-post title="Blogging with Vue" v-bind:content="htmlStr"></blog-post>
          <blog-post title="Why Vue is so fun" v-bind:content="htmlStr"></blog-post>
          
          <blog-post
            v-for="post in posts"
            v-bind:key="post.id"
            v-bind:title="post.title"
            v-bind:content="post.content"
          ></blog-post>
          
          <div id="blog-posts-events-demo">
            <div v-bind:style="{ fontSize: postFontSize + 'em' }">
              <blog-post
                v-for="post in posts"
                v-bind:key="post.id"
                v-bind:title="post.title"
                v-bind:content="post.content"
                v-on:enlarge-text="postFontSize += 0.1"
              ></blog-post>
            </div>
          </div>
        </div>
      `,
      data: () => ({
        htmlStr: '<p>我是谁</p>',
        posts: [
          { id: 1, title: 'My journey with Vue', content: '<p style="color: red">info</p>' },
          { id: 2, title: 'Blogging with Vue', content: '<p style="color: red">info</p>' },
          { id: 3, title: 'Why Vue is so fun', content: '<p style="color: red">info</p>' },
        ],
        postFontSize: 2,
      }),
      methods: {},
      computed: {},
      watch: {},
      beforeCreate() {
        console.log(id, 'beforeCreate');
      },
      created() {
        console.log(id, 'created');
      },
      beforeMount() {
        console.log(id, 'beforeMount');
      },
      mounted() {
        console.log(id, 'mounted');
      },
      beforeUpdate() {
        console.log(id, 'beforeUpdate');
      },
      updated() {
        console.log(id, 'updated');
      },
      beforeDestroy() {
        console.log(id, 'beforeDestroy');
      },
      destroyed() {
        console.log(id, 'destroyed');
      },
    });
  },
};
