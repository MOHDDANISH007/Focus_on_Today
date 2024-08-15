const goal_container = document.querySelector(".goal-container");
const goal_input = document.querySelectorAll(".goal-input");
const progress_bar = document.querySelector(".progress-bar");
const error_label = document.querySelector(".error-label");
const progress_value = document.querySelector(".progress-value");
const check_icon = document.querySelector(".check-icon");
const checkboxes = document.querySelectorAll(".custom-checkbox"); // Changed to all checkboxes
const show_error = document.querySelector(".show-error");
const progress_transition = document.querySelector(".progress-transition");
const progress_value_texts = document.querySelectorAll(".progress-value-text");

let completGoals = 0;

// Retrieve data from localStorage
const myData = JSON.parse(localStorage.getItem("myData")) || {};

// Initialize inputs with saved data
goal_input.forEach((input) => {
    if (myData[input.id]) {
        input.value = myData[input.id].name || '';
        if (myData[input.id].completed) {
            input.parentElement.classList.add("completed");
            completGoals++; // Count completed goals
        }
    }

    input.addEventListener('input', () => {
        myData[input.id] = {
            name: input.value,
            completed: false,
        };
        localStorage.setItem("myData", JSON.stringify(myData));
    });

    input.addEventListener('focus', () => {
        progress_bar.classList.remove('show-error');
    });
});

// Add click event listeners to checkboxes
checkboxes.forEach((element) => {
    element.addEventListener("click", () => {
        const allgoaladded = [...goal_input].every((input) => input.value.trim() !== "");

        if (allgoaladded) {
            element.parentElement.classList.toggle("completed");

            // Update the count of completed goals
            completGoals = [...goal_input].filter(input => input.parentElement.classList.contains("completed")).length;

            const progressPercentage = (completGoals / goal_input.length) * 100;
            progress_value.style.width = `${progressPercentage}%`;

            progress_value_texts.forEach(text => {
                text.innerText = `${completGoals}/${goal_input.length} completed`;
            });

            if (completGoals === goal_input.length) {
                progress_value.classList.add("progress-transition");
            }

            // Update the localStorage with completion status
            const inputId = element.nextElementSibling.id;
            if (myData[inputId]) {
                myData[inputId].completed = true;
                localStorage.setItem("myData", JSON.stringify(myData));
            }

            // Remove 'show_error' class when goal inputs are all filled
            progress_bar.classList.remove("show-error");
        } else {
            // Add the 'show_error' class if not all goal inputs are filled
            progress_bar.classList.add('show-error');
        }
    });
});

// localStorage.clear()

progress_value.classList.add("progress-transition");


// debugge