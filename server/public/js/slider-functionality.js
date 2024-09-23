const leftArrow = document.getElementById("left-arrow-click");
const rightArrow = document.getElementById("right-arrow-click");

// const creationCard = document.getElementById("creation-card");
// const updateCard = document.getElementById("update-card")

leftArrow.addEventListener("click", () => {
    // const active = document.getElementById(document.querySelector(".active-slide").getAttribute("id"));
    const active = document.querySelector(".active-slide");
    const inactiveLeft = document.querySelector(".inactive-slide-left");
    const inactiveRight = document.querySelector(".inactive-slide-right");

    inactiveLeft.classList.remove("inactive-slide-left");
    inactiveLeft.classList.add("inactive-left-to-right");

    active.classList.remove("active-slide");
    active.classList.add("active-to-left");

    inactiveRight.classList.remove("inactive-slide-right");
    inactiveRight.classList.add("inactive-right-to-middle");


    setTimeout(() => {
        active.classList.remove("active-to-left");
        active.classList.add("inactive-slide-left");

        inactiveRight.classList.remove("inactive-right-to-middle");
        inactiveRight.classList.add("active-slide");

        inactiveLeft.classList.remove("inactive-left-to-right");
        inactiveLeft.classList.add("inactive-slide-right");
    }, 1000);

    // inactiveLeft.classList.remove("inactive-slide-left");
    // active.style.animationPlayState = "running";

    // inactiveRight.classList.add("inactive-slide-left");
    // inactiveRight.classList.remove("inactive-slide-right");

    // inactiveLeft.classList.add("active-slide")
    // inactiveLeft.classList.remove("inactive-slide-left");
});

rightArrow.addEventListener("click", () => {
    const active = document.querySelector(".active-slide");
    const inactiveLeft = document.querySelector(".inactive-slide-left");
    const inactiveRight = document.querySelector(".inactive-slide-right");

    inactiveLeft.classList.remove("inactive-slide-left");
    inactiveLeft.classList.add("inactive-left-to-middle");

    active.classList.remove("active-slide");
    active.classList.add("active-to-right");

    inactiveRight.classList.remove("inactive-slide-right");
    inactiveRight.classList.add("inactive-right-to-left");

    setTimeout(() => {
        active.classList.remove("active-to-right");
        active.classList.add("inactive-slide-right");

        inactiveRight.classList.remove("inactive-right-to-left");
        inactiveRight.classList.add("inactive-slide-left");

        inactiveLeft.classList.remove("inactive-left-to-middle");
        inactiveLeft.classList.add("active-slide");
    }, 1000);
});