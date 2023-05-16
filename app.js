const productos=[
    {
        nombre:"naruto" ,
        tamanio: "grande",
        precio: 10000
    } ,
    {
        nombre:"sasuke" ,
        tamanio: "mediano",
        precio: 7000
    },
    {
        nombre:"itachi" ,
        tamanio: "mediano",
        precio: 5500
    },
    {
        nombre:"sakura" ,
        tamanio: "chico",
        precio: 3000
    },
    {
        nombre:"gara" ,
        tamanio: "chico",
        precio: 2000
    },
    {
        nombre:"kakashi" ,
        tamanio: "grande",
        precio: 8000
    }
    
]

var usuarios=[
    {
        usuario:"cristian" ,
        password:"ddd"
    },
    {
        usuario:"omar" ,
        password:"omar"
    },
    {
        usuario:"ricardo" ,
        password:"1234"
    },
    {
        usuario:"daniela" ,
        password:"dani"
    }
]

var carrito=[{nombre:"lala",precio:1500,cantidad:2,total:3000}, {nombre:"lolo",precio:1500,cantidad:2,total:3000}]
function setearUsuario(){
    const usuarioConectado=document.querySelector(".nav-loggin")
    if(sessionStorage.getItem("usuario")!=null){
        usuarioConectado.innerHTML=sessionStorage.getItem("usuario")
    }else{
        usuarioConectado.innerHTML="Loggin"
    }
}
setearUsuario()



/*=========================================================================================
Solo se ejecuta este codigo si estoy en el html loggin 
=========================================================================================*/

if(document.querySelector('#loggout')!=null){
    sesionIniciada();
    
        
    /* ----------------------PREVEN DEFAULT DEL SUBMIT---------------------- */
    const preventSubmit =document.querySelector('#form-iniciar-sesion')
    preventSubmit.addEventListener('submit', (e)=>{
        e.preventDefault()
    })
    /* ----------------------FIN DEPREVEN DEFAULT DEL SUBMIT---------------------- */


    /* -----------------VERIFICACION DE DATOS DE USUARIO Y CONTRASENIA---------- */
    const iniciarSesion= document.querySelector('.iniciar-sesion')
    iniciarSesion.addEventListener('click',e =>{
        e.preventDefault();
        const iniciarMail= document.querySelector('.iniciar-mail')
        const iniciarPass= document.querySelector('.iniciar-pass')
        validarUsuario(iniciarMail.value, iniciarPass.value)
        

    })

    /* Funcion para validar usuario y contrasenia y poner el usuario en sesionStorage */
    function validarUsuario(a,b) {
        var aux=true;
        usuarios.forEach(e =>{
            if(e.usuario==a & e.password==b)
            {
                sessionStorage.setItem("usuario", e.usuario)
                aux=false
            } 
        })
        if(aux){ 
            document.querySelector("#error").classList.remove ("oculto")
            
        } 
        sesionIniciada();
    }
    /* FIN Funcion para validar usuario y contrasenia y poner el usuario en sesionStorage */

    /* -------------FIN DE VERIFICACION DE DATOS DE USUARIO Y CONTRASENIA---------- */
    
    /* ---------------------CREACION DE NUEVOS USUARIOS-------------------------- */
    const formCrearUsuario= document.querySelector('.crear-usuario')
    formCrearUsuario.addEventListener('click',e =>{
        e.preventDefault()
        const crearMail= document.querySelector('.crear-mail').value
        const crearPass= document.querySelector('.crear-pass').value
        let aux=true
        usuarios.forEach(e=>{
            if(crearMail==e.usuario){ 
                aux=false
                const leyenda=document.querySelector(".modal-footer")
                leyenda.innerHTML="El usuario ya existe vuelva a intentarlo"
            }
        })
        if(aux){
            const nuevoUsuario={usuario:crearMail, password:crearPass}
            usuarios.push(nuevoUsuario)
            const leyenda=document.querySelector(".modal-footer")
            leyenda.innerHTML="El usuario ha sido creado con exito! inicie sesion!"
        }
    })
    /* -------------------------FIN CREACION DE NUEVOS USUARIOS---------------------- */  

    /* -------------------------------INICIO CODEO DE BOTON DESCONECTAR---------------------------- */
    const desconectar= document.querySelector("#desconectar")
    desconectar.addEventListener("click",e=>{
        sessionStorage.removeItem("usuario")
        sesionIniciada()
        setearUsuario()
    })
    /* -------------------------------FIN CODEO DE BOTON DESCONECTAR---------------------------- */
} 


