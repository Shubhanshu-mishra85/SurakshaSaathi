/* =========================================
   VARUMIZU SECURITY ENGINE
========================================= */


/* =========================================
   MESSAGE SCANNER
========================================= */

function checkMessage() {

    let message = prompt(
        "Enter the suspicious message:"
    );

    if (
        message === null ||
        message.trim() === ""
    ) {
        return;
    }

    message = message.toLowerCase();

    let score = 0;
    let reasons = [];


    if (message.includes("otp")) {
        score += 2;
        reasons.push("OTP request detected");
    }

    if (message.includes("password")) {
        score += 2;
        reasons.push("Password request detected");
    }

    if (message.includes("pin")) {
        score += 2;
        reasons.push("PIN request detected");
    }

    if (message.includes("urgent")) {
        score += 2;
        reasons.push("Urgent language detected");
    }

    if (message.includes("account blocked")) {
        score += 3;
        reasons.push("Account blocking threat detected");
    }

    if (message.includes("click")) {
        score += 2;
        reasons.push("Click request detected");
    }

    if (message.includes("verify")) {
        score += 1;
        reasons.push("Verification request detected");
    }

    if (message.includes("prize")) {
        score += 2;
        reasons.push("Prize claim detected");
    }

    if (message.includes("winner")) {
        score += 2;
        reasons.push("Winner claim detected");
    }

    if (message.includes("payment")) {
        score += 2;
        reasons.push("Payment request detected");
    }

    if (message.includes("kyc")) {
        score += 2;
        reasons.push("KYC request detected");
    }

    if (message.includes("bank")) {
        score += 1;
        reasons.push("Bank-related request detected");
    }

    if (message.includes("lottery")) {
        score += 3;
        reasons.push("Lottery claim detected");
    }


    showResult(
        Math.min(score, 10),
        reasons,
        "MESSAGE"
    );
}


/* =========================================
   LINK SCANNER
========================================= */

function checkLink() {

    let link = prompt(
        "Enter the suspicious link:"
    );

    if (
        link === null ||
        link.trim() === ""
    ) {
        return;
    }

    link = link.trim().toLowerCase();

    let score = 0;
    let reasons = [];


    if (link.startsWith("http://")) {

        score += 2;

        reasons.push(
            "Insecure HTTP connection detected"
        );
    }


    let ipPattern =
        /https?:\/\/\d+\.\d+\.\d+\.\d+/;


    if (ipPattern.test(link)) {

        score += 3;

        reasons.push(
            "IP address used instead of normal domain"
        );
    }


    if (link.includes("login")) {

        score += 1;

        reasons.push(
            "Login-related URL detected"
        );
    }


    if (link.includes("verify")) {

        score += 1;

        reasons.push(
            "Verification-related URL detected"
        );
    }


    if (link.includes("urgent")) {

        score += 2;

        reasons.push(
            "Urgent language detected"
        );
    }


    if (link.includes("prize")) {

        score += 2;

        reasons.push(
            "Prize-related URL detected"
        );
    }


    if (
        link.includes("bit.ly") ||
        link.includes("tinyurl.com") ||
        link.includes("t.co") ||
        link.includes("goo.gl")
    ) {

        score += 2;

        reasons.push(
            "Shortened URL detected"
        );
    }


    showResult(
        Math.min(score, 10),
        reasons,
        "LINK"
    );
}


/* =========================================
   GENERAL RESULT
========================================= */

