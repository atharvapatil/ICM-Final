let canvas;
let video;
let poseNet;
let poses = [];
let sucess;
// Declaring variables for different sounds
let drumLoopOne, drumLoopTwo;
let dubstepLoopOne, dubstepLoopTwo;
let guitarLoopTwo, guitarLoopOne;
let violinLoopOne, violinLoopTwo;

let musicNoteImage;

function preload(){
//preloading all the sounds needed to to be played once the model is ready
drumLoopOne = loadSound('drumLoopOne.mp3');
drumLoopTwo = loadSound('drumLoopTwo.mp3');

dubstepLoopOne = loadSound('dubstepLoopOne.mp3');
dubstepLoopTwo = loadSound('dubstepLoopTwo.mp3');

guitarLoopOne = loadSound('guitarLoopOne.mp3');
// guitarLoopTwo = loadSound('guitarLoopTwo.mp3');

violinLoopOne = loadSound('violinLoopOne.mp3');
violinLoopTwo = loadSound('violinLoopTwo.mp3');

musicNoteImage = loadImage("note.png");
}

function setup() {
//creating and centering the canvas
canvas = createCanvas(800, 560);
canvas.position((windowWidth - width)/2, 100);

// background(240, 200);
// takeOnMe.playMode('restart');

//Capture video from the webcam and hide it to just show the canvas
video = createCapture(VIDEO);
video.size(width, height);
video.hide();

// Create a new poseNet method with a single detection
poseNet = ml5.poseNet(video, modelReady);
// This sets up an event that fills the global variable "poses"
// with an array every time new poses are detected
poseNet.on('pose', function (results) {
  poses = results;
});

}

function modelReady() {
//Callback function when the model is ready
success = createP('Move around to play some music!');
success.class('success');
}

function draw() {

//Push the hidden video onto the canvas
// Flip it using translate and scale to create a mirror
push();
translate(video.width, 0);
scale(-1, 1);
background(255, 240);
pop();

// Function to draw the different body parts and their connections
drawSkeleton()

// Function to draw the nose ellipse and logics for music playing
posePlayer();

}

function drawSkeleton(){
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;

    // Seperating out the 17 keypoints posenet returns
    let nose = pose.keypoints[0];
    let leftEye = pose.keypoints[1];
    let rightEye = pose.keypoints[2];
    let leftEar = pose.keypoints[3];
    let rightEar = pose.keypoints[4];
    let leftShoulder = pose.keypoints[5];
    let rightShoulder = pose.keypoints[6];
    let leftElbow = pose.keypoints[7];
    let rightElbow = pose.keypoints[8];
    let leftWrist = pose.keypoints[9];
    let rightWrist = pose.keypoints[10];
    let leftHip = pose.keypoints[11];
    let rightHip = pose.keypoints[12];
    let leftKnee = pose.keypoints[13];
    let rightKnee = pose.keypoints[14];

    if (nose.score > 0.5) {
      strokeWeight(10)
      strokeCap(ROUND);
      stroke(255, 112, 84, 135);
      //line joining right shouder and elbow
      line(width - rightShoulder.position.x, rightShoulder.position.y, width - rightElbow.position.x, rightElbow.position.y);
      //line joining left shoulder to elbow
      line(width - leftShoulder.position.x, leftShoulder.position.y, width - leftElbow.position.x, leftElbow.position.y);

      // right shoulder socket
      noStroke();
      fill(255, 112, 84, 127);
      ellipse(width - rightShoulder.position.x, rightShoulder.position.y, 30, 30);
      //left shoulder socket
      ellipse(width - leftShoulder.position.x, leftShoulder.position.y, 30, 30);

      // Socket to elbow
      stroke(0, 255, 239, 135);
      line(width - rightElbow.position.x, rightElbow.position.y, width - rightWrist.position.x, rightWrist.position.y);
      line(width - leftElbow.position.x, leftElbow.position.y, width - leftWrist.position.x, leftWrist.position.y);

      //Elbows
      fill(0, 255, 239, 127);
      noStroke();
      ellipse(width - leftElbow.position.x, leftElbow.position.y, 30, 30);
      ellipse(width - rightElbow.position.x, rightElbow.position.y, 30, 30);

      // Wrists
      fill(88, 147, 212, 127);
      ellipse(width - rightWrist.position.x, rightWrist.position.y, 30, 30);
      ellipse(width - leftWrist.position.x, leftWrist.position.y, 30, 30);


      //torso quardilateral
      stroke(36, 112, 160, 135);
      fill(36, 112, 160, 127);
      quad(width - rightShoulder.position.x, rightShoulder.position.y,width - leftShoulder.position.x,leftShoulder.position.y, width - leftHip.position.x, leftHip.position.y, width - rightHip.position.x, rightHip.position.y);

      stroke(255, 118, 87, 135);
      fill(255, 118, 87, 127);

      let faceRadius = dist(width - nose.position.x, nose.position.y, width - leftEar.position.x, leftEye.position.y);
      ellipse(width - nose.position.x, nose.position.y, faceRadius, faceRadius+ 60);

      image(musicNoteImage, width - leftEye.position.x, leftEye.position.y, 40, 80);
      image(musicNoteImage, width - rightEye.position.x, rightEye.position.y, 40, 80);


      //Hips socket
      noStroke();
      fill(124, 71, 137, 127)
      ellipse(width - rightHip.position.x, rightHip.position.y, 30, 30);
      ellipse(width - leftHip.position.x, leftHip.position.y, 30, 30);

      // lines from hips to knees
      stroke(167, 209, 41, 127);
      line(width - rightHip.position.x, rightHip.position.y, width - rightKnee.position.x, rightKnee.position.y);
      line(width - leftHip.position.x, leftHip.position.y, width - leftKnee.position.x, leftKnee.position.y);

    }

  }
}

