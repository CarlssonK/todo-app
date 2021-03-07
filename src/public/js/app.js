// ########
// Add Todo
// ########
(() => {

  const inputField = document.querySelector("[data-js=form__input]");
  const form = document.querySelector("[data-js=form]");

  form &&
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if(inputField.value.match(/^ *$/)) return;
    const inputFieldValue = inputField.value;
    inputField.value = "";

    try {
      const res = await fetch("http://localhost:3000/addtodo", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ todo: inputFieldValue })
      })

      const data = await res.json();
      list.insertAdjacentHTML("afterbegin", listItem(data.task, data.id));

    } catch (error) {
      console.error(error);
    };
  })

})();

// #############
// Complete Todo
// #############
const handleDone = async (event) => {
  const li = event.parentElement;

  try {
    const res = await fetch(`http://localhost:3000/donetodo/${li.dataset.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    })
    const bool = await res.json();
    handleDoneDOM(li, bool);

  } catch (error) {
    console.error(error);
  };

}
const handleDoneDOM = (li, bool) => {
  const input = li.querySelector("[data-js=list__input]");

  bool ?
    listComplete.insertAdjacentHTML("beforeend", listItemComplete(input.value, li.dataset.id)) :
    list.insertAdjacentHTML("afterbegin", listItem(input.value, li.dataset.id));

  removeListItem(li);
}

// ###########
// Update Todo
// ###########
const handleEdit = async (event) => {
  const li = event.parentElement;
  const input = li.querySelector("[data-js=list__input]");

  input.readOnly = !input.readOnly;
  if(input.readOnly) {
    event.innerText = "Edit"

    try {
      await fetch(`http://localhost:3000/updatetodo`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ task: input.value, id: li.dataset.id })
      })
  
    } catch (error) {
      console.error(error);
    };

  } else {
    event.innerText = "Save";
    input.focus();
  }
}

// ###########
// Delete Todo
// ###########
const handleDelete = async (event) => {
  const li = event.parentElement;

  try {
    const res = await fetch(`http://localhost:3000/deletetodo/${li.dataset.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    })
    await res.json();
    removeListItem(li);

  } catch (error) {
    console.error(error);
  };
}