document.addEventListener("DOMContentLoaded", function () {
  fetch("http://127.0.0.1:5000/backend/get_advisor_details")
    .then((response) => response.json())
    .then((data) => {
      const selectElement = document.getElementById("select-advisor");

      // Remove the "create-new-advisor" option temporarily
      const createNewOption = selectElement.querySelector(
        'option[value="create-new-advisor"]',
      );
      selectElement.removeChild(createNewOption);

      data.forEach((advisor) => {
        const option = document.createElement("option");
        option.value = advisor.advisor_name;
        option.textContent = advisor.advisor_name;
        selectElement.appendChild(option);
      });

      // Add the "create-new-advisor" option back to the end of the list
      selectElement.appendChild(createNewOption);
    })
    .catch((error) => console.error("Error fetching advisor details:", error));
});
