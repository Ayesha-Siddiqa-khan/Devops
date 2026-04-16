from datetime import date, datetime, timedelta

from flask import Flask, render_template, request

app = Flask(__name__)


def calculate_age(birth_date: date, on_date: date | None = None) -> tuple[int, int, int]:
    """Return age as years, months, days."""
    if on_date is None:
        on_date = date.today()

    years = on_date.year - birth_date.year
    months = on_date.month - birth_date.month
    days = on_date.day - birth_date.day

    if days < 0:
        last_day_of_prev_month = (on_date.replace(day=1) - timedelta(days=1)).day
        days += last_day_of_prev_month
        months -= 1

    if months < 0:
        months += 12
        years -= 1

    return years, months, days


@app.route("/", methods=["GET", "POST"])
def index():
    age_result = None
    dob_value = ""
    error_message = ""

    if request.method == "POST":
        dob_value = request.form.get("dob", "").strip()

        if not dob_value:
            error_message = "Please select your date of birth."
        else:
            try:
                birth_date = datetime.strptime(dob_value, "%Y-%m-%d").date()
                today = date.today()

                if birth_date > today:
                    error_message = "Date of birth cannot be in the future."
                else:
                    years, months, days = calculate_age(birth_date, today)
                    age_result = {
                        "years": years,
                        "months": months,
                        "days": days,
                    }
            except ValueError:
                error_message = "Invalid date format. Please choose a valid date."

    return render_template(
        "index.html",
        age_result=age_result,
        dob_value=dob_value,
        error_message=error_message,
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3005, debug=False)
