// 한 줄 메모: 입력값을 이 기기 브라우저(localStorage)에 저장합니다.
(function () {
  var KEY = "qa0108-second-memo";
  var input = document.getElementById("memoInput");
  var saveBtn = document.getElementById("saveBtn");
  var msg = document.getElementById("msg");
  var savedText = document.getElementById("savedText");
  var locking = false;

  // 저장된 메모가 있으면 화면에 다시 보여준다 (새로고침 유지).
  function loadSaved() {
    var value = "";
    try {
      value = localStorage.getItem(KEY) || "";
    } catch (e) {
      value = "";
    }
    if (value) {
      input.value = value;
      savedText.textContent = value;
    } else {
      savedText.textContent = "아직 저장된 메모가 없습니다.";
    }
  }

  // 저장 버튼 동작: 빈값 검증 + 연타 잠금 + 중복 저장 방지.
  saveBtn.addEventListener("click", function () {
    if (locking) {
      return;
    }
    var value = input.value.trim();
    if (!value) {
      msg.textContent = "메모를 한 글자 이상 입력해주세요.";
      input.focus();
      return;
    }
    var prev = "";
    try {
      prev = localStorage.getItem(KEY) || "";
    } catch (e) {
      prev = "";
    }
    if (value === prev) {
      msg.textContent = "이미 저장된 내용입니다.";
      return;
    }
    locking = true;
    saveBtn.disabled = true;
    try {
      localStorage.setItem(KEY, value);
      savedText.textContent = value;
      msg.textContent = "저장했습니다.";
    } catch (e) {
      msg.textContent = "브라우저 저장 공간 문제로 저장하지 못했습니다.";
    }
    setTimeout(function () {
      locking = false;
      saveBtn.disabled = false;
    }, 800);
  });

  loadSaved();
})();
