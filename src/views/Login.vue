<template>
  <div class="login-wrapper">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="Email" prop="email">
        <el-input v-model="email" type="email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          v-model="password"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <div>{{ error }}</div>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">Submit</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">Reset</el-button> -->
        <el-button type="info" @click="onClickSignUp">Sign Up</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import useLogin from "@/composables/useLogin";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
export default {
  name: "Login",
  setup() {
    const { isPending, error, login } = useLogin();
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const handleSubmit = async () => {
      await login(email.value, password.value);
      if (!error.value) {
        router.push({ path: "/listproduct/" });
      }
    };
    const onClickSignUp = () => {
      router.push({ path: "/signup/" });
    };
    return { isPending, error, email, password, handleSubmit, onClickSignUp };
  },
};
</script>
<style lang="scss" scoped>
.login-wrapper {
  width: 400px;
  margin: auto;
}
</style>
