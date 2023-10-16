// GLOBAL VARIABLES
const $ = (selector) => document.querySelector(selector);
const $$ = (selectors) => document.querySelectorAll(selectors);

// AUXILIARY FUNCTIONS
const hidden = (selector) => selector.classList.add("hidden");
const show = (selector) => selector.classList.remove("hidden");
const clean = (selector) => selector.innerHTML = '';

//JOB FUNCTIONS
const saveJob = () => {
  const formData = {
    jobName: $("#titleCreateJob").value,
    description: $("#descriptionCreateJob").value,
    location: $("#selectOptionsCreateJob").value,
    category: $("#selectCategoryCreateJob").value,
    requirements: $("#requirements").value,
    salary: $("#salary").value,
    benefits: {
      vacations: $("#vacations").checked,
      discount: $("#discount").checked,
      medicalInsurance: $("#medicalInsurance").checked,
    },
    languages: Array.from($$('[type="checkbox"]:checked'))
      .map((checkbox) => checkbox.value)
      .filter(value => value !== 'true')
  };
  return formData;
};

const saveEditedJob = () => {
  return {
    jobName: $("#titleEditJob").value,
    description: $("#descriptionEditJob").value,
    location: $("#selectLocationEditJob").value,
    category: $("#selectCategoryEditJob").value,
    requirements: $("#requirementsEdit").value,
    salary: $("#salaryEdit").value,
    benefits: {
      vacations: $("#vacations").checked,
      discount: $("#discount").checked,
      medicalInsurance: $("#medicalInsurance").checked,
    },
    languages: Array.from($$('[type="checkbox"]:checked'))
      .map((checkbox) => checkbox.value)
      .filter(value => value !== 'true')
  };
};

const jobToEdit = (data) => {
  const idJob = $("#btnEditJob").getAttribute("data-id");
  $("#btnEditJob").setAttribute("data-id", idJob);
  $("#titleEditJob").value = data.jobName;
  $("#descriptionEditJob").value = data.description;
  $("#selectCategoryEditJob").value = data.category;
  $("#selectLocationEditJob").value = data.location;
  $("#requirementsEdit").value = data.requirements;
  $("#salaryEdit").value = data.salary;
  const selectedBenefits = data.benefits;
  const selectedLanguages = data.languages;

  Object.keys(selectedBenefits).forEach(key => {
    const checkbox = $(`#${key}`);
    if (checkbox) {
      checkbox.checked = selectedBenefits[key];
    }
  });

  selectedLanguages.forEach(language => {
    const checkbox = $(`[value="${language}"]`);
    if (checkbox) {
      checkbox.checked = true;
    }
  });
};


// DOM
const createJob = (job) => {
  const { id, jobName, location, category, requirements, salary, benefits, languages } = job;
  const cardElement = document.createElement('div');
  cardElement.className = 'w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4';
  const selectedBenefits = Object.keys(benefits).filter(key => benefits[key]);

  cardElement.innerHTML = `
    <div class="c-card block bg-[#f5f5f5] shadow-md hover:shadow-xl rounded-lg overflow-hidden">
      <div class="relative pb-48 overflow-hidden">
        <img class="absolute inset-0 h-full w-full object-cover" src="./assets/images/pia_leon.jpg" alt="">
      </div>
      <div class="p-4">
        <h2 class="mt-2 mb-2 font-bold">${jobName}</h2>
        <p class="text-sm">${salary}</p>
        <div class="mt-3 flex items-center">
          <span class="font-bold text-xl">${location}</span>
        </div>
        <p class="text-sm">${requirements}</p>
        <p class="text-sm">Beneficios: ${selectedBenefits.join(', ')}</p>
        <p class="text-sm">Idiomas: ${languages.join(', ')}</p>
        <span class="inline-block px-2 py-2 leading-none bg-[#5BA6A6] text-white rounded-full font-semibold uppercase tracking-wide text-xs">${category}</span>
      </div>
      <div class="p-4 border-t border-b text-xs text-gray-700">
        <button id="btnJobDetails" data-id="${id}" class="btnJobDetails flex items-center bg-[#431545] rounded-full font-semibold px-4 py-2 text-white ml-[70%]">Ver detalles</button>
      </div>
    </div>
  `;
  return cardElement;
};

