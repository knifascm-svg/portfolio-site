(function () {
  "use strict";

  var WEEKDAYS = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
  var MONTHS = [
    { id: "july", name: "Июль", days: 31, start: 1 },
    { id: "august", name: "Август", days: 31, start: 4 },
    { id: "september", name: "Сентябрь", days: 30, start: 0 },
  ];

  var HIGHLIGHTS = {
    july: {
      5: "light",
      12: "light",
      18: "light",
      19: "medium",
      20: "medium",
      25: "light",
      26: "light",
      27: "dark",
      28: "dark",
    },
    august: {
      1: "light",
      2: "dark",
      3: "medium",
      4: "light",
      9: "dark",
      10: "dark",
      15: "medium",
      16: "light",
      17: "light",
      23: "light",
      24: "light",
      25: "medium",
      26: "light",
      27: "dark",
      28: "dark",
      29: "dark",
      30: "dark",
    },
    september: {
      6: "light",
      7: "medium",
      13: "light",
      14: "dark",
      20: "light",
      21: "medium",
    },
  };

  var EVENTS = {
    1: [{ type: "competition", name: "X-WATERS Bannoye", location: "Уфа, озеро Банное", price: "от 700 ₽" }],
    2: [
      { type: "competition", name: "X-WATERS Yenisei", location: "Норильск", price: "от 1 000 ₽" },
      { type: "competition", name: "SWIMSTAR NIZHNY NOVGOROD", location: "Нижний Новгород", price: "от 1 500 ₽" },
      { type: "competition", name: "Swimcup Санкт-Петербург", location: "Санкт-Петербург", price: "от 700 ₽" },
      { type: "competition", name: "X-WATERS SAMARA", location: "Самара", price: "от 100 ₽" },
      { type: "competition", name: "X-WATERS SAMARA", location: "Самара", price: "от 700 ₽" },
    ],
    3: [
      { type: "camp", name: "Сборы в Грузии", location: "Тбилиси", price: "от 17 000 ₽", span: 2 },
      { type: "competition", name: "X-WATERS Kazakhstan", location: "Кокшетау", price: "от 2 500 ₸" },
    ],
    4: [{ type: "camp", name: "Сборы в Грузии", location: "Тбилиси", price: "от 17 000 ₽", continue: true }],
    9: [
      { type: "competition", name: "X-WATERS Arctic", location: "Мурманск, пос. Териберка", price: "от 500 ₽", span: 2 },
      { type: "competition", name: "X-WATERS Kazakhstan", location: "Кокшетау", price: "от 2 500 ₸", span: 2 },
      { type: "competition", name: "Swimcup Псков", location: "Псков, Псковский кром", price: "от 700 ₽", span: 2 },
    ],
    10: [
      { type: "competition", name: "X-WATERS Arctic", location: "Мурманск", price: "от 500 ₽", continue: true },
      { type: "competition", name: "X-WATERS Kazakhstan", location: "Кокшетау", price: "от 2 500 ₸", continue: true },
      { type: "competition", name: "Swimcup Псков", location: "Псков", price: "от 700 ₽", continue: true },
    ],
    15: [{ type: "camp", name: "X-WATERS (сборы)", location: "Нижний Новгород", price: "от 17 000 ₽", span: 3 }],
    16: [{ type: "camp", name: "X-WATERS (сборы)", location: "Нижний Новгород", price: "от 17 000 ₽", continue: true }],
    17: [{ type: "camp", name: "X-WATERS (сборы)", location: "Нижний Новгород", price: "от 17 000 ₽", continue: true }],
    23: [{ type: "competition", name: "Swimcup Пестовское", location: "Ставрополь", price: "от 600 ₽" }],
    24: [{ type: "competition", name: "X-WATERS SAMARA", location: "Самара", price: "от 700 ₽" }],
  };

  var DAY_LABELS = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

  var app = document.querySelector(".cal-app");
  var yearRoot = document.getElementById("cal-year");
  var monthRoot = document.getElementById("cal-month");
  var dayRoot = document.getElementById("cal-day");
  var toggle = document.querySelector(".cal-period-toggle");
  var pill = document.querySelector(".cal-period-toggle__pill");
  var views = Array.prototype.slice.call(document.querySelectorAll(".cal-view"));
  var currentView = "year";
  var animating = false;

  function highlightClass(monthId, day) {
    var map = HIGHLIGHTS[monthId];
    if (!map || !map[day]) return "";
    return "cal-cell--" + map[day];
  }

  function monthHighlightClass(day) {
    return highlightClass("august", day);
  }

  function renderMonthHeader(monthName) {
    return (
      '<div class="cal-month-head">' +
      '<div class="cal-month-head__title">' +
      '<span class="cal-month-head__name">' +
      monthName +
      "</span>" +
      '<img class="cal-month-head__wave" src="assets/calendar/wave.svg" alt="" />' +
      "</div>" +
      '<span class="cal-month-head__year">2025</span>' +
      "</div>"
    );
  }

  function renderWeekdayRow() {
    return (
      '<div class="cal-weekdays">' +
      WEEKDAYS.map(function (d) {
        return '<span class="cal-weekday">' + d + "</span>";
      }).join("") +
      "</div>"
    );
  }

  function renderYearGrid(month) {
    var highlights = HIGHLIGHTS[month.id] || {};
    var cells = [];
    var i;

    for (i = 0; i < month.start; i += 1) {
      cells.push('<div class="cal-cell cal-cell--empty"></div>');
    }

    for (i = 1; i <= month.days; i += 1) {
      var cls = "cal-cell";
      if (highlights[i]) cls += " cal-cell--" + highlights[i];
      cells.push('<div class="' + cls + '"><span class="cal-cell__num">' + i + "</span></div>");
    }

    return (
      '<section class="cal-year-block" data-month="' +
      month.id +
      '">' +
      renderMonthHeader(month.name) +
      renderWeekdayRow() +
      '<div class="cal-grid cal-grid--year">' +
      cells.join("") +
      "</div>" +
      "</section>"
    );
  }

  function renderEventChip(event, compact) {
    var icon =
      event.type === "camp"
        ? '<img src="assets/calendar/camp-icon.svg" width="12" height="12" alt="" />'
        : '<img src="assets/calendar/swimmer.svg" width="12" height="12" alt="" />';

    if (compact) {
      return (
        '<div class="cal-event-chip cal-event-chip--' +
        event.type +
        (event.continue ? " cal-event-chip--continue" : "") +
        '">' +
        '<p class="cal-event-chip__name">' +
        event.name +
        "</p>" +
        (event.location && !event.continue
          ? '<p class="cal-event-chip__meta">' + event.location + "</p>"
          : "") +
        (event.price && !event.continue ? '<p class="cal-event-chip__meta">' + event.price + "</p>" : "") +
        "</div>"
      );
    }

    return (
      '<div class="cal-event-bar cal-event-bar--' +
      event.type +
      (event.continue ? " cal-event-bar--continue" : "") +
      '">' +
      icon +
      '<div class="cal-event-bar__body">' +
      '<p class="cal-event-bar__name">' +
      event.name +
      "</p>" +
      '<p class="cal-event-bar__meta">' +
      '<img src="assets/calendar/pin.svg" width="10" height="10" alt="" />' +
      "<span>" +
      event.location +
      "</span>" +
      (event.price ? "<span>·</span><span>" + event.price + "</span>" : "") +
      "</p>" +
      "</div>" +
      "</div>"
    );
  }

  function renderMonthView() {
    var rows = [];
    var row = [];
    var day;
    var weekRowIndex = 0;

    for (var i = 0; i < 4; i += 1) {
      row.push('<div class="cal-cell cal-cell--empty"></div>');
    }

    for (day = 1; day <= 31; day += 1) {
      var events = EVENTS[day] || [];
      var cellClass = "cal-cell cal-cell--month " + monthHighlightClass(day);
      var eventHtml = events
        .filter(function (e) {
          return !e.continue;
        })
        .map(function (e) {
          return renderEventChip(e, true);
        })
        .join("");

      row.push(
        '<div class="' +
          cellClass +
          '" data-day="' +
          day +
          '"><span class="cal-cell__num">' +
          day +
          "</span>" +
          (eventHtml ? '<div class="cal-cell__events">' + eventHtml + "</div>" : "") +
          "</div>"
      );

      if (row.length === 7) {
        rows.push('<div class="cal-grid-row cal-grid-row--' + weekRowIndex + '">' + row.join("") + "</div>");
        row = [];
        weekRowIndex += 1;
      }
    }

    if (row.length) {
      while (row.length < 7) row.push('<div class="cal-cell cal-cell--empty cal-cell--muted"></div>');
      rows.push('<div class="cal-grid-row cal-grid-row--' + weekRowIndex + '">' + row.join("") + "</div>");
    }

    monthRoot.innerHTML =
      renderMonthHeader("Август") +
      renderWeekdayRow() +
      '<div class="cal-grid cal-grid--month">' +
      rows.join("") +
      "</div>";
  }

  function renderDayView() {
    var html = renderMonthHeader("Август");
    html += '<div class="cal-day-list">';

    for (var day = 3; day <= 17; day += 1) {
      var date = new Date(2025, 7, day);
      var dow = DAY_LABELS[date.getDay()];
      var events = EVENTS[day] || [];
      var bars = events
        .map(function (e) {
          return renderEventChip(e, false);
        })
        .join("");

      html +=
        '<div class="cal-day-row" data-day="' +
        day +
        '">' +
        '<div class="cal-day-row__date">' +
        '<span class="cal-day-row__num">' +
        day +
        "</span>" +
        '<span class="cal-day-row__dow">' +
        dow +
        "</span>" +
        "</div>" +
        '<div class="cal-day-row__events">' +
        (bars || '<div class="cal-day-row__empty"></div>') +
        "</div>" +
        "</div>";
    }

    html += "</div>";
    dayRoot.innerHTML = html;
  }

  function renderYearView() {
    yearRoot.innerHTML = MONTHS.map(renderYearGrid).join("");
  }

  function viewIndex(name) {
    return { year: 0, month: 1, day: 2 }[name];
  }

  function transitionName(from, to) {
    return from + "-to-" + to;
  }

  function movePill(name) {
    var index = viewIndex(name);
    pill.style.transform = "translateX(" + index * 100 + "%)";
    Array.prototype.forEach.call(toggle.querySelectorAll(".cal-period-toggle__btn"), function (btn) {
      var active = btn.dataset.view === name;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  function setActiveView(name) {
    views.forEach(function (view) {
      var active = view.dataset.view === name;
      view.classList.toggle("is-active", active);
      view.setAttribute("aria-hidden", active ? "false" : "true");
    });
    app.dataset.view = name;
    movePill(name);
    currentView = name;
  }

  function switchView(name) {
    if (animating || name === currentView) return;

    var from = currentView;
    var to = name;
    var fromEl = views.filter(function (view) {
      return view.dataset.view === from;
    })[0];
    var toEl = views.filter(function (view) {
      return view.dataset.view === to;
    })[0];

    animating = true;
    app.dataset.transition = transitionName(from, to);
    toEl.classList.add("is-entering");
    fromEl.classList.add("is-leaving");
    movePill(to);

    window.requestAnimationFrame(function () {
      toEl.classList.add("is-active");
      toEl.setAttribute("aria-hidden", "false");
      fromEl.classList.remove("is-active");
      fromEl.setAttribute("aria-hidden", "true");

      window.requestAnimationFrame(function () {
        toEl.classList.remove("is-entering");
        fromEl.classList.remove("is-leaving");
      });
    });

    window.setTimeout(function () {
      app.dataset.view = to;
      currentView = to;
      delete app.dataset.transition;
      animating = false;
    }, 480);
  }

  toggle.addEventListener("click", function (event) {
    var btn = event.target.closest(".cal-period-toggle__btn");
    if (!btn) return;
    switchView(btn.dataset.view);
  });

  renderYearView();
  renderMonthView();
  renderDayView();
  setActiveView("year");
})();
