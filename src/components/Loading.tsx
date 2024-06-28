const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[51]">
      <div className="flex flex-col gap-4 justify-center items-center">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
