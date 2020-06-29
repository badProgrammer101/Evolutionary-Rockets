//Population class

class Population {
    constructor(rocketCount, lifespan, target) {
        this.length = rocketCount;
        this.target = target;
        this.population = [];
        this.lifespan = lifespan;
        this.matingPool = [];
        
        for (let i = 0; i < this.length; i++) {
            this.population[i] = new Rocket(this.lifespan, this.target);
        }
    }
    
    run() {
        this.evaluate();
        for (let rocket of this.population) {
            rocket.show();
            rocket.update();
            rocket.compareToObs(obstacles);
        }
        if (count == this.lifespan) {
            this.newGeneration();
            count = -1;
            best = this.population[0];
        }
    }
    
    newGeneration() {
        this.naturalSelection();
        this.generate();
        generation++;
    }
    
    evaluate() {
        for (let i = 0; i < this.length; i++) {
            this.population[i].calcFitness();
        }
    }
    
    naturalSelection() {
        let pool = []; 
        for (let i = 0; i < this.length; i++) {
            let a = this.population[i].fitness;
            for (let j = 0; j < a; j++) {
                pool.push(this.population[i]);
            }
        }
        let parentA = pool[floor(random(pool.length))];
        let parentB = pool[floor(random(pool.length))];
        let child = new Rocket(this.lifespan, this.target);
        if (parentA && parentB) {
            child.genes = parentA.crossover(parentB);
        } else {
            child = random(this.population);
        }
        return child;
    }
    
    generate() {
        for (let i = 0; i < this.length; i++) {
            this.population[i] = this.naturalSelection();
        }
    }
}