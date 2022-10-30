//ANIMATION ELEMENTS
const element = document.getElementById("animate");
const init = document.getElementById("enter-btn"); //btn enter
const presentation = document.getElementById("presentation-container");

//MAIN SECTIONS
const header = document.querySelector(".header");
const main = document.querySelector("main");
const footer = document.getElementById("footer");
const body = document.getElementById("body");
const comicSection = document.getElementById("section-comics");
const comicsGroup = document.getElementById("comics-result");
const characterSection = document.getElementById("section-personajes");

//SEARCH NAV
const divComicSelect = document.getElementById("div-select-comics");
const divCharacterSelect = document.getElementById("div-select-character");
const selectOrderComics = document.getElementById("select-order-comics");
const selectOrderCharacters = document.getElementById(
  "select-order-characters"
);
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
const stefaLinkedin = document.getElementById("stefa-linkedin");

// Vistas secciones

selectType.addEventListener("click", (e) => {
  if (e.target.value === "comics") {
    divComicSelect.classList.remove("d-none");
    divCharacterSelect.classList.add("d-none");
  } else if (e.target.value === "characters") {
    divCharacterSelect.classList.remove("d-none");
    divComicSelect.classList.add("d-none");
  }
});

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

// const searchByName = (isSearch, resourse) => {
//   if (inputSearch.value && isSearch && resourse === "comics") {
//     return `?titleStartsWith=${inputSearch.value}`;
//   } else if (inputSearch.value && isSearch && resourse === "characters") {
//     return `?nameStartsWith=${inputSearch.value}`;
//   } else {
//     return "";
//   }
// };

// const searchByName = () => {
//   if ( === "comics") {

//   } else if ( === "characters") {
//   } else {
//     return "";
//   }
// };

const OrderResults = () => {
  const comicOrderBy = selectOrderComics.value;
  const characterOrderBy = selectOrderCharacters.value;
  const type = selectType.value;

  const params = new URLSearchParams(window.location.search);

  params.set("offset", 0);
  params.set("type", type);
  window.location.href = window.location.pathname + "?" + params.toString();

  if (type === "comics") {
    params.set("order", comicOrderBy);
    window.location.href = window.location.pathname + "?" + params.toString();
    //   return `${inputSearch.value ? "&" : "?"}orderBy=${selectOrderComics.value}`;
  } else if (type === "characters") {
    const params = new URLSearchParams(window.location.search);

    params.set("order", characterOrderBy);
    window.location.href = window.location.pathname + "?" + params.toString();
    //   return `${inputSearch.value ? "&" : "?"}orderBy=${
    //     selectOrderCharacters.value
    //   }`;
  } else {
    return "";
  }
};

//Retorna última parte de la URL-------------------------------------------------------------
// const getSearchParams = (isSearch) => {
//   // let url = baseUrl;
//   let searchParamsId = `?apikey=${publicKey}&offset=${offSet}`; //Retorna esta parte de la URL
//   let searchParams = `&offset=${offSet}&apikey=${publicKey}`;
//   if (!isSearch) {
//     return searchParamsId;
//   }
//   return searchParams;
// };

//Función que arma la URL------------------------------------------------------------------
// const getApiUrl = (resourse, resourseId, subResourse) => {
//   const isSearch = !resourseId && !subResourse;
//   let url = `${baseUrl}${resourse}`;
//   // console.log(url); //http://gateway.marvel.com/v1/public/comics Hasta acá tengo esta parte de la URL

//   if (resourseId) {
//     url += `/${resourseId}`;
//   }

//   if (subResourse) {
//     url += `/${subResourse}`;
//   }

//   url += searchByName(isSearch, resourse);

//   url += OrderResults(isSearch, resourse);

//   url += getSearchParams(isSearch);

//   return url; //Retorna API completa: http://gateway.marvel.com/v1/public/comics?apikey=${publicKey}&offset=${offset}
// };

const updateResultsCounter = (count, title) => {
  resultsNumber.innerHTML = count;
  resultsCount = count;
  resultsTitle.innerHTML = title;
  updatePaginationData(resultsCount);
};

// const fetchUrl = async (url) => {
//   const response = await fetch(url);
//   const json = await response.json();
//   return json;
// };

// const fetchComics = async () => {
//   showLoader();
//   const {
//     data: { results, total },
//   } = await fetchUrl(getApiUrl("comics"));
//   showLoader();

//   printComics(results);
//   updateResultsCounter(total, "Resultados");
//   hideLoader();
//   updatePagination();
// };

const fetchComic = async (comicId) => {
  showLoader();
  const {
    data: {
      results: [comic],
    },
  } = await fetchUrl(getApiUrl("comics", comicId));

  const coverPath = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
  const releaseDate = new Intl.DateTimeFormat("es-AR").format(
    new Date(comic.dates.find((date) => date.type === " ").date)
  );

  const writers = comic.creators.items
    .filter((creator) => creator.role === "writer")
    .map((creator) => creator.name)
    .join(", ");
  updateComicDetails(
    coverPath,
    comic.title,
    releaseDate,
    writers,
    comic.description
  );
  showComicDetail();
  hideCharacterDetails();
  hideLoader();
  updatePagination();
};

