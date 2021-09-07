export class Model {
    constructor(width, height) {
        this.canvasHeight = height;
        this.canvasWidth = width;
        this.initializeParticles();
    }

    initializeParticles() {
        this.particles = [];
        const numberOfParticles = (this.canvasHeight * this.canvasWidth) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            const size = (Math.random() * 5) + 1;
            const x = (Math.random() * ((this.canvasWidth - size * 2) - (size * 2)) + size * 2); 
            const y = (Math.random() * ((this.canvasHeight - size * 2) - (size * 2)) + size * 2); 
            const directionX = (Math.random() * 5) - 2.5;
            const directionY = (Math.random() * 5) - 2.5;
            const color = '#8C5523';

            this.particles.push(new Particle(x, y ,directionX, directionY, size, color));
        }
    }

    tick() {
        for (const p of this.particles) {
            this.updateParticle(p);
        }
        console.log('tick');
    }

    updateMousePosition(x, y) {
        this.mouseX = x;
        this.mouseY = y;
        this.mouseRadius = (this.canvasHeight / 80) * (this.canvasWidth / 80);
        // TODO?
    }

    updateCanvasSize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
    }

    updateParticle(particle) {
        // Wall bounces
        if (particle.x > this.canvasWidth || particle.x < 0) {
            particle.directionX = -particle.directionX;
        }
        if (particle.y > this.canvasHeight || particle.y < 0) {
            particle.directionY = -particle.directionY;
        }

        // Mouse collision
        const dx = this.mouseX = particle.x;
        const dy = this.mouseY = particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.mouseRadius + particle.size) {
            if (this.mouseX < particle.x && particle.x < this.canvas.width - particle.size * 10) {
                particle.x += 10;
            }
            if (this.mouseX > particle.x && particle.x > particle.size * 10) {
                particle.x -= 10;
            }

            if (this.mouseY < particle.y && particle.y < this.canvasHeight - particle.size * 10) {
                particle.y += 10;
            }
            if (this.mouseY > particle.y && particle.y > particle.size * 10) {
                particle.y -= 10;
            }
        }

        // Move particles
        particle.x = particle.x + particle.directionX;
        particle.y = particle.y + particle.directionY;
        particle.update();
    }
}

export class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    subscribeObserver(observer) {
        this.observer = observer;
    }

    update() {
        this.observer.notify(this);
    }
}
