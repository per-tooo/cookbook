//! line 50 must be \'

const __EDITOR = {
  title: document.querySelector('[app-data="recipe-title"]'),
  tags: document.querySelector('[app-data="recipe-tags"]'),
  img: document.querySelector('[app-data="recipe-img"]'),
  submit: document.querySelector('[app-action="submit"]'),
};

async function postRecipe(data) {
  const response = await fetch("../assets/php/?action=insert", {
    method: "POST",
    body: data,
  });
  await console.log(response.text());
}

async function updateRecipe(id, data) {
  const response = await fetch("../assets/php/?action=update&id=" + id, {
    method: "POST",
    body: data,
  });
  await console.log(response.json());
}

async function getRecipe() {
  const response = await fetch(`../assets/php/?action=get&id=${_GET.id}`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });
  return response.json();
}

async function initializeEditor() {
  const data = await getRecipe();
  __EDITOR.title.value = first(data.result).title;
  __EDITOR.tags.value = first(data.result).tags;
  editor.value(first(data.result).textContent);
}

__EDITOR.submit.addEventListener("click", (event) => {
  event.preventDefault();

  let data = new FormData();
  data.append("title", __EDITOR.title.value);
  data.append("tags", __EDITOR.tags.value);
  data.append("textContent", editor.value().replaceAll("'", "'"));
  if (__EDITOR.img.files.length > 0)
    data.append("image", __EDITOR.img.files[0]);

  if (_GET.mode == "new") {
    postRecipe(data);
    editor.clearAutosavedValue();
  }
  if (_GET.mode == "edit") {
    updateRecipe(_GET.id, data);
    editor.clearAutosavedValue();
  }
});

if (_GET.mode == "edit" && _GET.id !== "undefined") initializeEditor();
