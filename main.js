status = "";
objects = [];
function setup(){
    canvas = createCanvas(480, 380)
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input_value = document.getElementById("input").value;
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function draw(){
    image(video, 0, 0, 380, 380);

    if(status != "")
    {
        objectDetector.detect(video, gotResult)
        for (i = 0; i < objects.length; i++) {
            

            if(input_value == objects[i].label) {
                video.stop();
                document.getElementById("status").innerHTML = "Status : " + input_value + " Detected";
                objectDetector.detect(gotResult);
                speak();
            }

            else{
                document.getElementById("status").innerHTML = "Status : " + input_value + " Not detected";
            }
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}

function gotResult(error, results) {
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "Object detected";
    var utterThis = new SpeechSynthesisUtterance();
    synth.speak(utterThis);
  }