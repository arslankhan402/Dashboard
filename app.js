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
const navbarNotificationBtn = document.querySelector("#navbarNotificationBtn");
const notificationPanel = document.querySelector("#notificationPanel");
const notificationList = document.querySelector("#notificationList");
const notificationEmpty = document.querySelector("#notificationEmpty");
const notificationsAll = document.querySelector("#notificationsAll");
const notificationsAllEmpty = document.querySelector("#notificationsAllEmpty");
const profileForm = document.querySelector("#profileForm");
const profileStatus = document.querySelector("#profileStatus");
const profileNameInput = document.querySelector("#profileName");
const profileRoleInput = document.querySelector("#profileRole");
const profileImageInput = document.querySelector("#profileImage");
const profileNameDisplay = document.querySelector("#profileNameDisplay");
const profileRoleDisplay = document.querySelector("#profileRoleDisplay");
const profilePhoto = document.querySelector("#profilePhoto");
const hofFilters = document.querySelectorAll(".hof-filter");
const hofSpotlightCards = document.querySelectorAll(".hof-spotlight-card");
const hofTiles = document.querySelectorAll(".hof-tile");
const hofModal = document.querySelector("#hofModal");
const hofModalClose = document.querySelector("#hofModalClose");
const hofModalTitle = document.querySelector("#hofModalTitle");
const hofModalStory = document.querySelector("#hofModalStory");
const noticeModal = document.querySelector("#noticeModal");
const noticeModalClose = document.querySelector("#noticeModalClose");
const noticeModalTitle = document.querySelector("#noticeModalTitle");
const noticeModalDate = document.querySelector("#noticeModalDate");
const noticeModalTag = document.querySelector("#noticeModalTag");
const noticeModalBody = document.querySelector("#noticeModalBody");
const taskModal = document.querySelector("#taskModal");
const taskModalClose = document.querySelector("#taskModalClose");
const taskModalTitle = document.querySelector("#taskModalTitle");
const taskModalDate = document.querySelector("#taskModalDate");
const taskModalStatus = document.querySelector("#taskModalStatus");
const taskModalPriority = document.querySelector("#taskModalPriority");
const taskModalBody = document.querySelector("#taskModalBody");
const noteModal = document.querySelector("#noteModal");
const noteModalClose = document.querySelector("#noteModalClose");
const noteModalTitle = document.querySelector("#noteModalTitle");
const noteModalDate = document.querySelector("#noteModalDate");
const noteModalBody = document.querySelector("#noteModalBody");
const alertModal = document.querySelector("#alertModal");
const alertModalClose = document.querySelector("#alertModalClose");
const alertModalTitle = document.querySelector("#alertModalTitle");
const alertModalDate = document.querySelector("#alertModalDate");
const alertModalPriority = document.querySelector("#alertModalPriority");
const alertModalBody = document.querySelector("#alertModalBody");
const notificationModal = document.querySelector("#notificationModal");
const notificationModalClose = document.querySelector("#notificationModalClose");
const notificationModalTitle = document.querySelector("#notificationModalTitle");
const notificationModalDate = document.querySelector("#notificationModalDate");
const notificationModalType = document.querySelector("#notificationModalType");
const notificationModalBody = document.querySelector("#notificationModalBody");

const startWorkBtn = document.querySelector("#startWork");
const startBreakBtn = document.querySelector("#startBreak");
const endBreakBtn = document.querySelector("#endBreak");
const endWorkBtn = document.querySelector("#endWork");

const startTime = document.querySelector("#startTime");
const startBreakTime = document.querySelector("#startBreakTime");
const endBreakTime = document.querySelector("#endBreakTime");
const endWorkTime = document.querySelector("#endWorkTime");
const calendarEventsDate = document.querySelector("#calendarEventsDate");
const calendarEventsList = document.querySelector("#calendarEventsList");

