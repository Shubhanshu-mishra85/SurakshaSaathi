/* =====================================================
   VARUMIZU V2
   DIGITAL SAFETY INTELLIGENCE
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
   ELDERLY MODE
===================================================== */

function toggleElderlyMode() {

  document.body.classList.toggle("elderlyMode");

  const enabled =
    document.body.classList.contains("elderlyMode");

  localStorage.setItem(
    "varumizuElderlyMode",
    enabled ? "on" : "off"
  );

}


/* Remember mode */

window.addEventListener("load", function () {

  if (
    localStorage.getItem("varumizuElderlyMode")
    === "on"
  ) {

    document.body.classList.add("elderlyMode");

  }

});


/* =====================================================
   MESSAGE SCANNER
===================================================== */

function checkMessage() {

  const message = prompt(
    "Paste the message you want VARUMIZU to analyze:"
  );

  if (!message) return;


  const text =
    message.toLowerCase();


  let score = 0;

  let warnings = [];


  const rules = [

    {
      words: [
        "otp",
        "one time password",
        "verification code",
        "share the code"
      ],
      score: 30,
      warning:
        "The message asks for an OTP or verification code."
    },

    {
      words: [
        "urgent",
        "immediately",
        "act now",
        "right now",
        "within 24 hours",
        "account will be blocked"
      ],
      score: 20,
      warning:
        "The message uses urgency or pressure."
    },

    {
      words: [
        "click",
        "click here",
        "open this link",
        "verify",
        "login",
        "update your account"
      ],
      score: 20,
      warning:
        "The message asks you to click, login or verify something."
    },

    {
      words: [
        "bank",
        "upi",
        "payment",
        "credit card",
        "debit card",
        "account number"
      ],
      score: 20,
      warning:
        "The message involves financial or banking information."
    },

    {
      words: [
        "prize",
        "lottery",
        "winner",
        "reward",
        "cashback",
        "congratulations"
      ],
      score: 15,
      warning:
        "The message contains an unexpected reward or prize claim."
    },

    {
      words: [
        "refund",
        "kyc",
        "pan card",
        "aadhaar",
        "document"
      ],
      score: 15,
      warning:
        "The message asks for personal or identity information."
    }

  ];


  rules.forEach(function (rule) {

    const detected =
      rule.words.some(function (word) {

        return text.includes(word);

      });


    if (detected) {

      score += rule.score;

      warnings.push(rule.warning);

    }

  });


  score =
    Math.min(score, 100);


  showRiskResult(
    "MESSAGE ANALYSIS",
    score,
    warnings
  );

}


/* =====================================================
   LINK SCANNER
===================================================== */

function checkLink() {

  const input =
    prompt(
      "Paste the website URL you want VARUMIZU to analyze:"
    );


  if (!input) return;


  let score = 0;

  let warnings = [];


  try {

    const url =
      new URL(input);


    const host =
      url.hostname.toLowerCase();


    if (url.protocol !== "https:") {

      score += 30;

      warnings.push(
        "The website is not using HTTPS."
      );

    }


    if (
      input.length > 150
    ) {

      score += 15;

      warnings.push(
        "The URL is unusually long."
      );

    }


    if (
      host.includes("login") ||
      host.includes("verify") ||
      host.includes("secure") ||
      host.includes("account")
    ) {

      score += 10;

      warnings.push(
        "The domain contains security-related words."
      );

    }


    if (
      host.split(".").length > 3
    ) {

      score += 15;

      warnings.push(
        "The domain contains multiple subdomains."
      );

    }


    if (
      input.includes("@")
    ) {

      score += 25;

      warnings.push(
        "The URL contains an @ symbol."
      );

    }


    if (
      /[^\x00-\x7F]/.test(host)
    ) {

      score += 20;

      warnings.push(
        "The domain contains unusual characters."
      );

    }


  } catch {

    score = 100;

    warnings.push(
      "This does not appear to be a valid website URL."
    );

  }


  score =
    Math.min(score, 100);


  showRiskResult(
    "LINK ANALYSIS",
    score,
    warnings
  );

}


/* =====================================================
   RISK RESULT
===================================================== */

function showRiskResult(
  title,
  score,
  warnings
) {


  let level;

  let badgeClass;

  let barClass;


  if (score < 30) {

    level = "LOW RISK";

    badgeClass = "riskLow";

    barClass = "riskLowBar";

  }

  else if (score < 60) {

    level = "MEDIUM RISK";

    badgeClass = "riskMedium";

    barClass = "riskMediumBar";

  }

  else {

    level = "HIGH RISK";

    badgeClass = "riskHigh";

    barClass = "riskHighBar";

  }


  let warningHTML = "";


  if (warnings.length === 0) {

    warningHTML = `

      <div class="warningItem">
        ✓ No common warning indicators were detected.
      </div>

    `;

  }

  else {

    warnings.forEach(function (warning) {

      warningHTML += `

        <div class="warningItem">
          ⚠️
          <span>
            ${escapeHTML(warning)}
          </span>
        </div>

      `;

    });

  }


  const advice =
    score >= 60

      ? "Do not click links, share personal information or make payments until you independently verify the request."

      : score >= 30

        ? "Pause before responding. Verify the sender and request through an official channel."

        : "No obvious warning indicators were detected, but always verify unexpected requests."


  const result =
    document.getElementById("result");


  result.innerHTML = `

    <div class="resultCard">

      <div class="resultHeader">

        <div class="resultTitle">
          ${title}
        </div>

        <div class="riskBadge ${badgeClass}">
          ${level}
        </div>

      </div>


      <div class="scoreText">

        <span>
          RISK SCORE
        </span>

        <strong>
          ${score}/100
        </strong>

      </div>


      <div class="riskMeter">

        <div
          class="riskProgress ${barClass}"
          id="riskProgress"
        ></div>

      </div>


      <div class="warningList">

        ${warningHTML}

      </div>


      <div class="adviceBox">

        <strong>Recommended action</strong>

        <br>

        ${advice}

      </div>


      <div class="smallNote">

        This is a prototype risk assessment based on
        detectable indicators. It does not guarantee
        that a message or website is safe or fraudulent.

      </div>

    </div>

  `;


  setTimeout(function () {

    const progress =
      document.getElementById("riskProgress");

    if (progress) {

      progress.style.width =
        score + "%";

    }

  }, 100);


  result.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

}


