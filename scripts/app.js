// API
const urlBase = "https://6280450a1020d852057b3f0f.mockapi.io/jobs"

const getJobs = () => {
  fetch(urlBase)
    .then((res) => res.json())
    .then((data) => createCardJob(data));
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
  }).finally(() => (window.location.href = "index.html"));
};

const postJob = () => {
  fetch(urlBase, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(saveJob()),
  }).finally(() => (window.location.href = "index.html"));
};

const deleteJob = (idJob) => {
  fetch(`${urlBase}/${idJob}`, {
    method: "DELETE",
  }).finally(() => (window.location.href = "index.html"));
};
