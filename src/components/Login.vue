<template>
  <div class="col-md-4">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label for="email">Email</label>
          <Field name="email" type="email" class="form-control" />
          <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <Field name="password" type="password" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "LoginComponent",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/posts");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/posts");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style scoped>

</style>



<!-- <template>
  <div class="inFormBackground">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="inLoginForm">
      <form @submit.prevent="login">
        <div class="title">
          <h3>Login Here</h3>
        </div>
        <div class="inputGroup">
          <label for="email">Email</label>
          <input type="email" v-model="email" placeholder="Enter Email" id="email">
        </div>
        <div class="inputGroup">
          <label for="password">Password</label>
          <input type="password" v-model="password" placeholder="Enter Password" id="password">
        </div>
        <button class="submitForm">Log In</button>
        <div class="social">
          <router-link class="createAccount" :to="{ name: 'register' }">Register</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'LoginView',
  data() {
    return {
      userInput: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/graphql', {
          query: `
               query Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              token
            }
          }
`,
          variables: {
            email: this.email,
            password: this.password
          }
        })
        if (response.data.data.login.token) {
          localStorage.setItem('user', JSON.stringify(response.data.data.login.token));
        }
        console.log(response.data.data.login.token)
      } catch (err) {
        console.log(err.response.data.errors[0].message)
        alert(err.response.data.errors[0].message)
      }
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  height: 100vh;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background-color: #141225;
}

.inFormBackground {
  margin: 0rem 2rem;
}

.inFormBackground,
.inLoginForm {
  width: 25rem;
  height: 30rem;
  max-width: 320px;
  position: relative;
}

.circle {
  width: 10rem;
  height: 10rem;
  position: absolute;
  border-radius: 50%;
}

.circle:first-child {
  left: -20%;
  top: -12%;
  background: linear-gradient(#ff0060, #c302b5);
}

.circle:nth-child(2) {
  right: -22%;
  bottom: -14%;
  background: linear-gradient(164deg, #144e7cfc, #1877f2);
}

.inLoginForm form {
  top: 50%;
  left: 50%;
  width: 16rem;
  height: 24rem;
  max-width: 320px;
  position: absolute;
  padding: 50px 35px;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  transform: translate(-50%, -50%);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.13);
}

form * {
  border: none;
  outline: none;
  color: #ffffff;
  letter-spacing: 0.5px;
  font-family: "Poppins", sans-serif;
}

.title {
  font-size: 32px;
  font-weight: 500;
  line-height: 22px;
  text-align: center;
}

.inputGroup label {
  display: block;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
}

.inputGroup input {
  width: 92%;
  height: 50px;
  display: block;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.07);
}

::placeholder {
  color: #e5e5e5;
}

.submitForm {
  width: 100%;
  z-index: 1;
  margin-top: 30px;
  color: #080710;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  border-radius: 5px;
  position: relative;
  background: #fff;
}

.createAccount {
  text-decoration: none;
  text-align: center;
  width: 100%;
  z-index: 1;
  margin-top: 30px;
  color: #fefefe;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  border-radius: 5px;
  position: relative;
  background: #03a711;
}

.submitForm::before {
  content: "";
  top: 0%;
  left: -100%;
  z-index: -1;
  width: 100%;
  height: 100%;
  color: #fff;
  border-radius: 5px;
  position: absolute;
  transition: left 0.4s, color 0.4s;
  background-color: #202020;
}

.submitForm:hover {
  color: #fff;
}

.submitForm:hover::before {
  left: 0%;
}

.social {
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
}

.social div {
  width: 3rem;
  height: 3rem;
  display: flex;
  cursor: pointer;
  color: #eaf0fb;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.27);
}

.social div:hover {
  background-color: rgba(255, 255, 255, 0.47);
}

.social .fb {
  margin-left: 25px;
}

.social .tw {
  margin-left: 25px;
}
</style> -->