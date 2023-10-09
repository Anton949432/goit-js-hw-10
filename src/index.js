import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

window.addEventListener("load", () => {
    fetchBreeds();

    const breedSelect = document.querySelector(".breed-select");

    breedSelect.addEventListener("change", (event) => {
        const selectedBreedId = event.target.value;
        if (selectedBreedId) {
            fetchCatByBreed(selectedBreedId);
        }
    });
});

