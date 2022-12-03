// GLOBAL VARIABLES
// const cardContainer = document.getElementById("cardContainer")
// const queryId = (id) => document.getElementById(id)

// const getJob=()=> {
//     fetch("https://6280450a1020d852057b3f0f.mockapi.io/jobs")
//         .then(res => res.json())
//         .then(data => createCardJob(data))
//         .catch(err => console.log(err))
// }
// getJob()

// const createCardJob = (jobs) =>{
//      for (const job of jobs){
//          const { id, jobName, description, location, seniority, availability, category } = job
         
//          queryId("cardContainer").innerHTML += 
//          ` <div class="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
//             <div class="c-card block bg-[#f5f5f5] shadow-md hover:shadow-xl rounded-lg overflow-hidden">
//                   <div class="relative pb-48 overflow-hidden">
//                     <img class="absolute inset-0 h-full w-full object-cover" src="./assets/images/pia_leon.jpg" alt="">
//                   </div>
//                 <div class="p-4">
//                   <span class="inline-block px-2 py-1 leading-none bg-[#5BA6A6] text-white rounded-full font-semibold uppercase tracking-wide text-xs">${category}</span>
//                   <h2 class="mt-2 mb-2  font-bold">${jobName}</h2>
//                   <p class="text-sm">${seniority}</p>
//                   <div class="mt-3 flex items-center">
//                     <span class="font-bold text-xl">${location}</span>
//                   </div>
//                 </div>
//                 <div class="p-4 border-t border-b text-xs text-gray-700">
//                   <button class="flex items-center bg-[#431545] rounded-full font-semibold px-4 py-2 text-white ml-[70%]">Ver detalles</button>        
//                 </div>
//             </div>
//           </div>
//          `
//      }
//  }
// const cleanContainer = () => cardContainer.innerHTML ="" 

// queryId("btnEdit").addEventListener("click", ()=>{
//     queryId("formContainerEdit").classList.remove("form-container-edit")
// })


