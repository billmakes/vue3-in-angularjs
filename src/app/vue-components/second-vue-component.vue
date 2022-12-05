<template>
  <div class="vue-component">
    <div id="title">Vue Component #2</div>
    <h3>second vue component</h3>
    <pre><u>greeting</u>: {{ greeting }} (this is from AngularJs)</pre>
    <ThirdVueComponent>
      <h1>Hi</h1>
    </ThirdVueComponent>
  </div>
</template>

<script>
import ThirdVueComponent from './third-vue-component.vue';
export default {
  props: ['greeting'],
  components: {
    ThirdVueComponent,
  }
}
</script>
