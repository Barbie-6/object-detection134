status = '';
img = '';
objects = [];


function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    object_detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
}
function draw() {
    image(video, 0, 0, 380, 380);
    if(status != ""){
        object_detector.detect(img, gotResults);
        r = random(255);
        g = random(255);
        b = random(255);
        document.getElementById("status").innerHTML = "Objects Detected";
        for(i=0; i<objects.length; i++){
             document.getElementById("number_of_objects").innerHTML = "Number of objects detected are " + objects.length ;
            label = objects[i].label;
            percent = floor(objects[i].confidence * 100);
            stroke(r,g,b);
            noFill();
            strokeWeight(2.5);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            stroke(r,g,b);
            strokeWeight(1)
            text(label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        }
    }
}
function modelLoaded() {
    console.log("model is loaded");
    status = true;
   
}
function gotResults(error, result) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(result);
        objects = result;
    }
}