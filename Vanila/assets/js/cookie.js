// Watches if cookie body was scrolled
function watchForScroll(controller) {
  const cookieBody = document.querySelector(".cookie-policy .cookie__body");

  function handler() {
    const bodyFullHeight = cookieBody.scrollHeight; // Full height
    const bodyCurrentHeight = cookieBody.clientHeight; // Visible height
    const bodyScrolled = cookieBody.scrollTop; // Scroll height

    // For center
    if (
      bodyScrolled >= 20 &&
      bodyScrolled + bodyCurrentHeight < bodyFullHeight - 20
    ) {
      cookieBody.style.maskImage =
        "linear-gradient(0deg, transparent 0, var(--color-background) 15%, var(--color-background) 85%, transparent 100%)";
    }
    // For bottom
    else if (bodyScrolled + bodyCurrentHeight >= bodyFullHeight - 20) {
      cookieBody.style.maskImage =
        "linear-gradient(0deg, var(--color-background) 85%, transparent 100%)";
    }
    // For top
    else {
      cookieBody.style.maskImage =
        "linear-gradient(0deg, transparent 0, var(--color-background) 15%)";
    }
  }

  cookieBody.addEventListener("scroll", handler, { signal: controller.signal });

  return controller;
}

function checkChooseVariant() {
  const cookiePolicy = document.querySelector(".cookie-policy");

  const cookieCheckboxes = Array.from(
    cookiePolicy.querySelectorAll('input[type="checkbox"]')
  );
  const cookiePlans = Array.from(
    cookiePolicy.querySelectorAll(".cookie__body-buttons .cookie__button")
  );

  cookieCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      // Remove the active class from all other plans
      cookiePlans.forEach((plan) => {
        plan.classList.remove("active");
      });

      // If the first or secondcheckbox is checked
      if (cookieCheckboxes[0].checked || cookieCheckboxes[1].checked) {
        // Add the active class to the second plan
        cookiePlans[1].classList.add("active");
      } else if (cookieCheckboxes[2].checked) {
        // Add the active class to the first plan
        cookiePlans[2].classList.add("active");
      } else {
        // Add the active class to the first plan
        cookiePlans[0].classList.add("active");
      }
    });
  });

  cookiePlans.forEach((plan) => {
    plan.addEventListener("click", () => {
      // Remove the active class from all other plans
      cookiePlans.forEach((plan) => {
        plan.classList.remove("active");
      });

      // Add the active class to the clicked plan
      plan.classList.add("active");

      // Add "checked" attribute for the clicked plan
      if (cookiePlans[0].classList.contains("active")) {
        cookieCheckboxes.forEach((checkbox) => {
          checkbox.checked = false;
        });
      } else if (cookiePlans[1].classList.contains("active")) {
        cookieCheckboxes[0].checked = true;
        cookieCheckboxes[1].checked = true;
        cookieCheckboxes[2].checked = false;
      } else {
        cookieCheckboxes.forEach((checkbox) => {
          checkbox.checked = true;
        });
      }
    });
  });
}

function saveCookiePolicy() {
  const cookiePolicy = document.querySelector(".cookie-policy");

  const cookieValues = {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  };

  const cookieCheckboxes = Array.from(
    cookiePolicy.querySelectorAll('input[type="checkbox"]')
  );

  cookieCheckboxes.forEach(() => {
    if (cookieCheckboxes[0].checked) {
      cookieValues["ad_user_data"] = "granted";
      cookieValues["ad_storage"] = "granted";
    }
    if (cookieCheckboxes[1].checked) {
      cookieValues["analytics_storage"] = "granted";
    }
    if (cookieCheckboxes[2].checked) {
      cookieValues["ad_personalization"] = "granted";
    }
  });

  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  document.cookie = `user-consent=${JSON.stringify(
    cookieValues
  )}; expires=${date.toUTCString()}; path=/ secure; samesite=lax`;
}

function updateGTAG() {
  const cookieValues = JSON.parse(
    document.cookie.match(/user-consent=([^;]+)/)?.[1] || "{}"
  );

  if (cookieValues["ad_user_data"] === "granted") {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag("consent", "update", {
      ad_storage: cookieValues["ad_storage"],
      analytics_storage: cookieValues["analytics_storage"],
      ad_personalization: cookieValues["ad_personalization"],
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const cookiePolicy = document.querySelector(".cookie-policy");

  // Header control buttons
  const resizeButton = cookiePolicy.querySelector(
    ".cookie__header button.resize"
  );
  const settingsButton = cookiePolicy.querySelector(
    ".cookie__footer button.settings"
  );
  const saveButton = cookiePolicy.querySelector(".cookie__footer button.save");
  const closeButton = cookiePolicy.querySelector(
    ".cookie__header button.close"
  );

  resizeButton.onclick = () => {
    cookiePolicy.classList.toggle("maximize");
  };
  settingsButton.onclick = () => {
    cookiePolicy.classList.toggle("maximize");
  };
  closeButton.onclick = () => {
    saveCookiePolicy();
    updateGTAG();
    cookiePolicy.remove();
  };
  saveButton.onclick = () => {
    saveCookiePolicy();
    updateGTAG();
  };

  const observer = new MutationObserver((elements) => {
    elements.forEach((element) => {
      const abortController = new AbortController();
      if (window.matchMedia("(max-width: 640px)").matches || element.attributeName === "class") {
        if (window.matchMedia("(max-width: 640px)").matches) {
          watchForScroll(abortController);
        }
        else if (element.target.classList.contains("maximize")) {
          watchForScroll(abortController);
        } else {
          abortController.abort("removed event handler");
          console.log(abortController);
          setTimeout(() => {
            cookiePolicy.querySelector(".cookie__body").style.maskImage = "";
          }, 100);
        }
      }
    });
  });

  observer.observe(cookiePolicy, { attributes: true });

  checkChooseVariant();
});
