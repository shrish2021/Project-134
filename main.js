status = "";

function preload()
{
    alarm = loadSound("alarm.mp3");
    img = loadImage("baby.jfif")
}

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
}

function start()
{
    babyDectector = ml5.personDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Baby..";
}

function modelLoaded()
{
    status = true;
    console.log("Model Loaded!");
}

function gotResult(error, results)
{
    if (error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        personDectector.detect(person, gotResult);
        for(i = 0; i < person.length; i++)
        {
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y, objects[i].length, objects[i].height);
        }
        if(person = result[0].label)
        {
            document.getElementById("status").innerHTML = "Status: Baby detected!";
        }
        else{
            document.getElementById("status").innerHTML = "Status: Baby not detected..";
            alarm.play();
        }
    }
}