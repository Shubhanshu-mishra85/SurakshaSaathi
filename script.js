/* =====================================================
   VARUMIZU
   DIGITAL SAFETY SYSTEM
===================================================== */


/* =====================================================
   LOADER
===================================================== */

window.addEventListener("load", function () {

  setTimeout(function () {

    const loader =
      document.getElementById("varumizuLoader");

    const website =
      document.getElementById("mainWebsite");

    if (loader) {
      loader.classList.add("hide");
    }

    if (website) {
      website.classList.add("show");
    }

  }, 1800);

});


/* =====================================================
   MESSAGE SCANNER
===================================================== */

function checkMessage() {

  const message = prompt(
    "Paste the message you want VARUMIZU to check:"
  );

  if (!message) return;

  const text = message.toLowerCase();

  let risk = 0;
  let warnings = [];

  const rules = [

    {
      words: [
        "otp",
        "one time password",
        "verification code"
      ],
      score: 30,
      warning: "Requests for OTP or verification codes"
    },

    {
      words: [
        "urgent",
        "immediately",
        "act now",
        "within 24 hours",
        "account will be blocked"
      ],
      score: 20,
      warning: "Creates urgency or fear"
    },

    {
      words: [
        "click",
        "link",
        "verify",
        "login",
        "update your account"
      ],
      score: 20,
      warning: "Asks you to click or verify something"
    },

    {
      words: [
        "bank",
        "credit card",
        "debit card",
        "upi",
        "payment"
      ],
      score: 20,
      warning: "Requests financial or banking action"
    },

    {
      words: [
        "prize",
        "lottery",
        "winner",
        "reward",
        "cashback"
      ],
      score: 15,
      warning: "Unexpected prize or reward claim"
    }

  ];


  rules.forEach(function (rule) {

    const found =
      rule.words.some(function (word) {
        return text.includes(word);
      });

    if (found) {

      risk += rule.score;

      warnings.push(rule.warning);

    }

  });


  risk = Math.min(risk, 100);


  let level = "LOW RISK";
  let levelClass = "safeText";

  if (risk >= 30 && risk < 60) {

    level = "MEDIUM RISK";
    levelClass = "warningText";

  }

  if (risk >= 60) {

    level = "HIGH RISK";
    levelClass = "dangerText";

  }


  let warningHTML = "";

  if (warnings.length === 0) {

    warningHTML = `
      <div class="scanLine">
        No common scam indicators were detected.
        This does not guarantee that the message is safe.
      </div>
    `;

  } else {

    warnings.forEach(function (warning) {

      warningHTML += `
        <div class="scanLine">
          ⚠ ${escapeHTML(warning)}
        </div>
      `;

    });

  }


  showResult(`

    <div class="warningBox">

      <div class="scanTitle">
        MESSAGE ANALYSIS
      </div>

      <div class="scanLine">
        Risk Level:
        <span class="${levelClass}">
          ${level}
        </span>
      </div>

      <div class="scanLine">
        Risk Score:
        <strong>${risk}/100</strong>
      </div>

      ${warningHTML}

      <div class="scanLine">
        <strong>Safety advice:</strong>
        Never share OTPs, passwords, PINs or recovery codes.
        Verify unexpected requests through an official source.
      </div>

    </div>

  `);

}


/* =====================================================
   LINK SCANNER
===================================================== */

