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

const usersTable = document.getElementById("users-table");
let users = JSON.parse(localStorage.getItem("users")) || [];

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
