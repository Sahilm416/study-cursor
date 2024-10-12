"use client";

const App = ({searchParams}: {searchParams: {url: string}}) => {
  return (
    <div className="App relative w-full h-screen">
        <iframe src={searchParams.url} className="w-full h-screen"></iframe>
    </div>
  );
};

export default App;
