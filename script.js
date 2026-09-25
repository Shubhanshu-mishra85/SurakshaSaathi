function checkMessage() {

    let message = prompt("Enter the suspicious message:");

    if (message === null || message.trim() === "") {
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

    if (message.includes("urgent")) {
        score += 2;
        reasons.push("Urgent language detected");
    }

    if (message.includes("account blocked")) {
        score += 3;
        reasons.push("Account-blocking threat detected");
    }

    if (message.includes("click")) {
        score += 2;
        reasons.push("Link/click request detected");
    }

    if (message.includes("verify")) {
        score += 1;
        reasons.push("Verification request detected");
    }

    if (message.includes("prize")) {
        score += 2;
        reasons.push("Prize-related claim detected");
    }

    if (message.includes("winner")) {
        score += 2;
        reasons.push("Winner-related claim detected");
    }

    let result = document.getElementById("result");

    if (score >= 5) {

        result.innerHTML = `
            <h3>🔴 POTENTIAL SCAM</h3>
            <p><strong>Risk Score:</strong> ${score}</p>
            <p><strong>Warning Signs:</strong></p>
            <p>${reasons.join("<br>")}</p>
            <hr>
            <p><strong>Safety Advice:</strong></p>
            <p>Don't click unknown links or share OTP/password.</p>
            <p>Verify through the official source.</p>
        `;

    } else if (score >= 2) {

        result.innerHTML = `
            <h3>🟡 CAUTION</h3>
            <p><strong>Risk Score:</strong> ${score}</p>
            <p>${reasons.join("<br>")}</p>
            <p>Verify the information before taking action.</p>
        `;

    } else {

        result.innerHTML = `
            <h3>🟢 NO MAJOR WARNING SIGNAL</h3>
            <p>No major suspicious pattern was detected.</p>
            <p>Still verify important requests through official channels.</p>
        `;
    }
}
