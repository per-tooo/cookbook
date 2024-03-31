//! link w/o a#href
const linksList = document.querySelectorAll("[app-link]");
linksList.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "" + link.getAttribute("app-link");
  });
});
document.addEventListener("click", (event) => {
  if (event.target.hasAttribute("app-link"))
    window.location.href = event.target.getAttribute("app-link");
});

//! routing
const __href = window.location.href;
const slug = __href.split("?")[1];
const __gets = slug.split("&");
const _GET = {};

__gets.forEach((option) => {
  pair = option.split("=");
  _GET[pair[0]] = pair[1];
});

//! qol
function first(array) {
  return array[0];
}
