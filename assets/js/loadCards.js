let container = document.querySelector("#cards-container");
let card = document.querySelector("template");

let card_title = document.querySelector('[app-card="title"]');
let card_tags = document.querySelector('[app-card="tags"]');
let card_cover = document.querySelector('[app-card="cover"]');

async function getRecipeList() {
  const response = await fetch("../assets/php/?action=list", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });
  return response.json();
}

async function loadCards() {
  let data = (await getRecipeList()).result;
  data.forEach((entry) => {
    let clone = card.content.cloneNode(true);

    clone.querySelector("a").setAttribute("href", "view.html?id=" + entry.id);
    clone.querySelector('[app-card="title"]').textContent = entry.title;

    let tagContainer = clone.querySelector('[app-card="tags"]');
    let tags = entry.tags.split(";");
    tags.forEach((tag) => {
      let el = document.createElement("span");
      el.setAttribute(
        "class",
        "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded"
      );
      el.textContent = tag;
      tagContainer.appendChild(el);
    });

    if (entry.image.length !== 0)
      clone
        .querySelector('[app-card="cover"]')
        .setAttribute("src", "../uploads/" + entry.image);

    card.setAttribute("data-id", entry.id);
    container.appendChild(clone);
  });
}
loadCards();

// for (let index = 0; index < 1; index++) {
//   let clone = card.content.cloneNode(true);
//   card.setAttribute("data-uid", index);
//   container.appendChild(clone);
// }
