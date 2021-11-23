<template>
  <TopMenuBar />
  <div class="create-wrapper">
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      :rules="rules"
      v-loading.fullscreen.lock="fullscreenLoading"
    >
      <el-form-item label="Image" prop="image">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          action="#"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.image" :src="form.image" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="Title" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Price">
        <el-input-number v-model="form.price" :min="1" />
      </el-form-item>
      <el-form-item label="Available">
        <el-switch v-model="form.isAvailable"></el-switch>
      </el-form-item>
      <el-form-item label="Colors" prop="colors">
        <el-radio-group v-model="form.colors">
          <el-radio label="Black"></el-radio>
          <el-radio label="White"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input v-model="form.description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">Create</el-button>
        <el-button @click="onClickBack">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TopMenuBar from "@/components/TopMenuBar";
import { Plus } from "@element-plus/icons";

export default {
  name: "DetailProduct",
  components: {
    TopMenuBar,
    Plus,
  },
  methods: {
    ...mapActions(["createProductAction"]),
    async onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.fullscreenLoading = true;
          const res = await this.createProductAction(this.form);
          if (res) {
            this.fullscreenLoading = false;
            this.$router.push({ path: "listproduct" });
          }
        } else {
          return false;
        }
      });
    },
    onClickBack() {
      this.$router.push({ path: "/listproduct" });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      this.form.image = URL.createObjectURL(file);
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("Avatar picture must be JPG format!");
      }
      if (!isLt2M) {
        this.$message.error("Avatar picture size can not exceed 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  data() {
    return {
      fullscreenLoading: false,
      form: {
        name: "",
        price: "",
        isAvailable: false,
        colors: "",
        description: "",
        image: "",
      },
      rules: {
        image: [
          {
            required: true,
            message: "Please upload image",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "Please input name",
            trigger: "blur",
          },
        ],
        colors: [
          {
            required: true,
            message: "Please select colors",
            trigger: "change",
          },
        ],
        description: [
          {
            required: true,
            message: "Please input description",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.$nextTick(() => {});
  },
};
</script>
<style lang="scss" scoped>
.create-wrapper {
  background-color: #fff;
  box-shadow: 0 2px 8px 0 rgb(34 41 47 / 14%);
  border-radius: 0.357rem;
  margin-top: 20px;
  padding: 20px;
  text-align: left;
  ::v-deep .el-form {
    width: 70%;
    margin: 0 auto;
    .el-form-item__content {
      padding-left: 20px;
    }
  }
  ::v-deep .avatar-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      :hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
        svg {
          margin-top: 74px; /* (178px - 28px) / 2 - 1px */
        }
      }
    }
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
