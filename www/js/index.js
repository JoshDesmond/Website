import { Model } from "./model/model.js";
import { View } from "./views/views.js";
import { onSubmit } from "./contact-form.js";

console.log("Hello friend. To check out the source for this website visit https://github.com/JoshDesmond/Website");


class App {
    /**
     * 
     * @param {Model} model 
     * @param {View} view 
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.model = model;

        // Attach controller for contact form
        const form = document.getElementById('contact-form');
        if (form.attachEvent) {
            form.attachEvent("submit", onSubmit);
        } else {
            form.addEventListener("submit", onSubmit);
        }

        // Set up canvas simulation
        for (const p of this.model.particles) {
            p.subscribeObserver(this.view);
        }

        canvas.addEventListener('mousemove', (event) => {
            this.model.updateMousePosition(event.x, event.y);
        });

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                model.updateCanvasSize(entry.contentRect.width, entry.contentRect.height);
                view.resetCanvasSize();
            }
        });

        resizeObserver.observe(canvas);

        this.view.animate();
    }
}


const views = new View(document);
const canvas = document.getElementById('intro-canvas');
const model = new Model(canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
const app = new App(model, views);
