
function renderTable(rows) {
    return rows.map(row => `
        <tr>
            ${row.map(cell => `<td>${cell}</td>`).join("")}
        </tr>
    `).join("");
}

function statusBadge(status) {
    return `<span class="status ${status.toLowerCase()}">${status}</span>`;
}

function invoiceRows() {
    const rows = [
        ["INV-1008", "Rahim Traders", "25 Sep 2026", SmartInvoice.money(18000), statusBadge("Paid")],
        ["INV-1007", "ABC Solutions", "22 Sep 2026", SmartInvoice.money(32500), statusBadge("Pending")],
        ["INV-1006", "Maya Fashion", "18 Sep 2026", SmartInvoice.money(12500), statusBadge("Overdue")],
        ["INV-1005", "Nexus Studio", "15 Sep 2026", SmartInvoice.money(24000), statusBadge("Paid")]
    ];

    return renderTable(rows);
}

function setActiveNav(button) {
    document.querySelectorAll(".nav button").forEach(item => {
        item.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }
}

function initPage() {
    const path = window.location.pathname.toLowerCase();
    const page = path.split("/").pop();

    const pageMap = {
        "dashboard.html": "dashboard",
        "clients.html": "clients",
        "invoices.html": "invoices",
        "payments.html": "payments",
        "expenses.html": "expenses",
        "income.html": "income",
        "reports.html": "reports",
        "settings.html": "settings"
    };

    const current = pageMap[page];

    if (current) {
        const navButton = document.querySelector(
            `[data-page="${current}"]`
        );

        setActiveNav(navButton);
    }
}

document.addEventListener("DOMContentLoaded", initPage);
