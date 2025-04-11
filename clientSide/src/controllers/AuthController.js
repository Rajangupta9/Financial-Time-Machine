import AuthService from '../services/AuthService';
import UserModel from '../models/UserModel';

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async login(email, password) {
    try {
      const response = await this.authService.login(email, password);
      
      // Store token in localStorage
      localStorage.setItem('token', response.token);
      
      // Create user model from response
      const user = new UserModel(
        response.user.id,
        response.user.name,
        response.user.email
      );
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(user.toJSON()));
      
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  async register(name, email, password) {
    try {
      const response = await this.authService.register(name, email, password);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const userJSON = localStorage.getItem('user');
    if (!userJSON) return null;
    
    const userData = JSON.parse(userJSON);
    return UserModel.fromJSON(userData);
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}

export default AuthController;