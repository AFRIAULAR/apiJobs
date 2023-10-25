// API
const urlBase = "https://6280450a1020d852057b3f0f.mockapi.io/jobs";

// SPINNER
const showSpinner = () => document.getElementById("spinner").classList.remove("hidden");
const hideSpinner = () => document.getElementById("spinner").classList.add("hidden");


// CRUD
const getJobs = () => {
  showSpinner();
  setTimeout(() => {
  fetch(urlBase)
    .then((res) => res.json())
    .then(data => {
      hideSpinner();
      createCards(data);
    })
      .catch(error => {
        console.error(error);
        hideSpinner();
      });
  }, 2000);
};
getJobs();

const getJob = async (idJob) => {
  const res = await fetch(`${urlBase}/${idJob}`);
  const job = await res.json();
  return job;
};

const putJob = (idJob) => {
  fetch(`${urlBase}/${idJob}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(saveEditedJob()),
  })
    .finally(() => {
      showSpinner()
      window.location.href = "index.html"
    });
};

const postJob = () => {
  fetch(urlBase, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(saveJob()),
  })
    .finally(() => {
      showSpinner()
      window.location.href = "index.html"
    });
};

const deleteJob = (idJob) => {
  fetch(`${urlBase}/${idJob}`, {
    method: "DELETE",
  })
    .finally(() => {
    showSpinner()
    window.location.href = "index.html"
    });
};

//FILTERS FETCH
const loadAndFilterJobs = (category, location, salary) => {
  showSpinner();
  fetch(urlBase)
    .then((res) => res.json())
    .then((data) => {
      const filteredJobs = data.filter((job) => {
        return filterJobByCategory(job, category) &&
          filterJobByLocation(job, location) &&
          filterJobBySalary(job, salary);
      });
      hideSpinner();
      updateCardContainer(filteredJobs);
    })
    .catch((error) => {
      console.error(error);
      hideSpinner();
    });
};
