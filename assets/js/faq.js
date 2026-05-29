// FAQ page: topic filter pills + live keyword search across questions and answers.
(function () {
  "use strict";

  var root = document.querySelector("[data-faq-list]");
  if (!root) return;

  var items = Array.prototype.slice.call(root.querySelectorAll("[data-faq-item]"));
  var sections = Array.prototype.slice.call(root.querySelectorAll("[data-faq-section]"));
  var pills = Array.prototype.slice.call(document.querySelectorAll(".faq-controls .pill"));
  var search = document.querySelector("[data-faq-search]");
  var empty = document.querySelector("[data-faq-empty]");
  var count = document.querySelector("[data-faq-count]");
  var total = items.length;

  var activeFilter = "all";
  var query = "";

  function apply() {
    var visible = 0;

    sections.forEach(function (section) {
      var sectionId = section.getAttribute("data-faq-section");
      var matchesFilter = activeFilter === "all" || activeFilter === sectionId;
      var sectionVisible = 0;

      var sectionItems = section.querySelectorAll("[data-faq-item]");
      Array.prototype.forEach.call(sectionItems, function (item) {
        var haystack =
          item.getAttribute("data-q") + " " + item.getAttribute("data-a");
        var matchesQuery = query === "" || haystack.indexOf(query) !== -1;
        var show = matchesFilter && matchesQuery;

        item.hidden = !show;
        // Auto-open matches when actively searching; collapse again when cleared.
        if (show && query !== "") {
          item.open = true;
        } else if (query === "") {
          item.open = false;
        }
        if (show) {
          sectionVisible++;
          visible++;
        }
      });

      // Hide a whole section header when none of its items are showing.
      section.hidden = sectionVisible === 0;
    });

    if (empty) empty.hidden = visible !== 0;

    if (count) {
      if (query === "" && activeFilter === "all") {
        count.textContent = total + " questions";
      } else {
        count.textContent =
          visible + (visible === 1 ? " result" : " results") +
          (total ? " of " + total : "");
      }
    }
  }

  pills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      pills.forEach(function (p) {
        p.classList.remove("is-active");
        p.setAttribute("aria-selected", "false");
      });
      pill.classList.add("is-active");
      pill.setAttribute("aria-selected", "true");
      activeFilter = pill.getAttribute("data-filter");
      apply();
    });
  });

  if (search) {
    search.addEventListener("input", function () {
      query = search.value.trim().toLowerCase();
      apply();
    });
  }

  apply();
})();
