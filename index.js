import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

const host='0.0.0.0';
const port=7000;
var listaEquipe=[];
const app=express();

app.use(express.urlencoded({extended:true}));

app.use(session(
    {
        secret:"ChaveoDoSegredo",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge:1000*60*15,
            httpOnly:true,
            secure:false
        }

    }
));

app.use(express.static('public'));
app.use(cookieParser());


app.get('/',vAutenticacao,(requisicao,resposta) =>{
const ultimoLogin=requisicao.cookies.ultimoLogin;
resposta.send(`
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <!-- Meta tags Obrigatórias -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

    <title>Sistema De Volei</title>
    <link rel="stylesheet" href="/css/estilo.css">

  </head>
  <body class="login-body">
  <nav class="navbar navbar-expand-lg navbar-gradient">
  <div class="container-fluid">
      <a class="navbar-brand" href="#">Volei</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
              <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
                      CADASTROS
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      <li><a class="dropdown-item" href="/cadastroEquipe">Cadastro de Equipes</a></li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item" href="/cadastroJogador">Cadastro de Jogadores</a></li>
                      <li><hr class="dropdown-divider"></li>
                  </ul>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/logout">Sair</a>
              </li>
          </ul>
          <span class="navbar-text">${ultimoLogin?"Ultimo login: " + ultimoLogin:""}</span>
      </div>
  </div>
  </nav>

  

    <!-- JavaScript (Opcional) -->
    <!-- jQuery primeiro, depois Popper.js, depois Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
  </body>
</html>

`);
resposta.end();
});
app.get('/cadastroEquipe',vAutenticacao,(requisicao,resposta) =>{

    resposta.send(`
    <html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
    <title>Página inicial do aplicativo</title>
</head>
<body class="login-body">
    <div class="container w-75 mb-5 mt-5">
        <form method="POST" action="/cadastroEquipe" class="row g-3 border p-2" novalidate>
            <fieldset>
                <legend class="text-center">Cadastro de Equipes</legend>
            </fieldset>
            <div class="col-md-4">
                <label for="nome" class="form-label">Nome   </label>
                <input type="text" class="form-control" id="nome" name="nome" required>
            </div>

            <div class="col-md-4">
                <label for="nomeEquipe" class="form-label">Nome da Equipe</label>
                <input type="text" class="form-control" id="nomeEquipe" name="nomeEquipe" required>
            </div>

            <div class="col-md-3">
                <label for="numTecnico" class="form-label">Numero Do Técnico</label>
                <input type="text" class="form-control" id="numTecnico" name="numTecnico" required>
            </div>

            <div class="col-12">
                <button class="btn btn-primary" type="submit">Cadastrar</button>
                <a class="btn btn-secondary" href="/">Voltar</a>
            </div>
        </form>
    </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
</html>
`);
});
app.post('/cadastroEquipe',vAutenticacao,(requisicao,resposta)=>{
    const nome=requisicao.body.nome;
    const nomeEquipe=requisicao.body.nomeEquipe;
    const numTecnico=requisicao.body.numTecnico;

if(nome&&nomeEquipe&&numTecnico){
    listaEquipe.push({
        nome: nome,
        nomeEquipe: nomeEquipe,
        numTecnico: numTecnico,
        jogadores: []
    });
    resposta.redirect('/listaEquipe');
}   else
        {
        let conteudo=`
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
            <title>Página inicial do aplicativo</title>
            <link rel="stylesheet" href="/css/estilo.css">

        </head>
        <body class="login-body">
            <div class="container w-75 mb-5 mt-5">
                <form method="POST" action="/cadastroEquipe" class="row g-3 border p-2" novalidate>
                    <fieldset>
                        <legend class="text-center">Cadastro de Equipes</legend>
                    </fieldset>
                    <div class="col-md-4"> `;
if (!nome) {
    conteudo = conteudo + `
                        <label for="nome" class="form-label">Nome:</label>
                        <input type="text" class="form-control" id="nome" name="nome" required>
                        <span class="text-danger">Por favor informe o nome</span>`;
}
else {
    conteudo = conteudo + `
                        <label for="nome" class="form-label">Nome:</label>
                        <input type="text" class="form-control" id="nome" name="nome" value="${nome}" required>
                        `;
}

conteudo = conteudo + `</div>
                    <div class="col-md-4"> `;
if (!nomeEquipe) {
    conteudo = conteudo + `
                            <label for="nomeEquipe" class="form-label">Nome Da Equipe</label>
                            <input type="text" class="form-control" id="nomeEquipe" name="nomeEquipe"  required>                                
                            <span class="text-danger">Por favor informe o nome da Equipe</span>`;
}
else {
    conteudo = conteudo + `
                            <label for="nomeEquipe" class="form-label">Nome Da Equipe</label>
                            <input type="text" class="form-control" id="nomeEquipe" name="nomeEquipe" value="${nomeEquipe}" required>
                            `;
}
if (!numTecnico) {
    conteudo = conteudo + `
                        <label for="nomeEquipe" class="form-label">Numero do Técnico</label>
                        <input type="text" class="form-control" id="numTecnico" name="numTecnico" required>
                        <span class="text-danger">Por favor informe o numero!</span>`;
}
else {
    conteudo = conteudo + `
                        <input type="text" class="form-control" id="numTecnico" name="numTecnico" value=${numTecnico} required>
    `;
}
conteudo = conteudo + `
                    </div>
                    <div class="col-12">
                        <button class="btn btn-primary" type="submit">Cadastrar</button>
                        <a class="btn btn-secondary" href="/">Voltar</a>
                    </div>
                </form>
            </div>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
    </html>`;
resposta.send(conteudo);
resposta.end();
}       

});

