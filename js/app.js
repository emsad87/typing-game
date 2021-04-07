window.addEventListener("load", (event) => {
  // Hide loader when site is loaded
  document.querySelector(".loader").style.display = "none";

  const navToggleBtn = document.querySelector("#js-navbar-toggle");
  const navLinks = document.querySelector("#js-menu");

  const sIndicator = document.querySelector(".scroll-indicator");
  const toTop = document.querySelector(".toTop");

  onScroll();

  // Add hamburger to element with id="js-navbar-toggle"
  navToggleBtn.innerHTML = `<span></span><span></span><span></span>`;

  function navToggle() {
    navLinks.classList.toggle("active");
  }

  document.addEventListener("click", (e) => {
    let clickedElement = e.target; // clicked element

    do {
      if (clickedElement == navToggleBtn) {
        navToggle();
        return;
      }
      // Go up the DOM
      clickedElement = clickedElement.parentNode;
    } while (clickedElement);
    if (navLinks.classList.contains("active")) {
      navToggle();
      return;
    }
  });

  function onScroll() {
    var y = window.scrollY;
    if (y >= 50) {
      sIndicator.style.display = "none";
      toTop.style.display = "block";
    } else {
      sIndicator.style.display = "block";
      toTop.style.display = "none";
    }
  }

  window.addEventListener("scroll", onScroll);
  toTop.addEventListener(
    "click",
    () => (document.documentElement.scrollTop = 0)
  );
});
