import React from 'react'
import { Viewer,SpecialZoomLevel  } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Worker } from '@react-pdf-viewer/core';
//import '@react-pdf-viewer/core/lib/styles/index.css';
//import '@react-pdf-viewer/default-layout/lib/styles/index.css';



const PdfViwer = ({pdffifepath}) => {

    

    return (
        <div className='h-48'>
    {/* show pdf conditionally (if we have one)  */}
    {pdffifepath&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          <Viewer fileUrl={pdffifepath}
          defaultScale={SpecialZoomLevel.PageFit}

         />
      </Worker></>}
        </div>
    )
}

export default PdfViwer

