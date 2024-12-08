var ans = "";
var questionMode = "sino";
var answerMode = "number";
var slider = '';
var waiting = false;
var voice = null;
var voices = [];

/* Since the onvoiceschanged event does not work in every browser, we need to
 * periodically check if the voices are already loaded. */
function startLoadingVoices() {
  var tryCount = 0;
  var voiceChkerId = setInterval(() => {
      var voicesList = window.speechSynthesis.getVoices().filter((v) => {return v.lang=='ko_KR' || v.lang=='ko-KR';});
      if (voices.length > 0 && voicesList.length == voices.length || tryCount >= 10) {
        clearInterval(voiceChkerId);
      } else {
        voices = voicesList;
        voicesChangedHandler();
        tryCount += 1;
        if (voices.length > 0)
          $("#TtsNotFoundAlert").hide();
      }
    }, 1000);
}

function voicesChangedHandler() {
  var selectIndex = -1;
  $('#tts-select').find('option').remove()
  $('#tts-select').append($('<option>', { value: -1, text: "off"}));
  for (let i = 0; i < voices.length; i++) {
    if (selectIndex == -1 || voices[i].localService)
      selectIndex = i;
    let opt = $('<option>', { value: i, text: voices[i].name });
    $('#tts-select').append(opt);
  }
  $('#tts-select')[0].value = selectIndex;
  voice = voices[selectIndex];
}

function readAloud(s) {
  if (voice != null) {
    setTimeout(function() {
      var utterance = new SpeechSynthesisUtterance(s);
      utterance.voice = voice;
      utterance.lang = 'ko-KR';
      utterance.rate = $("#tempoSlider").slider('getValue')/100.0;
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
      }, 100);
  }
}

function checkState() {
  if ($("#sino-native").is(":checked")) {
    questionMode = "native";
    $("#rangeSliderDiv").css("display", "none");
    $("#sigFigDiv").css("display", "none");
  } else {
    questionMode = "sino";
    $("#rangeSliderDiv").css("display", "flex");
    $("#sigFigDiv").css("display", "flex");
  }

  if ($("#number-korean").is(":checked")) {
    answerMode = "korean";
    $("#ans")[0].type = "text";
  } else {
    answerMode = "number";
    $("#ans")[0].type = "number";
  }
  genQuestion();
}

