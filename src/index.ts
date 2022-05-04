
interface Video {
  id: number;
  title: string;
  grade: number;
}

console.log("Checking if it works")

//GET http://localhost:3000/videos
const getVideos = (): Promise<Video[]> => {
}

// PUT http://localhost:3000/videos/${id}
const updateVideo = async (id, changes): Promise<Video> => {};