function showResult(
    score,
    reasons,
    type
) {

    let result =
        document.getElementById("result");


    if (score >= 5) {

        result.innerHTML = `

            <h3>🔴 POTENTIAL SCAM</h3>

            <p>
                <strong>${type} RISK SCORE:</strong>
                ${score}/10
            </p>

            <hr>

            <p>
                <strong>WARNING SIGNS:</strong>
            </p>

            <p>
                ${
                    reasons.length
                    ? reasons.join("<br>")
                    : "Suspicious pattern detected"
                }
            </p>

            <hr>

            <p>
                <strong>SAFETY ADVICE:</strong>
            </p>

            <p>
                Do not share OTP, PIN or password.
                Do not click unknown links.
                Verify through an official source.
            </p>
        `;

    } else if (score >= 2) {

        result.innerHTML = `

            <h3>🟡 CAUTION</h3>

            <p>
                <strong>${type} RISK SCORE:</strong>
                ${score}/10
            </p>

            <hr>

            <p>
                ${reasons.join("<br>")}
            </p>

            <hr>

            <p>
                Verify the information before taking action.
            </p>
        `;

    } else {

        result.innerHTML = `

            <h3>🟢 NO MAJOR WARNING SIGNAL</h3>

            <p>
                <strong>${type} RISK SCORE:</strong>
                ${score}/10
            </p>

            <hr>

            <p>
                No major suspicious pattern was detected.
            </p>

            <p>
                Always verify important requests
                through official channels.
            </p>
        `;
    }
}


/* =========================================
   GMAIL SECURITY
========================================= */

function openGmailSecurity() {

    document
        .getElementById("gmailPanel")
        .classList.add("active");

    document
        .getElementById("footprintPanel")
        .classList.remove("active");

    document
        .getElementById("gmailInput")
        .focus();
}


/* =========================================
   GMAIL SCANNER
========================================= */

function scanGmail() {

    const input =
        document.getElementById("gmailInput");

    const output =
        document.getElementById("gmailResult");

    const email =
        input.value.trim().toLowerCase();


    if (email === "") {

        output.innerHTML = `
            <div class="warningBox">
                ⚠️ Please enter your email address.
            </div>
        `;

        return;
    }


    const gmailPattern =
        /^[^\s@]+@gmail\.com$/;


    if (!gmailPattern.test(email)) {

        output.innerHTML = `
            <div class="warningBox">
                ⚠️ Please enter a valid Gmail address.
            </div>
        `;

        return;
    }


    const masked =
        maskEmail(email);


    output.innerHTML = `

        <div class="gmailScan">

            <div class="scanTitle">
                ANALYZING SECURITY STATUS...
            </div>

            <div class="scanLine">
                ████████████████████
            </div>

            <p>
                Email:
                <strong>${masked}</strong>
            </p>

            <p>
                🔐 Password:
                <span class="safeText">
                    NOT REQUESTED
                </span>
            </p>

            <p>
                🔑 OTP:
                <span class="safeText">
                    NOT REQUESTED
                </span>
            </p>

            <hr>

            <h3>
                🛡️ SECURITY CHECKLIST
            </h3>

            <div class="checkItem">
                ✓ Use a unique password
            </div>

            <div class="checkItem">
                ✓ Enable 2-Step Verification
            </div>

            <div class="checkItem">
                ✓ Review unknown devices
            </div>

            <div class="checkItem">
                ✓ Check recovery email/phone
            </div>

            <div class="checkItem">
                ✓ Review suspicious activity
            </div>

            <hr>

            <p class="smallNote">
                VARUMIZU cannot confirm whether this
                Gmail account has been breached using
                the email address alone.
            </p>

        </div>
    `;
}


/* =========================================
   EMAIL MASK
========================================= */

function maskEmail(email) {

    const parts =
        email.split("@");

    const name =
        parts[0];

    const domain =
        parts[1];


    if (name.length <= 2) {

        return (
            name[0] +
            "*".repeat(name.length - 1) +
            "@" +
            domain
        );
    }


    return (
        name.substring(0, 2) +
        "*".repeat(
            Math.max(2, name.length - 2)
        ) +
        "@" +
        domain
    );
}


/* =========================================
   DIGITAL FOOTPRINT
========================================= */

function openDigitalFootprint() {

    document
        .getElementById("footprintPanel")
        .classList.add("active");

    document
        .getElementById("gmailPanel")
        .classList.remove("active");

    loadServices();
}


/* =========================================
   ADD SERVICE
========================================= */

