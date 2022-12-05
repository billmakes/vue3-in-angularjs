<template>
    <div class="vue-component">
        <div id="title">Vue Component #3</div>
        <h3>third vue component</h3>
        <h3>slot:</h3>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ['content']
}
</script>