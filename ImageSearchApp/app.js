const accesKey = "yourAPIKEY"

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const buttonShowMore = document.getElementById("show-more-button")

let page = 1;
let inputData = "";

async function searchImages() {
    inputData = searchInputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesKey}`;
    console.log("input Data : " + inputData);
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (page == 1) {
        searchResultsEl.innerHTML = "";
    }
    const results = data.results;

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-card");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.description;
        // imageLink.classList("");
        image.appendChild(imageLink);
        imageWrapper.appendChild(image);
        searchResultsEl.appendChild(imageWrapper);
    })
    page++;
    if (page > 1)
        buttonShowMore.style.display = "block";
    console.log(results)
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("form submitted");
    // console.log(searchInputEl.value)
    page = 1;
    // this.searchImages();
})

buttonShowMore.addEventListener("click", function () {
    searchImages();
});




