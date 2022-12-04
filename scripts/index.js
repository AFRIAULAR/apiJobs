// GLOBAL VARIABLES
const $ = (selector) => document.querySelector(selector);
const $$ = (selectors) => document.querySelectorAll(selectors);

//AUXILIAR FUNCTIONS
const hidden = (selector) => selector.classList.add('hidden')
const show = (selector) => selector.classList.remove('hidden')

//API 
const urlBase = ("https://6280450a1020d852057b3f0f.mockapi.io/jobs")


// METHODS
const getJobs=()=> {
  fetch(urlBase)
    .then(res => res.json())
    .then(data => createCardJob(data))
}
getJobs()

const getJob=(idJob)=>{
  fetch(`${urlBase}/${idJob}`)
    .then(res=> res.json())
    .then (data => {jobToEdit(data)})
}

const putJob=(idJob)=>{
  fetch(`${urlBase}/${idJob}`,{
    method: "PUT"
  })
}

const postJob=()=>{
  fetch((urlBase),{
    method: "POST",
      headers:{
        'Content-Type':'Application/json'
      },
      body: JSON.stringify(saveJob())
  })
  .finally(()=> window.location.href = "index.html")
}

const deleteJob = (idJob) =>{
  fetch(`${urlBase}/${idJob}`,{
    method: "DELETE"
  })
  .finally(()=> window.location.href = "index.html")
}

const saveJob = () =>{
  return{
    jobName: $('#titleCreateJob').value,
    description: $('#descriptionCreateJob').value ,
    location: $('#selectLocationCreateJob').value,
    category: $('#selectCategoryCreateJob').value,
    seniority: $('#selectSeniorityCreateJob').value,
    availability: $('#selectAvailabilityCreateJob').value
  }
}
const jobToEdit = (data) =>{
  const idJobEdit = $('#btnEditJob').getAttribute('data-id')
  $('#btnEditJob').setAttribute('data-id', idJobEdit)
    $('#titleEditJob').value = data.jobName
    $('#descriptionEditJob').value = data.description
    $('#selectAvailabilityCreateJob').value= data.availability
    $('#selectSeniorityEditJob').value = data.seniority
    $('#selectCategoryEditJob').value = data.category
    $('#selectLocationEditJob').value = data.location

}

const createCardJob = (jobs) =>{
     for (const job of jobs){
         const { id, jobName, location, seniority, availability, category } = job
         $('#cardContainer').innerHTML += 
         ` <div class="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
            <div class="c-card block bg-[#f5f5f5] shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                  <div class="relative pb-48 overflow-hidden">
                    <img class="absolute inset-0 h-full w-full object-cover" src="./assets/images/pia_leon.jpg" alt="">
                  </div>
                <div class="p-4">
                  <span class="inline-block px-2 py-1 leading-none bg-[#5BA6A6] text-white rounded-full font-semibold uppercase tracking-wide text-xs">${category}</span>
                  <h2 class="mt-2 mb-2  font-bold">${jobName}</h2>
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
          </div>
         `
     }
  showDetails()
}
 
const showDetails = ()=>{
  for (const btn of $$('.btnJobDetails')){
    btn.addEventListener('click', ()=>{
      hidden($('#selectContainer'))
      hidden($('#cardContainer'))
      show($('#cardDetailContainer'))
      const idJob = btn.getAttribute('data-id')
      $('#deleteJobModal').setAttribute('data-id', idJob)     
      $('#btnEditJob').setAttribute('data-id', idJob)
      getJob(idJob)
    })
    }
}


//  DOM EVENTS    
$('#showCreateJob').addEventListener('click', ()=>{
  hidden($('#selectContainer'))
  hidden($('#cardContainer'))
  show($('#createJobForm'))
})

$('#createJobForm').addEventListener('submit', (e)=>{
  e.preventDefault()
  postJob()
})

$('#btnDeleteJob').addEventListener('click', ()=>{
  show($('#delete-modal'))
})

$('#deleteJobModal').addEventListener('click', ()=>{
  const idJob = $('#deleteJobModal').getAttribute('data-id')
  $('#deleteJobModal').setAttribute('data-id', idJob)
  deleteJob(idJob)
})

$('#cancel-delete').addEventListener('click', ()=>{
    hidden($('#delete-modal'))
  })

$('#btnEditJob').addEventListener('click', ()=>{
  show($('#editJobForm'))
  hidden($('#cardDetailContainer'))
  const idJobEdit = $('#btnEditJob').getAttribute('data-id')
  $('#btnEditJob').setAttribute('data-id', idJobEdit)
  
})