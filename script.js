// ==========================================
// SURAKSHASAATHI
// DIGITAL SAFETY ASSISTANT
// ==========================================


// ==========================================
// CHECK MESSAGE
// ==========================================

function checkMessage() {

    let message = prompt("Enter the suspicious message:");

    if (message === null || message.trim() === "") {
        return;
    }

    message = message.toLowerCase();

    let score = 0;
    let reasons = [];


    // OTP
    if (message.includes("otp")) {
        score += 2;
        reasons.push("OTP request detected");
    }

    // Password
    if (message.includes("password")) {
        score += 2;
        reasons.push("Password request detected");
    }

    // PIN
    if (message.includes("pin")) {
        score += 2;
        reasons.push("PIN request detected");
    }

    // Urgent
    if (message.includes("urgent")) {
        score += 2;
        reasons.push("Urgent language detected");
    }

    // Account blocked
    if (message.includes("account blocked")) {
        score += 3;
        reasons.push("Account-blocking threat detected");
    }

    // Click
    if (message.includes("click")) {
        score += 2;
        reasons.push("Link/click request detected");
    }

    // Verify
    if (message.includes("verify")) {
        score += 1;
        reasons.push("Verification request detected");
    }

    // Prize
    if (message.includes("prize")) {
        score += 2;
        reasons.push("Prize-related claim detected");
    }

    // Winner
    if (message.includes("winner")) {
        score += 2;
        reasons.push("Winner-related claim detected");
    }

    // Money
    if (message.includes("money")) {
        score += 2;
        reasons.push("Money-related request detected");
    }

    // Payment
    if (message.includes("payment")) {
        score += 2;
        reasons.push("Payment request detected");
    }

    // KYC
    if (message.includes("kyc")) {
        score += 2;
        reasons.push("KYC-related request detected");
    }

    // Bank
    if (message.includes("bank")) {
        score += 1;
        reasons.push("Bank-related message detected");
    }

    // Lottery
    if (message.includes("lottery")) {
        score += 3;
        reasons.push("Lottery-related claim detected");
    }

    // Job
    if (message.includes("job")) {
        score += 1;
        reasons.push("Job-related message detected");
    }

    // Delivery
    if (message.includes("delivery")) {
        score += 1;
        reasons.push("Delivery-related message detected");
    }


    showMessageResult(score, reasons);
}


// ==========================================
// MESSAGE RESULT
// ==========================================

function showMessageResult(score, reasons) {

    let result = document.getElementById("result");

    if (score >= 5) {

        result.innerHTML = `
            <h3>🔴 POTENTIAL SCAM</h3>

            <p>
                <strong>Risk Score:</strong> ${score}
            </p>

            <p>
                <strong>Warning Signs:</strong>
            </p>

            <p>
                ${reasons.join("<br>")}
            </p>

            <hr>

            <p>
                <strong>Safety Advice:</strong>
            </p>

            <p>
                Don't click unknown links or share OTP,
                PIN or password.
            </p>

            <p>
                Verify through the official source.
            </p>
        `;

    } else if (score >= 2) {

        result.innerHTML = `
            <h3>🟡 CAUTION</h3>

            <p>
                <strong>Risk Score:</strong> ${score}
            </p>

            <p>
                <strong>Warning Signs:</strong>
            </p>

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
                <strong>Risk Score:</strong> ${score}
            </p>

            <p>
                No major suspicious pattern was detected.
            </p>

            <hr>

            <p>
                Still verify important requests
                through official channels.
            </p>
        `;
    }
}


// ==========================================
// CHECK LINK
// ==========================================

function checkLink() {

    let link = prompt("Enter the suspicious link:");

    if (link === null || link.trim() === "") {
        return;
    }

    link = link.trim().toLowerCase();

    let score = 0;
    let reasons = [];


    // HTTP
    if (link.startsWith("http://")) {

        score += 2;

        reasons.push(
            "Insecure HTTP connection detected"
        );
    }


    // IP address
    let ipPattern =
        /https?:\/\/\d+\.\d+\.\d+\.\d+/;

    if (ipPattern.test(link)) {

        score += 3;

        reasons.push(
            "IP address used instead of a normal domain"
        );
    }


    // Login
    if (link.includes("login")) {

        score += 1;

        reasons.push(
            "Login-related URL detected"
        );
    }


    // Verify
    if (link.includes("verify")) {

        score += 1;

        reasons.push(
            "Verification-related URL detected"
        );
    }


    // Urgent
    if (link.includes("urgent")) {

        score += 2;

        reasons.push(
            "Urgent language detected"
        );
    }


    // Prize
    if (link.includes("prize")) {

        score += 2;

        reasons.push(
            "Prize-related URL detected"
        );
    }


    // Winner
    if (link.includes("winner")) {

        score += 2;

        reasons.push(
            "Winner-related URL detected"
        );
    }


    // Account
    if (link.includes("account")) {

        score += 1;

        reasons.push(
            "Account-related URL detected"
        );
    }


    // OTP
    if (link.includes("otp")) {

        score += 2;

        reasons.push(
            "OTP-related URL detected"
        );
    }


    // Password
    if (link.includes("password")) {

        score += 2;

        reasons.push(
            "Password-related URL detected"
        );
    }


    // Shortened URLs
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


    showLinkResult(score, reasons);
}


// ==========================================
// LINK RESULT
// ==========================================

function showLinkResult(score, reasons) {

    let result = document.getElementById("result");


    if (score >= 5) {

        result.innerHTML = `

            <h3>🔴 POTENTIAL SCAM LINK</h3>

            <p>
                <strong>Risk Score:</strong> ${score}
            </p>

            <p>
                <strong>Warning Signs:</strong>
            </p>

            <p>
                ${reasons.join("<br>")}
            </p>

            <hr>

            <p>
                <strong>Safety Advice:</strong>
            </p>

            <p>
                Do not open this link.
            </p>

            <p>
                Verify the website through an
                official source.
            </p>

        `;

    } else if (score >= 2) {

        result.innerHTML = `

            <h3>🟡 CAUTION</h3>

            <p>
                <strong>Risk Score:</strong> ${score}
            </p>

            <p>
                <strong>Warning Signs:</strong>
            </p>

            <p>
                ${reasons.join("<br>")}
            </p>

            <hr>

            <p>
                Verify the website before entering
                personal information.
            </p>

        `;

    } else {

        result.innerHTML = `

            <h3>🟢 NO MAJOR WARNING SIGNAL</h3>

            <p>
                <strong>Risk Score:</strong> ${score}
            </p>

            <p>
                No major suspicious pattern
                was detected.
            </p>

            <hr>

            <p>
                Still verify important websites
                through official sources.
            </p>

        `;
    }
}


// ==========================================
// SAFETY TIPS
// ==========================================

function showTips() {

    let result = document.getElementById("result");

    result.innerHTML = `

        <h3>🛡️ Digital Safety Tips</h3>

        <p>🔐 Never share your OTP or PIN.</p>

        <p>🔑 Never share your password.</p>

        <p>🔗 Don't click unknown links.</p>

        <p>📞 Don't trust unknown callers immediately.</p>

        <p>
            🏦 Verify bank-related messages
            through the official bank website or app.
        </p>

        <p>
            💳 Never make a payment because
            someone creates urgency.
        </p>

        <p>
            🎁 Be careful with unexpected
            prize or lottery messages.
        </p>

        <p>
            👨‍👩‍👧 When unsure, ask a trusted
            family member for help.
        </p>

    `;
}
