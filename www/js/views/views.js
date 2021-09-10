import { Particle } from "../model/model.js";

export class View {
    /**
     * 
     * @param {Document} document 
     */
    constructor(document) {
        this.document = document;
        this.canvasElement = document.getElementById('intro-canvas');
        this.canvas = this.canvasElement.getContext('2d');

        this.resetCanvasSize();
    }

    resetCanvasSize() {
        this.canvasElement.setAttribute('height', window.getComputedStyle(this.canvasElement, null).getPropertyValue("height"));
        this.canvasElement.setAttribute('width', window.getComputedStyle(this.canvasElement, null).getPropertyValue("width"));
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.canvas.clearRect(0, 0, this.model.canvasWidth, this.model.canvasHeight);
        this.model.tick();
    }

    /**
     * Draws an individual particle on the canvas
     * @param {Particle} particle 
     */
    drawParticle(particle) {
        this.canvas.beginPath();
        this.canvas.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2, false);
        this.canvas.fillStyle = '#5cb5997d'; // TODO temp
        this.canvas.fill();
    }

    /**
     * Updates canvas and document on model changes.
     */
    notify(particle) {
        if (particle === null) {
            throw new TypeError();
        }
        this.drawParticle(particle);
    }
}