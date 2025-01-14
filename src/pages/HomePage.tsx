const HomePage = () => {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="w-full min-h-96 rounded-xl bg-muted/50 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-center text-primary">Just another shop</h1>
        </div>
        <div className="flex align-center justify-center p-4">
          <h2 className="text-3xl font-bold text-center">Featured products</h2>
        </div>
        {
          Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="w-1/2 h-96 bg-muted/50 rounded-xl" />
                <div className="w-1/2 h-96 bg-muted/50 rounded-xl" />
              </div>
              <div className="flex gap-4">
                <div className="w-1/3 h-96 bg-muted/50 rounded-xl" />
                <div className="w-1/3 h-96 bg-muted/50 rounded-xl" />
                <div className="w-1/3 h-96 bg-muted/50 rounded-xl" />
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default HomePage