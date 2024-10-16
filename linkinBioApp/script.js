let colorChange = true;
document.querySelector("#toggle").addEventListener("click", () => {
    if (colorChange) {
        document.querySelector("#bio-box").classList.toggle("light-theme");
        document.querySelector("#bio-box").style.transition = "background-color 0.75s"; // Add transition property
    } else {
        document.querySelector("#bio-box").classList.toggle("dark-theme");
        document.querySelector("#bio-box").style.transition = "background-color 0.75s"; // Add transition property
    }
});