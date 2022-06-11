import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Fileuploadsidebar from './Fileuploadsidebar';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Notepdfview({options,pdfFilePath } : any) {
  const [file, setFile] = useState(pdfFilePath);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  
  const options2 = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/',
  };

  // @ts-ignore
  function onFileChange(event) {
    setFile(event.target.files[0]);
  }

  // @ts-ignore
  function onDocumentLoadSuccess(test) {
    console.log("NUM PAGES", test._pdfInfo.numPages)
    setNumPages(test._pdfInfo.numPages);
  }

  return (
    <div>
      <Fileuploadsidebar options={options}/>
      <div className="Example">
      <header>
        <h1>react-pdf sample page</h1>
      </header>
      <div className="Example__container">
        <div className="Example__container__load">
          <label htmlFor="file">Load from file:</label>{' '}
          <input onChange={onFileChange} type="file" />
        </div>
        <div className="Example__container__document">
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options2}>
              <Page  pageNumber={currentPage} />
          </Document>
        </div>
        <div onClick={() => setCurrentPage(currentPage + 1)}>CLICK ME</div>
      </div>
    </div>
    </div>
  );
}