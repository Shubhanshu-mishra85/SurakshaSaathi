/* =========================================
   VARUMIZU
   DIGITAL SAFETY ENGINE
========================================= */


// =========================================
// CHECK MESSAGE
// =========================================

function checkMessage() {

    let message =
        prompt("Enter the suspicious message:");

    if (
        message === null ||
        message.trim() === ""
    ) {
        return;
    }

    message =
        message.toLowerCase();

    let score = 0;

    let reasons = [];


    if (message.includes("otp")) {

        score += 2;

        reasons.push(
            "OTP request detected"
        );
    }


    if (message.includes("password")) {

        score += 2;

        reasons.push(
            "Password request detected"
        );
    }


    if (message.includes("pin")) {

        score += 2;

        reasons.push(
            "PIN request detected"
        );
    }


    if (message.includes("urgent")) {

        score += 2;

        reasons.push(
            "Urgent language detected"
        );
    }


    if (
        message.includes("account blocked")
    ) {

        score += 3;

        reasons.push(
            "Account-blocking threat detected"
        );
    }


    if (message.includes("click")) {

        score += 2;

        reasons.push(
            "Link/click request detected"
        );
    }


    if (message.includes("verify")) {

        score += 1;

        reasons.push(
            "Verification request detected"
        );
    }


    if (message.includes("prize")) {

        score += 2;

        reasons.push(
            "Prize-related claim detected"
        );
    }


    if (message.includes("winner")) {

        score += 2;

        reasons.push(
            "Winner-related claim detected"
        );
    }


    if (message.includes("payment")) {

        score += 2;

        reasons.push(
            "Payment request detected"
        );
    }


    if (message.includes("kyc")) {

        score += 2;

        reasons.push(
            "KYC-related request detected"
        );
    }


    if (message.includes("bank")) {

        score += 1;

        reasons.push(
            "Bank-related message detected"
        );
    }


    if (message.includes("lottery")) {

        score += 3;

        reasons.push(
            "Lottery-related claim detected"
        );
    }


    showResult(
        score,
        reasons,
        "MESSAGE"
    );
}



// =========================================
// CHECK LINK
// =========================================

function checkLink() {

    let link =
        prompt("Enter the suspicious link:");

    if (
        link === null ||
        link.trim() === ""
    ) {
        return;
    }

    link =
        link.trim().toLowerCase();

    let score = 0;

    let reasons = [];


    // HTTP

    if (
        link.startsWith("http://")
    ) {

        score += 2;

        reasons.push(
            "Insecure HTTP connection detected"
        );
    }


    // IP address

    let ipPattern =
        /https?:\/\/\d+\.\d+\.\d+\.\d+/;


    if (
        ipPattern.test(link)
    ) {

        score += 3;

        reasons.push(
            "IP address used instead of normal domain"
        );
    }


    // Suspicious words

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


    if (link.includes("winner")) {

        score += 2;

        reasons.push(
            "Winner-related URL detected"
        );
    }


    if (link.includes("account")) {

        score += 1;

        reasons.push(
            "Account-related URL detected"
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
        score,
        reasons,
        "LINK"
    );
}



// =========================================
// RESULT ENGINE
// =========================================

function showResult(
    score,
    reasons,
    type
) {

    let result =
        document.getElementById("result");


    if (score >= 5) {

        result.innerHTML = `

            <h3>
                🔴 POTENTIAL SCAM
            </h3>

            <p>
                <strong>
                    ${type} RISK SCORE:
                </strong>
                ${score}/10
            </p>

            <p>
                <strong>
                    WARNING SIGNS:
                </strong>
            </p>

            <p>
                ${reasons.join("<br>")}
            </p>

            <hr>

            <p>
                <strong>
                    SAFETY ADVICE:
                </strong>
            </p>

            <p>
                Do not click unknown links
                or share OTP, PIN or password.
            </p>

            <p>
                Verify through an official source.
            </p>

        `;

    }

    else if (score >= 2) {

        result.innerHTML = `

            <h3>
                🟡 CAUTION
            </h3>

            <p>
                <strong>
                    ${type} RISK SCORE:
                </strong>
                ${score}/10
            </p>

            <p>
                <strong>
                    WARNING SIGNS:
                </strong>
            </p>

            <p>
                ${reasons.join("<br>")}
            </p>

            <hr>

            <p>
                Verify the information
                before taking action.
            </p>

        `;

    }

    else {

        result.innerHTML = `

            <h3>
                🟢 NO MAJOR WARNING SIGNAL
            </h3>

            <p>
                <strong>
                    ${type} RISK SCORE:
                </strong>
                ${score}/10
            </p>

            <p>
                No major suspicious
                pattern was detected.
            </p>

            <hr>

            <p>
                Still verify important
                requests through official channels.
            </p>

        `;
    }
}



// =========================================
// SAFETY TIPS
// =========================================

function showTips() {

    let result =
        document.getElementById("result");


    result.innerHTML = `

        <h3>
            🛡️ DIGITAL SAFETY PROTOCOL
        </h3>

        <p>
            🔐 Never share OTP or PIN.
        </p>

        <p>
            🔑 Never share passwords.
        </p>

        <p>
            🔗 Don't open unknown links.
        </p>

        <p>
            📞 Verify unknown callers.
        </p>

        <p>
            🏦 Use official banking apps
            and websites.
        </p>

        <p>
            💳 Don't make payments
            because of pressure.
        </p>

        <p>
            🎁 Be careful with unexpected
            prize or lottery messages.
        </p>

        <p>
            👨‍👩‍👧 When unsure, ask
            a trusted person for help.
        </p>

    `;
}
