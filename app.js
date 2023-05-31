let productos  =[]
let usuarios=[]


/* funcion para Mostrar Los productos en el json */
const mostrarProductos=async()=>{
    const resp=await fetch("https://melecristian.github.io/preEntrega3JS-Mele/data.json")
    const data= await resp.json()
    productos=[...data.productos]
    mostrarProductosxArray(productos)
    
}

/* funcion para ordenar los productos y filtrarlos */
const ordenarProductos=async(ordenar,categorias)=>{
    switch(ordenar){
        case "PrecioAs":
            productos.sort((a,b)=>{
                return a.precio-b.precio
            })
            break;
        case "PrecioDes":
            productos.sort((a,b)=>{
                return b.precio-a.precio
            })
            break;
        case "NombreAs":
            productos.sort((a,b)=>{
                if(a.nombre<b.nombre){return -1}
                if(a.nombre>b.nombre){return 1}
                return 0
                
            })
            break;
        case "NombreDes":
            productos.sort((a,b)=>{
                if(a.nombre<b.nombre){return 1}
                if(a.nombre>b.nombre){return -1}
                return 0
                
            })
            break;
        default:
            break;
    }
    switch(categorias){
        case "naruto":
            obtenerJson()
            productos=productos.filter(e=>{
                if(e.categorias=="naruto")
                { return true}
            })
            break;
        case "one piece":
            obtenerJson()
            productos=productos.filter(e=>{
                if(e.categorias=="onepiece")
                { return true}
            })
            break;
        case "dragon ball":
            obtenerJson()
            productos=productos.filter(e=>{
                if(e.categorias=="dragonball")
                { return true}
            })
            break;
        case "categorias":
            
        default:
            break;
    }
    
    mostrarProductosxArray(productos)
}

const obtenerJson= async()=>{
    const resp=await fetch("/data.json")
    const data= await resp.json()
    usuarios=[...data.usuarios]
    productos=[...data.productos]
    
}


let carritoJson=localStorage.getItem("carrito")
let carrito
if(carritoJson==null){
    carrito = []
}else{
    carrito = JSON.parse(carritoJson)
}

/* Mostrar usuario en el nav */
function setearUsuario(){
    const usuarioConectado=document.querySelector(".nav-loggin")
    if(sessionStorage.getItem("usuario")!=null){
        usuarioConectado.innerHTML=sessionStorage.getItem("usuario")
    }else{
        usuarioConectado.innerHTML="Loggin"
    }
}
setearUsuario()


/* Habilita la compra si hay un usuario conectado */
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
habilitarCompra()



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
    var cantProductos=0
    const mostrarCarrito=document.querySelector(".carrito")
    mostrarCarrito.innerHTML=' '
    const total= document.querySelector(".total")
    if(carrito==null){
        total.innerHTML= "Carrito vacio agregue productos!"
    }else{
        var suma=0
        carrito.forEach(e=>{
            mostrarCarrito.innerHTML+=` <div class="row mb-1 border-bottom">
                                        <img class="col-2 img-mini" src="${e.imagen}">
                                        <div class="col-3 nombre">${e.nombre}</div>
                                        <button class="btn btn-danger col-1 btn-restar">-</button>
                                        <div class="col-1 centrar cantidad">${e.cantidad}</div>
                                        <button class="btn btn-success col-1 btn-sumar">+</button>
                                        <div class="col-2 centrar">${e.total}</div>
                                        <button class="btn btn-danger col-2 btn-eliminar">Eliminar</button>                                    
                                        </div>`
            suma+=e.total
            cantProductos++
        })
        total.innerHTML= suma
    }
    const numeroCarrito=document.querySelector(".cantCarrito")
    numeroCarrito.innerHTML=cantProductos
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
    comprar();
})

/* Carrito modal para el index y el  catalogo */
if(document.querySelector(".modal-carrito")!=null){
    mostrarCarrito()
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
    mostrarCarrito()
    
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

/* mostrar productos */
if(document.querySelector("#catalogo")!=null){
    habilitarCompra()
    mostrarProductos()
    
    
    const clickComprar= document.querySelector("#productos")
    clickComprar.addEventListener("click", e=>{
        
        if(e.target.classList.contains("btn-comprar")){
            agregarCarrito(e.target.parentElement)
        }
    })
    const clickFiltros= document.querySelector("#filtros")
    clickFiltros.addEventListener("change", e=>{
        const filtro=document.querySelector(".filtrarPor").value
        const orden=document.querySelector(".ordenarPor").value
        ordenarProductos(orden,filtro)
    })
}

/* funcion para mostrar productos */
function mostrarProductosxArray(arrayparamostrar){
    const produ= document.querySelector("#productos")
    produ.innerHTML=""
    arrayparamostrar.forEach(e =>{
        
        produ.innerHTML+=`<div class="card m-3 col-4 p-1 centrar" style="width: 18rem;">
                            <img src="${e.imagen}" class="card-img-top" alt="...">                            
                            <div class="card-body">
                            <div class="oculto url-img">${e.imagen}</div>
                                <h5 class="card-title">${e.nombre}</h5>
                                <p class="card-text">${e.precio}</p>
                                <button class="btn btn-primary btn-comprar">Agregar al carrito</a>
                            </div>
                        </div>`
    })
}

/* Funcion para ordenar productos */
/* function ordenarProductos(ordenar){
    switch(ordenar){
        case "PrecioAs":
            productos.sort((a,b)=>{
                return a.precio-b.precio
            })
            break;
        case "PrecioDes":
            productos.sort((a,b)=>{
                return b.precio-a.precio
            })
            break;
        case "NombreAs":
            productos.sort((a,b)=>{
                if(a.nombre<b.nombre){return -1}
                if(a.nombre>b.nombre){return 1}
                return 0
                
            })
            break;
        case "NombreDes":
            productos.sort((a,b)=>{
                if(a.nombre<b.nombre){return 1}
                if(a.nombre>b.nombre){return -1}
                return 0
                
            })
            break;
        default:
            break;
    }
    mostrarProductos()
} */

/* funcion para filtrar productos x categoria */
/* function filtrarCategorias(categoria){
    
    switch(categoria){
        case "naruto":
            productos=productosOriginales.slice();
            productos=productos.filter(e=>{
                if(e.categorias=="naruto")
                { return true}
            })
            break;
        case "one piece":
            productos=productosOriginales.slice();
            productos=productos.filter(e=>{
                if(e.categorias=="onepiece")
                { return true}
            })
            break;
        case "dragon ball":
            productos=productosOriginales.slice();
            productos=productos.filter(e=>{
                if(e.categorias=="dragonball")
                { return true}
            })
            break;
        case "categorias":
            productos=productosOriginales
        default:
            break;
    }
    mostrarProductos()
    
} */
/*==============================================================================================================
FIN CODIGO PRODUCTOS
================================================================================================================ */







