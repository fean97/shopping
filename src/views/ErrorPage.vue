<template>
  <div class="error-wrapper">
    <h4>404 Not Found</h4>
    <el-button @click="onClickBack">Back</el-button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "ErrorPage",
  setup() {
    const router = useRouter();
    const onClickBack = () => {
      router.push({ path: "/listproduct" });
    };
    return { onClickBack };
  },
};
</script>
<style lang="scss" scoped>
.error-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .el-button {
    width: 100px;
  }
}
</style>
