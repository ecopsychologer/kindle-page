import { getDocument } from '/static/assets/pdf.js/build/pdf.mjs';

const url = '/static/assets/pdf/song1.pdf'; // Update this to the path of your PDF file

let pdfDoc = null,
    pageNum = 1;

async function renderPage(num) {
    const pdfDoc = await getDocument(url).promise;
    const page = await pdfDoc.getPage(num);
    // Add the rest of your rendering logic here
}

// Initialize and render the first page
renderPage(pageNum);

// Include your navigation logic here

/* 
//const url = '../assets/pdf/song1.pdf'; // Path to your PDF file
const url = '/static/assets/pdf/song1.pdf'; // Make sure this path is correct

let pdfDoc = null,
    pageNum = 1,
    scale = 1.5, // Adjust scale as needed for your display
    canvasContainer = document.getElementById('pdf-canvas-container'),
    currentPageRender = null;

// Asynchronously downloads PDF.
pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
    pdfDoc = pdfDoc_;
    renderPage(pageNum);
});

function renderPage(num) {
    // Ensure the previous page render is cancelled before starting a new one
    if (currentPageRender) {
        currentPageRender.cancel();
    }

    pdfDoc.getPage(num).then(function(page) {
        var viewport = page.getViewport({scale: scale});
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };

        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvasContainer.appendChild(canvas);

        currentPageRender = page.render(renderContext);
        currentPageRender.promise.then(function() {
            console.log(`Page ${num} rendered`);
        });
    });
}

function queueRenderPage(num) {
    if (num >= 1 && num <= pdfDoc.numPages) {
        pageNum = num;
        renderPage(pageNum);
    }
}
*/
// Key event for navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'p') {
        queueRenderPage(pageNum + 1);
    } else if (event.key === 'o') {
        queueRenderPage(pageNum - 1);
    }
});
