let count;
let generation;
let lifespan;
let p;
let rCount;
let target;
let mutationRate;
let obstacles = [];
let obW;
let obH;
let mode;
let best;

function setup() {
    createCanvas(400, 400);
    generation = 1;
    count = -1;
    rCount = 20;
    lifespan = 400;
    mode = true;
    obW = 100;
    obH = 30;
    mutationRate = 0.02;
    target = createVector(200, 30);
    p = new Population(rCount, lifespan, target);
    best = p.population[0];
}

function draw() {
    background(51);
    for (let ob of obstacles) {
        ob.show();
    }
    count++;
    let g = generation;
    //runs simulation
    p.run();
    if (generation > g) {
        console.log(generation);
    }
    
    for (let i = 0; i < p.population.length; i++) {
        if (p.population[i].fitness > best.fitness) {
            best = p.population[i];
        }
    }
    
    stroke(255);
    line(target.x, target.y, best.pos.x, best.pos.y);
    
    fill(255, 0, 0, 110);
    noStroke();
    ellipse(best.pos.x, best.pos.y, 40, 40);
        
    //target
    fill(255);
    noStroke();
    ellipse(target.x, target.y, 20, 20);
    
    text("Generation: " + generation, 10, height-10);
    text("Lifespan: " + lifespan, 180, height-10);
    text("Best Fitness: " + best.fitness, 310, height-10);
    text("Current Frame: " + count, 10, 20);
}

class Obstacle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    show() {
        fill(255);
        noStroke();
        rect(this.x, this.y, obW, obH);
    }
}

function mousePressed() {
    if (overObstacle(obstacles)) {
        if (!mode) {
            obstacles.splice(overObstacle(obstacles), 1);
        }
    } else {
        if (mode) {
            obstacles.push(new Obstacle(mouseX, mouseY));
        }
    }
}

function keyPressed() {
    if (keyCode === 68) {
        if (mode === true) {
            mode = false;
        } else {
            mode = true;
        }
    }
}
    
function overObstacle(obstacles) {
    for (let i = 0; i < obstacles.length; i++) {
        if (mouseX > obstacles[i].x && mouseX < obstacles[i].x + obW && mouseY > obstacles[i].y && mouseY < obstacles[i].y + obH) {
            return i;
            break;
        }
    }
}
