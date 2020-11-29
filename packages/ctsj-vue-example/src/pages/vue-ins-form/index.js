import Vue from '@ctsj/vue';

export default {
  render(id, el) {
    const ins = new Vue({
      el,
      template: `
        <div>
          <input v-model="message" placeholder="edit me">
          <p>Message is: {{ message }}</p>
          
          <span>Multiline message is:</span>
          <p style="white-space: pre-line;">{{ message }}</p>
          <br>
          <textarea v-model="message" placeholder="add multiple lines"></textarea>
          
          
          <input type="checkbox" id="checkbox" v-model="checked">
          <label for="checkbox">{{ checked }}</label>
          
          
          
          <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
          <label for="jack">Jack</label>
          <input type="checkbox" id="john" value="John" v-model="checkedNames">
          <label for="john">John</label>
          <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
          <label for="mike">Mike</label>
          <br>
          <span>Checked names: {{ checkedNames }}</span>
          
          
          
          <div id="example-4">
            <input type="radio" id="one" value="One" v-model="picked">
            <label for="one">One</label>
            <br>
            <input type="radio" id="two" value="Two" v-model="picked">
            <label for="two">Two</label>
            <br>
            <span>Picked: {{ picked }}</span>
          </div>
          
          
          <div id="example-5">
            <select v-model="selected1">
              <option disabled value="">请选择</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
            <span>Selected: {{ selected1 }}</span>
          </div>
          
          <div id="example-6">
            <select v-model="selected" multiple style="width: 50px;">
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
            <br>
            <span>Selected: {{ selected }}</span>
          </div>
          
          <select v-model="selected2">
            <option v-for="option in options" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
          <span>Selected: {{ selected2 }}</span>
        </div>
      `,
      data: () => ({
        message: '',
        checked: false,
        checkedNames: [],
        picked: '',
        selected1: '',
        selected: [],
        selected2: 'A',
        options: [
          { text: 'One', value: 'A' },
          { text: 'Two', value: 'B' },
          { text: 'Three', value: 'C' },
        ],
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
