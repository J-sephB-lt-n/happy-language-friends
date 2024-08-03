document.addEventListener("DOMContentLoaded", function () {
  fetch("http://127.0.0.1:5000/backend/get_advisor_details")
    .then((response) => response.json())
    .then((data) => {
      const selectAdvisor = document.getElementById("select-advisor");

      // Remove the "create-new-advisor" option temporarily
      const createNewAdvisorOption = selectAdvisor.querySelector(
        'option[value="create-new-advisor"]',
      );
      selectAdvisor.removeChild(createNewAdvisorOption);

      data.forEach((advisor) => {
        const option = document.createElement("option");
        option.value = advisor.advisor_name;
        option.textContent = advisor.advisor_name;
        selectAdvisor.appendChild(option);
      });

      selectAdvisor.appendChild(createNewAdvisorOption); // Add the "create-new-advisor" option back to the end of the select-advisor dropdown
      selectAdvisor.selectedIndex = 0;

      // Store advisor data for later use
      const advisorsData = data.reduce((acc, advisor) => {
        acc[advisor.advisor_name] = advisor;
        return acc;
      }, {});

      // Update input boxes when a new advisor is selected
      var advisorNameInput = document.getElementById("advisor-name");
      var advisorPersonalityInput = document.getElementById(
        "advisor-personality",
      );
      var advisorModelPath = document.getElementById("model-path");
      function updateInputBoxContents() {
        var selectedAdvisor = selectAdvisor.value;
        advisorNameInput.value = selectedAdvisor;
        if (advisorsData[selectedAdvisor]) {
          advisorPersonalityInput.value =
            advisorsData[selectedAdvisor].personality_description;
          advisorModelPath.value = advisorsData[selectedAdvisor].path_to_model;
        } else {
          advisorPersonalityInput.value = "";
          advisorModelPath.value = "";
        }
      }

      selectAdvisor.addEventListener("change", updateInputBoxContents); // Update advisor-name and advisor-personality input boxes when different advisor is selected
      updateInputBoxContents(); // update input boxes on page load
    })
    .catch((error) => console.error("Error fetching advisor details:", error));
});
