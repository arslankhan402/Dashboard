const loginForm = document.querySelector("#loginForm");
const loginError = document.querySelector("#loginError");

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

if (loginForm) {
    loginForm.addEventListener("submit", event => {
        event.preventDefault();
        const emailInput = document.querySelector("#loginEmail");
        const passwordInput = document.querySelector("#loginPassword");
        const email = emailInput ? emailInput.value.trim() : "";
        const password = passwordInput ? passwordInput.value.trim() : "";
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const validPassword = password.length > 0;
        if (!validEmail || !validPassword) {
            loginError?.classList.add("visible");
            return;
        }
        loginError?.classList.remove("visible");
        setStoredSignIn(true);
        window.location.href = "dashboard.html";
    });

    ["input", "change"].forEach(evt => {
        loginForm.addEventListener(evt, () => {
            loginError?.classList.remove("visible");
        });
    });
}
