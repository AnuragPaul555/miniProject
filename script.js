function maskPassword(pass) {
  let str = "";
  for(let index = 0; index < pass.length; index++){
    str += "*"
  }
  return str;
}

// Copy passwords
function copyText(txt) {
  navigator.clipboard.writeText(txt).then(
    () => {
      // Clipboard successfully set
      // alert("Copied to clipboard!")
      document.getElementById("alert").style.display = "inline";
      setTimeout(() => {
        document.getElementById("alert").style.display = "none";
      }, 2000);
    },
    () => {
      // Clipboard write failed
      alert("Clipboard copying failed");
    }
  )
}

// deleting passwords
const deletePassword = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e)=>{
        return e.website != website
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    alert(`Successfully deleted ${website}'s password`);
    showPasswords();
}

// Filling the table
// adding passwords
const showPasswords = () => {
  let tb = document.querySelector("table");
  let data = localStorage.getItem("passwords");
  if (data == null || JSON.parse(data).length == 0) {
    tb.innerHTML = "No data has been added.";
  } else {
    tb.innerHTML = `<tr>
    <th>Website</th>
    <th>Username</th>
    <th>Password</th>
    <th>Delete</th>
  </tr>`;
    let arr = JSON.parse(data);
    let str = "";
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      str += `<tr>
        <td>${element.website} <img onclick="copyText('${element.website}')" src="copy.svg" alt="Copy button" width="13" height="13" ></td>
        <td>${element.username} <img onclick="copyText('${element.username}')" src="copy.svg" alt="Copy button" width="13" height="13" > </td>
        <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="copy.svg" alt="Copy button" width="13" height="13" > </td>
        <td><button class="btn-sm" onclick="deletePassword('${element.website}')">Delete</button></td>
        </tr>`;
    }
    tb.innerHTML = tb.innerHTML + str;
  }
  // resetting the form after submitting a password
  website.value = ""
  username.value = ""
  password.value = ""
}

console.log("working");
showPasswords();
document.querySelector(".btn").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("clicked");
  console.log(username.value, password.value);
  let passwords = localStorage.getItem("passwords");
  console.log(passwords);
  if (passwords == null) {
    let json = [];
    json.push({ website: website.value, username: username.value, password: password.value });
    alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  } else {
    let json = JSON.parse(localStorage.getItem("passwords"));
    json.push({ website: website.value, username: username.value, password: password.value });
    alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  }
  showPasswords();
});
