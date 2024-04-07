export default class Multer {
  constructor(type) {
    this.type = type;
  }

  switch() {
    switch (this.type) {
      case "profile":
        break;
      case "products":
        break;
      case "documents":
        break;
      default:
        break;
    }
  }
}