const fetchComicCharacters = async (comicId) => {
  showLoader();
  const {
    data: { results, total },
  } = await fetchUrl(getApiUrl("comics", comicId, "characters"));
  updateResultsCounter(total, "Personajes");

  printCharacters(results);
  hideLoader();
  updatePagination();
  hideCharacterDetails();
};

const updateComicDetails = (img, title, releaseDate, writers, description) => {
  comicImg.src = img;
  comicTitle.innerHTML = title;
  comicReleaseDate.innerHTML = releaseDate;
  comicWriters.innerHTML = writers;
  comicDescription.innerHTML = description;
};

const showComicDetail = () => {
  comicSection.classList.remove("d-none");
};

const hideComicDetail = () => {
  comicSection.classList.add("d-none");
};

const hideCards = () => {
  cardGroup.classList.add("d-none");
};

const showCards = () => {
  cardGroup.classList.remove("d-none");
};
// CHARACTERS

// const fetchCharacters = async () => {
//   showLoader();
//   const {
//     data: { results, total },
//   } = await fetchUrl(getApiUrl("characters"));
//   console.log(results);

//   printCharacters(results);
//   updateResultsCounter(total, "Resultados");
//   hideLoader();
//   updatePagination();
// };

// const printCharacters = (characters) => {
//   clearResults();
//   if (characters.length === 0) {
//     cardGroup.innerHTML =
//       '<h2 class="no-length fw-bold fs-5">No hemos encontrado resultados</h2>';
//   }

//   for (const character of characters) {
//     const characterCard = document.createElement("div");
//     characterCard.tabIndex = 0;

//     characterCard.classList.add("comic");
//     characterCard.onclick = () => {
//       fetchCharacter(character.id);
//       showCharacterDetails();
//       clearResults();
//       clearPageCount();
//       fetchCharacterComics(character.id);
//       updatePaginationCallback(() => fetchCharacterComics(character.id));
//     };
//     characterCard.innerHTML = `<div id="box-results" class="d-flex flex-wrap ">
//   <div class="card card-personaje">
//     <img src="${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}" class="card-img-top imagen" alt="${character.name}">
//     <div class="card-body nombre-personaje text-white fw-bold text-uppercase border-top border-danger border-4">
//       <p class="card-text">${character.name}</p>
//     </div>
//   </div>
// </div> `;

//     cardGroup.append(characterCard);
//   }
// };

const fetchCharacter = async (characterId) => {
  showLoader();
  const {
    data: {
      results: [character],
    },
  } = await fetchUrl(getApiUrl("characters", characterId));
  const coverPath = `${character.thumbnail.path}.${character.thumbnail.extension}`;
  characterDetails(character.name, coverPath, character.description);
  hideComicDetail();
  hideLoader();
  updatePagination();
};

const characterDetails = (name, image, description) => {
  characterImg.src = image;
  characterName.innerHTML = name;
  characterDescription.innerHTML = description;
};

const showCharacterDetails = () => {
  characterSection.classList.remove("d-none");
};

const hideCharacterDetails = () => {
  characterSection.classList.add("d-none");
};

const fetchCharacterComics = async (characterId) => {
  const {
    data: { results, total },
  } = await fetchUrl(getApiUrl("characters", characterId, "comics"));
  printComics(results);

  updateResultsCounter(total, "Comics");
  updatePagination();
};

const clearResults = () => {
  cardGroup.innerHTML = "";
};

const clearPageCount = () => {
  currentPage = 1;
  offSet = 0;
};

let currentPage = 1;

btnSearch.addEventListener("click", () => {
  OrderResults();
  // hideComicDetail();
  // hideCharacterDetails();
  clearResults();
  clearPageCount();
  search();
  showCards();
  updatePaginationCallback(search);
});

//PAGINATOR

const updatePaginationCallback = (callback) => {
  firstPage.onclick = () => {
    offSet = 0;
    currentPage = 1;
    callback();
    clearResults();
  };

  previousPage.onclick = () => {
    offSet -= 20;
    currentPage -= 1;
    callback();
    clearResults();
    if (offSet < 0) {
      offSet = 0;
    }
  };

  nextPage.onclick = () => {
    offSet += 20;
    currentPage += 1;
    callback();
    clearResults();
  };

  lastPage.onclick = () => {
    const isExact = resultsCount % 20 === 0;
    const pages = Math.floor(resultsCount / 20);
    offSet = (isExact ? pages - 1 : pages) * 20;
    let totalPages = Math.ceil(resultsCount / 20);
    currentPage = totalPages;
    callback();
    clearResults();
  };
};

