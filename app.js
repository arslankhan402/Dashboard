const logoutBtn = document.querySelector("#logoutBtn");

const sidebarToggle = document.querySelector("#sidebarToggle");
const sidebar = document.querySelector("#sidebar");
const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");
const calendarTitle = document.querySelector("#calendarTitle");
const calendarGrid = document.querySelector("#calendarGrid");
const prevMonthBtn = document.querySelector("#prevMonth");
const nextMonthBtn = document.querySelector("#nextMonth");
const profileTrigger = document.querySelector("#profileTrigger");
const profileDropdown = document.querySelector("#profileDropdown");
const todayDate = document.querySelector("#todayDate");
const iconMenus = document.querySelectorAll(".icon-menu");
const iconMenuTriggers = document.querySelectorAll("[data-menu-target]");

const startWorkBtn = document.querySelector("#startWork");
const startBreakBtn = document.querySelector("#startBreak");
const endBreakBtn = document.querySelector("#endBreak");
const endWorkBtn = document.querySelector("#endWork");

const startTime = document.querySelector("#startTime");
const startBreakTime = document.querySelector("#startBreakTime");
const endBreakTime = document.querySelector("#endBreakTime");
const endWorkTime = document.querySelector("#endWorkTime");

const state = {
    workStarted: false,
    breakStarted: false,
    breakEnded: false,
    workEnded: false,
    calendarDate: new Date()
};

function getStoredSignIn() {
    try {
        return localStorage.getItem("gp_signed_in") === "true";
    } catch (error) {
        return false;
    }
}

function setStoredSignIn(value) {
    try {
        if (value) {
            localStorage.setItem("gp_signed_in", "true");
        } else {
            localStorage.removeItem("gp_signed_in");
        }
    } catch (error) {
        // Ignore storage errors in restricted contexts.
    }
}

function formatTime(date) {
    return date.toLocaleString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        month: "short",
        day: "numeric"
    });
}

function formatToday(date) {
    return date.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

function updateButtons() {
    startWorkBtn.disabled = state.workStarted;
    startBreakBtn.disabled = !state.workStarted || state.breakStarted || state.workEnded;
    endBreakBtn.disabled = !state.breakStarted || state.breakEnded;
    endWorkBtn.disabled = !state.workStarted || state.workEnded || !state.breakEnded && state.breakStarted;
}

function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayIndex = firstDay.getDay();
    const totalDays = lastDay.getDate();
    const today = new Date();

    const monthLabel = date.toLocaleString(undefined, { month: "long", year: "numeric" });
    calendarTitle.textContent = monthLabel;
    calendarGrid.innerHTML = "";

    const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    weekdayLabels.forEach(day => {
        const cell = document.createElement("div");
        cell.className = "calendar-day";
        cell.textContent = day;
        calendarGrid.appendChild(cell);
    });

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayIndex; i > 0; i -= 1) {
        const cell = document.createElement("div");
        cell.className = "calendar-cell muted";
        cell.textContent = prevMonthLastDay - i + 1;
        calendarGrid.appendChild(cell);
    }

    for (let day = 1; day <= totalDays; day += 1) {
        const cell = document.createElement("div");
        cell.className = "calendar-cell";
        cell.textContent = day;
        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            cell.classList.add("today");
        }
        calendarGrid.appendChild(cell);
    }

    const totalCells = weekdayLabels.length + startDayIndex + totalDays;
    const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 1; i <= remaining; i += 1) {
        const cell = document.createElement("div");
        cell.className = "calendar-cell muted";
        cell.textContent = i;
        calendarGrid.appendChild(cell);
    }
}

function setActivePage(targetPage) {
    pages.forEach(page => {
        page.classList.toggle("active", page.dataset.page === targetPage);
    });
    navItems.forEach(item => {
        item.classList.toggle("active", item.dataset.page === targetPage);
    });
}

if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
            sidebar.classList.toggle("open");
            return;
        }
        document.body.classList.toggle("sidebar-hidden");
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        setStoredSignIn(false);
        window.location.href = "index.html";
    });
}

navItems.forEach(item => {
    item.addEventListener("click", event => {
        event.preventDefault();
        const action = item.dataset.action;
        if (action === "logout") {
            setStoredSignIn(false);
            window.location.href = "index.html";
            return;
        }
        const targetPage = item.dataset.page;
        if (!targetPage) {
            return;
        }
        setActivePage(targetPage);
        if (window.innerWidth <= 900 && sidebar) {
            sidebar.classList.remove("open");
        }
    });
});

iconMenuTriggers.forEach(trigger => {
    trigger.addEventListener("click", event => {
        event.stopPropagation();
        const targetId = trigger.getAttribute("data-menu-target");
        const menu = targetId ? document.getElementById(targetId) : null;
        iconMenus.forEach(wrapper => {
            const dropdown = wrapper.querySelector(".icon-dropdown");
            if (dropdown && dropdown !== menu) {
                dropdown.classList.remove("open");
            }
        });
        if (menu) {
            menu.classList.toggle("open");
        }
    });
});

if (prevMonthBtn && nextMonthBtn) {
    prevMonthBtn.addEventListener("click", () => {
        state.calendarDate = new Date(state.calendarDate.getFullYear(), state.calendarDate.getMonth() - 1, 1);
        renderCalendar(state.calendarDate);
    });

    nextMonthBtn.addEventListener("click", () => {
        state.calendarDate = new Date(state.calendarDate.getFullYear(), state.calendarDate.getMonth() + 1, 1);
        renderCalendar(state.calendarDate);
    });
}

if (profileTrigger && profileDropdown) {
    profileTrigger.addEventListener("click", () => {
        const isOpen = profileDropdown.classList.toggle("open");
        profileTrigger.setAttribute("aria-expanded", String(isOpen));
    });
}

document.addEventListener("click", event => {
    if (iconMenus.length > 0) {
        iconMenus.forEach(wrapper => {
            if (!wrapper.contains(event.target)) {
                const dropdown = wrapper.querySelector(".icon-dropdown");
                dropdown?.classList.remove("open");
            }
        });
    }
    if (!profileDropdown || !profileTrigger) return;
    if (!profileDropdown.contains(event.target) && !profileTrigger.contains(event.target)) {
        profileDropdown.classList.remove("open");
        profileTrigger.setAttribute("aria-expanded", "false");
    }
});

if (startWorkBtn) {
    startWorkBtn.addEventListener("click", () => {
        if (state.workStarted) return;
        state.workStarted = true;
        startTime.textContent = formatTime(new Date());
        updateButtons();
    });
}

if (startBreakBtn) {
    startBreakBtn.addEventListener("click", () => {
        if (!state.workStarted || state.breakStarted || state.workEnded) return;
        state.breakStarted = true;
        startBreakTime.textContent = formatTime(new Date());
        updateButtons();
    });
}

if (endBreakBtn) {
    endBreakBtn.addEventListener("click", () => {
        if (!state.breakStarted || state.breakEnded) return;
        state.breakEnded = true;
        endBreakTime.textContent = formatTime(new Date());
        updateButtons();
    });
}

if (endWorkBtn) {
    endWorkBtn.addEventListener("click", () => {
        if (!state.workStarted || state.workEnded) return;
        state.workEnded = true;
        endWorkTime.textContent = formatTime(new Date());
        updateButtons();
    });
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        sidebar.classList.remove("open");
    }
});

updateButtons();
if (calendarGrid) {
    renderCalendar(state.calendarDate);
}
if (!getStoredSignIn()) {
    window.location.href = "index.html";
} else {
    setActivePage("dashboard");
    if (todayDate) {
        todayDate.textContent = formatToday(new Date());
    }
}