const createCards = (jobs) => {
 const cardContainer = $('#cardContainer');
 clean('cardContainer');
  for (const job of jobs) {
    const cardElement = createJob(job);
    cardContainer.appendChild(cardElement);
  }
  showDetails();
};

const showDetails = () => {
  for (const btn of $$(".btnJobDetails")) {
    btn.addEventListener("click", () => {
      hidden($("#selectContainer"));
      hidden($("#cardContainer"));
      show($("#cardDetailContainer"));
      const idJob = btn.getAttribute("data-id");
      $(".btnJobDetails").setAttribute("data-id", idJob);
      $(".cardDetailContainer").setAttribute("data-id", idJob); 
      getJob(idJob).then((data) => cardDetails(data));
    });
  }
};

const cardDetails = (job) => {
  show($('#cardDetailContainer'))
  const { id, jobName, location, category, requirements, salary, benefits, languages, description } = job;
  const selectedBenefits = Object.keys(benefits).filter(key => benefits[key]);
  $("#detailJobName").innerHTML = jobName;
  $("#detailCategory").innerHTML = category;
  $("#detailLocation").innerHTML = location;
  $("#detailRequirements").innerHTML = requirements;
  $("#detailSalary").innerHTML = salary;
  $("#detailBenefits").innerHTML = `${selectedBenefits.join(', ')}`;
  $("#detailLanguages").innerHTML = languages;
  $("#detailDescription").innerHTML = description;
  btnEditDelete(id);
  editJob(id); 
  deleteJobBtn(id); 
};

const btnEditDelete = (id)=>{
  const buttonsContainer = $("#buttonsContainer");
  buttonsContainer.innerHTML = `
    <button type="button" id="btnEditJob" data-id="${id}"
        class="btnEditJob py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-[#5BA6A6] rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#431545] focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-[#45818e]">
        Editar
    </button>
    <button type="button" id="btnDeleteJob" data-id="${id}"
        class="btnDeleteJob block py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-[#f5f5f5] focus:outline-none bg-[#0d191c] rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#431545] focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        data-modal-toggle="delete-modal">
        Borrar
    </button>
  `;
}

const editJob = () => {
  for (const btn of $$(".btnEditJob")) {
    btn.addEventListener("click", () => {
      const idJob = btn.getAttribute("data-id");
      $(".btnEditJob").setAttribute("data-id", idJob);
      $("#btnEditJobPut").getAttribute("data-id");
      $("#btnEditJobPut").setAttribute("data-id", idJob);
      show($("#editJobForm"));
      hidden($("#cardDetailContainer"));
      completeFieldsForm(job)
    });
  }
};

const deleteJobBtn = (idJob) => {
  for (const btn of $$(".btnDeleteJob")) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-id"); 
      show($("#delete-modal"));
      $(".btnDeleteJob").setAttribute("data-id", id); 
      $(".deleteJobModal").setAttribute("data-id", id);
    });
  }
};

const completeFieldsForm = (job)=>{
  $("#titleEditJob").value = job.jobName;
  $("#descriptionEditJob").value = job.description;
  $("#selectLocationEditJob").value = job.location;
  $("#selectCategoryEditJob").value = job.category;
}

// DOM EVENTS
$("#showCreateJob").addEventListener("click", () => {
  hidden($("#selectContainer"));
  hidden($("#cardContainer"));
  show($("#createJobForm"));
  hidden($("#cardDetailContainer"));
});

$("#createJobForm").addEventListener("submit", (e) => {
  e.preventDefault();
  postJob();
});

$(".deleteJobModal").addEventListener("click", () => {
  const id = $(".deleteJobModal").getAttribute("data-id");
  $(".deleteJobModal").setAttribute("data-id", id);
  deleteJob(id);
});

$("#cancel-delete").addEventListener("click", () => {
  hidden($("#delete-modal"));
});

$("#btnEditJobPut").addEventListener("click", (e) => {
  e.preventDefault();
  show($("#editJobForm"));
  hidden($("#cardDetailContainer"));
  const id = $("#btnEditJobPut").getAttribute("data-id");
  $("#btnEditJobPut").setAttribute("data-id", id);
  putJob(id);
});
