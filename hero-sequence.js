(function () {
  const TYPING_START_DELAY_MS = 350;
  const MIN_TYPING_MS = 2500;
  const REST_AFTER_ACHIEVEMENTS_MS = 400;
  const BUBBLE_GAP_MS = 460;
  const SHELL_EXPAND_MS = 720;
  const profileImage = document.querySelector(".profile-photo__base");

  function initChatReveal() {
    document.querySelector(".hero__response-extra")?.classList.add("chat-reveal");

    document.querySelectorAll(".chat__rest .bubble, .chat__rest .case-card").forEach((item) => {
      item.classList.add("chat-reveal");
    });
  }

  function getChatRevealItems() {
    const extra = document.querySelector(".hero__response-extra");
    const restItems = document.querySelectorAll(".chat__rest .chat-reveal");
    return [extra, ...restItems].filter(Boolean);
  }

  function waitForImage(img) {
    if (!img) return Promise.resolve();
    if (img.complete) return Promise.resolve();
    return new Promise((resolve) => {
      img.addEventListener("load", resolve, { once: true });
      img.addEventListener("error", resolve, { once: true });
    });
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function waitForMinTyping(since) {
    const remaining = Math.max(0, MIN_TYPING_MS - (performance.now() - since));
    return wait(remaining);
  }

  function preloadChatAssets() {
    return Promise.all([document.fonts.ready, waitForImage(profileImage)]);
  }

  function revealItem(item) {
    return new Promise((resolve) => {
      item.classList.add("is-revealed");
      item.setAttribute("aria-hidden", "false");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          item.classList.add("is-visible");
          resolve();
        });
      });
    });
  }

  async function revealChatRest() {
    const chatRest = document.querySelector(".chat__rest");
    const items = getChatRevealItems();

    await wait(REST_AFTER_ACHIEVEMENTS_MS);
    chatRest?.setAttribute("aria-hidden", "false");

    for (const item of items) {
      await revealItem(item);
      await wait(BUBBLE_GAP_MS);
    }

    document.body.classList.add("chat-complete");
  }

  async function revealHero() {
    try {
      const assetsReady = preloadChatAssets();

      await wait(TYPING_START_DELAY_MS);
      document.body.classList.add("hero-typing");

      const typingStartedAt = performance.now();
      const typing = document.querySelector(".typing-indicator");
      const message = document.querySelector(".typing-indicator__message");
      const dots = document.querySelector(".typing-indicator__dots");

      typing?.setAttribute("aria-hidden", "false");
      message?.setAttribute("aria-hidden", "false");
      dots?.setAttribute("aria-hidden", "false");

      await Promise.all([assetsReady, waitForMinTyping(typingStartedAt)]);

      document.body.classList.add("hero-replied");
      dots?.setAttribute("aria-hidden", "true");

      await wait(SHELL_EXPAND_MS);
      message?.classList.add("is-text-visible");

      await revealChatRest();
    } catch (error) {
      document.body.classList.add("hero-typing", "hero-replied", "chat-complete");

      document.querySelector(".chat__rest")?.setAttribute("aria-hidden", "false");
      getChatRevealItems().forEach((item) => {
        item.classList.add("is-revealed", "is-visible");
        item.setAttribute("aria-hidden", "false");
      });
      document.querySelector(".typing-indicator__message")?.classList.add("is-text-visible");
    }
  }

  initChatReveal();
  revealHero();
})();