function checkLink() {

  const url = prompt(
    "Paste the website link you want to check:"
  );

  if (!url) return;


  let risk = 0;
  let warnings = [];


  try {

    const parsed =
      new URL(url);

    const hostname =
      parsed.hostname.toLowerCase();


    if (parsed.protocol !== "https:") {

      risk += 25;

      warnings.push(
        "The website is not using HTTPS."
      );

    }


    if (
      hostname.includes("login") ||
      hostname.includes("verify") ||
      hostname.includes("secure")
    ) {

      risk += 10;

      warnings.push(
        "The domain uses security-related words."
      );

    }


    if (
      hostname.split(".").length > 3
    ) {

      risk += 15;

      warnings.push(
        "The domain contains multiple subdomains."
      );

    }


    if (
      url.includes("@") ||
      url.includes("%") ||
      url.length > 150
    ) {

      risk += 20;

      warnings.push(
        "The URL has unusual formatting."
      );

    }


  } catch (error) {

    risk = 100;

    warnings.push(
      "The entered value does not appear to be a valid URL."
    );

  }


  risk = Math.min(risk, 100);


  let level = "LOW RISK";
  let levelClass = "safeText";


  if (risk >= 30 && risk < 60) {

    level = "MEDIUM RISK";
    levelClass = "warningText";

  }


  if (risk >= 60) {

    level = "HIGH RISK";
    levelClass = "dangerText";

  }


  let warningHTML = "";


  if (warnings.length === 0) {

    warningHTML = `
      <div class="scanLine">
        No obvious URL warning signs were detected.
        This does not guarantee that the website is safe.
      </div>
    `;

  } else {

    warnings.forEach(function (warning) {

      warningHTML += `
        <div class="scanLine">
          ⚠ ${escapeHTML(warning)}
        </div>
      `;

    });

  }


  showResult(`

    <div class="warningBox">

      <div class="scanTitle">
        LINK ANALYSIS
      </div>

      <div class="scanLine">
        Risk Level:
        <span class="${levelClass}">
          ${level}
        </span>
      </div>

      <div class="scanLine">
        Risk Score:
        <strong>${risk}/100</strong>
      </div>

      ${warningHTML}

      <div class="scanLine">
        <strong>Safety advice:</strong>
        Do not enter passwords, OTPs or payment details
        on suspicious websites.
      </div>

    </div>

  `);

}


/* =====================================================
   RESULT DISPLAY
===================================================== */

function showResult(html) {

  const result =
    document.getElementById("result");

  if (!result) return;

  result.innerHTML = html;

  result.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

}


/* =====================================================
   GMAIL SECURITY
===================================================== */

function openGmailSecurity() {

  const panel =
    document.getElementById("gmailSecurity");

  const footprint =
    document.getElementById("digitalFootprint");

  if (footprint) {
    footprint.style.display = "none";
  }

  if (panel) {

    panel.style.display = "block";

    panel.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }

}


function scanGmail() {

  const input =
    document.getElementById("gmailInput");

  const output =
    document.getElementById("gmailScan");


  if (!input || !output) return;


  const email =
    input.value.trim();


  if (!email) {

    output.innerHTML = `
      <div class="scanLine dangerText">
        Please enter your Gmail address.
      </div>
    `;

    return;

  }


  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  if (!emailPattern.test(email)) {

    output.innerHTML = `
      <div class="scanLine dangerText">
        Please enter a valid email address.
      </div>
    `;

    return;

  }


  const masked =
    maskEmail(email);


  output.innerHTML = `

    <div class="scanLine">
      Account:
      <strong>${escapeHTML(masked)}</strong>
    </div>

    <div class="checkItem">
      ✓ Use a unique password for your email.
    </div>

    <div class="checkItem">
      ✓ Enable two-step verification.
    </div>

    <div class="checkItem">
      ✓ Review recent account activity.
    </div>

    <div class="checkItem">
      ✓ Remove unknown third-party access.
    </div>

    <div class="checkItem">
      ✓ Never share OTP or recovery codes.
    </div>

  `;

}


function maskEmail(email) {

  const parts =
    email.split("@");

  if (parts.length !== 2) {
    return email;
  }

  const name =
    parts[0];

  if (name.length <= 2) {

    return "*".repeat(name.length)
      + "@"
      + parts[1];

  }

  return (
    name.substring(0, 2)
    +
    "*".repeat(
      Math.max(2, name.length - 2)
    )
    +
    "@"
    +
    parts[1]
  );

}


