//Rocket class

class Rocket {
    constructor(lifespan, target) {
        this.pos = createVector(width/2, height-50);
   s     this.vel = createVector();
        this.acc = createVector();
        this.target = target;
        this.genes = [];
        this.walls = false;
        this.lifespan = lifespan;
        this.fitness = 0;
        for (let i = 0; i < this.lifespan; i++) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(0.1);
        }
        this.completed = false;
        this.crashed = false;
    }
    
    show() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        fill(255, 100);
        noStroke();
        rect(0, 0, 25, 5);
        pop();
    }
    
    update() {
        if (!this.crashed && !this.completed) {
            this.acc.add(this.genes[count]);
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }
        
        if (this.pos.x >= width || this.pos.x <= 0 || this.pos.y >= height || this.pos.y <= 0) {
            this.crashed = true;
            if (this.pos.y >= 0) {
                this.walls = true;
            }
        }
        
        let d = dist(this.pos.x, this.pos.y, target.x, target.y) 
        if (d < 10) {
            this.completed = true;
        }
    }
    
    calcFitness() {
        let d = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);
        let f = map(d, 0, width, width, 0);
        this.fitness = map(f, 0, width, 0, 100);
        if (this.completed) {
            this.fitness *= 10;
        } else if (this.crashed) {
            this.fitness /= 10;
        }
        if (this.fitness <= 0) {
            this.fitness = 1;
        }
        this.fitness = floor(this.fitness);
    }
    
    crossover(parent) {
        let newGenes = [];
        let pivot = floor(random(this.genes.length));
        for (let i = 0; i < this.genes.length; i++) {
            if (i < pivot) {
                newGenes[i] = this.genes[i];
            } else {
                newGenes[i] = parent.genes[i];
            }
        }
        
        for (let i = 0; i < newGenes.length; i++) {
            if (random(1) < mutationRate) {
                newGenes[i] = p5.Vector.random2D(); 
            }
        }
        for (let i = 0; i < newGenes.length; i++) {
            newGenes[i].setMag(0.1);
        }
        return newGenes;
    }
    
    compareToObs(obstacles) {
        for (let ob of obstacles) {
            let a = false;
            let b = false;
            if (this.pos.x > ob.x && this.pos.x < ob.x + obW) {
                a = true;
            }
            if (this.pos.y > ob.y && this.pos.y < ob.y + obH) {
                b = true;
            }
            if (a && b) {
                this.crashed = true;
                break;
            }
        }
    }
}