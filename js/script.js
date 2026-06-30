    const buttons = document.querySelectorAll(".tab-button");
    const panels = document.querySelectorAll(".panel");
    const disabledLinks = document.querySelectorAll(".button.disabled");
    const tabLinks = document.querySelectorAll("[data-tab-link]");
    const quoteSlides = document.querySelectorAll(".quote-slide");
    const dotsContainer = document.querySelector(".carousel-dots");
    const prevQuote = document.querySelector(".carousel-prev");
    const nextQuote = document.querySelector(".carousel-next");
    const scrollTopButton = document.querySelector(".scroll-top");
    const treatmentToggles = document.querySelectorAll(".treatment-toggle");
    const productToggles = document.querySelectorAll(".product-toggle");
    const topbar = document.querySelector(".topbar");
    const navToggle = document.querySelector(".nav-toggle");
    let currentQuote = 0;

    function activateTab(tabName) {
      buttons.forEach((button) => {
        const isActive = button.dataset.tab === tabName;
        button.setAttribute("aria-selected", String(isActive));
      });

      panels.forEach((panel) => {
        panel.classList.toggle("active", panel.id === tabName);
      });

      const target = document.getElementById(tabName);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        activateTab(button.dataset.tab);
        topbar?.classList.remove("nav-open");
        navToggle?.setAttribute("aria-expanded", "false");
      });
    });

    tabLinks.forEach((link) => {
      link.addEventListener("click", () => activateTab(link.dataset.tabLink));
    });

    disabledLinks.forEach((link) => {
      link.addEventListener("click", (event) => event.preventDefault());
    });

    function showQuote(index) {
      if (!quoteSlides.length) return;

      currentQuote = (index + quoteSlides.length) % quoteSlides.length;

      quoteSlides.forEach((slide, slideIndex) => {
        slide.classList.toggle("active", slideIndex === currentQuote);
      });

      document.querySelectorAll(".carousel-dot").forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === currentQuote);
      });
    }

    if (quoteSlides.length && dotsContainer) {
      quoteSlides.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.className = `carousel-dot${index === 0 ? " active" : ""}`;
        dotsContainer.appendChild(dot);
      });

      prevQuote?.addEventListener("click", () => showQuote(currentQuote - 1));
      nextQuote?.addEventListener("click", () => showQuote(currentQuote + 1));

      window.setInterval(() => {
        showQuote(currentQuote + 1);
      }, 11000);
    }

    if (scrollTopButton) {
      window.addEventListener("scroll", () => {
        scrollTopButton.classList.toggle("visible", window.scrollY > 520);
      });

      scrollTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    treatmentToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const card = toggle.closest(".treatment-card");
        const isOpen = card.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.querySelector(".toggle-icon").textContent = isOpen ? "-" : "+";
      });
    });

    productToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const card = toggle.closest(".product-card");
        const isOpen = card.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.querySelector(".toggle-icon").textContent = isOpen ? "-" : "+";
      });
    });

    navToggle?.addEventListener("click", () => {
      const isOpen = topbar.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
