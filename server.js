const express = require("express")
const server = express()

//configurar o servidor para apresentar arquivos estaticos
server.use(express.static("public"))


//habilitar body do formulário
server.use(express.urlencoded( {exteded: true}))


//configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true, //boolean aceita 2 valores, true ou false.
})

//lista de doadores
const doadores = [
    {
        name: "Fernandes",
        sangue: "AB+"
    },
    {
        name: "Diego",
        sangue: "B+"
    },
    {
        name: "Gabriel",
        sangue: "O+"
    },
    {
        name: "Márcio",
        sangue: "A+"
    },

]




//configurar a apresentação da página
server.get("/", function(req, res){
    return res.render("index.html", {doadores})
})

//pegar dados do formulário.
server.post("/", function(req, res){

    const nome = req.body.nome
    const email = req.body.email
    const sangue = req.body.sangue


    //coloco valores dentro do array
    doadores.push({
        name: nome,
        sangue: sangue,
    })

    return res.redirect("/")

})

// como iniciar o servidor
server.listen(4500, function(){
    console.log('iniciei o servidor.')
})