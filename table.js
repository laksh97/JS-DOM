var selected_row = null

function form_submit() {
    var data = read_form_data();
    if (selected_row == null)
        insert_new_record(data);
    else
        update_record(data);
    reset_form();
}

function read_form_data() {
    var data = {};
    data["name"] = document.getElementById("name").value;
    data["age"] = document.getElementById("age").value;
    data["email"] = document.getElementById("email").value;
    return data;
}

function insert_new_record(data) {
    var table = document.getElementById("table").getElementsByTagName('tbody')[0];;
    var col = ["name", "age", "email"]
    var tr = document.createElement("tr")

    for (var i = 0; i <= col.length; i++) {
        if (i == 3) {
            cell = tr.insertCell(3);
            cell.innerHTML = `<a onClick="edit_record(this)">Edit</a>
                               <a onClick="delete_record(this)">Delete</a>`;
        } else {
            var td = document.createElement("td")
            td.innerHTML = data[col[i]]
            tr.appendChild(td)
        }
    }
    table.appendChild(tr)
}

function reset_form() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("email").value = "";
    selected_row = null;
}

function edit_record(td) {
    selected_row = td.parentElement.parentElement;
    document.getElementById("name").value = selected_row.cells[0].innerHTML;
    document.getElementById("age").value = selected_row.cells[1].innerHTML;
    document.getElementById("email").value = selected_row.cells[2].innerHTML;
}

function update_record(data) {
    selected_row.cells[0].innerHTML = data.name;
    selected_row.cells[1].innerHTML = data.age;
    selected_row.cells[2].innerHTML = data.email;
}

function delete_record(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("table").deleteRow(row.rowIndex);
        reset_form();
    }
}