/* =====================================================
   GMAIL SECURITY
===================================================== */

function openGmailSecurity() {

  closePanels();

  const panel =
    document.getElementById("gmailSecurity");

  panel.style.display =
    "block";


  panel.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

}


function scanGmail() {

  const input =
    document.getElementById("gmailInput");

  const output =
    document.getElementById("gmailScan");


  const email =
    input.value.trim();


  if (!email) {

    output.innerHTML = `

      <div class="warningItem">
        ⚠️ Please enter your Gmail address.
      </div>

    `;

    return;

  }


  const pattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  if (!pattern.test(email)) {

    output.innerHTML = `

      <div class="warningItem">
        ⚠️ Please enter a valid email address.
      </div>

    `;

    return;

  }


  output.innerHTML = `

    <div class="checkItem">
      ✓ Use a unique password.
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

    <div class="smallNote">
      Account checked:
      ${escapeHTML(maskEmail(email))}
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
      Math.max(
        2,
        name.length - 2
      )
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

  closePanels();

  const panel =
    document.getElementById("digitalFootprint");


  panel.style.display =
    "block";


  loadServices();


  panel.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

}


function addService() {

  const input =
    document.getElementById("serviceInput");


  const service =
    input.value.trim();


  if (!service) return;


  let services =
    JSON.parse(
      localStorage.getItem(
        "varumizuServices"
      ) || "[]"
    );


  const exists =
    services.some(function (item) {

      return (
        item.toLowerCase()
        ===
        service.toLowerCase()
      );

    });


  if (exists) {

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


  const services =
    JSON.parse(
      localStorage.getItem(
        "varumizuServices"
      ) || "[]"
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


  services.forEach(
    function (service, index) {

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

    }
  );

}


function removeService(index) {

  let services =
    JSON.parse(
      localStorage.getItem(
        "varumizuServices"
      ) || "[]"
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

  closePanels();


  const result =
    document.getElementById("result");


  result.innerHTML = `

    <div class="resultCard">

      <div class="resultTitle">
        SAFETY CENTER
      </div>


      <div class="warningList">

        <div class="warningItem">
          🛡️
          <span>
            Never share OTP, PIN, password or recovery codes.
          </span>
        </div>

        <div class="warningItem">
          🔗
          <span>
            Avoid unexpected links and attachments.
          </span>
        </div>

        <div class="warningItem">
          📞
          <span>
            Verify suspicious calls using an official contact number.
          </span>
        </div>

        <div class="warningItem">
          💳
          <span>
            Do not make payments because someone creates urgency.
          </span>
        </div>

        <div class="warningItem">
          🔐
          <span>
            Enable two-step verification where available.
          </span>
        </div>

        <div class="warningItem">
          📱
          <span>
            Keep your phone, browser and important apps updated.
          </span>
        </div>

      </div>

    </div>

  `;


  result.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

}


/* =====================================================
   EMERGENCY
===================================================== */

function emergencyGuide() {

  closePanels();


  const result =
    document.getElementById("result");


  result.innerHTML = `

    <div class="resultCard">

      <div class="resultHeader">

        <div class="resultTitle">
          ACCOUNT EMERGENCY
        </div>

        <div class="riskBadge riskHigh">
          ACT CAREFULLY
        </div>

      </div>


      <div class="warningList">

        <div class="warningItem">
          <b>1.</b>
          <span>
            Stop communicating with the suspicious person.
          </span>
        </div>

        <div class="warningItem">
          <b>2.</b>
          <span>
            Do not share additional information.
          </span>
        </div>

        <div class="warningItem">
          <b>3.</b>
          <span>
            Change passwords for affected accounts.
          </span>
        </div>

        <div class="warningItem">
          <b>4.</b>
          <span>
            Contact your bank or service provider through
            an official channel if financial information was involved.
          </span>
        </div>

        <div class="warningItem">
          <b>5.</b>
          <span>
            Save relevant messages, emails and transaction details.
          </span>
        </div>

        <div class="warningItem">
          <b>6.</b>
          <span>
            Report the incident through the appropriate
            official channel.
          </span>
        </div>

      </div>

    </div>

  `;


  result.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

}


/* =====================================================
   CLOSE PANELS
===================================================== */

function closePanels() {

  const gmail =
    document.getElementById(
      "gmailSecurity"
    );

  const footprint =
    document.getElementById(
      "digitalFootprint"
    );


  if (gmail) {
    gmail.style.display = "none";
  }

  if (footprint) {
    footprint.style.display = "none";
  }

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
      document.activeElement.id
        === "serviceInput"
    ) {

      addService();

    }

  }
);
