(function () {
  const card = document.getElementById("card");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setShine(x, y) {
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const mx = ((x - rect.left) / rect.width) * 100;
    const my = ((y - rect.top) / rect.height) * 100;
    card.style.setProperty("--mx", `${mx}%`);
    card.style.setProperty("--my", `${my}%`);
  }

  if (!card) return;

  if (!prefersReducedMotion) {
    window.addEventListener("pointermove", (e) => {
      setShine(e.clientX, e.clientY);
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const tiltX = dy * -8;
      const tiltY = dx * 10;
      card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    window.addEventListener("pointerleave", () => {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    });
  } else {
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "30%");
  }
})();
