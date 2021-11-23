<template>
  <div class="top-menu-bar-wrapper">
    <div class="user-wrapper">
      {{ user ? user.email : "" }}
      <el-button type="danger" @click="onClickLogout">Logout</el-button>
    </div>
  </div>
</template>

<script>
import getUser from "../composables/getUser";
import useLogout from "../composables/useLogout";
import { useRouter } from "vue-router";

export default {
  name: "TopMenuBar",
  setup() {
    const { user } = getUser();
    const { error, logout } = useLogout();
    const router = useRouter();

    const onClickLogout = async () => {
      await logout();
      if (!error.value) {
        router.push({ path: "/" });
      }
    };
    return { user, onClickLogout };
  },
};
</script>
<style lang="scss" scoped>
.top-menu-bar-wrapper {
  min-height: calc(100% - 3.35rem);
  margin: 0 auto;
  padding: 0.8rem 1rem;
  background-color: #fff;
  border-radius: 0.428rem;
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  display: flex;
  align-content: center;
  justify-content: flex-end;
}
</style>
