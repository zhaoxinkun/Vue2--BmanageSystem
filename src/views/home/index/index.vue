<script>
import {userInfo} from "@/api/api";

export default {
  name: "HomeIndex",
  created() {
    userInfo().then(res => console.log("userInfo", res));

  }
}
</script>

<template>
  <div>
    this is Index
  </div>
</template>

<style scoped>

</style>
