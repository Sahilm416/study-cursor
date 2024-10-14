export const Videos = ({
  videos,
}: {
  videos: Array<{
    id: string;
    title: string;
    description: string;
    thumbnail: string;
  }>;
}) => {
  return (
    <div>
      {videos.map((video) => (
        <div key={video.id}>
          <h3>{video.title}</h3>
          <p>{video.description}</p>
          <img src={video.thumbnail} alt={video.title} />
        </div>
      ))}
    </div>
  );
};
