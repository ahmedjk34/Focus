//will return true if invalid , so we could
//stop the data from sending if invalid
// (check the form logic)
export default function checkValidity(users = []) {
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  let isValid = true;
  //targets each input to apply general rules
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", (value) => {
      restart(input);
      checkIfEmpty(input);
    });
    //length checking
    username &&
      username.addEventListener("input", () => {
        ifTooShort(username);
        ifTooLong(username);
      });
    password.addEventListener("input", () => ifTooShort(password));
  });
  //username duplication
  username &&
    username.addEventListener(
      "input",
      debounce(() => {
        users.forEach((user) => {
          if (user === username.value) {
            username.nextElementSibling.innerHTML = `This User already Exists`;
            isValid = false;
          }
        });
      }, 500)
    );
  email.addEventListener("input", () => {
    emailCheck();
  });
  //functions
  function restart(input) {
    input.nextElementSibling.innerHTML = "";
  }
  function checkIfEmpty(input) {
    if (input.validity.valueMissing) {
      input.nextElementSibling.innerHTML = `The ${input.id} can't be Empty`;
      isValid = false;
    }
  }
  function ifTooShort(input) {
    if (input.validity.tooShort) {
      input.nextElementSibling.innerHTML = `This ${input.id} is Too Short`;
      isValid = false;
    }
  }
  function ifTooLong(input) {
    if (input.validity.tooLong) {
      input.nextElementSibling.innerHTML = `This ${input.id} is Too Short`;
      isValid = false;
    }
  }
  function emailCheck() {
    if (email.validity.typeMismatch) {
      email.nextElementSibling.innerHTML = "Please Enter a Valid Email Address";
      isValid = false;
    }
  }
  function debounce(fn, delay) {
    let id;
    return (...args) => {
      if (id) clearTimeout(id);
      id = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }
}
