class Fortune {
    constructor(id, text, category, votes = 0, createdAt = new Date()) {
      this.id = id;
      this.text = text;
      this.category = category;
      this.votes = votes;
      this.createdAt = createdAt;
    }
  }
  
  module.exports = Fortune;
  