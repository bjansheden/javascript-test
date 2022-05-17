
const id = new URLSearchParams(window.location.search).get('id') as String;
console.log(id)
const containerUpdate = document.querySelector('.details') as HTMLDivElement;
const updateVideo1 = document.querySelector('.update') as HTMLSelectElement;
console.log(updateVideo1)

const renderVideoEditView = async () => {
    const result = await fetch('http://localhost:3000/videos/' + id);
    const video:Video = await result.json();

    const templateEditView = `
        <h1>${video.title}</h1>
        <p>${video.grade}</p>
    `

    containerUpdate.innerHTML = templateEditView;
}

const updateVideoGrade = async (id: String, updates:String) => {
    const result = await fetch(`http://localhost:3000/videos/${id}`, {
      method: 'PATCH',
      headers: {
        contentType: 'application/json'
      },
      body: JSON.stringify({
          id: `${id}`,
      
          grade: `${updates}`
      })
      
    })
}
updateVideo1.addEventListener('change', async (e) => {
    
    updateVideoGrade(id, updateVideo1.value)
  //updateVideoGrade
  console.log(updateVideo1.value)
    })

window.addEventListener('DOMContentLoaded', () => renderVideoEditView());