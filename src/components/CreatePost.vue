<template>
  <div class="col-md-4">
    <div class="card card-container">
      <img id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" class="profile-img-card" />
      <Form @submit="createPost" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="title">Title</label>
            <Field name="title" type="text" class="form-control" />
            <ErrorMessage name="title" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="description">description</label>
            <Field name="description" type="text" class="form-control" />
            <ErrorMessage name="description" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="content">Content</label>
            <Field name="content" type="text" class="form-control" />
            <ErrorMessage name="content" class="error-feedback" />
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              Post
            </button>
          </div>
        </div>
      </Form>

      <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import { Form, Field, ErrorMessage } from "vee-validate";
  import * as yup from "yup";
export default {
  name: 'CreatePost',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      title: yup
        .string()
        .required("Username is required!"),
      description: yup
        .string()
        .required("Email is required!"),
      content: yup
        .string()
        .required("Password is required!")
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  methods: {
    createPost(userInput) {
      UserService.createPost(userInput).then(()=>{
        this.$router.push("/posts");
      });
    }
  }
}
</script>

<style></style>