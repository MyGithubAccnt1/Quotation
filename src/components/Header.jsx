import { useCallback, useState } from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

function Header({ onAddRow }) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownloadPDF = useCallback(async () => {
    if (isGenerating) return
    setIsGenerating(true)

    try {
      const element = document.getElementById('printable')
      if (!element) {
        throw new Error('Printable element not found')
      }

      // Create a clone of the element for PDF generation
      const clone = element.cloneNode(true)
      clone.style.position = 'absolute'
      clone.style.left = '-9999px'
      clone.style.top = '-9999px'
      document.body.appendChild(clone)

      // Apply PDF-specific styles to the clone
      const pdfStyles = document.createElement('style')
      pdfStyles.textContent = `
        #pdf-content {
          background-color: #ffffff !important;
          color: #000000 !important;
          padding: 50px !important;
          width: 1000px !important;
          margin: 0 auto !important;
        }
        #pdf-content * {
          font-family: Arial, sans-serif !important;
          margin: 0 !important;
          padding: 0 !important;
          box-sizing: border-box !important;
          line-height: 1 !important;
        }
        #pdf-content table {
          border-collapse: collapse !important;
          width: 100% !important;
        }
        #pdf-content #table {
          border: 1px solid #9ca3af !important;
          margin-top: 25px !important;
        }
        #pdf-content #table th, #pdf-content #table td {
          border: 1px solid #9ca3af !important;
          text-align: center !important;
          height: 35px !important;
          position: relative !important;
          padding: 4px 0 8px !important;
        }
        #pdf-content small {
          font-size: 0.875rem !important;
          height: 27px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        /* Add specific styles for the top section labels */
        #pdf-content tr:not(#table tr) small {
          justify-content: flex-start !important;
        }
        #pdf-content tr:not(#table tr) small:after {
          content: '' !important;
          display: inline-block !important;
          width: 5px !important;
        }
        #pdf-content input, #pdf-content textarea {
          width: 100% !important;
          height: 27px !important;
          border: none !important;
          text-align: inherit !important;
          font-size: 0.875rem !important;
          background: transparent !important;
          display: flex !important;
          align-items: center !important;
        }
        #pdf-content textarea {
          resize: none !important;
          overflow: hidden !important;
        }
        #pdf-content td small {
          padding: 0 !important;
        }
        #pdf-content td small input, #pdf-content td small textarea {
          padding: 0 4px !important;
        }
        #pdf-content tfoot th small {
          justify-content: flex-start !important;
          padding-left: 8px !important;
          align-items: center !important;
        }
        #pdf-content tfoot th:last-child small {
          justify-content: flex-end !important;
          padding-right: 8px !important;
        }
        #pdf-content tfoot th small p {
          display: flex !important;
          align-items: center !important;
          height: 27px !important;
        }
        #pdf-content tfoot th small input {
          text-align: left !important;
        }
      `
      clone.id = 'pdf-content'
      document.head.appendChild(pdfStyles)

      // Convert inputs to spans in the clone
      clone.querySelectorAll('input, textarea').forEach(input => {
        if (input.type !== 'submit' && input.type !== 'button') {
          const span = document.createElement('span')
          span.style.display = 'inline-block'
          span.style.width = '100%'
          span.style.padding = '0 4px'
          
          // Add margin-left for top section inputs
          if (!input.closest('#table')) {
            span.style.marginLeft = '15px !important'
            span.style.borderBottom = '1px solid #9ca3af !important' // Add bottom border for top section inputs
          }
          
          span.textContent = input.value || ''
          input.parentNode.replaceChild(span, input)
        }
      })

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 1000,
        height: clone.scrollHeight
      })

      // Clean up
      document.body.removeChild(clone)
      document.head.removeChild(pdfStyles)

      // Calculate dimensions
      const imgWidth = 595 // A4 width in points
      const pageHeight = 842 // A4 height in points
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // Create PDF
      const pdf = new jsPDF('p', 'pt', 'a4')
      
      let heightLeft = imgHeight
      let position = 0

      // First page
      pdf.addImage(
        canvas.toDataURL('image/png', 1.0),
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      )
      heightLeft -= pageHeight

      // Add subsequent pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(
          canvas.toDataURL('image/png', 1.0),
          'PNG',
          0,
          position,
          imgWidth,
          imgHeight,
          undefined,
          'FAST'
        )
        heightLeft -= pageHeight
      }

      // Generate filename with date
      const date = new Date()
      const fileName = `Quote_Form_${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}_${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}.pdf`
      
      // Save the PDF
      pdf.save(fileName)
    } catch (err) {
      console.error('Error generating PDF:', err)
      alert('Error generating PDF: ' + (err.message || 'Please try again.'))
    } finally {
      setIsGenerating(false)
    }
  }, [isGenerating])

  const handleSaveAndExit = useCallback(() => {
    const table = document.getElementById('table')
    const rows = table.querySelectorAll('tbody tr')
    const TableData = []
    
    // Save primary data
    const primaryData = []
    primaryData.push(document.getElementById('customer').value)
    primaryData.push(document.getElementById('saleId').value)
    primaryData.push(document.getElementById('address').value)
    primaryData.push(document.getElementById('date').value)
    primaryData.push(document.getElementById('paymentMethod').value)
    TableData.push(primaryData)

    // Save table data
    rows.forEach(row => {
      const cells = row.querySelectorAll('td')
      const rowData = []
      cells.forEach(cell => {
        const input = cell.querySelector('input, textarea')
        if (input) {
          rowData.push(input.value)
        }
      })
      TableData.push(rowData)
    })
    console.log(TableData)
    // Here you can add logic to save to localStorage or backend
  }, [])

  return (
    <div 
      className="flex flex-col md:flex-row text-center py-1!"
      style={{ backgroundColor: '#323639' }}>
      <button 
        onClick={handleSaveAndExit}
        className="rounded-full w-50 my-1! mx-auto! pb-1! px-4 hover:opacity-90"
        style={{ backgroundColor: '#2563eb' }}>
        <small><i className="fa-regular fa-floppy-disk me-2"></i>SAVE AND EXIT</small>
      </button>

      <button 
        onClick={onAddRow}
        className="rounded-full w-50 my-1! mx-auto! pb-1! px-4 hover:opacity-90"
        style={{ backgroundColor: '#4b5563' }}>
        <small><i className="fa-solid fa-plus me-2"></i>NEW ROW ITEM</small>
      </button>
      
      <button 
        onClick={handleDownloadPDF}
        disabled={isGenerating}
        className="rounded-full w-50 my-1! mx-auto! pb-1! px-4 hover:opacity-90"
        style={{ backgroundColor: isGenerating ? '#9ca3af' : '#dc2626' }}>
        <small>
          {isGenerating ? (
            <>Generating PDF...</>
          ) : (
            <><i className="fa-solid fa-download me-2"></i>DOWNLOAD TO PDF</>
          )}
        </small>
      </button>
    </div>
  )
}

export default Header