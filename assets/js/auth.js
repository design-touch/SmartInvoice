
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener("submit", handleRegister);
    }
});

async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        SmartInvoice.toast("Email and password are required.");
        return;
    }

    try {
        const result = await apiPost("login", {
            email,
            password
        });

        if (!result.success) {
            SmartInvoice.toast(result.message || "Login failed.");
            return;
        }

        localStorage.setItem(
            "smartinvoice_user",
            JSON.stringify(result.user)
        );

        localStorage.setItem(
            "smartinvoice_token",
            result.token || ""
        );

        window.location.href = "dashboard.html";
    } catch (error) {
        SmartInvoice.toast(
            "Preview mode: backend connection is not available."
        );
    }
}

async function handleRegister(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const businessName =
        document.getElementById("businessName").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
        SmartInvoice.toast("Name, email and password are required.");
        return;
    }

    try {
        const result = await apiPost("register", {
            data: {
                name,
                email,
                businessName,
                password
            }
        });

        if (!result.success) {
            SmartInvoice.toast(
                result.message || "Registration failed."
            );
            return;
        }

        SmartInvoice.toast("Account created successfully.");

        setTimeout(() => {
            window.location.href = "login.html";
        }, 800);
    } catch (error) {
        localStorage.setItem(
            "smartinvoice_preview_user",
            JSON.stringify({
                name,
                email,
                businessName
            })
        );

        SmartInvoice.toast(
            "Preview account created successfully."
        );

        setTimeout(() => {
            window.location.href = "login.html";
        }, 800);
    }
}
