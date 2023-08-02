import axios from 'axios';
import authHeader from './auth-heder';

const API_URL = 'http://localhost:3000/graphql';

class UserService {
     getPosts() {
        return axios.post(
            API_URL,
            {
              query: `
                query {
                  posts {
                    title
                    description
                    createdAt
                  }
                }
              `
            },
            {
              headers: authHeader()
            }
          );
      }
      createPost(userInput){
        return axios.post(API_URL, {
        query: `
              mutation CreatePost($title: String!, $description: String!, $content: String!,$createdAt: String!) {
  createPost(postInput: {
    title: $title,
    description: $description,
    content: $content,
    createdAt:$createdAt,
  }) {
    title
    description
  }
}
`,
        variables: {
          title: userInput.title,
          description: userInput.description,
          content: userInput.content,
          createdAt: new Date().toISOString()
        },

      }, {
        headers: authHeader()
      })
      }
    
}

export default new UserService();