const state = {
    workStarted: false,
    breakStarted: false,
    breakEnded: false,
    workEnded: false,
    calendarDate: new Date(),
    selectedCalendarDate: null,
    calendarEvents: {
        "2026-08-21": [
            { title: "Weekly stand-up", time: "9:30 AM", type: "meeting" },
            { title: "Focus block", time: "11:00 AM", type: "focus" },
            { title: "Submit KPI report", time: "4:00 PM", type: "deadline" }
        ],
        "2026-08-22": [
            { title: "Payroll review meeting", time: "2:00 PM", type: "meeting" }
        ],
        "2026-08-24": [
            { title: "Client roadmap review", time: "3:00 PM", type: "meeting" },
            { title: "Quarterly planning", time: "5:00 PM", type: "focus" }
        ]
    },
    notifications: [
        { id: 1, text: "New policy update shared by HR.", unread: true, time: "Today, 9:10 AM" },
        { id: 2, text: "Pending approval for leave request.", unread: true, time: "Today, 8:40 AM" },
        { id: 3, text: "Weekly attendance report is ready.", unread: false, time: "Yesterday, 6:15 PM" },
        { id: 4, text: "IT maintenance scheduled for Friday.", unread: false, time: "Aug 12, 11:00 AM" }
    ]
};

const PROFILE_STORAGE_KEY = "gp_profile";

function getStoredProfile() {
    try {
        const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
        if (!stored) return null;
        return JSON.parse(stored);
    } catch (error) {
        return null;
    }
}

function setStoredProfile(profile) {
    try {
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch (error) {
        // Ignore storage errors.
    }
}

function applyProfile(profile) {
    if (!profile) return;
    if (profileNameDisplay && profile.name) {
        profileNameDisplay.textContent = profile.name;
    }
    if (profileRoleDisplay && profile.role) {
        profileRoleDisplay.textContent = profile.role;
    }
    if (profilePhoto && profile.photo) {
        profilePhoto.src = profile.photo;
    }
    if (profileNameInput) {
        profileNameInput.value = profile.name || "";
    }
    if (profileRoleInput) {
        profileRoleInput.value = profile.role || "";
    }
}

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
        minute: "2-digit"
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
    const steps = [
        { card: document.querySelector(".work-start-card"), done: state.workStarted },
        { card: document.querySelector(".break-start-card"), done: state.breakStarted },
        { card: document.querySelector(".break-end-card"), done: state.breakEnded },
        { card: document.querySelector(".work-end-card"), done: state.workEnded }
    ];

    steps.forEach((step, index) => {
        if (!step.card) return;
        step.card.classList.remove("completed", "active", "pending");
        if (step.done) {
            step.card.classList.add("completed");
            return;
        }
        const previousComplete = steps.slice(0, index).every(prev => prev.done);
        if (previousComplete) {
            step.card.classList.add("active");
        } else {
            step.card.classList.add("pending");
        }
    });
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
        const dateKey = formatDateKey(new Date(year, month, day));
        if (state.selectedCalendarDate === dateKey) {
            cell.classList.add("selected");
        }
        cell.dataset.date = dateKey;
        cell.addEventListener("click", () => {
            state.selectedCalendarDate = dateKey;
            updateCalendarEvents();
            renderCalendar(state.calendarDate);
        });
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

function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function updateCalendarEvents() {
    if (!calendarEventsDate || !calendarEventsList) return;
    if (!state.selectedCalendarDate) {
        calendarEventsDate.textContent = "Select a date";
        return;
    }
    const selectedDate = state.selectedCalendarDate;
    calendarEventsDate.textContent = selectedDate;
    const events = state.calendarEvents[selectedDate] || [];
    if (!events.length) {
        calendarEventsList.innerHTML = "<p class=\"calendar-empty\">No events scheduled.</p>";
        return;
    }
    calendarEventsList.innerHTML = events.map(event => (
        `<article class="event-card">
            <div class="event-dot ${event.type}"></div>
            <div>
                <h3>${event.title}</h3>
                <p>${event.time} · ${capitalize(event.type)}</p>
            </div>
        </article>`
    )).join("");
}

function capitalize(text) {
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
}

function setActivePage(targetPage) {
    pages.forEach(page => {
        page.classList.toggle("active", page.dataset.page === targetPage);
    });
    navItems.forEach(item => {
        item.classList.toggle("active", item.dataset.page === targetPage);
    });
}

function hasUnreadNotifications() {
    return state.notifications.some(item => item.unread);
}

function renderNotifications() {
    if (!notificationList || !notificationEmpty) return;
    const unread = state.notifications.filter(item => item.unread);
    notificationList.innerHTML = "";
    if (unread.length === 0) {
        notificationEmpty.hidden = false;
        return;
    }
    notificationEmpty.hidden = true;
    unread.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.text;
        notificationList.appendChild(li);
    });
}

