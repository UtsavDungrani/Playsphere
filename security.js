// Disable right click on images only
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  return false;
});

// Disable keyboard shortcuts for dev tools
document.addEventListener("keydown", function (e) {
  // Disable F12
  if (e.keyCode === 123) {
    e.preventDefault();
    return false;
  }

  // Disable Ctrl+Shift+I (Chrome dev tools)
  if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
    e.preventDefault();
    return false;
  }

  // Disable Ctrl+Shift+J (Chrome dev tools)
  if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
    e.preventDefault();
    return false;
  }

  // Disable Ctrl+Shift+C (Chrome dev tools)
  if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
    e.preventDefault();
    return false;
  }

  // Disable Ctrl+U (View Source)
  if (e.ctrlKey && e.keyCode === 85) {
    e.preventDefault();
    return false;
  }
});

// Basic dev tools detection
(function () {
  let checkStatus;
  let element = new Image();
  Object.defineProperty(element, "id", {
    get: function () {
      checkStatus = "on";
      throw new Error("Dev tools checker");
    },
  });

  setInterval(function () {
    checkStatus = "off";
    console.log(element);
    console.clear();
    if (checkStatus === "on") {
      console.warn("Developer tools detected");
    }
  }, 1000);
})();

// Disable text selection
document.addEventListener("selectstart", function (e) {
  e.preventDefault();
  return false;
});

// Disable copy
document.addEventListener("copy", function (e) {
  e.preventDefault();
  return false;
});

// Disable cut
document.addEventListener("cut", function (e) {
  e.preventDefault();
  return false;
});

// Additional protection against dev tools
window.addEventListener("devtoolschange", function (e) {
  if (e.detail.open) {
    window.location.reload();
  }
});

// Disable source view
document.onkeypress = function (event) {
  event = event || window.event;
  if (event.keyCode == 123) {
    return false;
  }
};

// Disable source view in mobile
document.onmousedown = function (event) {
  event = event || window.event;
  if (event.keyCode == 123) {
    return false;
  }
};

// Disable inspect element
document.onkeydown = function (event) {
  event = event || window.event;
  if (event.keyCode == 123) {
    return false;
  }
};
