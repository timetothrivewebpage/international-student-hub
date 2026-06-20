// Events & Workshops page: live directory search and topic/format filters.
(function () {
  "use strict";

  var root = document.querySelector("[data-events-directory]");
  if (!root) return;

  var cards = Array.prototype.slice.call(root.querySelectorAll("[data-events-card]"));
  var search = root.querySelector("[data-events-search]");
  var resetButton = root.querySelector("[data-events-reset]");
  var empty = root.querySelector("[data-events-empty]");
  var count = root.querySelector("[data-events-count]");

  var state = { category: "all", format: "all", query: "" };

  function setPill(group, value) {
    var pills = Array.prototype.slice.call(
      root.querySelectorAll('[data-events-filter="' + group + '"]')
    );
    pills.forEach(function (pill) {
      var active = pill.getAttribute("data-filter-value") === value;
      pill.classList.toggle("is-active", active);
      pill.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  function apply() {
    var visible = 0;

    cards.forEach(function (card) {
      var category = card.getAttribute("data-category");
      var format = card.getAttribute("data-format");
      var haystack = (card.getAttribute("data-search") || "").toLowerCase();

      var show =
        (state.category === "all" || category === state.category) &&
        (state.format === "all" || format === state.format) &&
        (state.query === "" || haystack.indexOf(state.query) !== -1);

      card.hidden = !show;
      if (show) visible++;
    });

    if (empty) empty.hidden = visible !== 0;
    if (count) {
      var suffix = visible === 1 ? " event" : " events";
      count.textContent = visible + suffix + (visible === cards.length ? "" : " shown");
    }
  }

  Array.prototype.forEach.call(
    root.querySelectorAll("[data-events-filter]"),
    function (pill) {
      pill.addEventListener("click", function () {
        var group = pill.getAttribute("data-events-filter");
        var value = pill.getAttribute("data-filter-value");
        state[group] = value;
        setPill(group, value);
        apply();
      });
    }
  );

  if (search) {
    search.addEventListener("input", function () {
      state.query = search.value.trim().toLowerCase();
      apply();
    });
  }

  if (resetButton) {
    resetButton.addEventListener("click", function () {
      state.category = "all";
      state.format = "all";
      state.query = "";
      if (search) search.value = "";
      setPill("category", "all");
      setPill("format", "all");
      apply();
    });
  }

  apply();
})();
