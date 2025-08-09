// Declare variables for the particle system and texture
let particleTexture;
let particleSystem;

// NYC Historic Districts Colors
const colors = [
  '#4ECDC4', // Manhattan Teal
  '#FF6B6B', // Brooklyn Red
  '#45B7D1', // Bronx Blue
  '#96CEB4', // Queens Green
  '#FFEAA7'  // Staten Island Yellow
];

function preload() {
  // Create a simple particle texture since we don't have the actual image
  particleTexture = createGraphics(20, 20);
  particleTexture.background(255, 0);
  particleTexture.fill(255, 150);
  particleTexture.noStroke();
  particleTexture.ellipse(10, 10, 15, 15);
}

function setup() {
  const canvas = createCanvas(800, 600);
  canvas.parent('canvas-container-4');
  colorMode(RGB);

  // Initialize the particle system with multiple spawn points across the canvas
  particleSystem = new ParticleSystem(
    0,
    createVector(width / 2, height / 2),
    particleTexture
  );
}

function draw() {
  // Use the same background color as the container
  background('#F8F8F8');

  // Calculate the wind force based on the mouse x position
  let dx = map(mouseX, 0, width, -0.2, 0.2);
  let wind = createVector(dx, 0);

  // Apply the wind and run the particle system
  particleSystem.applyForce(wind);
  particleSystem.run();
  
  // Add particles from multiple spawn points across the canvas
  for (let i = 0; i < 3; i += 1) {
    // Spawn particles from different locations across the canvas
    let spawnX = random(width);
    let spawnY = random(height);
    particleSystem.addParticle(createVector(spawnX, spawnY));
  }

  // Draw an arrow representing the wind force
  drawVector(wind, createVector(width / 2, 50, 0), 500);
}

// Display an arrow to show a vector magnitude and direction
function drawVector(v, loc, scale) {
  push();
  let arrowSize = 4;
  translate(loc.x, loc.y);
  stroke('#4ECDC4'); // Manhattan Teal
  strokeWeight(3);
  rotate(v.heading());

  let length = v.mag() * scale;
  line(0, 0, length, 0);
  line(length, 0, length - arrowSize, +arrowSize / 2);
  line(length, 0, length - arrowSize, -arrowSize / 2);
  pop();
}

class ParticleSystem {
  constructor(particleCount, origin, textureImage) {
    this.particles = [];

    // Make a copy of the input vector
    this.origin = origin.copy();
    this.img = textureImage;
    for (let i = 0; i < particleCount; ++i) {
      this.particles.push(new Particle(this.origin, this.img));
    }
  }

  run() {
    // Loop through and run each particle
    for (let i = this.particles.length - 1; i >= 0; i -= 1) {
      let particle = this.particles[i];
      particle.run();

      // Remove dead particles
      if (particle.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  // Apply force to each particle
  applyForce(dir) {
    for (let particle of this.particles) {
      particle.applyForce(dir);
    }
  }

  addParticle(pos = null) {
    // Use provided position or default to origin
    let spawnPos = pos || this.origin;
    this.particles.push(new Particle(spawnPos, this.img));
  }
} // class ParticleSystem

class Particle {
  constructor(pos, imageTexture) {
    this.loc = pos.copy();

    let xSpeed = randomGaussian() * 0.3;
    let ySpeed = randomGaussian() * 0.3 - 1.0;

    this.velocity = createVector(xSpeed, ySpeed);
    this.acceleration = createVector();
    this.lifespan = 100.0;
    this.texture = imageTexture;
    // Use NYC color palette
    this.color = color(random(colors));
  }

  // Update and draw the particle
  run() {
    this.update();
    this.render();
  }

  // Draw the particle
  render() {
    imageMode(CENTER);
    tint(this.color, this.lifespan);
    image(this.texture, this.loc.x, this.loc.y);
  }

  applyForce(f) {
    // Add the force vector to the current acceleration vector
    this.acceleration.add(f);
  }

  isDead() {
    return this.lifespan <= 0.0;
  }

  // Update the particle's position, velocity, lifespan
  update() {
    this.velocity.add(this.acceleration);
    this.loc.add(this.velocity);
    this.lifespan -= 2.5;

    // Keep particles within canvas bounds
    if (this.loc.x < 0) {
      this.loc.x = 0;
      this.velocity.x *= -0.5;
    } else if (this.loc.x > width) {
      this.loc.x = width;
      this.velocity.x *= -0.5;
    }
    
    if (this.loc.y < 0) {
      this.loc.y = 0;
      this.velocity.y *= -0.5;
    } else if (this.loc.y > height) {
      this.loc.y = height;
      this.velocity.y *= -0.5;
    }

    // Set the acceleration to zero
    this.acceleration.mult(0);
  }
} // class Particle 