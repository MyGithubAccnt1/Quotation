function Wrapper({ children }) {

  return (
    <>
      <div className="bg-[#525659] min-h-[100dvh] overflow-auto">
        <div 
        id="printable" 
        className="bg-white mx-auto! p-[50px] w-[1000px]">
            {children}
        </div>
      </div>
    </>
  )
}

export default Wrapper