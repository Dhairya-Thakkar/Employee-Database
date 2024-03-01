var selectedRow = null
let form_field = ["fullname" , "salary" , "phone_numbr" , "work_site"]

function onFormSubmit() {
    if (isValid()) {
        var formData = readData();
        if (selectedRow == null)
            recordData(formData);
        else
            updateRecord(formData);
        resetData();
    }
}


function isValid() {
    if (document.getElementById("fullname").value == "") {
        alert("Full Name Plz");
        return false;

    }
    else if ((isNaN(document.getElementById("salary").value))) {
        alert("Input number in Salary");
        return false;

    }
    else if ((isNaN(document.getElementById("phone_numbr").value))) {
        alert("Input number in Phone number field");
        console.log("Nope");
        return false;
    }
    else if ((document.getElementById("phone_numbr").value.length) != 10) {
        alert("Not a valid phone number");
        console.log("Nope");
        return false;
    }
    else {
        console.log("Nope");
        return true;
    }
}

function readData() {
    let formData = {};
    const field_length = form_field.length;
    for (let i = 0; i < field_length; i++) {
        formData[form_field[i]] = document.getElementById(form_field[i]).value;
        
    }
    /*formData["fullname"] = document.getElementById("fullname").value;
    formData["Salary"] = document.getElementById("salary").value;
    formData["phone_number"] = document.getElementById("phone_numbr").value;
    formData["work_site"] = document.getElementById("work_site").value;*/
    console.log(formData);
    console.log(form_field);
    return formData;

}

function resetData() {
    document.getElementById("fullname").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("phone_numbr").value = "";
    document.getElementById("work_site").value = "";
}


function recordData(data) {
    let table = document.getElementById("employee_table");
    let newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullname;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.salary;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.phone_numbr;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.work_site;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<button onClick="onEdit(this)">Edit</button>
                       <button onClick="onDelete(this)">Delete</button>`;
}

function onDelete(td) {
        row = td.parentElement.parentElement;
        document.getElementById("employee_table").deleteRow(row.rowIndex);
        resetData();
}


function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullname").value = selectedRow.cells[0].innerHTML;
    document.getElementById("salary").value = selectedRow.cells[1].innerHTML;
    document.getElementById("phone_numbr").value = selectedRow.cells[2].innerHTML;
    document.getElementById("work_site").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullname;
    selectedRow.cells[1].innerHTML = formData.salary;
    selectedRow.cells[2].innerHTML = formData.phone_numbr;
    selectedRow.cells[3].innerHTML = formData.work_site;
}

