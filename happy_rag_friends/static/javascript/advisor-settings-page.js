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
      const advisorData = data.reduce((acc, advisor) => {
        acc[advisor.advisor_name] = advisor;
        return acc;
      }, {});

      // Update input boxes when a new advisor is selected
      var advisorNameInput = document.getElementById("advisor-name");
      var advisorPersonalityInput = document.getElementById(
        "advisor-personality",
      );

      function updateInputBoxContents() {
        var selectedAdvisor = selectAdvisor.value;
        advisorNameInput.value = selectedAdvisor;
        if (advisorData[selectedAdvisor]) {
          advisorPersonalityInput.value =
            advisorData[selectedAdvisor].personality_description;
        } else {
          advisorPersonalityInput.value = "";
        }
      }

      selectAdvisor.addEventListener("change", updateInputBoxContents); // Update advisor-name and advisor-personality input boxes when different advisor is selected
      updateInputBoxContents(); // update input boxes on page load

      // // update input boxes when a new advisor is selected
      // var advisorNameInput = document.getElementById("advisor-name");
      // function updateAdvisorName() {
      //   var selectedAdvisor = selectAdvisor.value;
      //   advisorNameInput.value = selectedAdvisor;
      // }
      // selectAdvisor.addEventListener("change", updateAdvisorName); // update advisor-name input box when different advisor is selected
      // updateAdvisorName(); // update advisor-name input box on page load
    })
    .catch((error) => console.error("Error fetching advisor details:", error));
});
