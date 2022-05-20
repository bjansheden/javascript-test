import axios from "axios";
import { Video } from ".";

type UpdateGrade ={
  id: String;
  grade: Number;
  title: String;
}

const id = new URLSearchParams(window.location.search).get('id') as String;
console.log("Video ID",id)
const containerUpdate = document.querySelector('.details') as HTMLDivElement;
const updateVideo = document.querySelector('.update') as HTMLSelectElement;

// Render the details for the video that's been selected from search.
const renderVideoEditView = async () => {
    const result = await fetch('http://localhost:3000/videos/' + id);
    const video:Video = await result.json();

    const templateEditView = `
        <h1>${video.title}</h1> 
        <p>Grade: ${video.grade}</p>
        
    `
    containerUpdate.innerHTML = templateEditView;
}

// PATCH request to the server with the updated grade.
const updateVideoGrade = async (id: String, updates:Number) => {
  const { data } = await axios.patch<UpdateGrade>(`http://localhost:3000/videos/${id}`,
  { grade: `${Number(updates)}`},
  {headers: {
    contentType: 'application/json-patch + json'
    }
  });
  console.log('Updated value:', updates)
  renderVideoEditView()
}

// Listener for change in grade from the user.
updateVideo.addEventListener('change', async (e) => {
  var update = Number(updateVideo.value)  
  updateVideoGrade(id, update)
  console.log("User changed grade:",update)
    })

window.addEventListener('DOMContentLoaded', () => renderVideoEditView());