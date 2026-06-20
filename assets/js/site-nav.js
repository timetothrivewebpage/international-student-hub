// Responsive site navigation for tablet and mobile headers.
(function () {
  "use strict";

  var button = document.querySelector("[data-mobile-menu-toggle]");
  var menu = document.querySelector("[data-mobile-menu]");

  if (!button || !menu) return;

  function setOpen(open) {
    button.setAttribute("aria-expanded", open ? "true" : "false");
    menu.hidden = !open;
    document.body.classList.toggle("has-mobile-menu", open);
  }

  button.addEventListener("click", function () {
    setOpen(button.getAttribute("aria-expanded") !== "true");
  });

  menu.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setOpen(false);
      button.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 981px)").matches) {
      setOpen(false);
    }
  });
})();
