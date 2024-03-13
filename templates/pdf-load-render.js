// pdf-load-render.js
import { getDocument } from '/static/assets/pdf.js/build/pdf.mjs';

const url = '/static/assets/pdf/song1.pdf'; // Path to your PDF file

let pdfDoc = null,
    pageNum = 1,
    scale = 1.5; // Adjust scale as needed for your display

// Load and render the first page when the document is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
    try {
        pdfDoc = await getDocument(url).promise;
        renderPage(pageNum);
    } catch (error) {
        console.error("Error loading PDF: ", error);
    }
});

async function renderPage(num) {
    const page = await pdfDoc.getPage(num);
    const viewport = page.getViewport({ scale: scale });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    // Ensure the canvas container is empty before appending a new canvas
    const canvasContainer = document.getElementById('pdf-canvas-container');
    canvasContainer.innerHTML = '';
    canvasContainer.appendChild(canvas);

    const renderContext = {
        canvasContext: context,
        viewport: viewport,
    };
    await page.render(renderContext).promise;
    console.log(`Page ${num} rendered`);
}

function queueRenderPage(num) {
    if (num >= 1 && num <= pdfDoc.numPages) {
        pageNum = num;
        renderPage(pageNum);
    }
}

// Key event for navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'p') {
        if (pageNum < pdfDoc.numPages) {
            queueRenderPage(pageNum + 1);
        }
    } else if (event.key === 'o') {
        if (pageNum > 1) {
            queueRenderPage(pageNum - 1);
        }
    }
});
