document.addEventListener("DOMContentLoaded", function () {
  // Hamburger Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Contact Form Submission (Mock)
  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("success-message");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Simulate a successful form submission
    successMessage.classList.remove("hidden");

    // Clear the form fields
    form.reset();

    // Hide success message after 3 seconds
    setTimeout(() => {
      successMessage.classList.add("hidden");
    }, 3000);
  });
});
