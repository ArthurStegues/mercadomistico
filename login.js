async function handleLogin(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    console.log('email:', email);
    console.log('senha:', senha);

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();
        console.log('Dados recebidos:', data);

        if (response.ok) {
            alert('Login bem-sucedido!');
            localStorage.setItem('perfil', data.perfil); // Armazenar o perfil no localStorage

            // Redirecionar ou realizar outra ação
            window.location.href = 'index.html';
        } else {
            alert(data.message || 'Erro no login, tente novamente.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Houve um erro ao tentar fazer o login.');
    }
}
