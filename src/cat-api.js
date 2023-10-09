import axios from "axios";

const apiKey = "live_ZwO4Itm2tvoYglv1OdqwyNS8WicONyiaCXOiReLWPTwIdbWS3MvzZ2x5SerJtlVy";

axios.defaults.headers.common["x-api-key"] = apiKey;

const breedSelect = document.querySelector(".breed-select");
const loaderElement = document.querySelector(".loader");
const errorElement = document.querySelector(".error");
const catInfoElement = document.querySelector(".cat-info");

async function fetchBreeds() {
    try {
        showLoader();

        const response = await axios.get("https://api.thecatapi.com/v1/breeds");
        const breeds = response.data;

        breedSelect.innerHTML = "";

        breeds.forEach((breed) => {
            const option = document.createElement("option");
            option.value = breed.id;
            option.textContent = breed.name;
            breedSelect.appendChild(option);
        });

        hideLoader();
    } catch (error) {
        console.error("Помилка завантаження порід:", error);
        showError("Oops! Something went wrong! Try reloading the page!");
        hideLoader();
    }
}

async function fetchCatByBreed(breedId) {
    try {
        showLoader();

        const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
        const catData = response.data[0];

        const catName = catData.breeds[0].name;
        const catDescription = catData.breeds[0].description;
        const catTemperament = catData.breeds[0].temperament;
        const catImageURL = catData.url;

        catInfoElement.innerHTML = `
            <img src="${catImageURL}" alt="Cat Image" />
            <h2 class="cat-name">${catName}</h2>
            <p class="cat-description">${catDescription}</p>
            <p class="cat-temperament">Temperament: ${catTemperament}</p>
        `;

        hideLoader();
    } catch (error) {
        console.error("Помилка завантаження інформації про кота:", error);
        showError("Oops! Something went wrong! Try reloading the page!");
        hideLoader();
    }
}

function showLoader() {
    loaderElement.style.display = "block";
    breedSelect.style.display = "none";
    errorElement.style.display = "none";
    catInfoElement.innerHTML = "";
}

function hideLoader() {
    loaderElement.style.display = "none";
    breedSelect.style.display = "block";
}

function showError(message) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
}

fetchBreeds();

breedSelect.addEventListener("change", async (event) => {
    const selectedBreedId = event.target.value;
    await fetchCatByBreed(selectedBreedId);
});
