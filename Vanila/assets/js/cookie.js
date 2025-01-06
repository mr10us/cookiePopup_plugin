const CookiePolicy = {
  template: `
      <div
        class="cookie-policy"
        v-if="isFrameVisible"
        :class="{ maximize: isMaximized }"
      >
        <div class="cookie__header" ref="cookieHeader">
          <p>Privacy settings for dfstore.com.ua, verified by VSolo team.</p>
          <button class="resize" @click="toggleMaximize">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 9V6.5C2 4.01 4.01 2 6.5 2H9"
                stroke="inherit"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15 2H17.5C19.99 2 22 4.01 22 6.5V9"
                stroke="inherit"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22 16V17.5C22 19.99 19.99 22 17.5 22H16"
                stroke="inherit"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 22H6.5C4.01 22 2 19.99 2 17.5V15"
                stroke="inherit"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button class="close" @click="handleClose">
            <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21.3502 20.8332L1.51711 1"
                stroke="inherit"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21.1831 1.16678L1.3501 21"
                stroke="inherit"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <div class="cookie__body" ref="cookieBody">
          <p>{{ t("title") }}</p>
          <span>{{ t("subtitle") }}</span
          >
          <div class="cookie__body-buttons">
            <button class="cookie__button" :class="{ active: activePlan === 'default' }" @click="() => setPlan('default')">
              {{ t("plans.default.title") }}
            </button>
            <button
              class="cookie__button"
              :class="{ active: activePlan === 'balanced' }"
              @click="() => setPlan('balanced')"
            >
              {{ t("plans.balanced.title") }}
            </button>
            <button
              class="cookie__button"
              :class="{ active: activePlan === 'personalized' }"
              @click="() => setPlan('personalized')"
            >
              {{ t("plans.personalized.title") }}
            </button>
          </div>
          <span class="cookie__body-description">{{ planDescription() }}</span>
          <div class="cookie__body-details">
            <p>{{ t("prefs.title") }}</p>
            <span>{{ t("prefs.description") }}</span>
            <ul class="cookie__body-details__widgets">
              <li class="active">
                <label>
                  <input type="radio" hidden checked="true" />
                  <span></span>
                </label>
                <p>{{ t("plans.default.prefs.title") }}</p>
                <span>{{ t("plans.default.prefs.description") }}</span>
                <p>{{ t("plans.default.prefs.list.title") }}</p>
                <ul>
                  <li>{{ t("plans.default.prefs.list.items.0") }}</li>
                  <li>{{ t("plans.default.prefs.list.items.1") }}</li>
                </ul>
              </li>
              <li>
                <label>
                  <input type="checkbox" hidden v-model="checkboxes[0]" />
                  <span></span>
                </label>
                <p>{{ t("plans.balanced.prefs1.title") }}</p>
                <span>{{ t("plans.balanced.prefs1.description") }}</span>
                <p>{{ t("plans.balanced.prefs1.list.title") }}</p>
                <ul>
                  <li>{{ t("plans.balanced.prefs1.list.items.0") }}</li>
                  <li>{{ t("plans.balanced.prefs1.list.items.1") }}</li>
                  <li>{{ t("plans.balanced.prefs1.list.items.2") }}</li>
                </ul>
              </li>
              <li>
                <label>
                  <input type="checkbox" hidden v-model="checkboxes[1]" />
                  <span></span>
                </label>
                <p>{{ t("plans.balanced.prefs2.title") }}</p>
                <span>{{ t("plans.balanced.prefs2.description") }}</span>
                <p>{{ t("plans.balanced.prefs2.list.title") }}</p>
                <ul>
                  <li>{{ t("plans.balanced.prefs2.list.items.0") }}</li>
                  <li>{{ t("plans.balanced.prefs2.list.items.1") }}</li>
                  <li>{{ t("plans.balanced.prefs2.list.items.2") }}</li>
                </ul>
              </li>
              <li>
                <label>
                  <input type="checkbox" hidden v-model="checkboxes[2]" />
                  <span></span>
                </label>
                <p>{{ t("plans.personalized.prefs.title") }}</p>
                <span>{{ t("plans.personalized.prefs.description") }}</span>
                <p>{{ t("plans.personalized.prefs.list.title") }}</p>
                <ul>
                  <li>{{ t("plans.balanced.prefs2.list.items.0") }}</li>
                  <li>{{ t("plans.balanced.prefs2.list.items.1") }}</li>
                  <li>{{ t("plans.balanced.prefs2.list.items.2") }}</li>
                </ul>
              </li>
            </ul>
            <p>{{ t("protectionsNmetrics.title") }}</p>
            <span>{{ t("protectionsNmetrics.description") }}</span>
            <ul>
              <li>
                <img src="/assets/img/security-user.svg" alt="user security icon" width="24" height="24" />
                <p>{{ t("protectionsNmetrics.sections.0.title") }}</p>
                <ul>
                  <li>
                    <span>{{ t("protectionsNmetrics.sections.0.list.0") }}</span>
                    <span>–</span>
                  </li>
                  <li>
                    <span>{{ t("protectionsNmetrics.sections.0.list.1") }}</span>
                    <span>–</span>
                  </li>
                  <li>
                    <span>{{ t("protectionsNmetrics.sections.0.list.2") }}</span>
                    <span>–</span>
                  </li>
                  <li>
                    <span>{{ t("protectionsNmetrics.sections.0.list.3") }}</span>
                    <span>–</span>
                  </li>
                  <li>
                    <span>{{ t("protectionsNmetrics.sections.0.list.4") }}</span>
                    <span>–</span>
                  </li>
                </ul>
              </li>
              <li>
                <img src="/assets/img/lock.svg" alt="lock icon" width="24" height="24" />
                <p>{{ t("protectionsNmetrics.sections.1.title") }}</p>
                <ul>
                  <li>
                    <span>{{ t("protectionsNmetrics.sections.1.list.0") }}</span>
                    <span>—</span>
                  </li>
                </ul>
              </li>
              <li>
                <img src="/assets/img/simcard.svg" alt="simcard icon" width="24" height="24" />
                <p>{{ t("protectionsNmetrics.sections.2.title") }}</p>
                <ul>
                  <li>{{ t("protectionsNmetrics.sections.2.list.0") }}</li>
                  <li>{{ t("protectionsNmetrics.sections.2.list.1") }}</li>
                  <li>{{ t("protectionsNmetrics.sections.2.list.2") }}</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="cookie__footer" ref="cookieFooter">
          <button class="cookie__button cookie__button-with" @click="toggleMaximize">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                stroke="inherit"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.57 18.5V14.6"
                stroke="inherit"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.57 7.45V5.5"
                stroke="inherit"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.57 12.65C17.0059 12.65 18.17 11.486 18.17 10.05C18.17 8.61407 17.0059 7.45001 15.57 7.45001C14.1341 7.45001 12.97 8.61407 12.97 10.05C12.97 11.486 14.1341 12.65 15.57 12.65Z"
                stroke="inherit"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.43 18.5V16.55"
                stroke="inherit"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.43 9.4V5.5"
                stroke="inherit"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.43 16.55C9.86594 16.55 11.03 15.3859 11.03 13.95C11.03 12.5141 9.86594 11.35 8.43 11.35C6.99406 11.35 5.83 12.5141 5.83 13.95C5.83 15.3859 6.99406 16.55 8.43 16.55Z"
                stroke="inherit"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ t("buttons.settings") }}
          </button>
          <button class="cookie__button cookie__button-primary" @click="handleClose">{{ t("buttons.save") }}</button>
          <button class="cookie__button cookie__button-ghost">{{ t("buttons.politics") }}</button>
        </div>
      </div>`,
  setup() {
    const { isFrameVisible, setIsFrameVisible } = Vue.inject("frameState");
    const { t } = VueI18n.useI18n();
    return {
      isFrameVisible,
      setIsFrameVisible,
      t,
    };
  },
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
    planDescription() {
      return this.t(`plans.${this.activePlan}.description`);
    },
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
        gtag(
          "consent",
          "default",
          JSON.parse(JSON.stringify(this.defaultConsent))
        );
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

    toggleMaximize() {
      this.isMaximized = !this.isMaximized;
    },

    handleScroll() {
      const TOP_PADDING = 40;

      const cookieBody = this.$refs.cookieBody;
      const scrollPosition = cookieBody.scrollTop;
      const scrollHeight = cookieBody.scrollHeight;
      const clientHeight = cookieBody.clientHeight;

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

    show() {
      this.setIsFrameVisible(true);
    },

    hide() {
      this.$el.style.animation = "hideDown 0.3s ease-out forwards";

      setTimeout(() => setIsFrameVisible(false), 300);
    },

    handleClose() {
      this.hide();
    },
  },
  mounted() {
    if (!document.cookie.match(/user-consent=([^;]+)/)?.[1]) {
      this.setDefaultGTAG();
      this.show();

      this.$refs?.cookieBody?.addEventListener("scroll", this.handleScroll);
    }
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
};

const FloatingCookie = {
  template: `
    <button
      v-if="!isFrameVisible"
      class="floating-cookie"
      @click="toggleVisible">Cookie</button>
  `,
  setup() {
    const { isFrameVisible, setIsFrameVisible } = Vue.inject("frameState");
    return {
      isFrameVisible,
      setIsFrameVisible,
    };
  },
  methods: {
    toggleVisible() {
      this.setIsFrameVisible(!this.isFrameVisible.value);
    },
  },
};

const app = Vue.createApp({
  components: {
    CookiePolicy,
    FloatingCookie,
  },
  render: () => Vue.h("div", [Vue.h(CookiePolicy), Vue.h(FloatingCookie)]),
});

const visible = Vue.ref(false);

const setIsFrameVisible = (value) => {
  visible.value = value;
};

app.provide("frameState", {
  isFrameVisible: visible,
  setIsFrameVisible,
});

const i18n = VueI18n.createI18n({
  legacy: false,
  locale: "ru",
  fallbackLocale: "en",
  messages: {
    ua: {
      buttons: {
        settings: "Налаштування",
        save: "Зберегти мої налаштування",
        politics: "Політика Конфіденційності",
      },
      title:
        "Ваші дані є вашою власністю, і ми підтримуємо ваше право на конфіденційність і прозорість.",
      subtitle:
        "Щоб забезпечити вам найкращий досвід користування нашим сайтом, ми використовуємо файли cookie або подібні технології. Виберіть рівень доступу до даних, щоб вирішити, для яких цілей ми можемо використовувати та передавати ваші дані.",

      plans: {
        default: {
          title: "Конфіденційність",
          description:
            "Найвищий рівень конфіденційності. Доступ до даних лише для необхідних базових операцій. Дані передаються третім особам, щоб забезпечити безпеку сайту та його роботу на вашому пристрої.",
          prefs: {
            title: "Базові операції",
            description:
              "Цей тип обміну даними необхідний для доступу до інформації, яка забезпечує безпеку сайту та його коректну роботу.",
            list: {
              title: "Дані, до яких є доступ:",
              items: [
                "Анонімні дані, як-от назва та версія браузера",
                "Псевдонімні дані, як-от токен автентифікації",
              ],
            },
          },
        },
        balanced: {
          title: "Збалансований",
          description:
            "Збалансований досвід. Доступ до даних для персоналізації контенту та оптимізації сайту. Дані, надані третім особам, можуть бути використані для відстеження вас і збереження ваших уподобань щодо цього сайту.",
          prefs1: {
            title: "Персоналізація контенту",
            description:
              "Коли увімкнено, ви дозволяєте нам зберігати ваші вподобання та створювати профіль про вас, щоб надавати персоналізований контент.",
            list: {
              title: "Дані, до яких є доступ:",
              items: [
                "Анонімні дані, як-от тип пристрою, модель та операційна система",
                "Псевдонімні дані, як-от вподобання у перегляді сайту",
                "Особисті дані, як-от ваша IP-адреса та місцезнаходження",
              ],
            },
          },
          prefs2: {
            title: "Оптимізація сайту",
            description:
              "Коли увімкнено, ви дозволяєте нам відстежувати вашу поведінку для аналізу та покращення послуг на нашому сайті для всіх відвідувачів.",
            list: {
              title: "Дані, до яких є доступ:",
              items: [
                "Анонімні дані, як-от адреса попередньо відвіданого сайту (HTTP Referer)",
                "Псевдонімні дані, як-от ідентифікатори активності на сайті",
                "Особисті дані, як-от історія контенту, пошуку та покупок",
              ],
            },
          },
        },
        personalized: {
          title: "Персоналізований",
          description:
            "Найвищий рівень персоналізації. Доступ до даних, щоб зробити рекламу та медіа більш релевантними. Дані, надані третім особам, можуть бути використані для відстеження вас на цьому сайті та інших сайтах, які ви відвідуєте.",
          prefs: {
            title: "Персоналізація реклами",
            description:
              "Коли увімкнено, ви дозволяєте нам ділитися даними з нашими рекламними партнерами, які створюють профілі про вас на основі декількох сайтів.",
            list: {
              title: "Дані, до яких є доступ:",
              items: [
                "Анонімні дані, як-от партнерські реферальні посилання",
                "Псевдонімні дані, як-от ідентифікатори, що використовуються для відстеження і створення профілів користувачів",
                "Особисті дані, як-от ваш вік, стать та демографічні дані",
              ],
            },
          },
        },
      },
      prefs: {
        title: "Преференції щодо згоди",
        description:
          "Використовуйте перемикачі нижче, щоб вказати ваші цілі обміну даними на цьому веб-сайті.",
      },
      protectionsNmetrics: {
        title: "Захист і метрики",
        description:
          "Перегляньте запис вашої згоди та список третіх осіб, заблокованих або дозволених на основі ваших налаштувань.",
        sections: [
          {
            title: "Метрики згоди",
            list: [
              "ID згоди",
              "Дата згоди",
              "Рівень доступу до даних",
              "Категорії цілей",
              "Тривалість згоди",
            ],
          },
          { title: "Захист конфіденційності", list: ["Заблоковані сервіси"] },
          {
            title: "Захист даних",
            list: ["Google Fonts", "Google Tag Manager", "Facebook"],
          },
        ],
      },
    },

    en: {
      buttons: {
        settings: "Settings",
        save: "Save my settings",
        politics: "Privacy Policy",
      },
      title:
        "Your data is your property, and we support your right to privacy and transparency.",
      subtitle:
        "To provide you with the best experience on our website, we use cookies or similar technologies. Select the level of data access to decide the purposes for which we can use and share your data.",

      plans: {
        default: {
          title: "Privacy",
          description:
            "The highest level of privacy. Access to data only for necessary basic operations. Data is shared with third parties to ensure the security of the website and its operation on your device.",
          prefs: {
            title: "Basic Operations",
            description:
              "This type of data sharing is necessary for us to access the information required to ensure the security and proper functioning of the website.",
            list: {
              title: "Data Accessed:",
              items: [
                "Anonymous data like browser name and version",
                "Pseudonymous data like authentication token",
              ],
            },
          },
        },
        balanced: {
          title: "Balanced",
          description:
            "A balanced experience. Access to data for content personalization and website optimization. Data shared with third parties may be used to track you and store your preferences for this website.",
          prefs1: {
            title: "Content Personalization",
            description:
              "When enabled, you allow us to save your preferences and create a profile about you to deliver personalized content.",
            list: {
              title: "Data Accessed:",
              items: [
                "Anonymous data like device type, model, and operating system",
                "Pseudonymous data like site browsing preferences",
                "Personal data like your IP address and location",
              ],
            },
          },
          prefs2: {
            title: "Site Optimization",
            description:
              "When enabled, you allow us to monitor your behavior to analyze and improve the services on our website for all visitors.",
            list: {
              title: "Data Accessed:",
              items: [
                "Anonymous data like the address of the previously visited website (HTTP Referer)",
                "Pseudonymous data like website activity identifiers",
                "Personal data like content, search, and purchase history",
              ],
            },
          },
        },
        personalized: {
          title: "Personalized",
          description:
            "The highest level of personalization. Access to data to make ads and media more relevant. Data shared with third parties may be used to track you on this and other websites you visit.",
          prefs: {
            title: "Ad Personalization",
            description:
              "When enabled, you allow us to share data with our advertising partners who build profiles about you across multiple websites.",
            list: {
              title: "Data Accessed:",
              items: [
                "Anonymous data like affiliate referral links",
                "Pseudonymous data like identifiers used to track and profile users",
                "Personal data like your age, gender, and demographics",
              ],
            },
          },
        },
      },
      prefs: {
        title: "Consent Preferences",
        description:
          "Use the toggles below to specify your data-sharing preferences on this website.",
      },
      protectionsNmetrics: {
        title: "Protections and Metrics",
        description:
          "View your consent record and the list of third parties blocked or allowed based on your settings.",
        sections: [
          {
            title: "Consent Metrics",
            list: [
              "Consent ID",
              "Date of Consent",
              "Data Access Level",
              "Purpose Categories",
              "Duration of Consent",
            ],
          },
          { title: "Privacy Protection", list: ["Blocked Services"] },
          {
            title: "Data Protection",
            list: ["Google Fonts", "Google Tag Manager", "Facebook"],
          },
        ],
      },
    },
    ru: {
      buttons: {
        settings: "Настройки",
        save: "Сохранить мои настройки",
        politics: "Политика конфиденциальности",
      },
      title:
        "Ваши данные — это ваша собственность, и мы поддерживаем ваше право на конфиденциальность и прозрачность.",
      subtitle:
        "Чтобы предоставить вам наилучший опыт использования нашего сайта, мы используем файлы cookie или аналогичные технологии. Выберите уровень доступа к данным, чтобы решить, для каких целей мы можем использовать и передавать ваши данные.",

      plans: {
        default: {
          title: "Конфиденциальность",
          description:
            "Наивысший уровень конфиденциальности. Доступ к данным только для необходимых базовых операций. Данные передаются третьим сторонам для обеспечения безопасности сайта и его работы на вашем устройстве.",
          prefs: {
            title: "Базовые операции",
            description:
              "Этот тип обмена данными необходим для получения информации, которая обеспечивает безопасность сайта и его корректную работу.",
            list: {
              title: "Данные, к которым есть доступ:",
              items: [
                "Анонимные данные, такие как название и версия браузера",
                "Псевдонимные данные, такие как токен аутентификации",
              ],
            },
          },
        },
        balanced: {
          title: "Сбалансированный",
          description:
            "Сбалансированный опыт. Доступ к данным для персонализации контента и оптимизации сайта. Данные, переданные третьим сторонам, могут быть использованы для отслеживания вас и сохранения ваших предпочтений для этого сайта.",
          prefs1: {
            title: "Персонализация контента",
            description:
              "Когда включено, вы позволяете нам сохранять ваши предпочтения и создавать профиль о вас, чтобы предоставлять персонализированный контент.",
            list: {
              title: "Данные, к которым есть доступ:",
              items: [
                "Анонимные данные, такие как тип устройства, модель и операционная система",
                "Псевдонимные данные, такие как предпочтения просмотра сайта",
                "Личные данные, такие как ваш IP-адрес и местоположение",
              ],
            },
          },
          prefs2: {
            title: "Оптимизация сайта",
            description:
              "Когда включено, вы позволяете нам отслеживать ваше поведение для анализа и улучшения услуг на нашем сайте для всех посетителей.",
            list: {
              title: "Данные, к которым есть доступ:",
              items: [
                "Анонимные данные, такие как адрес ранее посещённого сайта (HTTP Referer)",
                "Псевдонимные данные, такие как идентификаторы активности на сайте",
                "Личные данные, такие как история контента, поиска и покупок",
              ],
            },
          },
        },
        personalized: {
          title: "Персонализированный",
          description:
            "Наивысший уровень персонализации. Доступ к данным для более релевантной рекламы и медиа. Данные, переданные третьим сторонам, могут быть использованы для отслеживания вас на этом и других сайтах, которые вы посещаете.",
          prefs: {
            title: "Персонализация рекламы",
            description:
              "Когда включено, вы позволяете нам делиться данными с нашими рекламными партнёрами, которые создают профили о вас на основе данных с нескольких сайтов.",
            list: {
              title: "Данные, к которым есть доступ:",
              items: [
                "Анонимные данные, такие как партнёрские реферальные ссылки",
                "Псевдонимные данные, такие как идентификаторы, используемые для отслеживания и создания профилей пользователей",
                "Личные данные, такие как ваш возраст, пол и демографические данные",
              ],
            },
          },
        },
      },
      prefs: {
        title: "Настройки согласия",
        description:
          "Используйте переключатели ниже, чтобы указать свои цели обмена данными на этом сайте.",
      },
      protectionsNmetrics: {
        title: "Защита и метрики",
        description:
          "Просмотрите запись вашего согласия и список третьих сторон, которые заблокированы или разрешены в соответствии с вашими настройками.",
        sections: [
          {
            title: "Метрики согласия",
            list: [
              "ID согласия",
              "Дата согласия",
              "Уровень доступа к данным",
              "Категории целей",
              "Срок действия согласия",
            ],
          },
          {
            title: "Защита конфиденциальности",
            list: ["Заблокированные сервисы"],
          },
          {
            title: "Защита данных",
            list: ["Google Fonts", "Google Tag Manager", "Facebook"],
          },
        ],
      },
    },
  },
});

app.use(i18n);
app.mount("#cookie");

function generateUID(length) {
  const letters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
}
