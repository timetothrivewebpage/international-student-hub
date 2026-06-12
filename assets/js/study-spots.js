// Study Spots page: live directory search, filters, and quick-pick presets.
(function () {
  "use strict";

  var root = document.querySelector("[data-study-directory]");
  if (!root) return;

  var cards = Array.prototype.slice.call(root.querySelectorAll("[data-study-card]"));
  var search = root.querySelector("[data-study-search]");
  var accessSelect = root.querySelector("[data-study-access]");
  var resetButton = root.querySelector("[data-study-reset]");
  var empty = root.querySelector("[data-study-empty]");
  var count = root.querySelector("[data-study-count]");
  var presetLinks = Array.prototype.slice.call(document.querySelectorAll("[data-study-preset]"));

  var state = {
    campus: "all",
    noise: "all",
    access: "all",
    query: "",
    preset: null
  };

  function text(value) {
    return (value || "").toLowerCase();
  }

  function setPill(group, value) {
    var pills = Array.prototype.slice.call(root.querySelectorAll('[data-study-filter="' + group + '"]'));
    pills.forEach(function (pill) {
      var active = pill.getAttribute("data-filter-value") === value;
      pill.classList.toggle("is-active", active);
      pill.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  function matchesPreset(card) {
    if (!state.preset) return true;

    var noise = text(card.getAttribute("data-noise"));
    var haystack = text(card.getAttribute("data-search"));

    if (state.preset === "quiet-silent") {
      return noise.indexOf("quiet") !== -1 || noise.indexOf("silent") !== -1;
    }
    if (state.preset === "discussion-group") {
      return noise.indexOf("discussion") !== -1;
    }
    if (state.preset === "late-night-24-7") {
      return haystack.indexOf("24/7") !== -1 || haystack.indexOf("late-night") !== -1 || haystack.indexOf("late night") !== -1;
    }
    if (state.preset === "reset-reflect") {
      return noise.indexOf("calm") !== -1;
    }

    return true;
  }

  function apply() {
    var visible = 0;

    cards.forEach(function (card) {
      var campus = card.getAttribute("data-campus");
      var noise = text(card.getAttribute("data-noise"));
      var access = card.getAttribute("data-access");
      var haystack = text(card.getAttribute("data-search"));

      var show =
        (state.campus === "all" || campus === state.campus) &&
        (state.noise === "all" || noise.indexOf(state.noise) !== -1) &&
        (state.access === "all" || access === state.access) &&
        (state.query === "" || haystack.indexOf(state.query) !== -1) &&
        matchesPreset(card);

      card.hidden = !show;
      if (show) visible++;
    });

    if (empty) empty.hidden = visible !== 0;
    if (count) {
      var suffix = visible === 1 ? " space" : " spaces";
      count.textContent = visible + suffix + (visible === cards.length ? "" : " shown");
    }
  }

  function clearPreset() {
    state.preset = null;
    presetLinks.forEach(function (link) {
      link.removeAttribute("aria-current");
    });
  }

  function resetFilters() {
    state.campus = "all";
    state.noise = "all";
    state.access = "all";
    state.query = "";
    clearPreset();

    if (search) search.value = "";
    if (accessSelect) accessSelect.value = "all";
    setPill("campus", "all");
    setPill("noise", "all");
    apply();
  }

  Array.prototype.forEach.call(root.querySelectorAll("[data-study-filter]"), function (pill) {
    pill.addEventListener("click", function () {
      var group = pill.getAttribute("data-study-filter");
      var value = pill.getAttribute("data-filter-value");

      clearPreset();
      state[group] = value;
      setPill(group, value);
      apply();
    });
  });

  if (search) {
    search.addEventListener("input", function () {
      clearPreset();
      state.query = search.value.trim().toLowerCase();
      apply();
    });
  }

  if (accessSelect) {
    accessSelect.addEventListener("change", function () {
      clearPreset();
      state.access = accessSelect.value;
      apply();
    });
  }

  if (resetButton) {
    resetButton.addEventListener("click", resetFilters);
  }

  presetLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      resetFilters();
      state.preset = link.getAttribute("data-study-preset");
      presetLinks.forEach(function (other) {
        other.removeAttribute("aria-current");
      });
      link.setAttribute("aria-current", "true");
      apply();
    });
  });

  apply();
})();
