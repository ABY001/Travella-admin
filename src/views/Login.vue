<template>
  <a-modal
    v-model="modalVisible"
    centered
    :closable="false"
    :maskClosable="false"
    :footer="null"
    style="border-radius: 8px"
  >
    <div class="sign-in">
      <a-row type="flex" justify="center"
        ><a-col
          :span="24"
          style="display: flex; align-items: center; justify-content: center"
        >
          <img src="images/logo.png" alt=""
        /></a-col>
        <a-col
          :span="24"
          style="display: flex; align-items: center; justify-content: center"
        >
          <h3 class="font-regular text-muted">Dashboard Kit</h3></a-col
        >
        <a-col
          :span="24"
          style="display: flex; align-items: center; justify-content: center"
        >
          <h1 class="mb-15">Log In to Admin Dashboard</h1></a-col
        >
        <a-col
          :span="24"
          style="display: flex; align-items: center; justify-content: center"
        >
          <h5 class="font-regular text-muted">
            Enter your email and password below
          </h5></a-col
        ></a-row
      >

      <!-- Sign In Form -->
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
        :hideRequiredMark="true"
      >
        <a-form-item class="mb-10" label="EMAIL" :colon="false">
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  { required: true, message: 'Please input your email!' },
                ],
              },
            ]"
            placeholder="Email address"
          />
        </a-form-item>
        <a-form-item class="mb-5" label="PASSWORD" :colon="false">
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: 'Please input your password!' },
                ],
              },
            ]"
            type="password"
            placeholder="Password"
          />
        </a-form-item>
        <!-- <a-form-item class="mb-10">
          <a-switch v-model="rememberMe" /> Remember Me
        </a-form-item> -->
        <a-form-item>
          <a-button
            type="primary"
            block
            html-type="submit"
            class="login-form-button"
          >
            LOG IN
          </a-button>
        </a-form-item>
      </a-form>
      <div v-show="error" class="error">{{ this.errorMsg }}</div>
      <!-- / Sign In Form -->
      <a-row type="flex" justify="center">
        <h5 class="font-semibold text-muted">
          Don't have an account?
          <router-link to="/signup" class="font-bold text-primary"
            >Sign Up</router-link
          >
        </h5></a-row
      >
      <!-- </a-row> -->
      <!-- / Sign In Form Column -->

      <!-- </a-row> -->
    </div>
  </a-modal>
</template>

<script>
import todos from "../logic";
export default {
  data() {
    return {
      modalVisible: true,
      auth: [],
      error: false,
      errorMsg: "",
      // Binded model property for "Sign In Form" switch button for "Remember Me" .
      // rememberMe: true,
    };
  },
  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    // Handles input validation after submission.
    async handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.error = false;
          this.errorMsg = "";
          this.obj = values;
          console.log("Received values of form: ", values);
        }
      });
      try {
        let response = await todos.create("auth/signin", this.obj);
        this.auth = response.data;
        console.log(response.data);
        if (this.auth.status === true) {
          localStorage.setItem("token", JSON.stringify(this.auth.token))
          this.$router.push("/posts");
        }
      } catch (error) {
        const { response } = error;
        console.log(response);
        this.error = true;
        this.errorMsg = response.data.error;
        return;
      }
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: #ffffff;
}
.ant-modal-mask {
  background-color: #363740;
}
</style>
