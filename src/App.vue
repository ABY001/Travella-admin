<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
export default {
  computed: {
    // Sets components name based on current route's specified layout, defaults to
    // <layout-default></layout-default> component.
    layout() {
      return (
        "layout-" +
        (this.$route.name === "Login" || this.$route.name === "Signup"
          ? "default"
          : "dashboard"
        ).toLowerCase()
      );
    },
  },
};
</script>

<style lang="scss"></style>
