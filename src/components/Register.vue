<template>
    <div class="col-md-4">
      <div class="card card-container">
        <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="profile-img-card"
        />
        <Form @submit="handleRegister" :validation-schema="schema">
          <div v-if="!successful">
            <div class="form-group">
              <label for="name">Name</label>
              <Field name="name" type="text" class="form-control" />
              <ErrorMessage name="N\name" class="error-feedback" />
            </div>
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
                Sign Up
              </button>
            </div>
          </div>
        </Form>
  
        <div
          v-if="message"
          class="alert"
          :class="successful ? 'alert-success' : 'alert-danger'"
        >
          {{ message }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Form, Field, ErrorMessage } from "vee-validate";
  import * as yup from "yup";
  
  export default {
    name: "RegisterComponent",
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    data() {
      const schema = yup.object().shape({
        name: yup
          .string()
          .required("Username is required!")
          .min(3, "Must be at least 3 characters!")
          .max(20, "Must be maximum 20 characters!"),
        email: yup
          .string()
          .required("Email is required!")
          .email("Email is invalid!")
          .max(50, "Must be maximum 50 characters!"),
        password: yup
          .string()
          .required("Password is required!")
          .min(6, "Must be at least 6 characters!")
          .max(40, "Must be maximum 40 characters!"),
      });
  
      return {
        successful: false,
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
    mounted() {
      if (this.loggedIn) {
        this.$router.push("/posts");
      }
    },
    methods: {
      handleRegister(user) {
        console.log("reached")
        this.message = "Registered Successfully";
        this.successful = false;
        this.loading = true;
  
        this.$store.dispatch("auth/register", user).then(
          () => {
            this.message = "Registered Successfully";
            this.successful = true;
            this.loading = false;
          },
          (error) => {
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            this.successful = false;
            this.loading = false;
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
            <form @submit.prevent="register">
                <div class="title">
                    <h3>Register</h3>
                </div>
                <div class="inputGroup">
                    <label for="email">Email</label>
                    <input type="email" v-model="email" placeholder="Enter Email" id="email">
                </div>
                <div class="inputGroup">
                    <label for="email">Name</label>
                    <input type="text" v-model="name" placeholder="Enter Name" id="name">
                </div>
                <div class="inputGroup">
                    <label for="password">Password</label>
                    <input type="password" v-model="password" placeholder="Enter Password" id="password">
                </div>
                <button class="submitForm">Register</button>
                <div class="social">
                    <router-link class="createAccount" :to="{ name: 'Login' }">Login</router-link>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios'
export default {
    name: 'RegisterView',
    data() {
        return {
            userInput: {
                email: "",
                name: "",
                password: ""
            }
        }
    },
    methods: {
        async register() {
            const res = await axios.post('http://localhost:3000/graphql', {
                query: `
                mutation CreateUser($email: String!, $name: String!, $password: String!) {
    createUser(userInput: {
      email: $email,
      name: $name,
      password: $password
    }) {
      name
      email
    }
  }
`,
                variables: {
                    email: this.email,
                    name: this.name,
                    password: this.password
                }
            })
            console.log(res)
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
    height: 30rem;
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
    height: 40px;
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