function randInt(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function genQuestion() {
  var hangul = "";
  var number = "";
  if (questionMode == "native") {
    var tens = randInt(0, 9); // 0 - 9
    var ones = randInt(0, 9); // 0 - 9
    const tens_hangul = ["", "열", "스물", "서른", "마흔", "쉰", "예순", "일흔", "여든", "아흔"];
    const ones_hangul = ["영", "하나", "둘", "셋", "넷", "다섯", "여섯", "일곱", "여덟", "아홉"];
    var hangul = tens_hangul[tens] + ones_hangul[ones];
    if (ones == 0) {
      if (tens == 0) {
        hangul = "영";
      } else {
        hangul = tens_hangul[tens];
      }
    }
    var tenStr = ''
    if (tens != 0) {
      tenStr = tens.toString();
    }
    number = tenStr + ones.toString();
  } else if (questionMode == "sino") {
    var [lowBound, upperBound] = $("#rangeSlider").slider("getValue");
    var mag = randInt(lowBound, upperBound); // 1 - 11
    var sigfig = Math.min(parseInt($("#sigfig").val()), mag); // 1 - 11
    number = (randInt(Math.pow(10, sigfig - 1), Math.pow(10, sigfig) - 1) * (Math.pow(10, mag - sigfig))).toString(); // 1 - 1e11
    const digits = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
    if (number.length >= 9) {
      // 억
      ok_before = number.slice(0, -8);
      if (ok_before.length >= 3 && ok_before.slice(0, -2) != 0) {
        if (ok_before.slice(0, -2) == "1") {
          hangul += "백";
        } else if (ok_before.slice(0, -2) != "0") {
          hangul += digits[ok_before.slice(0, -2)] + "백";
        }
      }
      if (ok_before.length >= 2 && ok_before.slice(-2, -1) != 0) {
        if (ok_before.slice(-2, -1) == "1") {
          hangul += "십";
        } else if (ok_before.slice(-2, -1) != "0") {
          hangul += digits[ok_before.slice(-2, -1)] + "십";
        }
      }
      if (ok_before.slice(-1) == "1" & ok_before.length == 1) {
        hangul += "억 ";
      } else {
        hangul += digits[ok_before.slice(-1)] + "억 ";
      }
    }
    if (number.length >= 5) {
      // 만
      man_before = number.slice(-8, -4);
      if (man_before.length >= 4 && man_before.slice(0, -3) != 0) {
        if (man_before.slice(0, -3) == "1") {
          hangul += "천";
        } else if (man_before.slice(0, -3) != "0") {
          hangul += digits[man_before.slice(0, -3)] + "천";
        }
      }
      if (man_before.length >= 3 && man_before.slice(0, -2) != 0) {
        if (man_before.slice(-3, -2) == "1") {
          hangul += "백";
        } else if (man_before.slice(-3, -2) != "0") {
          hangul += digits[man_before.slice(-3, -2)] + "백";
        }
      }
      if (man_before.length >= 2 && man_before.slice(-2, -1) != 0) {
        if (man_before.slice(-2, -1) == "1") {
          hangul += "십";
        } else if (man_before.slice(-2, -1) != "0") {
          hangul += digits[man_before.slice(-2, -1)] + "십";
        }
      }
      if (man_before.slice(-1) == "1" && man_before.length == 1) {
        hangul += "만 ";
      } else {
        hangul += digits[man_before.slice(-1)] + "만 ";
      }
    }
    if (number.length >= 4 && number.slice(-4, -3) != 0) {
      // 천
      chon_before = number.slice(-4, -3);
      if (chon_before == "1") {
        hangul += "천";
      } else {
        hangul += digits[chon_before] + "천";
      }
    }
    if (number.length >= 3 && number.slice(-3, -2) != 0) {
      // 백
      baek_before = number.slice(-3, -2);
      if (baek_before == "1") {
        hangul += "백";
      } else {
        hangul += digits[baek_before] + "백";
      }
    }
    if (number.length >= 2 && number.slice(-2, -1) != 0) {
      // 십
      sip_before = number.slice(-2, -1);
      if (sip_before == 1) {
        hangul += "십"
      } else {
        hangul += digits[sip_before] + "십"
      }
    }
    ones = number.slice(-1);
    hangul += digits[ones];
  }
  hangul = hangul.trim();
  var questionText = "";
  if (answerMode == "number") {
    questionText = hangul;
    ans = number;
  } else {
    questionText = number;
    ans = hangul;
  }
  $("#question").text(questionText);
  $("#ans").val("").attr("disabled", false);

  if (!$("#number-korean").is(":checked")) {
    readAloud($("#question").text());
  }

  $("#ans").focus();
}

function checkAns() {
  var correct = false;
  if ($("#ans").val().replace(" ", "") == ans.replace(" ", "")) {
    $("#correct-ans").removeClass("text-danger").addClass("text-success")
    $("#correct-ans").text("Correct!")
    correct = true;
  } else {
    $("#correct-ans").removeClass("text-success").addClass("text-danger")
    if (answerMode == "number") {
      $("#correct-ans").text(parseInt(ans).toLocaleString());
    } else {
      $("#correct-ans").text(ans);
    }
  }
  if (correct) {
    waiting = true;
    $("#correct-ans").animate({ opacity: 1 }, 200, function () {
      $("#main").delay(1000).animate({ opacity: 0 }, 200, function () {
        genQuestion();
        $("#main").animate({ opacity: 1 }, 200, function () {
          waiting = false;
        });
      });
      $("#correct-ans").delay(1000).animate({ opacity: 0 }, 200);
    })
  } else {
    $("#correct-ans").animate({ opacity: 1 }, 200, function () {
      $("#correct-ans").focus();
    });
    if ($("#number-korean").is(":checked")) {
      readAloud(ans);
    }
  }
}

function getSigfig() {
  return parseInt($("#sigfig").val());
}

$(() => {
  slider = $("#rangeSlider").slider();
  slider.on('slideStop', genQuestion);

  slider = $("#tempoSlider").slider();
  slider.on('slideStop', function () {
    readAloud($("#question").text());
  });

  $("#sigfig").val("11");
  $("#sigfig").on("input", function () {
    $("#sigFigDisplay").text($("#sigfig").val());
  });
  $("#sigfig").change(checkState);

  $("#ans").keydown((e) => {
    if (waiting) return false;

    // Submit Handler
    if (e.key == "Enter") {
      if ($("#correct-ans").hasClass("text-danger") && $("#correct-ans").css("opacity") != "0") {
        waiting = true;
        $("#main").animate({ opacity: 0 }, 200, function () {
          genQuestion();
          $("#main").animate({ opacity: 1 }, 200, function () {
            waiting = false;
          });
        });
        $("#correct-ans").animate({ opacity: 0 }, 200);
      } else {
        checkAns();
      }
      return false;
    }

    if ($("#correct-ans").css("opacity") != "0") {
      return false;
    }

    // Validate Numbers Only
    if (answerMode == "korean") return true;
    valid = false;
    validKeys = ["Backspace", "ArrowLeft", "ArrowRight"]
    validKeys.forEach(key => {
      if (key == e.key) valid = true
    });
    if (!valid) {
      valid = (e.key.search(/[0-9]/) == 0);
    }
    if (!valid) {
      return false;
    }
  });

  checkState()

  $("#sino-native").change(checkState);
  $("#number-korean").change(checkState);

  $("#ans").focus();
  
  startLoadingVoices();
  $('#tts-select').on("change", () => {
    const index = $('#tts-select')[0].value;
    voice = (index >= 0) ? voices[index] : null;
    readAloud($("#question").text());
  });

  $("#question").click(() => {
    readAloud($("#question").text());
    console.log("hi");
  })
});
