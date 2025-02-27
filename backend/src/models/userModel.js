class User {
    constructor(id, email, username, streak = 0, lastActive = new Date()) {
      this.id = id;
      this.email = email;
      this.username = username;
      this.streak = streak;
      this.lastActive = lastActive;
    }
  }
  
  module.exports = User;
  