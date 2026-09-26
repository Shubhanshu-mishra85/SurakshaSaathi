// ==========================================
// SURAKSHASAATHI
// Digital Safety Assistant
// ==========================================


// ==========================================
// 1. CHECK MESSAGE
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


    // Job scam
    if (message.includes("job")) {
        score += 1;
        reasons.push("Job-related request detected");
    }


    // Delivery scam
    if (message.includes("delivery")) {
        score += 1;
        reasons.push("Delivery-related message detected");
    }


    showMessageResult(score, reasons);
}



// ==========================================
// 2. MESSAGE RESULT
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

    }

    else if (score >= 2) {

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

    }

    else {

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
// 3. CHECK LINK
// ==========================================

function checkLink() {

    let link = prompt("Enter the suspicious link:");

    if (link === null || link.trim() === "") {
        return;
    }

    link = link.toLowerCase().trim();

    let score = 0;
    let reasons = [];


    // HTTP instead of HTTPS
    if (link.startsWith("http://")) {

        score += 2;

        reasons.push(
            "Insecure HTTP connection detected"
        );
    }


    // IP address instead of domain
    if (/https?:\/\/\d+\.\d+\.\d+\.\d+/.test(link)) {

        score += 3;

        reasons.push(
            "IP address used instead of a normal domain"
        );
    }


    // Suspicious words
    let suspiciousWords = [

        "login",
        "verify",
        "account",
        "update",
        "secure",
        "claim",
        "prize",
        "winner",
        "urgent",
        "free",
        "otp",
        "password"

    ];


    suspiciousWords.forEach(function(word) {

        if (link.includes(word)) {

            score += 1;

            reasons.push(
                "Suspicious word detected: " + word
            );
        }

    });


    // URL shorteners
    let shortDomains = [

        "bit.ly",
        "tinyurl.com",
        "t.co",
        "goo.gl"

    ];


    shortDomains.forEach(function(domain) {

        if (link.includes(domain)) {

            score += 2;

            reasons.push(
                "Shortened URL detected"
            );
        }

    });


    showLinkResult(score, reasons);
}



// ==========================================
// 4. LINK RESULT
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

    }


    else if (score >= 2) {

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

    }


    else {

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
// 5. SAFETY TIPS
// ==========================================

function showTips() {

    let result = document.getElementById("result");

    result.innerHTML = `

        <h3>🛡️ Digital Safety Tips</h3>

        <p>🔐 Never share your OTP or PIN.</p>

        <p>🔑 Never share your password.</p>

        <p>🔗 Don't click unknown links.</p>

        <p>📞 Don't trust unknown callers immediately.</p>

        <p>🏦 Verify bank-related messages
        through the official bank website/app.</p>

        <p>💳 Never make a payment because
        someone creates urgency.</p>

        <p>🎁 Be careful with unexpected
        prize or lottery messages.</p>

        <p>👨‍👩‍👧 When unsure, ask a trusted
        family member for help.</p>

    `;
}
