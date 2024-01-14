import { getValue } from "https://jscroot.github.io/element/croot.js";
import { setCookieWithExpireHour } from "https://jscroot.github.io/cookie/croot.js";

function postWithToken(target_url, data, responseFunction) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(data);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(target_url, requestOptions)
    .then((response) => response.text())
    .then((result) => responseFunction(JSON.parse(result)))
    .catch((error) => console.log("error", error));
}

const Login = () => {
    const target_url = "https://asia-southeast2-global-student-401904.cloudfunctions.net/pasetolog";
    const data = {
        "username": getValue("username"),
        "password": getValue("password"),
    };
    postWithToken(target_url, data, responseData);
}

function responseData(result) {
    if (result.token) {
        setCookieWithExpireHour("Authorization", result.token, 2);

        // Use SweetAlert for success message
        Swal.fire({
            icon: 'success',
            title: 'Berhasil Masuk',
            text: "Selamat Datang di KeeKonseling",
        }).then(() => {
            // Redirect to the dashboard page
            window.location.href = " ./dashboard.html";
        });
    } else {
        // Use SweetAlert for error message
        Swal.fire({
            icon: 'error',
            title: 'Gagal Masuk',
            text: result.message,
        });
    }
}


window.Login = Login;