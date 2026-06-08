(function () {
  const form = document.querySelector("[data-feedback-form]");
  if (!form) return;

  const status = form.querySelector("[data-feedback-status]");

  form.addEventListener("submit", function (event) {
    if (!form.getAttribute("action")) {
      event.preventDefault();
      if (status) {
        status.hidden = false;
        if (typeof status.focus === "function") status.focus();
      }
    }
  });
})();
