// Announcements page: category filter pills + live text search.
(function () {
  "use strict";

  var list = document.querySelector("[data-announcement-list]");
  if (!list) return;

  var items = Array.prototype.slice.call(list.querySelectorAll(".announcement"));
  var pills = Array.prototype.slice.call(document.querySelectorAll(".pill"));
  var search = document.querySelector("[data-announcement-search]");
  var empty = document.querySelector("[data-announcement-empty]");

  var activeFilter = "all";
  var query = "";

  function apply() {
    var visible = 0;

    items.forEach(function (item) {
      var matchesFilter =
        activeFilter === "all" || item.getAttribute("data-category") === activeFilter;

      var haystack =
        item.getAttribute("data-title") + " " + item.getAttribute("data-blurb");
      var matchesQuery = query === "" || haystack.indexOf(query) !== -1;

      var show = matchesFilter && matchesQuery;
      item.hidden = !show;
      if (show) visible++;
    });

    if (empty) empty.hidden = visible !== 0;
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
})();