function renderAllNotifications() {
    if (!notificationsAll || !notificationsAllEmpty) return;
    notificationsAll.innerHTML = "";
    if (state.notifications.length === 0) {
        notificationsAllEmpty.hidden = false;
        return;
    }
    notificationsAllEmpty.hidden = true;
    state.notifications.forEach(item => {
        const li = document.createElement("li");
        const label = document.createElement("span");
        const meta = document.createElement("span");
        label.textContent = item.text;
        meta.textContent = item.unread ? "Unread" : "Read";
        meta.className = "tag";
        li.appendChild(label);
        li.appendChild(meta);
        notificationsAll.appendChild(li);
    });
}

function updateNotificationDots() {
    const showDot = hasUnreadNotifications();
    document.querySelectorAll(".notification-dot").forEach(dot => {
        dot.classList.toggle("visible", showDot);
    });
}

if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
        const isHidden = document.body.classList.toggle("sidebar-hidden");
        if (window.innerWidth <= 900) {
            sidebar.classList.toggle("open", !isHidden);
        }
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
        if (targetPage === "notifications") {
            renderAllNotifications();
        }
        if (targetPage === "profile") {
            applyProfile(getStoredProfile());
        }
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

if (navbarNotificationBtn && notificationPanel) {
    navbarNotificationBtn.addEventListener("click", event => {
        event.stopPropagation();
        renderNotifications();
        notificationPanel.classList.toggle("open");
    });
}

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
    if (notificationPanel && !notificationPanel.contains(event.target) && !navbarNotificationBtn?.contains(event.target)) {
        notificationPanel.classList.remove("open");
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
        startWorkBtn.classList.remove("hover-disabled");
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
    updateCalendarEvents();
}
if (!getStoredSignIn()) {
    window.location.href = "index.html";
} else {
    setActivePage("dashboard");
}
renderNotifications();
updateNotificationDots();
renderAllNotifications();
applyProfile(getStoredProfile());

function openHofModal(title, story) {
    if (!hofModal || !hofModalTitle || !hofModalStory) return;
    hofModalTitle.textContent = title;
    hofModalStory.textContent = story;
    hofModal.hidden = false;
    hofModal.classList.add("show");
}

function closeHofModal() {
    if (!hofModal) return;
    hofModal.classList.remove("show");
    hofModal.hidden = true;
}

function openNoticeModal(card) {
    if (!noticeModal || !card) return;
    const title = card.dataset.title || "Notice";
    const date = card.dataset.date || "";
    const tag = card.dataset.tag || "Notice";
    const content = card.dataset.content || "";
    noticeModalTitle.textContent = title;
    noticeModalDate.textContent = date;
    noticeModalTag.textContent = tag;
    noticeModalBody.textContent = content;
    noticeModal.hidden = false;
    noticeModal.classList.add("show");
}

function closeNoticeModal() {
    if (!noticeModal) return;
    noticeModal.classList.remove("show");
    noticeModal.hidden = true;
}

function openTaskModal(card) {
    if (!taskModal || !card) return;
    const title = card.dataset.title || "Task";
    const date = card.dataset.date || "";
    const status = card.dataset.status || "Task";
    const priority = card.dataset.priority || "Medium";
    const description = card.dataset.description || "";
    taskModalTitle.textContent = title;
    taskModalDate.textContent = date;
    taskModalStatus.textContent = status;
    taskModalBody.textContent = description;
    taskModalPriority.textContent = priority;
    taskModalPriority.className = `priority-tag ${priority.toLowerCase()}`;
    taskModal.hidden = false;
    taskModal.classList.add("show");
}

function closeTaskModal() {
    if (!taskModal) return;
    taskModal.classList.remove("show");
    taskModal.hidden = true;
}

function openNoteModal(card) {
    if (!noteModal || !card) return;
    const title = card.dataset.title || "Note";
    const date = card.dataset.date || "";
    const content = card.dataset.content || "";
    noteModalTitle.textContent = title;
    noteModalDate.textContent = date;
    noteModalBody.textContent = content;
    noteModal.hidden = false;
    noteModal.classList.add("show");
}

