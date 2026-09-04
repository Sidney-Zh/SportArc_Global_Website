(function () {
  "use strict";

  const GTM_CONTAINER_ID = "GTM-55QCXJD4";
  const GLOBAL_APP_STORE_ID = "6768219425";
  const CONSENT_COOKIE_NAME = "sportarc_cookie_consent";
  const CONSENT_COOKIE_VERSION = "v2";
  const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;
  const CONSENT_GRANTED = "analytics";
  const CONSENT_DENIED = "necessary";
  const LEGACY_STORAGE_KEY = "sportarc.analytics.consent.v1";
  const PRIVACY_REGION_PATH = "/__sportarc/privacy-region";
  const SUPPORTED_LOCALES = new Set(["en", "zh-CN", "zh-TW", "de", "fr", "ja", "ko"]);

  const COPY = {
    en: {
      title: "We use cookies",
      description:
        "We use necessary cookies to make this website work. With your permission, we also use analytics cookies to understand how visitors use SportArc and improve the website.",
      necessaryOnly: "Use necessary cookies only",
      customize: "Customize",
      allowAll: "Allow all",
      settings: "Cookie settings",
      privacy: "Privacy Policy",
      detailTitle: "Cookie settings",
      detailDescription:
        "Choose which optional cookies SportArc may use. You can change your choice at any time.",
      necessaryTitle: "Necessary",
      necessaryStatus: "Always active",
      necessaryDescription:
        "Required to remember your cookie choice and provide the website securely.",
      analyticsTitle: "Analytics",
      analyticsDescription:
        "Helps us understand website usage and improve performance and content. Use the switch to enable or disable analytics.",
      analyticsToggle: "Allow analytics cookies",
      save: "Save preferences",
      close: "Close cookie settings",
    },
    "zh-CN": {
      title: "我们使用 Cookie",
      description:
        "我们使用必要 Cookie 保障网站正常运行。经您允许，我们还会使用分析 Cookie，帮助我们了解网站的使用情况并改善 SportArc。",
      necessaryOnly: "仅使用必要 Cookie",
      customize: "自定义",
      allowAll: "全部允许",
      settings: "Cookie 设置",
      privacy: "隐私政策",
      detailTitle: "Cookie 设置",
      detailDescription: "选择 SportArc 可以使用的可选 Cookie。您可以随时更改选择。",
      necessaryTitle: "必要 Cookie",
      necessaryStatus: "始终启用",
      necessaryDescription: "用于记住您的 Cookie 选择，并安全地提供网站服务。",
      analyticsTitle: "分析 Cookie",
      analyticsDescription:
        "帮助我们了解网站使用情况，改善性能和内容。您可以使用开关启用或停用分析。",
      analyticsToggle: "允许分析 Cookie",
      save: "保存选择",
      close: "关闭 Cookie 设置",
    },
    "zh-TW": {
      title: "我們使用 Cookie",
      description:
        "我們使用必要 Cookie 保障網站正常運作。經您允許，我們也會使用分析 Cookie，協助我們瞭解網站的使用情況並改善 SportArc。",
      necessaryOnly: "僅使用必要 Cookie",
      customize: "自訂",
      allowAll: "全部允許",
      settings: "Cookie 設定",
      privacy: "隱私權政策",
      detailTitle: "Cookie 設定",
      detailDescription: "選擇 SportArc 可以使用的可選 Cookie。您可以隨時變更選擇。",
      necessaryTitle: "必要 Cookie",
      necessaryStatus: "永遠啟用",
      necessaryDescription: "用於記住您的 Cookie 選擇，並安全地提供網站服務。",
      analyticsTitle: "分析 Cookie",
      analyticsDescription:
        "協助我們瞭解網站使用情況，改善效能和內容。您可以使用開關啟用或停用分析。",
      analyticsToggle: "允許分析 Cookie",
      save: "儲存選擇",
      close: "關閉 Cookie 設定",
    },
    de: {
      title: "Wir verwenden Cookies",
      description:
        "Wir verwenden notwendige Cookies, damit diese Website funktioniert. Mit deiner Zustimmung verwenden wir außerdem Analyse-Cookies, um die Nutzung von SportArc zu verstehen und die Website zu verbessern.",
      necessaryOnly: "Nur notwendige Cookies",
      customize: "Anpassen",
      allowAll: "Alle zulassen",
      settings: "Cookie-Einstellungen",
      privacy: "Datenschutzerklärung",
      detailTitle: "Cookie-Einstellungen",
      detailDescription:
        "Wähle aus, welche optionalen Cookies SportArc verwenden darf. Du kannst deine Auswahl jederzeit ändern.",
      necessaryTitle: "Notwendig",
      necessaryStatus: "Immer aktiv",
      necessaryDescription:
        "Erforderlich, um deine Cookie-Auswahl zu speichern und die Website sicher bereitzustellen.",
      analyticsTitle: "Analyse",
      analyticsDescription:
        "Hilft uns, die Nutzung der Website zu verstehen und Leistung und Inhalte zu verbessern. Über den Schalter kannst du die Analyse aktivieren oder deaktivieren.",
      analyticsToggle: "Analyse-Cookies zulassen",
      save: "Auswahl speichern",
      close: "Cookie-Einstellungen schließen",
    },
    fr: {
      title: "Nous utilisons des cookies",
      description:
        "Nous utilisons des cookies nécessaires au fonctionnement du site. Avec votre accord, nous utilisons aussi des cookies d’analyse pour comprendre l’utilisation de SportArc et améliorer le site.",
      necessaryOnly: "Cookies nécessaires uniquement",
      customize: "Personnaliser",
      allowAll: "Tout accepter",
      settings: "Paramètres des cookies",
      privacy: "Politique de confidentialité",
      detailTitle: "Paramètres des cookies",
      detailDescription:
        "Choisissez les cookies facultatifs que SportArc peut utiliser. Vous pouvez modifier votre choix à tout moment.",
      necessaryTitle: "Nécessaires",
      necessaryStatus: "Toujours actifs",
      necessaryDescription:
        "Nécessaires pour mémoriser votre choix et fournir le site de manière sécurisée.",
      analyticsTitle: "Analyse",
      analyticsDescription:
        "Nous aide à comprendre l’utilisation du site et à améliorer ses performances et son contenu. Utilisez le bouton pour activer ou désactiver l’analyse.",
      analyticsToggle: "Autoriser les cookies d’analyse",
      save: "Enregistrer les préférences",
      close: "Fermer les paramètres des cookies",
    },
    ja: {
      title: "Cookie を使用しています",
      description:
        "このウェブサイトの提供に必要な Cookie を使用しています。お客様の許可がある場合に限り、SportArc の利用状況を把握してサイトを改善するための解析 Cookie も使用します。",
      necessaryOnly: "必要な Cookie のみ",
      customize: "設定する",
      allowAll: "すべて許可",
      settings: "Cookie 設定",
      privacy: "プライバシーポリシー",
      detailTitle: "Cookie 設定",
      detailDescription:
        "SportArc が使用できる任意の Cookie を選択します。選択内容はいつでも変更できます。",
      necessaryTitle: "必要な Cookie",
      necessaryStatus: "常に有効",
      necessaryDescription:
        "Cookie の選択内容を保存し、ウェブサイトを安全に提供するために必要です。",
      analyticsTitle: "アクセス解析",
      analyticsDescription:
        "ウェブサイトの利用状況を把握し、性能やコンテンツの改善に役立てます。スイッチで解析を有効または無効にできます。",
      analyticsToggle: "解析 Cookie を許可",
      save: "選択を保存",
      close: "Cookie 設定を閉じる",
    },
    ko: {
      title: "쿠키를 사용합니다",
      description:
        "웹사이트 운영에 필요한 쿠키를 사용합니다. 허용하신 경우에만 SportArc 이용 방식을 이해하고 웹사이트를 개선하기 위한 분석 쿠키도 사용합니다.",
      necessaryOnly: "필수 쿠키만 사용",
      customize: "맞춤 설정",
      allowAll: "모두 허용",
      settings: "쿠키 설정",
      privacy: "개인정보 처리방침",
      detailTitle: "쿠키 설정",
      detailDescription:
        "SportArc가 사용할 수 있는 선택적 쿠키를 선택하세요. 언제든지 선택을 변경할 수 있습니다.",
      necessaryTitle: "필수 쿠키",
      necessaryStatus: "항상 활성화",
      necessaryDescription:
        "쿠키 선택을 기억하고 웹사이트를 안전하게 제공하는 데 필요합니다.",
      analyticsTitle: "분석 쿠키",
      analyticsDescription:
        "웹사이트 이용 방식을 이해하고 성능과 콘텐츠를 개선하는 데 도움이 됩니다. 스위치로 분석을 켜거나 끌 수 있습니다.",
      analyticsToggle: "분석 쿠키 허용",
      save: "선택 저장",
      close: "쿠키 설정 닫기",
    },
  };

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }

  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });

  function readStoredConsent() {
    const prefix = `${CONSENT_COOKIE_NAME}=`;
    const value = document.cookie
      .split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith(prefix))
      ?.slice(prefix.length);
    const decoded = value ? decodeURIComponent(value) : "";
    if (decoded === `${CONSENT_COOKIE_VERSION}.${CONSENT_GRANTED}`) return CONSENT_GRANTED;
    if (decoded === `${CONSENT_COOKIE_VERSION}.${CONSENT_DENIED}`) return CONSENT_DENIED;
    return null;
  }

  function storeConsent(value) {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(`${CONSENT_COOKIE_VERSION}.${value}`)}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
    try {
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch (_error) {
      // A blocked localStorage API does not affect the first-party consent cookie.
    }
  }

  let currentConsent = readStoredConsent();
  let gtmRequested = false;

  function updateGoogleConsent(value) {
    gtag("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: value === CONSENT_GRANTED ? "granted" : "denied",
    });
  }

  function loadGTM() {
    if (gtmRequested || currentConsent !== CONSENT_GRANTED) return;
    gtmRequested = true;

    window.dataLayer.push({
      "gtm.start": Date.now(),
      event: "gtm.js",
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_CONTAINER_ID)}`;
    script.dataset.sportarcGtm = GTM_CONTAINER_ID;
    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }

  async function explicitConsentIsRequired() {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 1500);

    try {
      const response = await fetch(PRIVACY_REGION_PATH, {
        cache: "no-store",
        credentials: "same-origin",
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      if (!response.ok) return true;
      const result = await response.json();
      return result.explicitConsentRequired !== false;
    } catch (_error) {
      return true;
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function pageLocale() {
    const bodyLocale = document.body?.dataset.locale;
    if (SUPPORTED_LOCALES.has(bodyLocale)) return bodyLocale;
    const htmlLocale = document.documentElement.lang;
    return SUPPORTED_LOCALES.has(htmlLocale) ? htmlLocale : "en";
  }

  function pageType() {
    return document.body?.dataset.page || "legal";
  }

  function ctaLocation(link) {
    if (link.dataset.ctaLocation) return link.dataset.ctaLocation;
    if (pageType() === "support") return "support_nav";
    if (link.classList.contains("mobile-store-link")) return "mobile_nav";
    if (link.closest(".nav-actions")) return "desktop_nav";
    if (link.closest(".hero-copy")) return "hero";
    if (link.closest(".footer-cta")) return "closing";
    return "other";
  }

  function isGlobalAppStoreLink(link) {
    if (!link) return false;

    try {
      const url = new URL(link.href, document.baseURI);
      return url.hostname === "apps.apple.com" && url.pathname.endsWith(`/id${GLOBAL_APP_STORE_ID}`);
    } catch (_error) {
      return false;
    }
  }

  function trackAppStoreClick(event) {
    const link = event.target.closest?.("a[href]");
    if (!isGlobalAppStoreLink(link) || currentConsent !== CONSENT_GRANTED) return;

    window.dataLayer.push({
      event: "app_store_click",
      cta_location: ctaLocation(link),
      page_locale: pageLocale(),
      page_type: pageType(),
      link_url: link.href,
    });
  }

  function mountConsentControls(requiresExplicitConsent) {
    const locale = pageLocale();
    const copy = COPY[locale] || COPY.en;
    let returnFocus = null;
    let openedFromSettings = false;

    const panel = document.createElement("section");
    panel.className = "analytics-consent";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "false");
    panel.setAttribute("aria-labelledby", "analytics-consent-title");
    panel.setAttribute("aria-describedby", "analytics-consent-description");
    panel.hidden = currentConsent !== null || !requiresExplicitConsent;
    panel.innerHTML = `
      <div class="analytics-consent__inner">
        <div class="analytics-consent__brand" aria-hidden="true">
          <img src="/assets/AppIcon_cornor-128.png" alt="" width="48" height="48">
          <span>SportArc</span>
        </div>
        <div class="analytics-consent__content">
          <div class="analytics-consent__view" data-consent-summary>
            <h2 id="analytics-consent-title">${copy.title}</h2>
            <p id="analytics-consent-description">${copy.description}</p>
            <a href="/privacy/">${copy.privacy}</a>
          </div>
          <div class="analytics-consent__view analytics-consent__view--details" data-consent-details hidden>
            <h2>${copy.detailTitle}</h2>
            <p>${copy.detailDescription}</p>
            <div class="analytics-consent__categories">
              <div class="analytics-consent__category">
                <div>
                  <h3>${copy.necessaryTitle}</h3>
                  <p>${copy.necessaryDescription}</p>
                </div>
                <span class="analytics-consent__status">${copy.necessaryStatus}</span>
              </div>
              <div class="analytics-consent__category">
                <div>
                  <h3>${copy.analyticsTitle}</h3>
                  <p>${copy.analyticsDescription}</p>
                </div>
                <label class="analytics-consent__switch">
                  <span class="analytics-consent__sr-only">${copy.analyticsToggle}</span>
                  <input type="checkbox" data-consent-analytics-toggle>
                  <span class="analytics-consent__switch-track" aria-hidden="true"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="analytics-consent__actions" data-consent-summary-actions>
          <button class="analytics-consent__button" type="button" data-consent-necessary>${copy.necessaryOnly}</button>
          <button class="analytics-consent__button" type="button" data-consent-customize>${copy.customize}</button>
          <button class="analytics-consent__button" type="button" data-consent-allow>${copy.allowAll}</button>
        </div>
        <div class="analytics-consent__actions analytics-consent__actions--details" data-consent-details-actions hidden>
          <button class="analytics-consent__button" type="button" data-consent-necessary>${copy.necessaryOnly}</button>
          <button class="analytics-consent__button" type="button" data-consent-save>${copy.save}</button>
          <button class="analytics-consent__button" type="button" data-consent-allow>${copy.allowAll}</button>
        </div>
        <button class="analytics-consent__close" type="button" aria-label="${copy.close}" data-consent-close hidden>
          <span aria-hidden="true"></span>
        </button>
      </div>
    `;
    document.body.appendChild(panel);

    const settingsButton = document.createElement("button");
    settingsButton.className = "analytics-settings-button";
    settingsButton.type = "button";
    settingsButton.textContent = copy.settings;
    settingsButton.setAttribute("aria-haspopup", "dialog");

    const footerBottom = document.querySelector(".footer-bottom");
    if (footerBottom) {
      footerBottom.appendChild(settingsButton);
    } else {
      const legalContainer = document.querySelector("body > .container");
      if (legalContainer) {
        const row = document.createElement("p");
        row.className = "analytics-settings-row";
        row.appendChild(settingsButton);
        legalContainer.appendChild(row);
      } else {
        settingsButton.classList.add("analytics-settings-button--floating");
        document.body.appendChild(settingsButton);
      }
    }

    const summary = panel.querySelector("[data-consent-summary]");
    const details = panel.querySelector("[data-consent-details]");
    const summaryActions = panel.querySelector("[data-consent-summary-actions]");
    const detailsActions = panel.querySelector("[data-consent-details-actions]");
    const analyticsToggle = panel.querySelector("[data-consent-analytics-toggle]");
    const closeButton = panel.querySelector("[data-consent-close]");

    function setDetailsVisible(isVisible) {
      summary.hidden = isVisible;
      summaryActions.hidden = isVisible;
      details.hidden = !isVisible;
      detailsActions.hidden = !isVisible;
      panel.classList.toggle("analytics-consent--details", isVisible);
      panel.setAttribute(
        "aria-labelledby",
        isVisible ? "analytics-consent-detail-title" : "analytics-consent-title",
      );
      const detailHeading = details.querySelector("h2");
      if (detailHeading) detailHeading.id = "analytics-consent-detail-title";
    }

    function closePanel() {
      panel.hidden = true;
      returnFocus?.focus();
      returnFocus = null;
      openedFromSettings = false;
    }

    function showSettings() {
      returnFocus = settingsButton;
      openedFromSettings = true;
      analyticsToggle.checked = currentConsent === CONSENT_GRANTED;
      closeButton.hidden = false;
      setDetailsVisible(true);
      panel.hidden = false;
      analyticsToggle.focus();
    }

    function applyConsent(value) {
      const hadLoadedGTM = gtmRequested;
      currentConsent = value;
      storeConsent(currentConsent);
      updateGoogleConsent(currentConsent);
      if (currentConsent === CONSENT_GRANTED) {
        loadGTM();
        closePanel();
        return;
      }
      if (hadLoadedGTM) {
        window.location.reload();
        return;
      }
      closePanel();
    }

    settingsButton.addEventListener("click", showSettings);

    panel.querySelectorAll("[data-consent-necessary]").forEach((button) => {
      button.addEventListener("click", () => applyConsent(CONSENT_DENIED));
    });

    panel.querySelectorAll("[data-consent-allow]").forEach((button) => {
      button.addEventListener("click", () => applyConsent(CONSENT_GRANTED));
    });

    panel.querySelector("[data-consent-customize]")?.addEventListener("click", () => {
      analyticsToggle.checked = false;
      setDetailsVisible(true);
      analyticsToggle.focus();
    });

    panel.querySelector("[data-consent-save]")?.addEventListener("click", () => {
      applyConsent(analyticsToggle.checked ? CONSENT_GRANTED : CONSENT_DENIED);
    });

    closeButton.addEventListener("click", closePanel);

    panel.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !openedFromSettings) return;
      event.preventDefault();
      closePanel();
    });
  }

  async function initializeConsent() {
    let requiresExplicitConsent = false;

    if (currentConsent === CONSENT_GRANTED) {
      updateGoogleConsent(CONSENT_GRANTED);
      loadGTM();
    } else if (currentConsent === null) {
      requiresExplicitConsent = await explicitConsentIsRequired();
      if (!requiresExplicitConsent) {
        currentConsent = CONSENT_GRANTED;
        updateGoogleConsent(CONSENT_GRANTED);
        loadGTM();
      }
    }

    mountConsentControls(requiresExplicitConsent);
  }

  document.addEventListener("click", trackAppStoreClick, true);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeConsent, { once: true });
  } else {
    initializeConsent();
  }
})();
