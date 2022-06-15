music1 = "";
music2 = "";
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";
leftWristScore = 0;
rightWristScore = 0;
music1_status = "";
music2_status = "";

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelloaded);
    posenet.on("pose", gotposes)
}

function preload() {
    music1 = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function modelloaded() {
    console.log("poseNet is initialized");
}

function gotposes(result) {
    if (result.length > 0) {
        console.log(result);
        rightWristX = result[0].pose.rightWrist.x;
        rightWristY = result[0].pose.rightWrist.y;
        leftWristX = result[0].pose.leftWrist.x;
        leftWristY = result[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY);
        console.log("Right Wirst X = " + rightWristX + " Right Wrist Y = " + rightWristY);
        leftWristScore = result[0].pose.keypoints[9].score;
        rightWristScore = result[0].pose.keypoints[10].score;
    }
}

function draw() {
    image(video, 0, 0, 600, 500)
    fill("orangered");
    music1_status = music1.isPlaying();
    music2_status = music2.isPlaying();
    if (leftWristScore > 0.2) {
        circle(leftWristX, leftWristY, 20)
        music2.stop();
        if (music1_status == false) {
            music1.play();
            document.getElementById("musicname").innerHTML = "Cradles";
        }
    }
    if (rightWristScore > 0.2) {
        circle(rightWristX, rightWristY, 20)
        music1.stop();
        if (music2_status == false) {
            music2.play();
            document.getElementById("musicname").innerHTML = "Peter Pan";
        }
    }
}