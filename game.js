var buttoncolors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function disableClick(){
    if (!started) {
        $(".btn").addClass("disabled");
    }    
}

disableClick();

$("#level-title").on("click", () => {
    if (!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
        $(".btn").removeClass("disabled");
    }
});

$(".btn").on("click", (e) => {
    var userChosencolor=e.target.id;
    userClickedPattern.push(userChosencolor);
    playSound(userChosencolor);
    animatePress(userChosencolor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if (gamePattern.length===userClickedPattern.length){
            console.log("level completed right");
            setTimeout(()=>nextSequence(), 1000);
        }
    } else {
        console.log("wrong"); 
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => $("body").removeClass("game-over"), 200);
        $("#level-title").html("<small>Game Over<br><br>Press HERE to Restart</small>");
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosencolor = buttoncolors[randomNumber];
    gamePattern.push(randomChosencolor);
    console.log("gamePattern.push(randomChosencolor) " + gamePattern)
    playSequence(gamePattern);
}

function playSound(color){
    var randomChosenAudio = new Audio("sounds/"+color+".mp3"); 
    randomChosenAudio.play();
};

function playSequence(gamePattern){
    gamePattern.forEach((color, index) => {
        setTimeout(function(){
                $("."+color).fadeIn(200).fadeOut(200).fadeIn(200);
                playSound(color);
            }, index*400);
        }
    );
}

function animatePress(currentcolor){
    $("#"+currentcolor).addClass("pressed");
    setTimeout(() => $("#"+currentcolor).removeClass("pressed"), 100);
};

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    disableClick();
}
