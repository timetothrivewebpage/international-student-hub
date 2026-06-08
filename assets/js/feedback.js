(function () {
  const form = document.querySelector("[data-feedback-form]");
  if (!form) return;

  const status = form.querySelector("[data-feedback-status]");
  const submit = form.querySelector("[type='submit']");

  function showStatus(message, type) {
    if (!status) return;
    status.textContent = message;
    status.dataset.statusType = type || "info";
    status.hidden = false;
    if (typeof status.focus === "function") status.focus();
  }

  form.addEventListener("submit", async function (event) {
    const endpoint = form.getAttribute("action");

    if (!endpoint) {
      event.preventDefault();
      showStatus("This preview form is ready, but no submission endpoint has been configured yet.", "error");
      return;
    }

    event.preventDefault();
    if (submit) submit.disabled = true;
    showStatus("Sending feedback...", "info");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        form.reset();
        showStatus("Thank you. Your feedback has been submitted.", "success");
      } else {
        showStatus("The form could not be submitted. Please try again in a moment.", "error");
      }
    } catch (error) {
      showStatus("The form could not be submitted. Please check your connection and try again.", "error");
    } finally {
      if (submit) submit.disabled = false;
    }
  });
})();