function posePlayer()  {

// Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;

    // Seperating out the 17 keypoints posenet returns
    let nose = pose.keypoints[0];
		let leftEye = pose.keypoints[1];
		let rightEye = pose.keypoints[2];
    let leftEar = pose.keypoints[3];
    let rightEar = pose.keypoints[4];
    let leftShoulder = pose.keypoints[5];
    let rightShoulder = pose.keypoints[6];
    let leftElbow = pose.keypoints[7];
    let rightElbow = pose.keypoints[8];
    let leftWrist = pose.keypoints[9];
    let rightWrist = pose.keypoints[10];
    let leftHip = pose.keypoints[11];
    let rightHip = pose.keypoints[12];
    let leftKnee = pose.keypoints[13];
    let rightKnee = pose.keypoints[14];

    // From experimentation nose seems to be the best detected body part
    // Hence if there is a nose means there is a human present
    //Also trying to avoid multiple pose detection of people farther off
    if (nose.score > 0.5) {

      //Right wrist playing conditions
      if( width - rightWrist.position.x > width - 200 && rightWrist.position.x > 0  && !dubstepLoopTwo.isPlaying()){
        dubstepLoopTwo.play();
        rectMode(CENTER);
        noStroke();
        fill(88, 147, 212, 100)
        rect(700, 280, 150, height);
      } else if(width - rightWrist.position.x < width - 200 && rightWrist.position.x < 800 && dubstepLoopTwo.isPlaying()){
        dubstepLoopTwo.stop();
      }

      //Left wrist playing conditions
      if(width - leftWrist.position.x < width - 600 && leftWrist.position.x < 800 && !violinLoopOne.isPlaying()){
        rectMode(CENTER);
        noStroke();
        fill(88, 147, 212, 100)
        rect(100, 280, 150, height);
        violinLoopOne.play();
      } else if(width - leftWrist.position.x > width - 600 && leftWrist.position.x > 0 && violinLoopOne.isPlaying()){
        violinLoopOne.stop();
      }

      // Nose playing condition 1
      if(nose.position.y > 0 && nose.position.y <= height/4 && !drumLoopTwo.isPlaying()){
        noStroke();
        fill(222,205,195, 100);
        rectMode(CENTER);
        rect(width/2, height/8, width, height/4);
        drumLoopTwo.play();
        // drumLoopTwo.loop();
      } else if(nose.position.y > height/4 && nose.position.y < height && drumLoopTwo.isPlaying()){
        drumLoopTwo.stop();
      }

      // Nose playing condition 2
      if(nose.position.y > height/4 && nose.position.y <= height/2 && !drumLoopOne.isPlaying()){
        noStroke();
        fill(222,205,195, 100);
        rectMode(CENTER);
        rect(width/2, 3*height/8, width, height/4);
        drumLoopOne.play();
        // drumLoopOne.loop();
      } else if(nose.position.y <= height/4 && nose.position.y > height/2 && nose.position.y < height && drumLoopOne.isPlaying()){
        drumLoopOne.stop();
      }

      // Nose playing condition 3
      if(nose.position.y > height/2 && nose.position.y <= 3*height/4 && !guitarLoopOne.isPlaying()){
        noStroke();
        fill(222,205,195, 100);
        rectMode(CENTER);
        rect(width/2, 5*height/8, width, height/4);
        guitarLoopOne.play();
      } else if(nose.position.y < height/2 && nose.position.y > 3*height/4 && nose.position.y < height && guitarLoopOne.isPlaying()){
        guitarLoopOne.stop();
      }


      // Nose playing condition 4
      //
      if(nose.position.y > 3*height/4 && nose.position.y <= height && !dubstepLoopOne.isPlaying()){
        noStroke();
        fill(222,205,195, 100);
        rectMode(CENTER);
        rect(width/2, 7*height/8, width, height/4);
        dubstepLoopOne.play();
      } else if(nose.position.y < 3*height/4 && nose.position.y > 0 && nose.position.y < height && dubstepLoopOne.isPlaying()){
        dubstepLoopOne.stop();
      }

    }
  }


}
