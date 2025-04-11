import axios from 'axios';

const API_URL = 'https://api.example.com/auth'; // Replace with your actual API URL

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // For demo purposes, simulate API responses
    this.mockResponses = {
      login: {
        token: 'mock-jwt-token-xxx',
        user: {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
        }
      },
      register: {
        success: true,
        message: 'Registration successful'
      }
    };
  }

  async login(email, password) {
    // eslint-disable-next-line no-useless-catch
    try {
      // In a real app, this would be an actual API call
      // const response = await this.api.post('/login', { email, password });
      // return response.data;
      
      // For demo purposes, simulate API delay and response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate validation
      if (email === 'error@example.com') {
        throw { response: { data: { message: 'Invalid credentials' } } };
      }
      
      return this.mockResponses.login;
    } catch (error) {
      throw error;
    }
  }

  async register(name, email, password) {
    // eslint-disable-next-line no-useless-catch
    try {
      // In a real app, this would be an actual API call
      // const response = await this.api.post('/register', { name, email, password });
      // return response.data;
      
      // For demo purposes, simulate API delay and response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate validation
      if (email === 'existing@example.com') {
        throw { response: { data: { message: 'Email already exists' } } };
      }
      
      return this.mockResponses.register;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;