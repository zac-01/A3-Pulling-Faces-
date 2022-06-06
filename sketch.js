// A3 
// Computational Prototpying - Creative Coding 
// Pulling Faces 

//Isaac Doblin - s3786305 
//Playful interactive synthesiser controlled by making silly faces

let osc, playing, freq, amp;
let capture;
let ctracker;

function setup() {
  let cnv = createCanvas(400, 340);
  cnv.mousePressed(playOscillator);

  //Oscilator sound - inbuilt sounds with p5.js
  osc = new p5.Oscillator('sawtooth'); 
  capture = createCapture(VIDEO);
  capture.size(400,300);
  capture.hide();

  //Outsourced javascript library 
  //constrained local model fitting facial models to faces in videos or images.
  //See: https://github.com/auduno/clmtrackr
  ctracker = new clm.tracker();
  ctracker.init();
  ctracker.start(capture.elt);
 }

function draw() {
  background(220);
  image(capture,0,0);
  
  var positions = ctracker.getCurrentPosition();
  let mouthDist;
  if (positions) {
     positions.forEach(pos => {
     //Dots that show face 
     // fill(255, 0, 0);
     // noStroke();
     // circle(pos[0], pos[1], 3); 
    });
   
      const mouthTop = createVector(positions[60][0], positions[60][1]);
      const mouthBottom = createVector(positions[57][0], positions[57][1]);
    
      mouthDist = mouthTop.sub(mouthBottom).mag();
      print(mouthDist);
  }
  
  freq = constrain(map(mouthDist, 4, 16, 100, 500), 100, 500);
  amp = constrain(map(mouthDist, 1, 8, 0, 0.5), 0, 1);

   

  //Bottom Coloured bar - bright and vibrant colours 
   fill(255,165,0);
   rect(0,300,400,40);
  
  //Making Faces user instructions 
   fill(0);
   textSize(14);
   text('Hold Mouse Please - What Will Silly Faces Do? ', 65, 323);
  //text('freq: ' + freq, 20, 40);
  //text('amp: ' + amp, 20, 60);

  if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.1);
  }
}

function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  osc.start();
  playing = true;
}

function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
  osc.amp(0, 0.5);
  playing = false;
}

//Credits:
//Original Oscillator Source code from https://p5js.org/reference/#/p5.Oscillator
//Helpful tutorial here: https://www.youtube.com/watch?v=sRLWIAPaiRI regarding constrained local face fitting model mapping
//Suitable for a home local mahcine or exhibition setting 