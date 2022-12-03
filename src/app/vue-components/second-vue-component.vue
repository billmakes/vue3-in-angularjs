<template>
  <div class="vue-component">
    <h3>second vue component</h3>
    <pre><u>greeting</u>: {{ greeting }} (this is from AngularJs)</pre>
  </div>
</template>

<script>
export default {
  props: ['greeting']
}
</script>
