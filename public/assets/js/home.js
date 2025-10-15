const myModal = new bootstrap.Modal('#transacaoModal');
let logado = sessionStorage.getItem('logado');
const sessao = localStorage.getItem('sessao');
let data = {
    transactions: []
}

checkLogado();

function checkLogado() {
    if (sessao) {
        sessionStorage.setItem('logado', sessao);
        logado = sessao;
    }

    if (!logado) {
        window.location.href = '../../public/index.html';
        return;
    }

    const dataUser = localStorage.getItem(logado);

    if(dataUser){
        data = JSON.parse(dataUser);
    }

}