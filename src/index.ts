
interface Video {
  id: number;
  title: string;
  grade: number;
}

const container = document.querySelector('.videos') as HTMLDivElement;
const searchForm = document.querySelector('.search') as HTMLFormElement;
const updateGrade = document.querySelector('.videos') as HTMLFormElement;
console.log(updateGrade)

const renderVideos = async (term: String) => {
  if (term) {
  let uri = 'http://localhost:3000/videos';
  uri += `?q=${term}`;
 
  const res = await fetch(uri);
  const videos: Video[] = await res.json();
  console.log(videos);

  let template = ''
  videos.forEach(video => {
    template += `
      <div class="video"=>
        <h2>${video.title}</h2>
        <p>Grade: ${video.grade}
        </p>
        <a href="update.html?id=${video.id}">Update grade</a>
      </div>
      `
    
  })
  container.innerHTML = template;
  console.log(template);
  }}

const updateVideoGrade = async (id: String, updates:Number) => {
  const response = await fetch(`http://localhost:3000/videos/${id}`, {
    method: 'PUT',
    headers: {
      contentType: 'application/json'
    },
    body: JSON.stringify(updates)
  })

  const updatedVideo = await response.json()
  console.log(updatedVideo)

}

/*container.addEventListener('submit', async (e) => {
  e.preventDefault();
  updateVideoGrade(updateGrade.id, updateGrade.select)
  //updateVideoGrade
  console.log(updateGrade.id)
})*/

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  renderVideos(searchForm.term.value)
  console.log(searchForm.term.value)
})

//window.addEventListener('DOMContentLoaded', () => renderVideos());


//GET http://localhost:3000/videos
function getVideos(): Promise<Video[]> {
  return fetch('/db.json')
  .then(res => res.json())
  .then(res => {
    return res as Video[]
  })
}

const result = document.getElementById('result')
//getVideos()
        //.then(videos => {
        //        result.innerHTML = videos.map(v => v.title).toString()
       // })

console.log(result)


        // PUT http://localhost:3000/videos/${id}
const updateVideo = async (id, changes): Promise<Video> => {};
