export interface Video {
  id: Number;
  title: String;
  grade: Number;
}

const container = document.querySelector('.videos') as HTMLDivElement;
const searchForm = document.querySelector('.search') as HTMLFormElement;
// Used to requery the db when returning from edit view.
const title = new URLSearchParams(window.location.search).get('title') as String;

// Used to throttle the requests to the db
const throttle = (fn:Function, delay:Number) => {
  let lastSubmit = 0;
  return (...args) => {
    const now = new Date().getTime();
    if(now - lastSubmit < delay) {
      return;
    }
    lastSubmit = now;
    return fn(...args)
  }
}

// Rendering the videos that matches the search input.
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
        </p>
        <a class="updateButton" href="/update.html?id=${video.id}">Update grade</a>
      </div>
      `
    
  })
  container.innerHTML = template;
  console.log(template);
  }}

  // This is used to render videos upon return from update view. 
  if (title != null) {
    renderVideos(title)
  }

// Listener for the submission of a search term
searchForm.addEventListener('submit', throttle((e) => {
  e.preventDefault();
  renderVideos(searchForm.term.value)
  console.log(searchForm.term.value)
}, 50));
