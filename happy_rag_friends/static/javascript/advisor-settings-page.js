document.addEventListener("DOMContentLoaded", function () {
  fetch("http://127.0.0.1:5000/backend/get_advisor_details")
    .then((response) => response.json())
    .then((data) => {
      const selectAdvisor = document.getElementById("select-advisor");

      // Remove the "create-new-advisor" option temporarily
      const createNewOption = selectAdvisor.querySelector(
        'option[value="create-new-advisor"]',
      );
      selectAdvisor.removeChild(createNewOption);

      data.forEach((advisor) => {
        const option = document.createElement("option");
        option.value = advisor.advisor_name;
        option.textContent = advisor.advisor_name;
        selectAdvisor.appendChild(option);
      });

      selectAdvisor.appendChild(createNewOption); // Add the "create-new-advisor" option back to the end of the list
      selectAdvisor.selectedIndex = 0;

      var advisorNameInput = document.getElementById("advisor-name");
      function updateAdvisorName() {
        var selectedAdvisor = selectAdvisor.value;
        advisorNameInput.value = selectedAdvisor;
      }
      selectAdvisor.addEventListener("change", updateAdvisorName); // update advisor-name input box when different advisor is selected
      updateAdvisorName(); // update advisor-name input box on page load
    })
    .catch((error) => console.error("Error fetching advisor details:", error));
});

document
  .getElementById("select-advisor")
  .addEventListener("change", function () {
    var selectedAdvisor = this.value;
    document.getElementById("advisor-name").value = selectedAdvisor;
  });
