
function Header() {

  return (
    <div className="flex flex-col md:flex-row text-center py-1! bg-[#323639]">
        <button 
        id="Download" 
        className="rounded-full bg-blue-600 w-50 my-1! mx-auto! pb-1! hover:bg-blue-500">
            <small>SAVE AND EXIT</small>
        </button>

        <button 
        id="AddRow" 
        className="rounded-full bg-gray-600 w-50 my-1! mx-auto! pb-1! hover:bg-gray-500">
            <small>NEW ROW ITEM</small>
        </button>
        
        <button 
        id="AddRow" 
        className="rounded-full bg-red-600 w-50 my-1! mx-auto! pb-1! hover:bg-red-500">
            <small>DOWNLOAD TO PDF</small>
        </button>
    </div>
  )
}

export default Header