app.get('/listaEquipe',vAutenticacao,(requisicao,resposta)=>{
    let conteudo = `
    <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
            <title>Nomes Das Equipes</title>
            <link rel="stylesheet" href="/css/estilo.css">

        </head>
        <body class="login-body">
            <div class="container w-75 mb-5 mt-5">
                <table class="table tabela-equipes"">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Nome Da Equipe</th>
                            <th scope="col">Numero do Técnico</th>
                        </tr>
                    </thead>
                    <tbody> `;
for (let i = 0; i < listaEquipe.length; i++) {
conteudo = conteudo + `
                            <tr>
                                <td>${listaEquipe[i].nome}</td>
                                <td>${listaEquipe[i].nomeEquipe}</td>
                                <td>${listaEquipe[i].numTecnico}</td>

                            </tr>
                                <tr>
                                  <td colspan="3"><strong>Jogadores:</strong> ${listaEquipe[i].jogadores.join(", ")}</td>
                                /tr>

                        `;
}
conteudo = conteudo + ` </tbody>
                </table>
                <a class="btn btn-secondary" href="/cadastroEquipe">Continuar cadastrando?</a>
            </div>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
    </html>`
resposta.send(conteudo);
resposta.end();
});

app.get('/login',(requisicao,resposta)=>{
resposta.send(`
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <title>Login do Sistema de Volei</title>
    <link rel="stylesheet" href="/css/estilo.css">

  
</head>
<body class="login-body">
    <div id="login">
        <h3 class="text-center text-white pt-5">Faça o Login</h3>
        <div class="container">
            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12">
                        <form id="login-form" class="form" action="/login" method="post">
                            <h3 class="text-center ">Login</h3>
                            <div class="form-group">
                                <label for="usuario" class="">Usuário:</label><br>
                                <input type="text" name="usuario" id="usuario" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="senha" class="">Senha:</label><br>
                                <input type="password" name="senha" id="senha" class="form-control">
                            </div>
                            <div class="form-group">
                                <input type="submit" name="submit" class="btn btn-info btn-md" value="Entrar">
                           </div>
                    </form>
                   </div>
              </div>
          </div>
     </div>
    </div>
</body>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</html>



`);
});
app.post("/login", (requisicao, resposta) => {
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if (usuario == "fabin" && senha == "123"){
        requisicao.session.logado = true;
        requisicao.session.usuario = usuario; 
        const dataHoraAtuais = new Date();
        resposta.cookie('ultimoLogin',dataHoraAtuais.toLocaleString(), { maxAge: 1000 * 60 * 60 * 24 * 30});
        resposta.redirect("/");
    }
    else{
         resposta.send(`
            <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
                    <title>Login do Sistema de Volei</title>
                    <link rel="stylesheet" href="/css/estilo.css">

                
                </head>
                <body class="login-body">
                    <div id="login">
                        <h3 class="text-center text-white pt-5">Faça o Login!</h3>
                        <div class="container">
                            <div id="login-row" class="row justify-content-center align-items-center">
                                <div id="login-column" class="col-md-6">
                                    <div id="login-box" class="col-md-12">
                                        <form id="login-form" class="form" action="" method="post">
                                            <h3 class="text-center ">Login</h3>
                                            <div class="form-group">
                                                <label for="usuario" class="o">Usuário:</label><br>
                                                <input type="text" name="usuario" id="usuario" class="form-control">
                                            </div>
                                            <div class="form-group">
                                                <label for="senha" class="">Senha:</label><br>
                                                <input type="password" name="senha" id="senha" class="form-control">
                                            </div>
                                            <span style="color: red;">Usuário ou senha inválidos!</span>
                                            <div class="form-group">
                                                <input type="submit" name="submit" class="btn btn-info btn-md">
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
                <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            </html>
    `);
    }
});

