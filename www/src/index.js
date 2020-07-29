console.log("Hello");

class Model {
    constructor() {
        console.log("World.");
    }
}
  
class View {
    constructor() {}
}
  
class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
    }
}

const app = new Controller(new Model(), new View());