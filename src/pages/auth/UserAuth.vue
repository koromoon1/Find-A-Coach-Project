<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>

        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>

        <p v-if="!formIsValid">
          Please enter a valid email and password (6 characters or longer)
        </p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true, // you can add more complex validation by urself
      mode: 'login', // default setting, can be sign up
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Log In';
      } else {
        return 'Sign Up';
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Sign Up Instead';
      } else {
        return 'Log In Instead';
      }
    },
  },
  methods: {
    async submitForm() {
      // reset validation
      this.formIsValid = true;

      // form validation rules
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      // Start Loading
      this.isLoading = true;

      const actionPayLoad = {
        email: this.email,
        password: this.password,
      };

      // Send HTTP Request
      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayLoad);
        } else {
          await this.$store.dispatch('signup', actionPayLoad);
        }
        // If passed, redirect to coaches page
        const redirectUrl = '/' + (this.$route.query.redirect || 'coaches');
        // ↑'redirect' has to be the name of passed query parameter
        // ↑ if there is no query parameter, always redirect to coaches
        this.$router.replace(redirectUrl);
        // ↑ replace() makes user cannot go back to previous page
        // because we don't want user go back to login page after already logged in
      } catch (err) {
        console.log(err.message);
        this.error = err.message || 'Failed to authenticate, try later.';
      }

      // Loading Finish
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