const updatePaginationData = (totalResults) => {
  totalPages.innerHTML = `${Math.ceil(totalResults / 20)}`;
  currentPageDiv.innerHTML = `${totalResults === 0 ? 0 : currentPage}`;
};

const updatePagination = () => {
  if (offSet === 0) {
    firstPage.disabled = true;
    previousPage.disabled = true;
  } else {
    firstPage.disabled = false;
    previousPage.disabled = false;
  }

  if (offSet + 20 >= resultsCount) {
    lastPage.disabled = true;
    nextPage.disabled = true;
  } else {
    lastPage.disabled = false;
    nextPage.disabled = false;
  }
};

// const inicio = () => {
//   search();
//   updatePaginationCallback(search);
//   getApiUrl();
//   updatePagination();
// };

//-------------------------------------------------------------------------------------------------------------------------

// const getParams = () => {

//   return params;

// };

const loadComics = async () => {
  clearResults();
  const params = new URLSearchParams(window.location.search);

  const comicsResponse = await getComics(
    params.get("offset") || 0,
    params.get("order") || "title"
  );

  const data = comicsResponse.data;

  const comics = data.results;

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
      // fetchComic(comic.id);
      // showComicDetail();
      clearResults();
      // clearPageCount();
      // fetchComicCharacters(comic.id);
      // updatePaginationCallback(() => fetchComicCharacters(comic.id));
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

loadComics();

const loadCharacters = async () => {
  clearResults();
  const params = new URLSearchParams(window.location.search);

  const charactersResponse = await getCharacters(
    params.get("offset") || 0,
    params.get("order") || "name"
  );

  const data = charactersResponse.data;

  const characters = data.results;
  console.log(data);

  if (characters.length === 0) {
    cardGroup.innerHTML =
      '<h2 class="no-length fw-bold fs-5">No hemos encontrado resultados</h2>';
  }

  characters.forEach((character) => {
    const characterCard = document.createElement("div");
    characterCard.tabIndex = 0;

    characterCard.classList.add("comic");
    characterCard.onclick = () => {
      // fetchCharacter(character.id);
      // showCharacterDetails();
      // clearResults();
      clearPageCount();
      // fetchCharacterComics(character.id);
      // updatePaginationCallback(() => fetchCharacterComics(character.id));
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
loadCharacters();
// const loadComics = async () => {
//   const params = new URLSearchParams(window.location.search);

//   const comicsRsponse = await getComics(
//     params.get("offset") || 0,
//     params.get("order") || "title"
//   );

//   const data = comicsRsponse.data;
//   const comics = data.results;

//   comics.forEach((comic) => {
//     const card = document.createElement("div");
//     const cardImg = document.createElement("img");
//     const cardBody = document.createElement("div");
//     const col = document.createElement("div");
//     const title = document.createElement("h2");

//     card.addEventListener("click", () => {
//       params.set("comicId", comic.id);

//       window.location.href =
//         window.location.pathname + "/../detail.html?" + params.toString();
//     });

//     backButton.addEventListener("click", () => {
//       results.classList.remove("d-none");
//       backButton.classList.add("d-none");
//     });

//     const titleText = document.createTextNode(comic.title);

//     card.appendChild(cardImg);
//     card.appendChild(cardBody);
//     col.appendChild(card);
//     cardBody.appendChild(title);
//     title.appendChild(titleText);

//     card.classList.add("card");
//     cardImg.classList.add("card-img-top");
//     cardBody.classList.add("card-body");
//     col.classList.add("col-md-3");
//     title.classList.add("h5");

//     row.appendChild(col);

//     cardImg.setAttribute(
//       "src",
//       `${comic.thumbnail.path}.${comic.thumbnail.extension}`
//     );
//   });
// };

// const init = () => {
//   loadComics();
// };

// init();

// /**
//  *
//  */
// const formSearch = document.getElementById("search-comics");

// formSearch.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const orderBy = e.target["control-order-by"].value;

//   const params = new URLSearchParams(window.location.search);

//   params.set("order", orderBy);
//   params.set("offset", 20);

//   window.location.href = window.location.pathname + "?" + params.toString();
// });

// const loadDetail = (comic) => {
//   const comicDetail = document.getElementById("comic-detail");

//   comicDetail.classList.remove("d-none");

//   const title = document.createElement("h3");
//   const text = document.createTextNode(comic.title);
//   const div = document.createElement("div");

//   title.appendChild(text);

//   div.appendChild(document.createTextNode(comic.description));

//   comicDetail.appendChild(title);
//   comicDetail.appendChild(div);
// };

// const params = new URLSearchParams(window.location.search);

// console.log(params.get("comicId"));

// const loadComic = async () => {
//   const response = await fetch(""); // Buscar por id - devuelve un solo comic
// };
const search = () => {
  if (selectType.value == "comics") {
    loadComics();
  }
  if (selectType.value === "characters") {
    loadCharacters();
  }
};

const inicio = () => {
  search();
  clearResults();
};

window.onload = inicio;