/* =====================================================
   DIGITAL FOOTPRINT
===================================================== */

function openDigitalFootprint() {

  const panel =
    document.getElementById("digitalFootprint");

  const gmail =
    document.getElementById("gmailSecurity");


  if (gmail) {
    gmail.style.display = "none";
  }


  if (panel) {

    panel.style.display = "block";

    loadServices();

    panel.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }

}


function addService() {

  const input =
    document.getElementById("serviceInput");


  if (!input) return;


  const service =
    input.value.trim();


  if (!service) return;


  let services =
    JSON.parse(
      localStorage.getItem("varumizuServices")
      || "[]"
    );


  if (
    services.some(
      item =>
        item.toLowerCase() === service.toLowerCase()
    )
  ) {

    input.value = "";

    return;

  }


  services.push(service);


  localStorage.setItem(
    "varumizuServices",
    JSON.stringify(services)
  );


  input.value = "";

  loadServices();

}


function loadServices() {

  const list =
    document.getElementById("serviceList");


  if (!list) return;


  let services =
    JSON.parse(
      localStorage.getItem("varumizuServices")
      || "[]"
    );


  if (services.length === 0) {

    list.innerHTML = `
      <div class="emptyFootprint">
        No services added yet.
      </div>
    `;

    return;

  }


  list.innerHTML = "";


  services.forEach(function (service, index) {

    const item =
      document.createElement("div");

    item.className =
      "serviceItem";


    item.innerHTML = `

      <span>
        ${escapeHTML(service)}
      </span>

      <button
        class="deleteButton"
        onclick="removeService(${index})"
      >
        REMOVE
      </button>

    `;


    list.appendChild(item);

  });

}


function removeService(index) {

  let services =
    JSON.parse(
      localStorage.getItem("varumizuServices")
      || "[]"
    );


  services.splice(index, 1);


  localStorage.setItem(
    "varumizuServices",
    JSON.stringify(services)
  );


  loadServices();

}


/* =====================================================
   SAFETY CENTER
===================================================== */

function showTips() {

  showResult(`

    <div class="warningBox">

      <div class="scanTitle">
        SAFETY CENTER
      </div>

      <div class="scanLine">
        🛡 Never share OTP, PIN, password or recovery codes.
      </div>

      <div class="scanLine">
        🔗 Avoid opening unexpected links.
      </div>

      <div class="scanLine">
        📞 Verify suspicious calls using an official number.
      </div>

      <div class="scanLine">
        💳 Never make a payment because someone creates urgency.
      </div>

      <div class="scanLine">
        🔐 Enable two-factor authentication wherever possible.
      </div>

      <div class="scanLine">
        📱 Keep your phone and important apps updated.
      </div>

    </div>

  `);

}


/* =====================================================
   ACCOUNT EMERGENCY
===================================================== */

function emergencyGuide() {

  showResult(`

    <div class="warningBox">

      <div class="scanTitle">
        ACCOUNT EMERGENCY
      </div>

      <div class="scanLine">
        1. Stop communicating with the suspicious person.
      </div>

      <div class="scanLine">
        2. Do not share any additional information.
      </div>

      <div class="scanLine">
        3. Change passwords for affected accounts.
      </div>

      <div class="scanLine">
        4. Contact your bank or service provider through
        an official channel if financial information was involved.
      </div>

      <div class="scanLine">
        5. Save relevant messages, emails and transaction details.
      </div>

      <div class="scanLine">
        6. Report the incident through the appropriate
        official cybercrime or service channel.
      </div>

    </div>

  `);

}


/* =====================================================
   SECURITY
===================================================== */

function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* =====================================================
   ENTER KEY
===================================================== */

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Enter" &&
      document.activeElement &&
      document.activeElement.id === "serviceInput"
    ) {

      addService();

    }

  }
);
