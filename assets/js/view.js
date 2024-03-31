let hrefEdit = document.querySelector("button[app-link]");
hrefEdit.setAttribute("app-link", `edit.html?mode=edit&id=${_GET.id}`);

let title = document.querySelector('[app-element="title"]');
let tags = document.querySelector('[app-element="tags"]');
let image = document.querySelector('[app-element="image"]');
let textContent = document.querySelector('[app-element="textContent"]');

function md2html(md) {
  md = md.replace(
    /^### (.*)$/gim,
    '<h3 class="text-large font-bold mt-4 mb-2">$1</h3>'
  );
  md = md.replace(
    /^## (.*)$/gim,
    '<h2 class="text-xl font-semibold mt-4 mb-2">$1</h2>'
  );
  md = md.replace(
    /^# (.*)$/gim,
    '<h1 class="text-2xl font-semibold mt-4 mb-2">$1</h1>'
  );

  md = md.replace(/\*\*(.+?)\*\*/gim, "<b>$1</b>");
  md = md.replace(/\*(.+?)\*/gim, "<i>$1</i>");

  md = md.replace(
    /^(\+|\*|\-) (.*)$/gim,
    '<ul class="list-outside list-disc mb-1"><li>$2</li></ul>'
  );
  md = md.replace(
    /^([0-9]+). (.*)$/gim,
    '<ol start="$1" class="list-outside list-decimal mb-1"><li>$2</li></ol>'
  );

  md = md.replace(/^(\*\*\*)/gim, '<hr class="" />');
  md = md.replace(/^(\-\-\-)/gim, '<hr class="" />');
  md = md.replace(/^(\+\+\+)/gim, '<hr class="" />');

  // not secure; no link sanitization or validation in place
  md = md.replace(/\[(.+?)\]\((.+?)\)/gim, '<a href="$2">$1</a>');

  return md;
}

async function loadRecipe() {
  const response = await fetch(`../assets/php/?action=get&id=${_GET.id}`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });
  const data = await response.json();

  title.textContent = first(data.result).title;
  textContent.innerHTML = md2html(first(data.result).textContent);

  if (first(data.result).image.length !== 0)
    image.setAttribute("src", "../uploads/" + first(data.result).image);
  else image.classList.add("hidden");

  let _tags = first(data.result).tags.split(";");
  _tags.forEach((tag) => {
    let el = document.createElement("span");
    el.setAttribute(
      "class",
      "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded"
    );
    el.textContent = tag;
    tags.appendChild(el);
  });
}
loadRecipe();