/* ----------------- funciones especificas del LOGGIN ------------ */
/*----- cambiar el loggin si hay un usuario conectado----*/
function sesionIniciada(){
    if(sessionStorage.getItem("usuario")!=null){
        bienvenida()
        document.querySelector("#loggout").classList.add ("oculto")
        document.querySelector("#loggin").classList.remove ("oculto")            
    }else{
        bienvenida()
        document.querySelector("#loggin").classList.add ("oculto")
        document.querySelector("#loggout").classList.remove ("oculto")
    }
    mostrarCarrito()
    setearUsuario()
}

/* ------------------------------- MENSAJE DE BIENVENIDA---------------------------- */
function bienvenida(){
    const bienvenida= document.querySelector("#bienvenida")
    bienvenida.innerHTML=`Bienvenid@ ${sessionStorage.getItem("usuario")}`
}





/*==============================================================================================================
FIN DEL HTML LOGGIN
================================================================================================================ */





/*==============================================================================================================
INICIO CODIGO CARRITO
================================================================================================================ */
function mostrarCarrito(){
    const mostrarCarrito=document.querySelector(".carrito")
    mostrarCarrito.innerHTML=''
    carrito.forEach(e =>{
        mostrarCarrito.innerHTML+=`<div class="row mb-1">
                                    <div class="col-3 nombre">${e.nombre}</div>
                                    <button class="btn btn-danger col-1 btn-restar">-</button>
                                    <div class="col-1 centrar cantidad">${e.cantidad}</div>
                                    <button class="btn btn-success col-1 btn-sumar">+</button>
                                    <div class="col-2 centrar">${e.total}</div>
                                    <button class="btn btn-danger col-2 btn-eliminar">Eliminar</button>                                    
                                    </div>`
    })
    const total= document.querySelector(".total")
    if(carrito.length==0){
        total.innerHTML= "Carrito vacio agregue productos!"
    }else{
        var suma=0
        carrito.forEach(e=>{
            suma+=e.total
        })
        total.innerHTML= suma
    }

}

function eliminarDelCarrito(element){
    const eliminar=element.querySelector(".nombre").textContent
    carrito.forEach((e,index)=>{
        if(e.nombre==eliminar){
            carrito.splice(index,1)
        }
    })
    mostrarCarrito()
}

function sumaResta(element, a){
    
    const nombreProducto=element.querySelector(".nombre").textContent 
    console.log(nombreProducto)
    if(a=="suma"){
        carrito.forEach((e)=>{
            if(nombreProducto==e.nombre){
                e.cantidad++
                e.total= e.cantidad*e.precio
            }
        })
    }
    if(a=="resta"){
        const cantidadProducto=element.querySelector(".cantidad").textContent
        if(cantidadProducto==1){
            eliminarDelCarrito(element)
        }else{
            carrito.forEach(e=>{
                if(nombreProducto==e.nombre){
                    e.cantidad--
                    e.total= e.cantidad*e.precio
                }
            })
        }
    }
    mostrarCarrito();
    
}

if(document.querySelector(".carrito")!=null){
    const carro= document.querySelector(".carrito")
    carro.addEventListener("click",e=>{
        if(e.target.classList.contains("btn-restar")){
            sumaResta(e.target.parentElement, "resta")
        }
        if(e.target.classList.contains("btn-sumar")){
            sumaResta(e.target.parentElement, "suma")
        }
        if(e.target.classList.contains("btn-eliminar")){
            eliminarDelCarrito(e.target.parentElement)
        }
    })
}
/*==============================================================================================================
FIN CODIGO CARRITO
================================================================================================================ */







