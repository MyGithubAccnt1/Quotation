import { useState, useCallback, useEffect } from "react"
import Header from "./components/Header"
import Wrapper from "./components/Wrapper"

function App() {
  const [rows, setRows] = useState([{
    qty: '',
    unit: '',
    item: '',
    expiry: '',
    lotNo: '',
    unitPrice: '',
    total: '',
    errors: { qty: false, unitPrice: false }
  }])

  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    function updateTime() {
      const date = new Date()
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`
      setCurrentTime(formattedTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const validateNumber = useCallback((value) => {
    return /^\d*\.?\d*$/.test(value) && value !== '.'
  }, [])

  const handleInputChange = useCallback((index, field, value) => {
    setRows(prev => {
      const newRows = [...prev]
      const currentRow = { ...newRows[index] }
      
      // Handle numeric validation for qty and unitPrice
      if (field === 'qty' || field === 'unitPrice') {
        // Allow empty value or valid number
        if (value === '' || validateNumber(value)) {
          currentRow[field] = value
          currentRow.errors = {
            ...currentRow.errors,
            [field]: false
          }
          
          // Calculate total if both values are valid numbers
          const qty = parseFloat(field === 'qty' ? value : currentRow.qty) || 0
          const unitPrice = parseFloat(field === 'unitPrice' ? value : currentRow.unitPrice) || 0
          currentRow.total = (qty * unitPrice).toFixed(2)
        } else {
          // Invalid input - keep old value and set error
          currentRow.errors = {
            ...currentRow.errors,
            [field]: true
          }
          return newRows
        }
      } else {
        // For non-numeric fields, just update the value
        currentRow[field] = value
      }
      
      newRows[index] = currentRow
      return newRows
    })
  }, [validateNumber])

  const handleAddRow = useCallback(() => {
    setRows(prev => [...prev, {
      qty: '',
      unit: '',
      item: '',
      expiry: '',
      lotNo: '',
      unitPrice: '',
      total: '',
      errors: { qty: false, unitPrice: false }
    }])
  }, [])

  const totalAmount = rows.reduce((sum, row) => sum + (parseFloat(row.total) || 0), 0)
  const totalItems = rows.reduce((sum, row) => sum + (parseFloat(row.qty) || 0), 0)

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header onAddRow={handleAddRow} />
      <Wrapper>
        <div className="container mx-auto p-[25px]! pb-1!">
          <table className="w-full border-collapse text-black">
            <tbody>
              <tr className="flex flex-wrap">
                <td className="w-1/2 flex items-center mb-4 md:mb-0">
                  <small className="m-0 mr-2 whitespace-nowrap">CUSTOMER :</small>
                  <input
                    type="text"
                    id="customer"
                    required
                    className="flex-grow border-b border-gray-300 focus:outline-none rounded-0 mx-2! px-1! py-1!"
                  />
                </td>
                <td className="w-1/2 flex items-center">
                  <small className="m-0 mr-2 whitespace-nowrap">SALE ID :</small>
                  <input
                    type="text"
                    id="saleId"
                    required
                    className="flex-grow border-b border-gray-300 focus:outline-none rounded-0 ms-2! px-1! py-1!"
                  />
                </td>
              </tr>

              <tr className="flex flex-wrap my-2!">
                <td className="w-1/2 flex items-center mb-4 md:mb-0">
                  <small className="m-0 mr-2 whitespace-nowrap">ADDRESS :</small>
                  <input
                    type="text"
                    id="address"
                    required
                    className="flex-grow border-b border-gray-300 focus:outline-none rounded-0 mx-2! px-1! py-1!"
                  />
                </td>
                <td className="w-1/2 flex items-center">
                  <small className="m-0 mr-2 whitespace-nowrap">DATE :</small>
                  <input
                    type="text"
                    id="date"
                    required
                    className="flex-grow border-b border-gray-300 focus:outline-none rounded-0 ms-2! px-1! py-1!"
                  />
                </td>
              </tr>

              <tr className="flex flex-wrap">
                <td className="w-full flex items-center">
                  <small className="m-0 mr-2 whitespace-nowrap">PAYMENT METHOD :</small>
                  <input
                    type="text"
                    id="paymentMethod"
                    required
                    className="flex-grow border-b border-gray-300 focus:outline-none rounded-0 ms-2! px-1! py-1!"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="container mx-auto p-[25px]! pt-1!">
          <table id="table" className="text-black table-fixed w-full border-collapse border border-gray-400">
            <thead>
              <tr>
                <th colSpan="7" className="text-center border border-gray-400"><small>QUOTE FORM</small></th>
              </tr>
              <tr>
                <th className="text-center border border-gray-400"><small>QTY</small></th>
                <th className="text-center border border-gray-400"><small>UNIT</small></th>
                <th className="text-center border border-gray-400"><small>ITEM</small></th>
                <th className="text-center border border-gray-400"><small>EXPIRY</small></th>
                <th className="text-center border border-gray-400"><small>LOT NO.</small></th>
                <th className="text-center border border-gray-400"><small>UNIT PRICE</small></th>
                <th className="text-center border border-gray-400"><small>TOTAL</small></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td className="text-center border border-gray-400">
                    <small>
                      <input
                        value={row.qty}
                        onChange={(e) => handleInputChange(index, 'qty', e.target.value)}
                        className={`w-full border-0 focus:outline-none text-center input1 ${
                          row.errors?.qty ? 'border-b-2! border-red-500!' : ''
                        }`}
                        type="text"
                        placeholder="0"
                      />
                    </small>
                  </td>
                  <td className="text-center border border-gray-400">
                    <small>
                      <input
                        value={row.unit}
                        onChange={(e) => handleInputChange(index, 'unit', e.target.value)}
                        className="pl-[10px]! w-full border-0 focus:outline-none"
                        type="text"
                      />
                    </small>
                  </td>
                  <td className="text-center border border-gray-400">
                    <small>
                      <textarea
                        value={row.item}
                        onChange={(e) => handleInputChange(index, 'item', e.target.value)}
                        className="resize-none mt-[7px]! pl-[10px]! w-full border-0 focus:outline-none text1"
                        rows="1"
                      />
                    </small>
                  </td>
                  <td className="text-center border border-gray-400">
                    <small>
                      <input
                        value={row.expiry}
                        onChange={(e) => handleInputChange(index, 'expiry', e.target.value)}
                        className="w-full border-0 focus:outline-none text-center"
                        type="text"
                      />
                    </small>
                  </td>
                  <td className="text-center border border-gray-400">
                    <small>
                      <input
                        value={row.lotNo}
                        onChange={(e) => handleInputChange(index, 'lotNo', e.target.value)}
                        className="pl-[10px]! w-full border-0 focus:outline-none"
                        type="text"
                      />
                    </small>
                  </td>
                  <td className="text-center border border-gray-400">
                    <small>
                      <input
                        value={row.unitPrice}
                        onChange={(e) => handleInputChange(index, 'unitPrice', e.target.value)}
                        className={`pr-[10px]! w-full border-0 focus:outline-none text-right input2 ${
                          row.errors?.unitPrice ? 'border-b-2! border-red-500!' : ''
                        }`}
                        type="text"
                        placeholder="0"
                      />
                    </small>
                  </td>
                  <td className="text-center border border-gray-400">
                    <small>
                      <input
                        value={row.total}
                        className="pr-[10px]! w-full border-0 focus:outline-none text-right result"
                        type="text"
                        readOnly
                      />
                    </small>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th className="text-center border border-gray-400">
                  <small className="flex gap-1 ms-2!">
                    <p className="m-0">
                      Item/s:
                    </p>
                    <p className="m-0" id="ItemCount">
                      {totalItems}
                    </p>
                  </small>
                </th>
                <th colSpan="2" className="text-center border border-gray-400">
                  <small className="flex gap-1 ms-2!">
                    <p className="my-auto!">
                      PREPARED_BY:
                    </p>
                    <input type="text" className="border-0 focus:outline-none py-1!" placeholder="MENVELUZ"/>
                  </small>
                </th>
                <th colSpan="2" className="text-center border border-gray-400">
                  <small className="flex gap-1 ms-2!">
                    <p>
                      TIME:
                    </p>
                    <p id="Time">{currentTime}</p>
                  </small>
                </th>
                <th colSpan="2" className="text-center border border-gray-400">
                  <small className="flex justify-content-end gap-1 ms-2!">
                    <p>
                      TOTAL_AMOUNT:
                    </p>
                    <p id="TotalAmount">
                      {totalAmount.toFixed(2)}
                    </p>
                  </small>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </Wrapper>
    </div>
  )
}

export default App