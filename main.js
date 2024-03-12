img = "";
status = "";
result_copy = [];
percent = 0;
alert_S = '';
detected = '';

function start() { 
    object_detection = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'Status : Detecting Objects';
}

function draw() {
    image(video, 0, 0, 600, 500);
    if (status != '') {
        object_detection.detect(video, gotResult);
        document.getElementById('status').innerHTML = 'Status : Object Detected';
        for(i = 1; i<= result_copy.length; i++) {
            red = random(255);
            blue = random(255);
            green = random(255);
            if(result_copy[i] == 'person') {
                percent = floor(result_copy[i].confidence * 100);
                text(result_copy[i].label + ' ' + percent + '%', result_copy[i].x + 15, result_copy[i].y + 1);
                stroke(red, green, blue);
                noFill();
                rect(result_copy[i].x, result_copy[i].y, result_copy[i].height, result_copy[i].width);
                detected = 'true';
                break;
                document.getElementById('baby_detected').innerHTML = 'Baby : Detected ';
            }
            else {
                detected = 'false';
            }
        }
        if (detected != 'true') {
            play('a.mp3');
            document.getElementById('baby_detected').innerHTML = 'Baby : Not Detected ';
        }
    }
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.position(450, 200);

    video = createCapture(VIDEO);
    video.size(600, 500);
    video.hide();
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, result) {
    if (error) {
        console.error('Error!');
    }
    else {
        console.log('Got Results!');
        console.log(result);
        result_copy = result;
    }
}
