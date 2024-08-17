function getAdvisorsData() {
  // fetch list of advisors and their metadata from the database
  return fetch("http://127.0.0.1:5000/backend/get_advisor_details")
    .then((response) => {
      if (!response.ok) {
        const error_message = `HTTP error ${response.status} fetching model list from /backend/get_advisor_details`;
        alert(error_message);
        throw new Error(error_message);
      }
      return response.json();
    })
    .then((data) => {
      const advisorsData = data.reduce((acc, advisor) => {
        acc[advisor.advisor_name] = advisor;
        return acc;
      }, {});
      return advisorsData;
    })
    .catch((error) => {
      alert(
        `Error fetching advisor details from /backend/get_advisor_details: ${error}`,
      );
      console.error("Error fetching advisor details:", error);
    });
}

function updateAdvisorSelectList(advisorsData) {
  // populate the "select advisor" dropdown list using the provided advisors data
  const selectAdvisor = document.getElementById("select-advisor");
  selectAdvisor.options.length = 0; // clear list

  Object.values(advisorsData).forEach((advisor) => {
    const option = document.createElement("option");
    option.value = advisor.advisor_name;
    option.textContent = advisor.advisor_name;
    selectAdvisor.appendChild(option);
  });
  const option = document.createElement("option");
  option.value = "create-new-advisor";
  option.textContent = "[+] Create New Advisor";
  selectAdvisor.appendChild(option);

  selectAdvisor.selectedIndex = 0;
}

function getLLMsData() {
  // fetch list of models and their metadata from the database
  return fetch("http://127.0.0.1:5000/backend/get_llm_details")
    .then((response) => {
      if (!response.ok) {
        const error_message = `HTTP error ${response.status} fetching model list from /backend/get_llm_details`;
        alert(error_message);
        throw new Error(error_message);
      }
      return response.json();
    })
    .then((data) => {
      const LLMsData = data.reduce((acc, llm) => {
        acc[llm.llm_name] = llm;
        return acc;
      }, {});
      return LLMsData;
    })
    .catch((error) => {
      const error_message = `Error fetching model list from /backend/get_llm_details: ${error}`;
      alert(error_message);
      throw new Error(error_message);
    });
}

function updateLLMSelectList(LLMsData) {
  // populate "select model" list using provided model data
  const selectLLM = document.getElementById("select-llm");
  selectLLM.options.length = 0; // clear list

  Object.values(LLMsData).forEach((llm) => {
    const option = document.createElement("option");
    option.value = llm.llm_name;
    option.textContent = llm.llm_name;
    selectLLM.appendChild(option);
  });
}

function updateAdvisorInputBoxes(advisorsData) {
  // const advisorNameInput = document.getElementById("advisor-name");
  // const advisorPersonalityInput = document.getElementById(
  //   "advisor-personality",
  // );
  console.log(advisorsData);
}

