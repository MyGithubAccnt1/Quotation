import Header from "./components/Header"
import Wrapper from "./components/Wrapper"
function App() {

  return (
    <>
      <Header />
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
          <table className="text-black table-fixed w-full border-collapse border border-gray-400">
            <thead>
              <tr>
                  <th colspan="7" className="text-center border border-gray-300"><small>QUOTE FORM</small></th>
              </tr>
              <tr>
                  <th className="text-center border border-gray-300"><small>QTY</small></th>
                  <th className="text-center border border-gray-300"><small>UNIT</small></th>
                  <th className="text-center border border-gray-300"><small>ITEM</small></th>
                  <th className="text-center border border-gray-300"><small>EXPIRY</small></th>
                  <th className="text-center border border-gray-300"><small>LOT NO.</small></th>
                  <th className="text-center border border-gray-300"><small>UNIT PRICE</small></th>
                  <th className="text-center border border-gray-300"><small>TOTAL</small></th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="text-center border border-gray-300">
                        <small>
                            <input oninput="TriggerFilter(this)" className="w-full border-0 focus:outline-none text-center input1" type="text"/>
                        </small>
                    </td>
                    <td className="text-center border border-gray-300">
                        <small>
                            <input className="pl-[10px]! w-full border-0 focus:outline-none" type="text"/>
                        </small>
                    </td>
                    <td className="text-center border border-gray-300">
                        <small>
                            <textarea className="resize-none mt-[7px]! pl-[10px]! w-full border-0 focus:outline-none text1" rows="1"></textarea>
                        </small>
                    </td>
                    <td className="text-center border border-gray-300">
                        <small>
                            <input className="w-full border-0 focus:outline-none text-center" type="text"/>
                        </small>
                    </td>
                    <td className="text-center border border-gray-300">
                        <small>
                            <input className="pl-[10px]! w-full border-0 focus:outline-none" type="text"/>
                        </small>
                    </td>
                    <td className="text-center border border-gray-300">
                        <small>
                            <input oninput="TriggerFilter(this)" className="pr-[10px]! w-full border-0 focus:outline-none text-right input2" type="text"/>
                        </small>
                    </td>
                    <td className="text-center border border-gray-300">
                        <small>
                            <input className="pr-[10px]! w-full border-0 focus:outline-none text-right result" type="text" readonly/>
                        </small>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th className="text-center border border-gray-300">
                        <small className="flex gap-1 ms-2!">
                            <p className="m-0">
                                Item/s:
                            </p>
                            <p className="m-0" id="ItemCount">
                                0
                            </p>
                        </small>
                    </th>
                    <th colspan="2" className="text-center border border-gray-300">
                        <small className="flex gap-1 ms-2!">
                            <p className="my-auto!">
                                PREPARED BY:
                            </p>
                            <input type="text" className="border-0 focus:outline-none py-1!" placeholder="MENVELUZ"/>
                        </small>
                    </th>
                    <th colSpan="2" className="text-center border border-gray-300">
                        <small className="flex gap-1 ms-2!">
                            <p>
                                TIME:
                            </p>
                            <p></p>
                        </small>
                    </th>
                    <th colspan="2" className="text-center border border-gray-300">
                        <small className="flex justify-content-end gap-1 ms-2!">
                            <p>
                                TOTAL AMOUNT:
                            </p>
                            <p id="TotalAmount">
                                0
                            </p>
                        </small>
                    </th>
                </tr>
            </tfoot>
          </table>
        </div>
      </Wrapper>
    </>
  )
}

export default App