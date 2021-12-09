
const fs = require('fs');
const rutaDescargas = 'C:/Users/USER/Downloads';//Aquí va el directrorio que quieras ordenar
const extensiones = [`.txt|.pdf|.docx|.pptx`,`.png|.jpg|.jpng|.gif|.ico|.jfif`,`.mp4`,`.mp3`, `.exe`, `.rar|.zip`,] // estas son las extensiones son expresiones regulares
fs.readdir(rutaDescargas, (err, files)=>{
    files.forEach(archivo =>{
        extensiones.forEach(extension=>{
            if(buscar(extension, archivo)) 
            {
                if(extension == extensiones[0]) mover('documentos', archivo);
                if(extension == extensiones[1]) mover('images', archivo);
                if(extension == extensiones[2]) mover('videos', archivo);
                if(extension == extensiones[3]) mover('audios', archivo);
                if(extension == extensiones[4]) mover('programas', archivo);
                if(extension == extensiones[5]) mover('comprimidos', archivo);
            }
        })
    })
})

//Mueve el archivo a la carpeta que le pases por parametro
// extra: si la carpeta no existe creara una y volvera a ejecutar la funcion una vez mas
function mover(carpeta, archivo)
{
    const oldPath = rutaDescargas + '/' + archivo;
    const newPath = rutaDescargas + `/${carpeta}/` + archivo;
    fs.rename(oldPath, newPath, (err)=>{
        if(err) {
            fs.mkdirSync(`${rutaDescargas}/${carpeta}`,{recursive:true});
            mover(carpeta,archivo);
        }
        console.log(archivo + ' fue movido exitosamente');
    })
}
//devuelve verdadero o falso dependiendo si la extension del archivo coincide con la expresion 
function buscar(expresion, archivo)
{
    const exp = expresion;
    const er = new RegExp(exp);
    let isTheType =  er.test(archivo);
    console.log(expresion + ' ' + isTheType);
    return isTheType;

}
