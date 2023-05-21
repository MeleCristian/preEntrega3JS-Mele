const productos=[
    {
        nombre:"naruto" ,
        categorias:["naruto"],
        precio: 12000,
        imagen:"https://media.sketchfab.com/models/93174ca7b0bb4f2d8ddf00021854f2cb/thumbnails/ad762fd30c89458bba7ca4a8a67e3032/515eb1f466794bd186244eea8157e1d7.jpeg"
    } ,
    {
        nombre:"sasuke" ,
        categorias:["naruto"],
        precio: 7000,
        imagen:"https://img1.cgtrader.com/items/4068141/159d5fd3a7/large/sasuke-uchiha-from-battle-with-itachi-3d-model-159d5fd3a7.jpg"
    },
    {
        nombre:"kakashi" ,
        categorias:["naruto"],
        precio: 8800,
        imagen:"https://img1.cgtrader.com/items/2659360/3b8b8f950e/large/kakashi-hatake-from-naruto-3d-model-stl.jpg"
    },
    {
        nombre:"goku" ,
        categorias:["dragonball"],
        precio: 10000,
        imagen:"https://i.ebayimg.com/images/g/McYAAOSwg5ZkDDTm/s-l1600.jpg"
    },
    {
        nombre:"vegeta" ,
        categorias:["dragonball"],
        precio: 8000,
        imagen: "https://cdn.meshplorer.com/media/25/35/78/975ac89eaad70e3be343a5c6a7.jpg"
    },
    {
        nombre:"gohan" ,
        categorias:["dragonball"],
        precio: 7800,
        imagen:"https://i.pinimg.com/736x/f4/5c/2b/f45c2b1d98bb0b7787979b6011e7cb51.jpg"
    },
    {
        nombre:"luffy" ,
        categorias:["onepiece"],
        precio: 8500,
        imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbmCm38TORJCwNwxB9MnR5BQUXpUK_E1hE1g&usqp=CAU"
    },
    {
        nombre:"zoro" ,
        categorias:["onepiece"],
        precio: 6300,
        imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVFVHH7lfXy0xrXkuMtafZ8UG5B-FFVq65ew&usqp=CAU"
    },
    {
        nombre:"sanji" ,
        categorias:["onepiece"],
        precio: 4800,
        imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRUOJJouub8j_WJgw2MbuIWdCRdGtcQwZcWA&usqp=CAU"
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



let carritoJson=localStorage.getItem("carrito")
let carrito
if(carritoJson==null){
    carrito = []
}else{
    carrito = JSON.parse(carritoJson)
}



function setearUsuario(){
    const usuarioConectado=document.querySelector(".nav-loggin")
    if(sessionStorage.getItem("usuario")!=null){
        usuarioConectado.innerHTML=sessionStorage.getItem("usuario")
    }else{
        usuarioConectado.innerHTML="Loggin"
    }
}
setearUsuario()
habilitarCompra()
function habilitarCompra(){
    const textoDesconectado= document.querySelector(".txt-desconectado")
    const botonComprar=document.querySelector("#comprar")
    if(sessionStorage.getItem("usuario")!=null){
        textoDesconectado.classList.add("oculto")
        botonComprar.classList.remove("disabled")
    }else{
        botonComprar.classList.add("disabled")
        textoDesconectado.classList.remove("oculto")
    }
    
}




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
        habilitarCompra();
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
    habilitarCompra();
    
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

/* Funcion para mostrar el carrito! */
function mostrarCarrito(){
    const mostrarCarrito=document.querySelector(".carrito")
    mostrarCarrito.innerHTML=' '
    const total= document.querySelector(".total")
    if(carrito==null){
        total.innerHTML= "Carrito vacio agregue productos!"
    }else{
        var suma=0
        carrito.forEach(e=>{
            mostrarCarrito.innerHTML+=` <div class="row mb-1">
                                        <img class="col-2 img-mini" src="${e.imagen}">
                                        <div class="col-3 nombre">${e.nombre}</div>
                                        <button class="btn btn-danger col-1 btn-restar">-</button>
                                        <div class="col-1 centrar cantidad">${e.cantidad}</div>
                                        <button class="btn btn-success col-1 btn-sumar">+</button>
                                        <div class="col-2 centrar">${e.total}</div>
                                        <button class="btn btn-danger col-2 btn-eliminar">Eliminar</button>                                    
                                        </div>`
            suma+=e.total
        })
        total.innerHTML= suma
    }

}


/* Funcion para eliminar del carrito */
function eliminarDelCarrito(element){
    const eliminar=element.querySelector(".nombre").textContent
    carrito.forEach((e,index)=>{
        if(e.nombre==eliminar){
            carrito.splice(index,1)
        }
    })
    carritoJson=JSON.stringify(carrito)
    localStorage.setItem("carrito", carritoJson)
    mostrarCarrito()
}


/* funcion para sumar y restar cantidades */
function sumaResta(element, a){
    const nombreProducto=element.querySelector(".nombre").textContent 
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
    carritoJson=JSON.stringify(carrito)
    localStorage.setItem("carrito", carritoJson)
    mostrarCarrito();
    
}


/* botones del carrito para sumar y restar cantidades */
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
    const vaciar= document.querySelector(".btn-vaciar")
    vaciar.addEventListener("click", e=>{
        carrito=[]
        carritoJson=JSON.stringify(carrito)
        localStorage.setItem("carrito", carritoJson)
        mostrarCarrito()
    })
}

/* Boton Comprar */
const btnComprar= document.querySelector("#comprar")
btnComprar.addEventListener("click", e=>{
    comprar()
})

/* Carrito modal para el index y el  catalogo */
if(document.querySelector(".modal-carrito")!=null){
    const carro=document.querySelector(".modal-carrito")
    carro.addEventListener("click", e=>{
        mostrarCarrito()
    })
}


/* Funcion agragar al carrito */
function agregarCarrito(element){
    var aux=true
    const nombreElemento=element.querySelector(".card-title").textContent
    const precioElemento=Number(element.querySelector(".card-text").textContent)
    if(carrito!=null){
        carrito.forEach(e =>{
        if(e.nombre==nombreElemento){
            e.cantidad++
            e.total+=precioElemento
            aux=false
        }
    })
    if(aux){
        let productoAgregar={ nombre:nombreElemento,
                            precio:precioElemento,
                            cantidad:1,
                            total:precioElemento,
                            imagen:element.querySelector(".url-img").textContent}
        carrito.push(productoAgregar)
    }
    }
    
    carritoJson=JSON.stringify(carrito)
    localStorage.setItem("carrito", carritoJson)
    
}


function comprar(){
    alert(`Gracias por haber comprando. Dentro de los proximos 5 dias habiles su pedido estara en su casa`)
    carrito=[]
    localStorage.removeItem("carrito")
    mostrarCarrito()
}
/*==============================================================================================================
FIN CODIGO CARRITO
================================================================================================================ */


/*==============================================================================================================
INICIO CODIGO PRODUCTOS
================================================================================================================ */
if(document.querySelector("#catalogo")!=null){
    habilitarCompra()
    const produ= document.querySelector("#productos")
    productos.forEach(e =>{
        produ.innerHTML+=`<div class="card m-3 col-4 p-1" style="width: 18rem;">
                            <img src="${e.imagen}" class="card-img-top" alt="...">                            
                            <div class="card-body">
                            <div class="oculto url-img">${e.imagen}</div>
                                <h5 class="card-title">${e.nombre}</h5>
                                <p class="card-text">${e.precio}</p>
                                <button class="btn btn-primary btn-comprar">Agregar al carrito</a>
                            </div>
                        </div>`
    })

    const clickComprar= document.querySelector("#productos")
    clickComprar.addEventListener("click", e=>{
        if(e.target.classList.contains("btn-comprar")){
            agregarCarrito(e.target.parentElement)
        }
    })
}


/*==============================================================================================================
FIN CODIGO PRODUCTOS
================================================================================================================ */







