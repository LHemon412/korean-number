var ans = "";
var mode="sino";var slider = '';

function checkState() {
  if ($("#sino-native").is(":checked")) {
    mode = "native";
    $("#rangeSliderDiv").css("display", "none");
  } else {
    mode = "sino";
    $("#rangeSliderDiv").css("display", "flex");
  }
  genQuestion();
}

function randInt(a, b) {
  return Math.floor(Math.random()*(b-a+1))+a;
}

function genQuestion() {
  hangul = ""
  if (mode == "native") {
    tens = randInt(0,9); // 0 - 9
    ones = randInt(0,9); // 0 - 9
    tens_hangul = ["", "열", "스물", "서른", "마흔", "쉰", "예순", "일흔", "여든", "아흔"];
    ones_hangul = ["영", "하나", "둘", "셋", "넷", "다섯", "여섯", "일곱", "여덟", "아홉"];
    hangul = tens_hangul[tens] + ones_hangul[ones];
    if (ones == 0) {
      if (tens_hangul == 0) {
        hangul = "영";
      } else {
        hangul = tens_hangul[tens];
      }
    }
    tenStr = ''
    if (tens != 0) {
      tenStr = tens.toString();
    }
    ans = tenStr + ones.toString();
  } else if (mode == "sino") {
    var [lowBound, upperBound] = $("#rangeSlider").slider("getValue");
    mag = randInt(lowBound, upperBound); // 1 - 11
    ans = (Math.floor(Math.random()*Math.pow(10, mag))).toString(); // 1 - 1e11
    digits = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
    if (ans.length >= 9) {
      // 억
      ok_before = ans.slice(0, -8);
      if (ok_before.length >= 3 && ok_before.slice(0, -2) != 0) {
        if (ok_before.slice(0, -2) == "1") {
          hangul += "백";
        } else {
          hangul += digits[ok_before.slice(0,-2)] + "백";
        }
      }
      if (ok_before.length >= 2 && ok_before.slice(-2, -1) != 0) {
        if (ok_before.slice(-2, -1) == "1") {
          hangul += "십";
        } else {
          hangul += digits[ok_before.slice(-2, -1)] + "십";
        }
      }
      if (ok_before.slice(-1) == "1" & ok_before.length == 1) {
        hangul += "억 ";
      } else {
        hangul += digits[ok_before.slice(-1)] + "억 ";
      }
    }
    if (ans.length >= 5) {
      // 만
      man_before = ans.slice(-8, -4);
      if (man_before.length >= 4 && man_before.slice(0, -3) != 0) {
        if (man_before.slice(0, -3) == "1") {
          hangul += "천";
        } else {
          hangul += digits[man_before.slice(0,-3)] + "천";
        }
      }
      if (man_before.length >= 3 && man_before.slice(0, -2) != 0) {
        if (man_before.slice(0, -2) == "1") {
          hangul += "백";
        } else {
          hangul += digits[man_before.slice(-3,-2)] + "백";
        }
      }
      if (man_before.length >= 2 && man_before.slice(-2, -1) != 0) {
        if (man_before.slice(-2, -1) == "1") {
          hangul += "십";
        } else {
          hangul += digits[man_before.slice(-2, -1)] + "십";
        }
      }
      if (man_before.slice(-1) == "1" && man_before.length == 1) {
        hangul += "만 ";
      } else {
        hangul += digits[man_before.slice(-1)] + "만 ";
      }
    }
    if (ans.length >= 4 && ans.slice(-4, -3) != 0) {
      // 천
      chon_before = ans.slice(-4, -3);
      if (chon_before == "1") {
        hangul += "천";
      } else {
        hangul += digits[chon_before] + "천";
      }
    }
    if (ans.length >= 3 && ans.slice(-3, -2) != 0) {
      // 백
      baek_before = ans.slice(-3, -2);
      if (baek_before == "1") {
        hangul += "백";
      } else {
        hangul += digits[baek_before] + "백";
      }
    }
    if (ans.length >= 2 && ans.slice(-2, -1) != 0) {
      // 십
      sip_before = ans.slice(-2, -1);
      if (sip_before == 1) {
        hangul +=  "십"
      } else {
        hangul += digits[sip_before] + "십"
      }
    }
    ones = ans.slice(-1);
    hangul += digits[ones];
  }
  hangul = hangul.trim();
  $("#question").text(hangul);
  $("#ans").val("").attr("disabled", false);
  $("#ans").focus();
}

function checkAns() {
  var correct = false;
  if ($("#ans").val() == ans) {
    $("#correct-ans").removeClass("text-danger").addClass("text-success")
    $("#correct-ans").text("Correct!")
    correct = true;
  } else {
    $("#correct-ans").removeClass("text-success").addClass("text-danger")
    $("#correct-ans").text(parseInt(ans).toLocaleString());
  }
    //$("#ans").attr("disabled", true);
  if (correct) {
    $("#correct-ans").animate({opacity:1}, 200, function() {
      $("#main").delay(1000).animate({opacity:0}, 200, function() {
        genQuestion();
        $("#main").animate({opacity:1}, 200);
      });
      $("#correct-ans").delay(1000).animate({opacity:0}, 200);
    })
  } else {
    $("#correct-ans").animate({opacity:1}, 200, function() {
      $("#correct-ans").focus();
    });
  }
}

$(()=>{
  slider = $("#rangeSlider").slider();
  slider.on('slideStop', genQuestion);

  $("#ans").keydown((e)=>{
    console.log('hi');
    // Submit Handler
    if (e.key == "Enter") {
      if ($("#correct-ans").hasClass("text-danger") && $("#correct-ans").css("opacity") != "0") {
        $("#main").animate({opacity:0}, 200, function() {
          genQuestion();
          $("#main").animate({opacity:1}, 200);
        });
        $("#correct-ans").animate({opacity:0}, 200);
      } else {
        checkAns();
      }
      return false;
    }

    if ($("#correct-ans").css("opacity") != "0") {
      return false;
    }

    // Validate Numbers Only
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

  $("#infoBtn").click(e => {

  })

  checkState()

  $("#sino-native").change(checkState);

  $("#ans").focus();
});
