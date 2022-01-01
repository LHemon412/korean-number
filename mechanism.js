ans = "";
mode="sino";

function checkState() {
  if ($("#sino-native").is(":checked")) {
    mode = "native";
  } else {
    mode = "sino";
  }
  genQuestion();
}

function genQuestion() {
  hangul = ""
  if (mode == "native") {
    tens = Math.floor(Math.random()*9+1);
    ones = Math.floor(Math.random()*9+1);
    tens_hangul = ["열", "스물", "서른", "마흔", "쉰", "예순", "일흔", "여든", "아흔"];
    ones_hangul = ["하나", "둘", "셋", "넷", "다섯", "여섯", "일곱", "여덟", "아홉"];
    hangul = tens_hangul[tens-1] + ones_hangul[ones-1];
    ans = tens.toString() + ones.toString();
  } else if (mode == "sino") {
    mag = Math.floor(Math.random()*10+1);
    ans = Math.floor(Math.random()*Math.pow(10, mag)+1).toString();
    digits = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
    if (ans.length >= 9) {
      // 억
      ok_before = ans.slice(0, -8);
      if (ok_before.length >= 3 && ok_before.slice(0, -2) != 0) {
        hangul += digits[ok_before.slice(0,-2)] + "백";
      }
      if (ok_before.length >= 2 && ok_before.slice(-2, -1) != 0) {
        hangul += digits[ok_before.slice(-2, -1)] + "십";
      }
      hangul += digits[ok_before.slice(-1)] + "억";
    }
    if (ans.length >= 5) {
      // 만
      man_before = ans.slice(-8, -4);
      if (man_before.length >= 4 && man_before.slice(0, -3) != 0) {
        hangul += digits[man_before.slice(0,-3)] + "천";
      }
      if (man_before.length >= 3 && man_before.slice(0, -2) != 0) {
        hangul += digits[man_before.slice(-3,-2)] + "백";
      }
      if (man_before.length >= 2 && man_before.slice(-2, -1) != 0) {
        hangul += digits[man_before.slice(-2, -1)] + "십";
      }
      hangul += digits[man_before.slice(-1)] + "만";
    }
    if (ans.length >= 4) {
      // 천
      chon_before = ans.slice(-4, -3);
      hangul += digits[chon_before] + "천";
    }
    if (ans.length >= 3) {
      // 백
      baek_before = ans.slice(-3, -2);
      hangul += digits[baek_before] + "백";
    }
    if (ans.length >= 2) {
      // 십
      sip_before = ans.slice(-2, -1);
      hangul += digits[sip_before] + "십"
    }
    ones = ans.slice(-1);
    hangul += digits[ones];
  }
  $("#question").text(hangul);
  $("#ans").val("").attr("disabled", false);
}

function checkAns() {
  if ($("#ans").val() == ans) {
    $("#correct-ans").removeClass("text-danger").addClass("text-success")
    $("#correct-ans").text("Correct!")
  } else {
    $("#correct-ans").removeClass("text-success").addClass("text-danger")
    $("#correct-ans").text(ans)
  }
  $("#ans").attr("disabled", true);
  $("#correct-ans").animate({opacity:1}, 200, function() {
    $("#main").delay(1000).animate({opacity:0}, 200, function() {
      genQuestion();
      $("#main").animate({opacity:1}, 200);
    });
    $("#correct-ans").delay(1000).animate({opacity:0}, 200);
  })
}

$(()=>{
  checkState()

  $("#ans").keydown((e)=>{
    // Submit Handler
    if (e.key == "Enter") {
      checkAns();
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

  $("#sino-native").change(checkState);
});