function closeNoteModal() {
    if (!noteModal) return;
    noteModal.classList.remove("show");
    noteModal.hidden = true;
}

function openAlertModal(card) {
    if (!alertModal || !card) return;
    const title = card.dataset.title || "Alert";
    const date = card.dataset.date || "";
    const priority = card.dataset.priority || "Alert";
    const description = card.dataset.description || "";
    alertModalTitle.textContent = title;
    alertModalDate.textContent = date;
    alertModalPriority.textContent = priority;
    alertModalBody.textContent = description;
    alertModal.hidden = false;
    alertModal.classList.add("show");
}

function closeAlertModal() {
    if (!alertModal) return;
    alertModal.classList.remove("show");
    alertModal.hidden = true;
}

function openNotificationModal(card) {
    if (!notificationModal || !card) return;
    const title = card.dataset.title || "Notification";
    const date = card.dataset.date || "";
    const type = card.dataset.type || "Info";
    const description = card.dataset.description || "";
    notificationModalTitle.textContent = title;
    notificationModalDate.textContent = date;
    notificationModalType.textContent = type;
    notificationModalBody.textContent = description;
    notificationModal.hidden = false;
    notificationModal.classList.add("show");
}

function closeNotificationModal() {
    if (!notificationModal) return;
    notificationModal.classList.remove("show");
    notificationModal.hidden = true;
}

hofFilters.forEach(filter => {
    filter.addEventListener("click", () => {
        hofFilters.forEach(btn => btn.classList.remove("active"));
        filter.classList.add("active");
        const key = filter.dataset.filter;
        const allCards = [...hofSpotlightCards, ...hofTiles];
        allCards.forEach(card => {
            if (key === "all") {
                card.style.display = "";
                return;
            }
            const category = card.dataset.category;
            card.style.display = category === key ? "" : "none";
        });
    });
});

[...hofSpotlightCards, ...hofTiles].forEach(card => {
    card.addEventListener("click", () => {
        const name = card.querySelector("h3, strong");
        const story = card.dataset.story || "Achievement details are being updated.";
        openHofModal(name ? name.textContent : "Achievement Story", story);
    });
});

if (hofModalClose) {
    hofModalClose.addEventListener("click", closeHofModal);
}

if (hofModal) {
    hofModal.addEventListener("click", event => {
        if (event.target === hofModal) {
            closeHofModal();
        }
    });
}

if (noticeModalClose) {
    noticeModalClose.addEventListener("click", closeNoticeModal);
}

if (noticeModal) {
    noticeModal.addEventListener("click", event => {
        if (event.target === noticeModal) {
            closeNoticeModal();
        }
    });
}

document.querySelectorAll(".notice-card, .notice-banner").forEach(card => {
    card.addEventListener("click", () => openNoticeModal(card));
});

if (taskModalClose) {
    taskModalClose.addEventListener("click", closeTaskModal);
}

if (taskModal) {
    taskModal.addEventListener("click", event => {
        if (event.target === taskModal) {
            closeTaskModal();
        }
    });
}

document.querySelectorAll(".task-item").forEach(card => {
    card.addEventListener("click", () => openTaskModal(card));
});

document.querySelectorAll(".task-filter").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".task-filter").forEach(item => item.classList.remove("active"));
        button.classList.add("active");
        const filter = button.dataset.filter;
        document.querySelectorAll(".task-item").forEach(card => {
            const matches = filter === "all" || card.dataset.filter === filter;
            card.hidden = !matches;
        });
    });
});

if (noteModalClose) {
    noteModalClose.addEventListener("click", closeNoteModal);
}

if (noteModal) {
    noteModal.addEventListener("click", event => {
        if (event.target === noteModal) {
            closeNoteModal();
        }
    });
}

document.querySelectorAll(".note-card").forEach(card => {
    card.addEventListener("click", () => openNoteModal(card));
});

if (alertModalClose) {
    alertModalClose.addEventListener("click", closeAlertModal);
}

if (alertModal) {
    alertModal.addEventListener("click", event => {
        if (event.target === alertModal) {
            closeAlertModal();
        }
    });
}

