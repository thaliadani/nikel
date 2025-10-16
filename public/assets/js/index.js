const myModal = new bootstrap.Modal('#criarContaModal');
let logado = sessionStorage.getItem('logado');
const sessao = localStorage.getItem('sessao');

checkLogado();

// Criar conta
document.getElementById('create-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('criarInputEmail').value;
    const password = document.getElementById('criarInputPassword').value;

    if (email.length < 5) {
        alert('Preencha o campo com um e-mail válido');
        return;
    }
    if (password.length < 4 || password.length > 8) {
        alert('Preencha a senha entre 4 e 8 caracteres.');
        return;
    }

    if (pegarConta(email)) {
        alert('Ops! Já existe uma conta com esse e-mail.');
        return;
    };

    salvarConta({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide();
    alert('Conta criada com sucesso!');
});

// Fazer login
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById("loginInputEmail").value;
    const password = document.getElementById("loginInputPassword").value;
    const checkSessao = document.getElementById("loginCheck").checked;

    const conta = pegarConta(email);

    if (!conta) {
        alert('Ops! Verifique o e-mail ou a senha.');
        return;
    }

    if (conta) {
        if (conta.password !== password) {
            alert('Ops! Verifique o e-mail ou a senha.');
            return;
        }

        salvarSessao(email, checkSessao);

        window.location.href = 'pages/home.html';
    }
});

function salvarConta(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function pegarConta(key) {
    const conta = localStorage.getItem(key);

    if (conta) {
        return JSON.parse(conta);
    }

    return "";
}

function salvarSessao(data, salvarSessao) {
    if (salvarSessao) {
        localStorage.setItem('sessao', data);
    }

    sessionStorage.setItem('logado', data);
}

function checkLogado() {
    if (sessao) {
        sessionStorage.setItem('logado', sessao);
        logado = sessao;
    }

    if (logado) {
        salvarSessao(logado,sessao);

        window.location.href = 'pages/home.html';
    }
}