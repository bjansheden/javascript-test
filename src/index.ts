
interface Video {
  id: number;
  title: string;
  grade: number;
}


const container = document.querySelector('.videos') as HTMLDivElement;
const searchForm = document.querySelector('.search') as HTMLFormElement;
const updateGrade = document.querySelector('.videos') as HTMLButtonElement;

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
      <div class="video">
        <h2>${video.title}</h2>
        <p>Grade: ${video.grade}
          <form>  
            <label for="grade"> Edit grade </label>
            <select name="grade" id="membership">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <input type="submit" value="Submit"/>
          </form>
        </p>
      </div>
      `
    
  })
  container.innerHTML = template;
  console.log(template);
  }}

updateGrade.addEventListener('click', async (e) => {
  e.preventDefault();
  const result = await fetch('http://localhost:3000/videos/',{
  method: 'PUT'
  })
  console.log(result)
})

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
