<template>
  <Title>{{ title }}</Title>
  <slot/>
</template>

<style>
.router-link-active {
  color: #445ea7;
  font-weight: bold;
}
</style>

<script setup lang="ts">
const title = useState("title", () => "ICpEP.SE MSU-IIT")
</script>