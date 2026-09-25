function checkMessage() {

    let message = prompt("Enter the suspicious message:");

    if (message === null || message.trim() === "") {
        return;
    }

    document.getElementById("result").innerHTML =
        "<h3>Message Received</h3>" +
        "<p>Our safety checker will analyze this message.</p>";
}


function checkLink() {

    let link = prompt("Enter the suspicious link:");

    if (link === null || link.trim() === "") {
        return;
    }

    document.getElementById("result").innerHTML =
        "<h3>Link Received</h3>" +
        "<p>Our safety checker will analyze this link.</p>";
}


function showTips() {

    document.getElementById("result").innerHTML =
        "<h3>🛡️ Safety Tips</h3>" +
        "<p>Never share your OTP, PIN or password.</p>" +
        "<p>Do not click unknown links.</p>" +
        "<p>Verify suspicious requests through an official source.</p>";
}
