/* Put your javascript in here */
"use strict"
const carouselContainer = document.querySelector(".carousel-container");
const listImageArea = carouselContainer.querySelector(".next-list");
const listOfImages = listImageArea.querySelectorAll("img");
const currentImage = carouselContainer.querySelector(".current-image");
const arrowLeft = carouselContainer.querySelector(".left-arrow");
const arrowRight = carouselContainer.querySelector(".right-arrow");

function styleList() {
    if (listImageArea.scrollWidth == listImageArea.offsetWidth) {
        listImageArea.style.justifyContent = "center";
    } else {
        listImageArea.style.justifyContent = "flex-start";
    }
}

function goToRight() {
    var current = listImageArea.querySelector(".curr-list-image");
    current.parentElement.nextElementSibling.children[0].classList.add(
        "curr-list-image"
    );
    current.classList.remove("curr-list-image");
    current = listImageArea.querySelector(".curr-list-image");
    listImageArea.scrollLeft = current.offsetLeft;
    currentImage.attributes.src.value = current.attributes.src.value;
    currentImage.classList.add("slideInFromRight");
    setTimeout(() => {
        currentImage.classList.remove("slideInFromRight");
    }, 500);
}

function goToLeft() {
    var current = listImageArea.querySelector(".curr-list-image");
    current.parentElement.previousElementSibling.children[0].classList.add(
        "curr-list-image"
    );
    current.classList.remove("curr-list-image");
    current = listImageArea.querySelector(".curr-list-image");
    listImageArea.scrollLeft = current.offsetLeft;
    currentImage.attributes.src.value = current.attributes.src.value;
    currentImage.classList.add("slideInFromLeft");
    setTimeout(() => {
        currentImage.classList.remove("slideInFromLeft");
    }, 500);
}

function changeCurrentImage(newImage) {
    currentImage.classList.add("fadeIn");
    setTimeout(() => {
        currentImage.classList.remove("fadeIn");
    }, 500);
    currentImage.attributes.src.value = this.attributes.src.value;
    listOfImages.forEach((image) => {
        image.classList.remove("curr-list-image");
    });
    this.classList.add("curr-list-image");
}

styleList();

arrowLeft.addEventListener("click", goToLeft);
arrowRight.addEventListener("click", goToRight);

window.addEventListener("resize", (e) => {
    styleList();
});

(function() {
    if (typeof NodeList.prototype.forEach === "function") return false;
    NodeList.prototype.forEach = Array.prototype.forEach;
})();

listOfImages.forEach((image) => {
    image.addEventListener("click", changeCurrentImage);
});