function addService() {

    const input =
        document.getElementById("serviceInput");

    const service =
        input.value.trim();


    if (service === "") {
        return;
    }


    let services =
        JSON.parse(
            localStorage.getItem(
                "varumizuServices"
            )
        ) || [];


    if (
        !services.includes(service)
    ) {

        services.push(service);

        localStorage.setItem(
            "varumizuServices",
            JSON.stringify(services)
        );
    }


    input.value = "";

    loadServices();
}


/* =========================================
   LOAD SERVICES
========================================= */

function loadServices() {

    const list =
        document.getElementById(
            "serviceList"
        );


    let services =
        JSON.parse(
            localStorage.getItem(
                "varumizuServices"
            )
        ) || [];


    if (services.length === 0) {

        list.innerHTML = `

            <div class="emptyFootprint">
                No services added yet.
                <br><br>
                Add the websites where you
                use your email.
            </div>
        `;

        return;
    }


    list.innerHTML = `

        <div class="footprintHeader">

            <span>
                YOUR SERVICES
            </span>

            <span>
                ${services.length}
            </span>

        </div>

    `;


    services.forEach(
        function(service, index) {

            list.innerHTML += `

                <div class="serviceItem">

                    <span>
                        🟢 ${escapeHTML(service)}
                    </span>

                    <button
                        class="deleteButton"
                        onclick="removeService(${index})"
                    >
                        ×
                    </button>

                </div>

            `;
        }
    );
}


/* =========================================
   REMOVE SERVICE
========================================= */

function removeService(index) {

    let services =
        JSON.parse(
            localStorage.getItem(
                "varumizuServices"
            )
        ) || [];


    services.splice(index, 1);


    localStorage.setItem(
        "varumizuServices",
        JSON.stringify(services)
    );


    loadServices();
}


/* =========================================
   HTML SECURITY
========================================= */

function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================
   SAFETY CENTER
========================================= */

function showTips() {

    document
        .getElementById("gmailPanel")
        .classList.remove("active");

    document
        .getElementById("footprintPanel")
        .classList.remove("active");


    document
        .getElementById("result")
        .innerHTML = `

        <h3>
            🛡️ DIGITAL SAFETY PROTOCOL
        </h3>

        <p>🔐 Never share OTP or PIN.</p>

        <p>🔑 Never share passwords.</p>

        <p>🔗 Don't open unknown links.</p>

        <p>📧 Review unknown account activity.</p>

        <p>📱 Keep 2-Step Verification enabled.</p>

        <p>🏦 Use official banking applications.</p>

        <p>🎁 Be careful with unexpected prizes.</p>

        <p>👨‍👩‍👧 Ask a trusted person when unsure.</p>

    `;
}


/* =========================================
   EMERGENCY GUIDE
========================================= */

function emergencyGuide() {

    document
        .getElementById("gmailPanel")
        .classList.remove("active");

    document
        .getElementById("footprintPanel")
        .classList.remove("active");


    document
        .getElementById("result")
        .innerHTML = `

        <h3>
            🚨 ACCOUNT EMERGENCY GUIDE
        </h3>

        <p>
            <strong>1.</strong>
            Change the affected account password.
        </p>

        <p>
            <strong>2.</strong>
            Sign out unfamiliar devices.
        </p>

        <p>
            <strong>3.</strong>
            Check recovery email and phone.
        </p>

        <p>
            <strong>4.</strong>
            Enable 2-Step Verification.
        </p>

        <p>
            <strong>5.</strong>
            Review recent security activity.
        </p>

        <p>
            <strong>6.</strong>
            Remove suspicious connected access.
        </p>

        <hr>

        <p>
            ⚠️ Never give your password or OTP
            to anyone claiming to be support.
        </p>

    `;
}


/* =========================================
   ENTER KEY
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            const input =
                document.getElementById(
                    "serviceInput"
                );

            if (
                document.activeElement === input
            ) {

                addService();
            }
        }
    }
);
