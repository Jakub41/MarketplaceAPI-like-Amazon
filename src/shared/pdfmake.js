const PdfPrinter = require("pdfmake");
const fs = require("fs-extra");
const pdfDir = require("./utilitis");
const getDocDefinition = require("./pdfProductTemplate");

const makePDF = product => {
    new Promise((resolve, reject) => {
        try {
            // Define font files
            var fonts = {
                Roboto: {
                    normal: "Helvetica",
                    bold: "Helvetica-Bold",
                    italics: "Helvetica-Oblique",
                    bolditalics: "Helvetica-BoldOblique"
                }
            };
            const printer = new PdfPrinter(fonts);

            const docDefinition = getDocDefinition(product);

            const pdfDocStream = printer.createPdfKitDocument(
                docDefinition,
                {}
            );

            pdfDocStream.pipe(fs.createWriteStream(pdfDir.uploadsDir));

            pdfDocStream.end();

            resolve();
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

module.exports = makePDF;
