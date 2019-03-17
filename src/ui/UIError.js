class UIError extends Error {
  constructor(message) {
    super(message);
    this.name = "UIError";
  }
}

module.exports = UIError;
