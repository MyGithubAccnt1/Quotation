function Wrapper({ children }) {
  return (
    <div 
      className="flex-grow overflow-auto flex min-h-full" 
      style={{ backgroundColor: '#525659' }}>
      <div 
        id="printable" 
        className="mx-auto! p-[50px] min-w-[1000px] w-[1000px] min-h-full flex flex-col"
        style={{ backgroundColor: '#ffffff', margin: '0 auto' }}>
        {children}
      </div>
    </div>
  )
}

export default Wrapper