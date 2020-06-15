//
// Genera un archivo pdf a partir de la información de la fila de la celda activa en una hoja de 
// cálculo y usando un template defindo en un doc.  La función despliega un modal donde queda la url
// del archivo pdf generado a través del cual puede ser abierto.

// Id del template - doc
const TEMPLATEID = 'XXX_ID_DEL_TEMPLATE_EN DOC_XXX';

// on Open
// Opcion adicional del menu para llamado de la función
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Acciones')
      .addItem('Generar PDF', 'getPDF')
      .addToUi();
}
//
// Generar PDF
// Genera un pdf a partir del template en Docs con los datos de la fila en la hoja de cálculo
function getPDF() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var box = sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxRows()).getValues();
  // Determina la celda activa y la fila
  var cell = sheet.getActiveCell();
  var row = cell.getRow();
  // Valida que celda activa no este en el encabezado (títulos de columna)
  if (row !== 1) {
    var record = box[row - 1];
    var fecha = record[0];
    var nombre = record[1];
    var apellido = record[2];
    var direccion = record[3];
    var telefono = record[4];
    // Valida que el registro tenga un nombre y un apellido
    if ( (nombre !== '') && (apellido !== '') ) {     
      // Abre y copia el template en Drive para el reemplazo de los datos
      var docFile = DriveApp.getFileById(TEMPLATEID).makeCopy('tempDoc');      
      var docId = docFile.getId();
      // Abre el nuevo doc
      doc = DocumentApp.openById(docId);
      docBody = doc.getBody()
      // Remplaza los valores en el documento generado
      docBody.replaceText('{FECHA}', Utilities.formatDate(fecha, 'GMT-5', 'MM-DD-YY') );
      docBody.replaceText('{NOMBRE}', nombre);
      docBody.replaceText('{APELLIDO}', apellido);
      docBody.replaceText('{DIRECCION}', direccion);
      docBody.replaceText('{TELEFONO}', telefono);
      doc.saveAndClose();      
      // Crea el pdf en drive y obtiene la url del archivo      
      var pdfFile = docFile.getAs('application/pdf').setName('print.pdf');
      var urlPdfFile = DriveApp.createFile(pdfFile).getUrl();
      // Despliega un Modal para mostrar la url del Pdf generado
      var htmlOutput = HtmlService.createHtmlOutput( '<a href="' + urlPdfFile + '" target="_blank">PDF generado</a>' )
                                  .setWidth(300).setHeight(150);
      SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Resultado');
      // Borra el documento temporal
      docFile.setTrashed(true);
    } else {
      // console.log('Ubiquese en una fila con datos');
      SpreadsheetApp.getActiveSpreadsheet().toast('Ubiquese en una fila con datos');
    };
    
  } else {
    // console.log('No puedo procesar el encabezado. Ubiquese en una fila con datos');
    SpreadsheetApp.getActiveSpreadsheet().toast('No puedo procesar el encabezado. Ubiquese en una fila con datos');
  }; 
};
