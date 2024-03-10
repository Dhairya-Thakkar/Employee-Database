from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__, static_folder="static", template_folder="template")
DBNAME = "emp.db"

# Database


def db_init():
    conn = sqlite3.connect(DBNAME)
    curr = conn.cursor()
    curr.execute(
        """create table if not exists employee(
        id integer primary key autoincrement,
        name text not null,
        salary integer not null,
        phone number(11) not null,
        workplace text not null
    )"""
    )
    conn.commit()
    conn.close()


def db_add_user(name, salary, phone, workplace):
    conn = sqlite3.connect(DBNAME)
    curr = conn.cursor()
    curr.execute(
        " insert into employee(name,salary,phone,workplace) values (?,?,?,?) ",
        (name, salary, phone, workplace),
    )
    conn.commit()
    conn.close()


def db_get_all_users():
    conn = sqlite3.connect(DBNAME)
    curr = conn.cursor()
    curr.execute("select * from employee")
    res = curr.fetchall()
    conn.commit()
    conn.close()
    return res


def db_update_info(id, name, salary, phone, workplace):
    conn = sqlite3.connect(DBNAME)
    curr = conn.cursor()
    curr.execute(
        "update employee set name=?,salary=?,phone=?,workplace=? where id=?",
        (name, salary, phone, workplace, id),
    )
    conn.commit()
    conn.close()


def db_get_details(id):
    conn = sqlite3.connect(DBNAME)
    curr = conn.cursor()
    curr.execute("select * from employee where id=?", (id,))
    res = curr.fetchone()
    conn.commit()
    conn.close()
    return res


def db_delete_emp(id):
    conn = sqlite3.connect(DBNAME)
    curr = conn.cursor()
    curr.execute("delete from employee where id=?", (id,))
    conn.commit()
    conn.close()


# Main app


@app.route("/")
def home():
    db_init()
    employees = db_get_all_users()
    return render_template("index.html", employees=employees)


@app.route("/add", methods=["POST", "GET"])
def add_emp():
    if request.method == "POST":
        name = request.form["fullname"]
        salary = request.form["salary"]
        phone = request.form["phone_numebr"]
        workplace = request.form["work_site"]
        db_add_user(name, salary, phone, workplace)
        return redirect(
            url_for(
                "home",
            )
        )
    return render_template("add_employee.html")


@app.route("/edit/<int:id>", methods=["GET", "POST"])
def edit_emp(id):
    employee = db_get_details(id)
    if request.method == "POST":
        name = request.form["fullname"]
        salary = request.form["salary"]
        phone = request.form["phone_numebr"]
        workplace = request.form["work_site"]
        db_update_info(id, name, salary, phone, workplace)

        return redirect(url_for("home"))
    return render_template("update_employee.html", employee=employee, id=id)


@app.route("/delete/<int:id>")
def delete_emp(id):
    db_delete_emp(id)
    return redirect(url_for("home"))


if __name__ == "__main__":
    app.run(debug=True)
