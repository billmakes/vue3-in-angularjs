<template>
  <div class="vue-logo">
    <h3>I'm Other Vue Component</h3>
    <pre><u>hello</u>: {{JSON.stringify(hello)}} (this is from AngularJs)</pre>
  </div>
</template>

<script>
export default {
  props: ['hello']
}
</script>
