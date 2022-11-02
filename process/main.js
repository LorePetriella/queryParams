//MAIN SECTIONS
const header = document.querySelector(".header");
const main = document.querySelector("main");
const footer = document.getElementById("footer");
const body = document.getElementById("body");
const comicSection = document.getElementById("section-comics");
const comicsGroup = document.getElementById("comics-result");
const characterSection = document.getElementById("section-personajes");

//SEARCH NAV
const selectOrderBy = document.getElementById("select-orderby");

const searchForm = document.getElementById("form-search");
const selectType = document.getElementById("select-tipo");
const inputSearch = document.getElementById("input-search");
const btnSearch = document.querySelector("#btn-search");

//SECTION RESULTS ELEMENTS
const resultsCounter = document.getElementById("results-counter");
const resultsNumber = document.querySelector(".results-number");
const resultsTitle = document.getElementById("results-title");
const cardGroup = document.getElementById("card-group");
// const charactersCards = document.getElementById("character-group");

//PAGINATOR ELEMENTS
const firstPage = document.getElementById("first");
const previousPage = document.getElementById("previous");
const lastPage = document.getElementById("last");
const nextPage = document.getElementById("next");
const currentPageDiv = document.getElementById("current-page");
const totalPages = document.getElementById("total-pages");

//elementos comic section

const comicImg = document.querySelector(".comic-cover");
const comicTitle = document.querySelector(".comic-title");
const comicReleaseDate = document.querySelector(".comic-release-date");
const comicWriters = document.querySelector(".comic-writers");
const comicDescription = document.querySelector(".comic-description");

// ELEMENTOS CHARACTER SECTION

const characterImg = document.querySelector(".character-img");
const characterName = document.querySelector(".character-name");
const characterDescription = document.querySelector(".character-description");
const loaderContainer = document.querySelector(".loader-container");

//FOOTER ELEMENTS

const btnLore = document.getElementById("lore");
const btnStefa = document.getElementById("stefa");
const contactLore = document.getElementById("contact-lore");
const contactStefa = document.getElementById("contact-stefa");
const loreGithub = document.getElementById("lore-github");
const loreLinkedin = document.getElementById("lore-linkedin");
const stefaGithub = document.getElementById("stefa-github");

//FOOTER'S  BUTTONS

btnLore.addEventListener("click", () => {
  contactLore.classList.remove("d-none");
  contactStefa.classList.add("d-none");
  loreGithub.classList.add("text-danger");
  loreGithub.classList.remove("text-light");
  loreLinkedin.classList.add("text-danger");
  loreLinkedin.classList.remove("text-light");
});

btnStefa.addEventListener("click", () => {
  contactLore.classList.add("d-none");
  contactStefa.classList.remove("d-none");
  stefaGithub.classList.add("text-danger");
  stefaGithub.classList.remove("text-light");
  stefaLinkedin.classList.add("text-danger");
  stefaLinkedin.classList.remove("text-light");
});

//LOADER

const hideLoader = () => loaderContainer.classList.add("d-none");
const showLoader = () => loaderContainer.classList.remove("d-none");

const publicKey = "1a42c8351bfeecbe486fbaf76a0bdaaf";

const baseUrl = `https://gateway.marvel.com/v1/public/`;

let offSet = 0;
let resultsCount = 0;

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const orderBy = e.target["select-orderby"].value;
  const params = new URLSearchParams(window.location.search);
  const type = e.target["select-tipo"].value;

  params.set("order", orderBy);
  params.set("offset", 0);
  params.set("type", type);

  window.location.href = window.location.pathname + "?" + params.toString();
});

const createSelect = () => {
  if (selectType.value === "comics") {
    selectOrderBy.innerHTML = `
    <option value="title">A-Z</option>
    <option value="-title">Z-A</option>
    <option value="-focDate">Más nuevos</option>
    <option value="onsaleDate">Más viejos</option>`;
  }
  if (selectType.value === "characters") {
    selectOrderBy.innerHTML = `
      <option value="name">A-Z</option>
      <option value="-name">Z-A</option>`;
  }
};

selectType.addEventListener("change", () => {
  createSelect();
});

const updateResultsCounter = (count, title) => {
  resultsNumber.innerHTML = count;
  resultsCount = count;
  resultsTitle.innerHTML = title;
  updatePaginationData(resultsCount);
};

const hideCards = () => {
  cardGroup.classList.add("d-none");
};

const showCards = () => {
  cardGroup.classList.remove("d-none");
};

const clearResults = () => {
  cardGroup.innerHTML = "";
};

const clearPageCount = () => {
  currentPage = 1;
};

btnSearch.addEventListener("click", () => {
  search();

  clearResults();
});

