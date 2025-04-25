document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      const url = button.getAttribute("data-url");
      if (url) {
        window.open(url, "_blank");
      }
    });
  });
});
