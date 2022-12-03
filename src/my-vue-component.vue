<template>
  <div class="vue-logo">
    <h3>I'm Vue Component</h3>
    <pre>
    <u>foo</u>: {{JSON.stringify(foo)}} (this is from AngularJs)
    <u>bar</u>: {{JSON.stringify(bar)}} (this is from AngularJs)
    <u>foobar</u>: {{foobar}} (this is from AngularJs)
    <u>baz</u>: {{baz}} (this is from AngularJs)
    </pre>
    <button @click="handleClick">Click to emit 'vue-event' </button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: ['foo', 'bar', 'foobar', 'baz'],
  methods: {
    handleClick: function(event) {
      this.$emit('my-event', 'This message is from MyVueComponent'.split(' '));
    }
  }
}
</script>
