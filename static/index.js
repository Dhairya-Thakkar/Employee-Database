function isValid() {
  if (document.getElementById("fullname").value == "") {
    alert("Full Name Plz");
    return false;
  } else if (isNaN(document.getElementById("salary").value)) {
    alert("Input number in Salary");
    return false;
  } else if (isNaN(document.getElementById("phone_numbr").value)) {
    alert("Input number in Phone number field");
    return false;
  } else if (document.getElementById("phone_numbr").value.length != 10) {
    alert("Not a valid phone number");
    return false;
  }
  return true;
}
