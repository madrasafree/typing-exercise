
let word, correct, typeAudio, errorAudio, input, inputValue, volume = true;
typeAudio = new Audio("https://madrasa-voice.s3.eu-west-2.amazonaws.com/typing-exercise/typing_sound.mp3");
errorAudio = new Audio("https://madrasa-voice.s3.eu-west-2.amazonaws.com/typing-exercise/error_duck.mp3");


let words = [];
let id = new URLSearchParams(location.search).get("list") || 1;
let random = new URLSearchParams(location.search).get("random") == "true" || false;


start();

function start() {

    $.ajax({
        dataType: "json",
        url: "data/data.json",
        async: false,
        success: function (data) {
            words = data[id];
        }
    });

    $(".final").hide();
    $(".answer").hide();
    $(".next").hide();
    $(".exercise").show();
    $(".input").val("");
    $(".input").prop("disabled", false);
    word = nextWord();
    setWord(word);
}

input = $(".typing-exercise-container .input");
input.on("keydown", cancelArrowMovement);

input.on("input", function () {
    checkCorrectness();
});


$(".sound-btn").on("click", function () {
    if ($(this).data("switch") === "on") {
        $(this).find("i").removeClass("fa-volume-down").addClass("fa-volume-mute");
        $(this).data("switch", "off");
        volume = false;
    } else if ($(this).data("switch") === "off") {
        $(this).find("i").removeClass("fa-volume-mute").addClass("fa-volume-down");
        $(this).data("switch", "on");
        volume = true;
    }
});


$(".next").on("click", function () {
    $(".input").prop("disabled", false);
    $(".input").val("");
    $(".answer").hide();
    $(".next").hide();

    word = nextWord();
    setWord(word);
    $(".input").focus();
});

$(".restart").on("click", function () {
    start();
});

function cancelArrowMovement(e) {
    if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}
function checkCorrectness() {

    inputValue = $(".input").val();
    if (inputValue === correct) {
        $(".input").prop("disabled", true);
        $(".answer").show();
        $(".next").show().focus();

        if (words.length === 0) {
            $(".final").show();
            $(".next").hide();
            $(".exercise").hide();
        }
    }

    for (let i = 0; i < word.length; i++) {
        if (i < inputValue.length) {
            if (inputValue[i] === word[i]) {
                if (i === inputValue.length - 1 && volume) {
                    typeAudio.play();
                }
                $("span[data-num=" + i + "]").removeClass("default").removeClass("wrong").addClass("correct");
            }
            else {
                if (i === inputValue.length - 1 && volume) {
                    errorAudio.play();
                }
                $("span[data-num=" + i + "]").removeClass("default").removeClass("correct").addClass("wrong");
            }
        } else {
            $("span[data-num=" + i + "]").removeClass("correct").removeClass("wrong").addClass("default");
        }
    }
}

function setWord(word) {
    let spansOfLeters = "";
    for (let i = 0; i < word.length; i++) {
        spansOfLeters += `<span class="default" data-num="${i}">${word[i]}</span>`;
    }
    $(".word").html(spansOfLeters);
    $(".correct").val(word);
    correct = $(".correct").val();
}
function nextWord() {
    let numberOfWords = words.length;
    let nextIndex = 0;
    if (random) {
        nextIndex = Math.floor(Math.random() * numberOfWords);
    }
    let nextWord = words[nextIndex];
    words.splice(nextIndex, 1);
    return nextWord;
}