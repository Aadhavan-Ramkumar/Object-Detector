var Img = ""
var Status = ""
var Objects = []

function preload() {
    Img = loadImage("Dog Cat.jpg")
}

function setup() {
    Canvas = createCanvas(640, 420)
    Canvas.center()
    ObjectDetector = ml5.objectDetector("cocossd", ModelLoaded)
    document.getElementById("Status").innerHTML = "Status: Detecting Objects"
}

function draw() {
    image(Img, 0, 0, 640, 420)
    if (Status != "") {
        for (let i = 0; i < Objects.length; i++) {
            document.getElementById("Status").innerHTML = "Status: Objects Detected"
            fill("#FF0000")
            Percent = floor(Objects[i].confidence * 100)
            text(Objects[i].label.toUpperCase() + " " + Percent + "%", Objects[i].x + 15, Objects[i].y + 15)
            noFill()
            stroke("#FF0000")
            rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height)
        }
    }
}

function ModelLoaded() {
    console.log("Model Loaded!")
    Status = true
    ObjectDetector.detect(Img, GetResults)
}

function GetResults(Error, Results) {
    if (Error) {
        console.error(Error)
    }
    console.log(Results)
    Objects = Results
}