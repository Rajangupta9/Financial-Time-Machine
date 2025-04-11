class UserModel {
    constructor(id, name, email) {
      this.id = id;
      this.name = name;
      this.email = email;
    }
  
    static fromJSON(json) {
      return new UserModel(
        json.id,
        json.name,
        json.email
      );
    }
  
    toJSON() {
      return {
        id: this.id,
        name: this.name,
        email: this.email
      };
    }
  }
  
  export default UserModel;