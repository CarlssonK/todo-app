const list = document.querySelector("[data-js=list-not-complete]");
const listComplete = document.querySelector("[data-js=list-complete]");

const listItem = (str, id) => {
  return (
    `
    <li class="list__item li-show-animation" data-id=${id} >
      <input type="text" value="${str}" data-js="list__input" readonly>
      <button class="list__done" onclick="handleDone(this)">Done</button>
      <button class="list__edit" onclick="handleEdit(this)">Edit</button>
      <button class="list__delete" onclick="handleDelete(this)">Delete</button>
    </li>
    `
  )
}

const listItemComplete = (str, id) => {
  return (
    `
    <li class="list__item li-show-animation" data-id=${id} >
      <input class="complete" type="text" value="${str}" data-js="list__input" readonly>
      <button class="list__done" onclick="handleDone(this)">Undo</button>
      <button class="list__delete" onclick="handleDelete(this)">Delete</button>
    </li>
    `
  )
}

const removeListItem = (li) => {
  li.style.pointerEvents = "none";
  li.classList.add("li-hide-animation");
  setTimeout(() => li.remove(), 200);
}