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

      // Update elements when a new advisor is selected
      var advisorNameInput = document.getElementById("advisor-name");
      var advisorPersonalityInput = document.getElementById(
        "advisor-personality",
      );
      var advisorModelPath = document.getElementById("model-path");
      function updateInputBoxContents() {
        var selectedAdvisor = selectAdvisor.value;
        const applyChangesButton = document.getElementById("apply-changes");
        if (advisorsData[selectedAdvisor]) {
          advisorNameInput.value = selectedAdvisor;
          advisorPersonalityInput.value =
            advisorsData[selectedAdvisor].personality_description;
          advisorModelPath.value = advisorsData[selectedAdvisor].path_to_model;
          applyChangesButton.value = "Apply Changes";
        } else {
          advisorNameInput.value = "<advisor name here>";
          advisorPersonalityInput.value =
            "<advisor personality description here>";
          advisorModelPath.value = "/specify/path/to/your/model/here.gguf";
          applyChangesButton.value = "Create New Advisor";
        }
      }

      selectAdvisor.addEventListener("change", updateInputBoxContents); // Update advisor-name and advisor-personality input boxes when different advisor is selected
      updateInputBoxContents(); // update input boxes on page load
    })
    .catch((error) => console.error("Error fetching advisor details:", error));
});

function checkFilePath() {
  const filePath = document.getElementById("model-path").value;
  const url = `http://127.0.0.1:5000/backend/check_model_filepath_valid?filepath=${encodeURIComponent(filePath)}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.filepath_is_valid) {
        alert("Model file path is valid");
      } else {
        alert(`Model file path is invalid (${data.error})`);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while checking the model file path");
    });
}
