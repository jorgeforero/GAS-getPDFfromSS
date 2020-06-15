# getPDFfromSS

Este script crea un archivo PDF en Drive a partir de datos obtenidos de la fila actual de una hoja de cálculo. Los datos de
la fila son reemplazados en un template tipo doc que tiene definidos los reemplazables correspondientes (identificados con {} )
para generar el archivo PDF.  El script se ejecuta desde la hoja de cálculo y despliega un modal con la url al archivo generado
para ser abierto.

Pasos para usarlo:

1- Cree un doc (corresponde al template)
2- En el cuerpo del doc, ubique los reemplazables que requiera y que correspondan a las columnas de los datos en la hoja
de cálculo.  Este es un ejemplo del contenido del template:

Fecha: {FECHA}

Nombre Completo:  {NOMBRE} {APELLIDO}
Dirección: {DIRECCION}
Teléfono: {TELEFONO}

...
texto
...

3- Guarde el id del template. En la url del documento (template) creado, extracte el id que corresponde a la cadena que aparece
entre ../d/ y /edit de la url ( no incluya los / ) Por ejemplo, si la url del documento creado es:
https://docs.google.com/document/d/1yqhoLWxKZnR1777Ihr4eEO2xloM6Af13J58JMi13SDA/edit
entonces el id del documento es 1yqhoLWxKZnR1777Ihr4eEO2xloM6Af13J58JMi13SDA

4- Cree la hoja de cálculo y copie el script
5- Reemplace el valor de la variable TEMPLATEID por el id guardado en el ejemplo del punto 3 y que corresponda al id de su
template.
6- La hoja de calculo debe tener un encabezado que va en la fila 1 de la hoja.  Este encabezado tiene los nombres de los datos
de las columnas.  En mi ejemplo va de la siguiente forma (y que corresponden a los reemplazables definidos en el template):

fecha	Nombre	Apellido	Direccion	Telefono

7- En el script ejecute el onOpen.  Una vez ejecutado y fijado los permisos, aparece una nueva opción en el menú de la hoja de
cálculo: "Acciones" y luego "Generar PDF".
8- Para ejecutar el script, ubique el cursos en una celda con datos, haga clic en Acciones > Generar PDF y luego de algunos
aparecerá un modal con la url del archivo PDF generado.  Haga clic sobre el enlace y aparecerá el PDF.

Esta es solo una forma generar el pdf.  Modifique el script, el template y la hoja de cálculo para adaptarlo a sus necesidades. 