document.addEventListener("DOMContentLoaded", function () {
  getAdvisorsData()
    .then((advisorsData) => {
      updateAdvisorSelectList(advisorsData);
      updateAdvisorInputBoxes(advisorsData);
    })
    .catch((error) => {
      alert("failed to update advisor data on DOM content load");
      console.error("failed to update advisor data on DOM content load", error);
    });
  getLLMsData()
    .then((LLMsData) => {
      updateLLMSelectList(LLMsData);
    })
    .catch((error) => {
      alert("failed to update LLM data on DOM content load");
      console.error("failed to update LLM data on DOM content load", error);
    });
  // updateLLMSelectList();
  // fetch("http://127.0.0.1:5000/backend/get_advisor_details")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     const selectAdvisor = document.getElementById("select-advisor");
  //
  //     // Remove the "create-new-advisor" option temporarily
  //     const createNewAdvisorOption = selectAdvisor.querySelector(
  //       'option[value="create-new-advisor"]',
  //     );
  //     selectAdvisor.removeChild(createNewAdvisorOption);
  //
  //     data.forEach((advisor) => {
  //       const option = document.createElement("option");
  //       option.value = advisor.advisor_name;
  //       option.textContent = advisor.advisor_name;
  //       selectAdvisor.appendChild(option);
  //     });
  //
  //     selectAdvisor.appendChild(createNewAdvisorOption); // Add the "create-new-advisor" option back to the end of the select-advisor dropdown
  //     selectAdvisor.selectedIndex = 0;
  //
  //     // Store advisor data for later use
  //     const advisorsData = data.reduce((acc, advisor) => {
  //       acc[advisor.advisor_name] = advisor;
  //       return acc;
  //     }, {});
  //
  //     // Update elements when a new advisor is selected
  //     var advisorNameInput = document.getElementById("advisor-name");
  //     var advisorPersonalityInput = document.getElementById(
  //       "advisor-personality",
  //     );
  //     var advisorModelPath = document.getElementById("model-path");
  //     function updateInputBoxContents() {
  //       var selectedAdvisor = selectAdvisor.value;
  //       const applyChangesButton = document.getElementById("apply-changes");
  //       if (advisorsData[selectedAdvisor]) {
  //         advisorNameInput.value = selectedAdvisor;
  //         advisorPersonalityInput.value =
  //           advisorsData[selectedAdvisor].personality_description;
  //         advisorModelPath.value = advisorsData[selectedAdvisor].path_to_model;
  //         applyChangesButton.value = "Apply Changes";
  //       } else {
  //         advisorNameInput.value = "<advisor name here>";
  //         advisorPersonalityInput.value =
  //           "<advisor personality description here>";
  //         advisorModelPath.value = "/specify/path/to/your/model/here.gguf";
  //         applyChangesButton.value = "Create New Advisor";
  //       }
  //     }
  //
  //     selectAdvisor.addEventListener("change", updateInputBoxContents); // Update advisor-name and advisor-personality input boxes when different advisor is selected
  //     updateInputBoxContents(); // update input boxes on page load
  //   })
  // .catch((error) => console.error("Error fetching advisor details:", error));

  // make delete advisor button disappear whenever "create-new-advisor" is selected
  // const selectAdvisor = document.getElementById("select-advisor");
  // const deleteAdvisorForm = document.getElementById("delete-advisor");
  // selectAdvisor.addEventListener("change", function () {
  //   if (selectAdvisor.value === "create-new-advisor") {
  //     deleteAdvisorForm.style.display = "none";
  //   } else {
  //     deleteAdvisorForm.style.display = "inline";
  //   }
  // });
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

function createOrUpdateAdvisor() {
  const applyChangesButton = document.getElementById("apply-changes");
  const advisorNameInput = document.getElementById("advisor-name");
  const advisorPersonalityInput = document.getElementById(
    "advisor-personality",
  );
  const advisorModelPath = document.getElementById("model-path");
  const request_data = {
    advisor_name: advisorNameInput.value,
    personality_description: advisorPersonalityInput.value,
    path_to_model: advisorModelPath.value,
  };
  if (applyChangesButton.value === "Create New Advisor") {
    fetch("http://127.0.0.1:5000/backend/create_advisor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request_data),
    })
      .then((response) => {
        if (response.ok) {
          updateAdvisorSelectList();
          return response.text();
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .then((data) => {
        alert(`Successfully created advisor '${advisorNameInput.value}'`);
      })
      .catch((error) => {
        alert(error.message);
      });
  } else {
    alert("update advisor not implemented yet");
  }
}

function confirmDeleteAdvisor() {
  const advisorNameInput = document.getElementById("advisor-name");
  let confirmDelete = confirm(
    `Are you sure that you want to permanently delete advisor '${advisorNameInput.value}?'`,
  );

  if (confirmDelete) {
    alert(`Deleted advisor '${advisorNameInput.value}'`);
    return true;
  } else {
    return false;
  }
}
