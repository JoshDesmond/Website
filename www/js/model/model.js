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
            const directionX = (Math.random() * 4) - 2.5;
            const directionY = (Math.random() * 4) - 2.5;
            const color = '#132620';

            this.particles.push(new Particle(x, y, directionX, directionY, size, color));
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
        this.mouseRadius = (this.canvasHeight / 200) * (this.canvasWidth / 200);
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

        const collisionFunction = (x, y, radius) => {
            const dx = x - particle.x;
            const dy = y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < radius + particle.size) {
                if (x < particle.x && particle.x < this.canvasWidth - particle.size * 10) {
                    particle.directionX += .05;
                }
                if (x > particle.x && particle.x > particle.size * 10) {
                    particle.directionX -= .05;
                }

                if (y < particle.y && particle.y < this.canvasHeight - particle.size * 10) {
                    particle.directionY += .05;
                }
                if (y > particle.y && particle.y > particle.size * 10) {
                    particle.directionY -= .05;
                }
            }
        }

        // Mouse collision
        collisionFunction(this.mouseX, this.mouseY, this.mouseRadius);
        // Collision bubble around center of screen
        collisionFunction(this.canvasWidth/2, this.canvasHeight/2, this.canvasWidth/6);

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
