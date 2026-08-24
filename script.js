
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu-btn");
  const links = document.querySelector(".nav-links");
  if (menu && links) {
    menu.addEventListener("click", () => {
      links.classList.toggle("open");
      menu.setAttribute("aria-expanded", links.classList.contains("open"));
    });
    links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));
  }

  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        reveal.unobserve(entry.target);
      }
    });
  }, {threshold: .12});
  document.querySelectorAll(".reveal").forEach(el => reveal.observe(el));

  const year = document.querySelectorAll("[data-year]");
  year.forEach(el => el.textContent = new Date().getFullYear());

  // Active navigation based on scroll position on the home page.
  const sections = [...document.querySelectorAll("main section[id]")];
  const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  if (sections.length && navAnchors.length) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY + 120;
      let current = "";
      sections.forEach(section => { if (y >= section.offsetTop) current = section.id; });
      navAnchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
    }, {passive:true});
  }
});
