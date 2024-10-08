let caixa = document.getElementById("caixa");
let dadosForm = new FormData(caixa);

document.getElementById("handleSubmit").addEventListener("click", async function(event) {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
  

    const dadosForm = {name, email, senha}

    const response = await fetch('http://localhost:3000/cadastro/cadastrar', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dadosForm)
    });

    let content = await response.json();

    if(content.success) {
        window.location.href = "index.html"
    } else {
        alert("Não");
    }
});
