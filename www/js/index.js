import {Model} from "./model/model.js";
import {View} from "./views/views.js";

console.log("Hello");


class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
    }
}

const app = new Controller(new Model(), new View());