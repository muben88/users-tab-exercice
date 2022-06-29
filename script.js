let arr = [
  {
    id: "123456789",
    createdDate: "2021-01-06T00:00:00.000Z",
    status: "En validation",
    firstName: "Mohamed",
    lastName: "Taha",
    userName: "mtaha",
    registrationNumber: "2584",
  },
  {
    id: "987654321",
    createdDate: "2021-07-25T00:00:00.000Z",
    status: "Validé",
    firstName: "Hamid",
    lastName: "Orrich",
    userName: "horrich",
    registrationNumber: "1594",
  },
  {
    id: "852963741",
    createdDate: "2021-09-15T00:00:00.000Z",
    status: "Rejeté",
    firstName: "Rachid",
    lastName: "Mahidi",
    userName: "rmahidi",
    registrationNumber: "3576",
  },
];

const firstName = document.querySelector("#first-name"); // first name input
const lastName = document.querySelector("#last-name"); // last name input
const status = document.querySelector("#status"); // status input
const username = document.querySelector("#username"); // username input
const createdDate = document.querySelector("#created-date"); // creation date input
const registrationNumber = document.querySelector("#registration-number"); // registration num input
const saveUserBtn = document.querySelector("#save-user-btn"); // Save user button

const addUserBtn = document.querySelector("#add-user-btn");
const modal = document.querySelector(".modal");
const backDrop = document.querySelector(".empty-div");

// Show the modal & backdrop
addUserBtn.addEventListener("click", () => {
  modal.classList.add("active_modal");
  backDrop.style.display = "block";
});

// Hide the modal & remove the backdrop
backDrop.addEventListener("click", () => {
  modal.classList.remove("active_modal");
  backDrop.style.display = "none";
});

// Ids generator
const uid = () =>
  Math.floor(Math.random() * Date.now())
    .toString()
    .substring(1, 10);

const usersTable = document.querySelector("#users-table");
let users = JSON.parse(localStorage.getItem("users")) || [];

// Add a new user to the list
const addUser = () => {
  if (
    firstName.value.length > 0 &&
    firstName.value.match(/^[A-Za-z]+$/) &&
    lastName.value.length > 0 &&
    lastName.value.match(/^[A-Za-z]+$/) &&
    (status.value == "validé" ||
      status.value == "en validation" ||
      status.value == "rejeté") &&
    username.value.length > 0 &&
    createdDate.value.length >= 10 &&
    registrationNumber.value.length > 0
  ) {
    let user = {
      id: uid(),
      createdDate: new Date(createdDate.value).toISOString(),
      status: status.value,
      firstName: firstName.value,
      lastName: lastName.value,
      userName: username.value,
      registrationNumber: registrationNumber.value,
    };
    localStorage.setItem("users", JSON.stringify([...users, user]));
    location.reload(true);
  }
};

// Add user on click on save user button
saveUserBtn.addEventListener("click", () => {
  addUser();
});

// Delete a user form the list
const deleteUser = (index) => {
  users = JSON.parse(localStorage.getItem("users"));
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  location.reload(true);
};

// List the users
let list = () => {
  localStorage.setItem("users", JSON.stringify(users));
  users = JSON.parse(localStorage.getItem("users"));
  users.map((item) => {
    let tr = document.createElement("tr");
    let date = item.createdDate.split("T")[0];
    let statusClass = "";
    if (item.status.toLowerCase() == "en validation") {
      statusClass = "pending";
    }
    if (item.status.toLowerCase() == "validé") {
      statusClass = "validated";
    }
    if (item.status.toLowerCase() == "rejeté") {
      statusClass = "rejected";
    }

    tr.innerHTML = `<td><span>${item.id}</span></td>
                    <td><span>${`${date.split("-")[2]}/${date.split("-")[1]}/${
                      date.split("-")[0]
                    }`}</span></td>
                    <td><span class=${statusClass}>${item.status}</span></td>
                    <td><span>${item.firstName}</span></td>
                    <td><span>${item.lastName}</span></td>
                    <td><span>${item.userName}</span></td>
                    <td><span>${item.registrationNumber}</span></td>
                    <td><img class="delete_btn" src="assets/delete.png" alt="delete user" onclick="deleteUser(${users.indexOf(
                      item
                    )})"/></td>
        `;

    usersTable.append(tr);
  });
};

list();
