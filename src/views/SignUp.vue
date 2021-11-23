<template>
  <div class="signup-wrapper">
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
        <el-button @click="onClickBack">Back</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import useSignup from "@/composables/useSignup";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
export default {
  name: "SignUp",
  setup() {
    const { isPending, error, signup } = useSignup();
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const handleSubmit = async () => {
      await signup(email.value, password.value);
      if (!error.value) {
        router.push({ path: "/listproduct/" });
      }
    };
    const onClickBack = () => {
      router.push({ path: "/" });
    };
    return { isPending, error, email, password, handleSubmit, onClickBack };
  },
};
</script>
<style lang="scss" scoped>
.signup-wrapper {
  width: 400px;
  margin: auto;
}
</style>
