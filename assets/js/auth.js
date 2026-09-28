// Shared SmartInvoice UI helpers.
window.SmartInvoice = window.SmartInvoice || {
    toast(message) {
        const toast = document.getElementById("toast");

        if (!toast) {
            return;
        }

        toast.textContent = message;
        toast.classList.add("show");

        window.clearTimeout(window.SmartInvoice._toastTimer);

        window.SmartInvoice._toastTimer = window.setTimeout(() => {
            toast.classList.remove("show");
        }, 2200);
    },

    toggleSidebar() {
        const sidebar = document.getElementById("sidebar");

        if (sidebar) {
            sidebar.classList.toggle("open");
        }
    },

    logout() {
        localStorage.removeItem("smartinvoice_user");
        localStorage.removeItem("smartinvoice_token");
        window.location.href = "login.html";
    },

    money(value) {
        return "৳" + Number(value || 0).toLocaleString("en-BD");
    }
};


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
        const previewUser = JSON.parse(
            localStorage.getItem("smartinvoice_preview_user") || "null"
        );

        if (previewUser && previewUser.email === email) {
            localStorage.setItem(
                "smartinvoice_user",
                JSON.stringify(previewUser)
            );

            SmartInvoice.toast("Preview login successful.");

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 500);

            return;
        }

        SmartInvoice.toast(
            "Login failed. Create an account first or check your details."
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
