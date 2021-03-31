window.addEventListener("load", (event) => {
  // Hide loader when site is loaded
  document.querySelector(".loader").style.display = "none";

  let navToggleBtn = document.querySelector("#js-navbar-toggle");
  let navLinks = document.querySelector("#js-menu");

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
});
