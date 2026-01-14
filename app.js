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
    calendarDate: new Date(),
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
renderNotifications();
updateNotificationDots();
renderAllNotifications();
applyProfile(getStoredProfile());

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
