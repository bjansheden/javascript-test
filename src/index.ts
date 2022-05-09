
interface Video {
  id: number;
  title: string;
  grade: number;
}

const renderVideos = async () => {
  let uri = 'http://localhost:3000/videos';
  const res = await fetch(uri);
  const videos = await res.json();
  console.log(videos);
}

window.addEventListener('DOMContentLoaded', () => renderVideos());

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