app.get('/cadastroJogador',vAutenticacao,(requisicao,resposta) =>{
    let opcoesEquipe = "";
    for (let i = 0; i < listaEquipe.length; i++) {
        opcoesEquipe += `<option value="${i}">${listaEquipe[i].nomeEquipe}</option>`;
    }
   resposta.send(` 
            <html lang="pt-br">
            <head>
            <meta charset="UTF-8">
            <title>Cadastro de Jogadores</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
            <link rel="stylesheet" href="/css/estilo.css">

             </head>
                  <body class="login-body">
                 <div class="container mt-5">
                <h2>Cadastro de Jogadores</h2>
                <form method="POST" action="/cadastroJogador">
                    <div class="mb-3">
                        <label for="equipe" class="form-label">Selecione a Equipe:</label>
                        <select class="form-control" id="equipe" name="equipe">
                            ${opcoesEquipe}
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="jogador" class="form-label">Nome do Jogador:</label>
                        <input type="text" class="form-control" id="jogador" name="jogador" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Cadastrar Jogador</button>
                    <a class="btn btn-secondary" href="/">Voltar</a>
                </form>
            </div>
        </body>
        </html>
   
   `);

});
app.post('/cadastroJogador', vAutenticacao, (requisicao, resposta) => {
    const iEquipe = parseInt(requisicao.body.equipe);
    const nomeJogador = requisicao.body.jogador;

    if (iEquipe >= 0 && iEquipe < listaEquipe.length) {
        const equipe = listaEquipe[iEquipe];

        if (equipe.jogadores.length >= 6) {
            resposta.send(`
                <html lang="pt-br">
                <head><meta charset="UTF-8"><title>Erro</title>
                <link rel="stylesheet" href="/css/estilo.css">

                </head>
                <body class="login-body">
                    <h2>Essa equipe já possui 6 jogadores cadastrados!</h2>
                    <a href="/cadastroJogador">Voltar</a>
                </body>
                </html>
            `);
        } else {
            equipe.jogadores.push(nomeJogador);
            resposta.redirect('/listaEquipe');
        }
    } else {
        resposta.send("Equipe inválida!");
    }
});



function vAutenticacao(requisicao, resposta, next) {
    if (requisicao.session.logado){
        next();
    }
    else{
        resposta.redirect("/login");
    }
}

app.get("/logout", (requisicao, resposta) => {
    requisicao.session.destroy();
    resposta.redirect("/login");
});


app.listen(port, host, () => {
    console.log(`Servidor em execução em http://${host}:${port}/`);
});