//PAGINATION
let currentPage = 1;
let page = 1;
const updatePaginationFunction = () => {
  const params = new URLSearchParams(window.location.search);
  const offset = parseInt(params.get("offset")) || 0;

  firstPage.onclick = () => {
    currentPage = 1;
    params.set("offset", 0);
    window.location.href = window.location.pathname + "?" + params.toString();
  };

  previousPage.onclick = () => {
    currentPage -= 1;
    params.set("offset", offset - 20);
    window.location.href = window.location.pathname + "?" + params.toString();
  };

  nextPage.onclick = () => {
    currentPage += 1;
    params.set("offset", offset + 20);
    window.location.href = window.location.pathname + "?" + params.toString();
  };

  lastPage.onclick = () => {
    let totalPages = Math.ceil(resultsCount / 20);

    let offset1 = (totalPages - 1) * 20;
    currentPage = totalPages;

    params.set("offset", offset1);
    // params.set("cp", currentPage);
    // params.set("tp", totalPages);
    window.location.href = window.location.pathname + "?" + params.toString();

    updatePaginationData();
  };
};
const updatePaginationData = (totalResults) => {
  totalPages.innerHTML = `${Math.ceil(totalResults / 20)}`;
  currentPageDiv.innerHTML = `${totalResults === 0 ? 0 : currentPage}`;
};

const updatePagination = (total) => {
  const params = new URLSearchParams(window.location.search);
  const offset = parseInt(params.get("offset"));
  if (!offset || offset === 0) {
    firstPage.disabled = true;
    previousPage.disabled = true;
  } else {
    firstPage.disabled = false;
    previousPage.disabled = false;
  }
  let totalPages = Math.ceil(total / 20);
  let pagesCount = (totalPages - 1) * 20;

  if (offset === pagesCount) {
    console.log();
    lastPage.disabled = true;
    nextPage.disabled = true;
  } else {
    lastPage.disabled = false;
    nextPage.disabled = false;
  }
};

//-------------------------------------------------------------------------------------------------------------------------

const loadComics = async () => {
  showLoader();
  clearResults();
  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get("page")) || 1;
  const comicsResponse = await getComics(
    params.get("offset") || 0,
    params.get("order") || "title"
  );
  hideLoader();
  const data = comicsResponse.data;

  const comics = data.results;

  const results = data.total;
  updateResultsCounter(results, "Resultados");
  updatePagination(results);

  if (comics.length === 0) {
    cardGroup.innerHTML =
      '<h2 class="no-length fw-bold fs-5">No hemos encontrado resultados</h2>';
  }

  comics.forEach((comic) => {
    const comicCard = document.createElement("div");
    comicCard.tabIndex = 0;
    comicCard.classList.add("comic");
    comicCard.setAttribute("id", "comics-result");
    comicCard.onclick = () => {
      clearResults();
    };

    const comicImgContainer = document.createElement("div");
    comicImgContainer.classList.add("comic-img-container");
    const comicImg = document.createElement("img");

    comicImg.setAttribute(
      "src",
      `${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`
    );
    comicImg.setAttribute("alt", `${comic.title}`);
    comicImg.classList.add("comic-thumbnail");

    const comicTitle = document.createElement("p");
    comicTitle.classList.add("comic-title");
    const comicTitleText = document.createTextNode(`${comic.title}`);

    comicImgContainer.appendChild(comicImg);
    comicTitle.appendChild(comicTitleText);
    comicCard.appendChild(comicImgContainer);
    comicCard.appendChild(comicTitle);

    cardGroup.appendChild(comicCard);
  });
};

const loadCharacters = async () => {
  showLoader();
  clearResults();
  const params = new URLSearchParams(window.location.search);

  const charactersResponse = await getCharacters(
    params.get("order") || "name",
    params.get("offset") || 0
  );

  const data = charactersResponse.data;

  const characters = data.results;

  const results = data.total;

  updateResultsCounter(results, "Resultados");
  updatePagination(results);
  hideLoader();

  if (characters.length === 0) {
    cardGroup.innerHTML =
      '<h2 class="no-length fw-bold fs-5">No hemos encontrado resultados</h2>';
  }

  characters.forEach((character) => {
    const characterCard = document.createElement("div");
    characterCard.tabIndex = 0;

    characterCard.classList.add("comic");
    characterCard.onclick = () => {
      clearResults();
    };
    characterCard.innerHTML = `<div id="box-results" class="d-flex flex-wrap ">
  <div class="card card-personaje">
    <img src="${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}" class="card-img-top imagen" alt="${character.name}">
    <div class="card-body nombre-personaje text-white fw-bold text-uppercase border-top border-danger border-4">
      <p class="card-text">${character.name}</p>
    </div>
  </div>
</div> `;

    cardGroup.append(characterCard);
  });
};

const search = () => {
  const params = new URLSearchParams(window.location.search);

  if (params.get("type") === "characters") {
    loadCharacters();
  } else {
    loadComics();
  }
};

const inicio = () => {
  search();
  // clearResults();
  createSelect();
  updatePaginationFunction();
  updatePagination();
};

window.onload = inicio;
