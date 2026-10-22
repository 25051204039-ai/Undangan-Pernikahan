"use strict";
 
const CONFIG = {
  startUTC: Date.UTC(2027, 1, 20, 1, 0),
};
 
const $ = (id) => document.getElementById(id);
 
function initGuestName() {
  const name = decodeURIComponent(location.hash.slice(1))
    .replace(/[-_]+/g, " ")
    .trim()
    .slice(0, 40);
 
  if (!name) return;
  $("guestName").textContent = name;
}
 
function initCover() {
  const cover = $("cover");
  document.body.style.overflow = "hidden";
 
  $("openBtn").addEventListener("click", () => {
    cover.classList.add("open");
    document.body.style.overflow = "";
    window.scrollTo(0, 0);
    setTimeout(() => (cover.style.visibility = "hidden"), 1300);
  });
}
 
function initCountdown() {
  const els = {
    days: $("cdDays"),
    hours: $("cdHours"),
    minutes: $("cdMinutes"),
    seconds: $("cdSeconds"),
  };
 
  function update() {
    const total = Math.max(0, Math.floor((CONFIG.startUTC - Date.now()) / 1000));
 
    els.days.textContent = Math.floor(total / 86400);
    els.hours.textContent = Math.floor((total % 86400) / 3600);
    els.minutes.textContent = Math.floor((total % 3600) / 60);
    els.seconds.textContent = total % 60;
  }
 
  update();
  setInterval(update, 1000);
}
 
function initReveal() {
  const items = document.querySelectorAll(".reveal");
 
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("in"));
    return;
  }
 
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );
 
  items.forEach((item) => observer.observe(item));
}
 
initGuestName();
initCover();
initCountdown();
initReveal();
