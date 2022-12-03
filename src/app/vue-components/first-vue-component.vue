<template>
  <div class="vue-component">
    <h3>first vue component</h3>
    <pre>
    <u>greeting</u>: {{ JSON.stringify(greeting) }} (this is from AngularJs)
    <u>message</u>: {{ JSON.stringify(message) }} (this is from AngularJs)
    <u>baz</u>: {{ baz }} (this is from AngularJs)
    </pre>
    <p>data</p>
    <ul>
      <li v-for="item in data" :key="item">{{ JSON.stringify(item) }}</li>
    </ul>
    <button @click="handleClick">Emit 'vue-event'</button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: ['greeting', 'message', 'data'],
  methods: {
    handleClick: function (event) {
      this.$emit('my-event', 'Hello from VueJs!');
    }
  }
}
</script>
