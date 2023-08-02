import axios from 'axios';

// const API_URL = 'http://localhost:8080/graphql';

class AuthService {
    login(user) {
        return axios.post('http://localhost:3000/graphql', {
            query: `
             query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token
          }
        }
`,
            variables: {
                email: user.email,
                password: user.password
            }
        })
            .then(response => {
                if (response.data.data.login.token) {
                    localStorage.setItem('user', JSON.stringify(response.data.data.login.token));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post('http://localhost:3000/graphql', {
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
                email: user.email,
                name: user.name,
                password: user.password
            }
        })
    }
}

export default new AuthService();