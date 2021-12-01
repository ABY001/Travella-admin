<template>
  <div class="sign-in___container">
    <div class="sign-in">
      <!-- <a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle"> -->

      <!-- Sign In Form Column -->
      <!-- <a-row type="flex" justify="center"> -->
      <img src="images/logo.png" alt="" />
      <h3 class="font-regular text-muted">Dashboard Kit</h3>
      <h1 class="mb-15">Log In to Admin Dashboard</h1>
      <h5 class="font-regular text-muted">
        Enter your email and password below
      </h5>

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
      <!-- / Sign In Form -->

      <!-- <p class="font-semibold text-muted">
        Don't have an account?
        <router-link to="/sign-in" class="font-bold text-dark"
          >Sign Up</router-link
        >
      </p> -->
      <!-- </a-row> -->
      <!-- / Sign In Form Column -->

      <!-- </a-row> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: #ffffff;
}
</style>
