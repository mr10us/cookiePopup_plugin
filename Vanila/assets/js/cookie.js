document.addEventListener("DOMContentLoaded", () => {
  const cookiePolicy = document.querySelector("#cookie");
  cookiePolicy.id = `cookie_${generateUID(8)}`;

  const { createApp } = Vue;

  const app = createApp({
    data() {
      return {
        isMaximized: false,
        isMobile: false,
        defaultConsent: {
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          analytics_storage: "denied",
        },
        userConsent: {
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          analytics_storage: "denied",
        },
        plans: ["default", "balanced", "personalized"],
        activePlan: "default",
        checkboxes: [false, false, false],
      };
    },

    methods: {
      saveCookiePolicy() {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        document.cookie = `user-consent=${JSON.stringify(
          this.userConsent
        )}; expires=${date.toUTCString()}; path=/; secure; samesite=lax`;

        if (this.userConsent.ad_user_data === "granted") {
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            window.dataLayer.push(arguments);
          }
          gtag("consent", "update", JSON.parse(JSON.stringify(this.userConsent)));
        }
      },
      setDefaultGTAG() {
        if (document.cookie.match(/user-consent=([^;]+)/)?.[1]) {
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            window.dataLayer.push(arguments);
          }
          gtag("consent", "default", JSON.parse(JSON.stringify(this.defaultConsent)));
        }
      },
      updateGTAG() {
        if (this.checkboxes[0]) {
          this.userConsent.ad_user_data = "granted";
          this.userConsent.ad_storage = "granted";
        }
        if (this.checkboxes[1]) {
          this.userConsent.analytics_storage = "granted";
        }
        if (this.checkboxes[2]) {
          this.userConsent.ad_personalization = "granted";
        }
      },
      displayCookieApp() {
        this.$el.style.animation = "showUp 0.5s ease-out forwards";
      },

      toggleMaximize() {
        this.isMaximized = !this.isMaximized;
      },

      handleScroll() {
        const TOP_PADDING = 40;

        const cookieBody = this.$refs.cookieBody;
        const scrollPosition = cookieBody.scrollTop;
        const scrollHeight = cookieBody.scrollHeight;
        const clientHeight = cookieBody.clientHeight;
        const top = Math.min(scrollPosition / (scrollHeight - clientHeight), 2);
        const bottom = Math.min(
          (scrollHeight - clientHeight - scrollPosition) /
            (scrollHeight - clientHeight),
          2
        );

        // If the user has not scrolled
        if (scrollPosition <= TOP_PADDING) {
          cookieBody.style.maskImage =
            "linear-gradient(0deg, transparent 0, var(--color-background) 10%)";
        }
        // If the user has scrolled to the top
        if (scrollPosition > TOP_PADDING) {
          cookieBody.style.maskImage =
            "linear-gradient(0deg, transparent 0, var(--color-background) 10%, var(--color-background) 90%, transparent 100%)";
        }
        // If the user has scrolled to the bottom
        if (scrollPosition + clientHeight >= scrollHeight - TOP_PADDING) {
          cookieBody.style.maskImage =
            "linear-gradient(0deg, var(--color-background) 0, var(--color-background) 90%, transparent 100%)";
        }
      },

      setPlan(plan) {
        this.activePlan = plan;

        if (plan === "default") {
          this.checkboxes = [false, false, false];
        } else if (plan === "balanced") {
          this.checkboxes = [true, true, false];
        } else {
          this.checkboxes = [true, true, true];
        }
      },

      handleClose() {
        this.$el.remove();
        app.unmount();
      },
    },
    beforeCreate() {
      if (document.cookie.match(/user-consent=([^;]+)/)?.[1]) {
        cookiePolicy.remove();
      }
    },
    mounted() {
      this.setDefaultGTAG();
      this.displayCookieApp();

      this.$refs.cookieBody.addEventListener("scroll", this.handleScroll);
    },
    watch: {
      checkboxes: {
        handler(newValues) {
          if (newValues[2]) {
            this.activePlan = "personalized";
          } else if (newValues[0] || newValues[1]) {
            this.activePlan = "balanced";
          } else {
            this.activePlan = "default";
          }
          this.updateGTAG();
        },
        deep: true,
      },
    },

    beforeUnmount() {
      this.$refs.cookieBody.removeEventListener("scroll", this.handleScroll);
      this.updateGTAG();
      this.saveCookiePolicy();
    },
  });

  app.mount(cookiePolicy);
});


function generateUID(length) {
  const letters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
}