document.querySelectorAll(".alert-card").forEach(card => {
    card.addEventListener("click", () => openAlertModal(card));
});

document.querySelectorAll(".calendar-day-mini").forEach(day => {
    day.addEventListener("click", () => {
        const date = day.dataset.date;
        document.querySelectorAll(".calendar-day-mini").forEach(btn => btn.classList.remove("active"));
        day.classList.add("active");
        document.querySelectorAll(".reminder-filter").forEach(btn => btn.classList.remove("active"));
        document.querySelectorAll(".reminder-card").forEach(card => {
            card.hidden = card.dataset.date !== date;
        });
    });
});

document.querySelectorAll(".reminder-filter").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".reminder-filter").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        document.querySelectorAll(".calendar-day-mini").forEach(btn => btn.classList.remove("active"));
        document.querySelectorAll(".reminder-card").forEach(card => {
            card.hidden = false;
        });
    });
});

if (notificationModalClose) {
    notificationModalClose.addEventListener("click", closeNotificationModal);
}

if (notificationModal) {
    notificationModal.addEventListener("click", event => {
        if (event.target === notificationModal) {
            closeNotificationModal();
        }
    });
}

document.querySelectorAll(".notification-tab").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".notification-tab").forEach(item => item.classList.remove("active"));
        button.classList.add("active");
        const filter = button.dataset.filter;
        document.querySelectorAll(".notification-card").forEach(card => {
            if (filter === "unread") {
                card.hidden = !card.classList.contains("unread");
                return;
            }
            if (filter === "read") {
                card.hidden = !card.classList.contains("read");
                return;
            }
            if (filter === "priority") {
                card.hidden = !card.classList.contains("priority");
                return;
            }
            if (filter === "pinned") {
                card.hidden = !card.classList.contains("pinned");
                return;
            }
            card.hidden = false;
        });
    });
});

const notificationSearch = document.querySelector("#notificationSearch");
if (notificationSearch) {
    notificationSearch.addEventListener("input", () => {
        const query = notificationSearch.value.trim().toLowerCase();
        document.querySelectorAll(".notification-card").forEach(card => {
            const text = `${card.dataset.title || ""} ${card.dataset.description || ""}`.toLowerCase();
            card.hidden = !text.includes(query);
        });
    });
}

document.querySelectorAll(".notification-card").forEach(card => {
    card.addEventListener("click", event => {
        if (event.target.closest(".notification-btn")) return;
        openNotificationModal(card);
        card.classList.remove("unread");
        card.classList.add("read");
        const dot = card.querySelector(".notification-unread-dot");
        if (dot) dot.remove();
    });
});

document.querySelectorAll(".notification-btn").forEach(button => {
    button.addEventListener("click", event => {
        event.stopPropagation();
        const card = button.closest(".notification-card");
        if (!card) return;
        if (button.textContent.includes("Dismiss")) {
            card.remove();
            return;
        }
        if (button.textContent.includes("Mark as Read")) {
            card.classList.remove("unread");
            card.classList.add("read");
            const dot = card.querySelector(".notification-unread-dot");
            if (dot) dot.remove();
        }
        if (button.textContent.includes("View Details")) {
            openNotificationModal(card);
        }
    });
});

document.querySelectorAll(".mark-all-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".notification-card").forEach(item => {
            item.classList.remove("unread");
            item.classList.add("read");
            const unreadDot = item.querySelector(".notification-unread-dot");
            if (unreadDot) unreadDot.remove();
        });
    });
});

if (profileForm) {
    profileForm.addEventListener("submit", event => {
        event.preventDefault();
        const profile = {
            name: profileNameInput ? profileNameInput.value.trim() : "",
            role: profileRoleInput ? profileRoleInput.value.trim() : "",
            photo: profilePhoto ? profilePhoto.src : ""
        };

        if (profileImageInput && profileImageInput.files && profileImageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                profile.photo = reader.result;
                setStoredProfile(profile);
                applyProfile(profile);
                if (profileStatus) {
                    profileStatus.hidden = false;
                }
            };
            reader.readAsDataURL(profileImageInput.files[0]);
        } else {
            setStoredProfile(profile);
            applyProfile(profile);
            if (profileStatus) {
                profileStatus.hidden = false;
            }
        }
    });
}
