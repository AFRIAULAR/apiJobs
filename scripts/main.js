// GLOBAL VARIABLES
const $ = (selector) => document.querySelector(selector);
const $$ = (selectors) => document.querySelectorAll(selectors);

// AUXILIARY FUNCTIONS
const hidden = (selector) => selector.classList.add("hidden");
const show = (selector) => selector.classList.remove("hidden");
const clean = (selector) => selector.innerHTML = '';

//JOB FUNCTIONS
const saveJob = () => {
  return {
    jobName: $("#titleCreateJob").value,
    description: $("#descriptionCreateJob").value,
    location: $("#selectLocationCreateJob").value,
    category: $("#selectCategoryCreateJob").value,
    seniority: $("#selectSeniorityCreateJob").value,
    availability: $("#selectAvailabilityCreateJob").value,
  };
};

const saveEditedJob = () => {
  return {
    jobName: $("#titleEditJob").value,
    description: $("#descriptionEditJob").value,
    location: $("#selectLocationEditJob").value,
    category: $("#selectCategoryEditJob").value,
    seniority: $("#selectSeniorityEditJob").value,
    availability: $("#selectAvailabilityEditJob").value, 
  };
};

const jobToEdit = (data) => {
  const idJob = $("#btnEditJob").getAttribute("data-id");
  $("#btnEditJob").setAttribute("data-id", idJob);
  $("#titleEditJob").value = data.jobName;
  $("#descriptionEditJob").value = data.description;
  $("#selectAvailabilityEditJob").value = data.availability; 
  $("#selectSeniorityEditJob").value = data.seniority;
  $("#selectCategoryEditJob").value = data.category;
  $("#selectLocationEditJob").value = data.location;
};

// DOM
const createJob = (job) => {
  const { id, jobName, location, seniority, availability, category } = job;
  const cardElement = document.createElement('div');
  cardElement.className = 'w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4';
  cardElement.innerHTML = `
    <div class="c-card block bg-[#f5f5f5] shadow-md hover:shadow-xl rounded-lg overflow-hidden">
      <div class="relative pb-48 overflow-hidden">
        <img class="absolute inset-0 h-full w-full object-cover" src="./assets/images/pia_leon.jpg" alt="">
      </div>
      <div class="p-4">
        <span class="inline-block px-2 py-1 leading-none bg-[#5BA6A6] text-white rounded-full font-semibold uppercase tracking-wide text-xs">${category}</span>
        <h2 class="mt-2 mb-2 font-bold">${jobName}</h2>
        <p class="text-sm">${seniority}</p>
        <div class="mt-3 flex items-center">
          <span class="font-bold text-xl">${location}</span>
        </div>
        <p class="text-sm">${availability}</p>
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

const cardDetails = (idJob) => {
  const { jobName, description, location, category, availability, seniority, id } = idJob;
  $(".cardDetailContainer").innerHTML = `
  <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
      src="./assets/images/pia_leon.jpg" alt="" />
    <div class="flex flex-col justify-between p-4 leading-normal">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        ${jobName}
      </h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${category} </p>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${location} </p>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${seniority} </p>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${availability} </p>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${description} </p>
    </div>
    <div id="buttonsContainer">
      <button type="button" id="btnEditJob" data-id="${id}"
        class="btnEditJob py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-[#5BA6A6] rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#5BA6A6] focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-[#45818e]">
        Editar
      </button>
      <button type="button" id="btnDeleteJob" data-id="${id}"
        class="btnDeleteJob block py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-[#f5f5f5] focus:outline-none bg-[#0d191c] rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#431545] focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        data-modal-toggle="delete-modal">
        Borrar
      </button>
    </div>
  `;
  editJob();
  deleteJobBtn(id);
};

const editJob = () => {
  for (const btn of $$(".btnEditJob")) {
    btn.addEventListener("click", () => {
      const idJob = btn.getAttribute("data-id");
      $(".btnEditJob").setAttribute("data-id", idJob);
      $("#btnEditJobPut").getAttribute("data-id");
      $("#btnEditJobPut").setAttribute("data-id", idJob);
      show($("#editJobForm"));
      hidden($("#cardDetailContainer"));
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
