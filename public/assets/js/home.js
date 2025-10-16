const myModal = new bootstrap.Modal('#transacaoModal');
let logado = sessionStorage.getItem('logado');
const sessao = localStorage.getItem('sessao');
let data = {
    transactions: [],
};

document.getElementById('button-logout').addEventListener('click', logout);

//Adicionar Lancamento
document.getElementById('transacao-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const value = parseFloat(document.getElementById('adicionarInputValor').value);
    const description = document.getElementById('adicionarInputDescricao').value;
    const date = document.getElementById('adicionarInputData').value;
    const type = document.querySelector('input[name="inlineRadioOptions"]:checked').value;

    data.transactions.unshift({
        value: value,
        type: type,
        description: description,
        date: date
    });

    salvarData(data);
    event.target.reset()
    myModal.hide();

    getEntrada();
    getSaida();
    getTotal();
    alert('Lançamento adicionado com sucesso.');
});

checkLogado();

function checkLogado() {
    if (sessao) {
        sessionStorage.setItem('logado', sessao);
        logado = sessao;
    }

    if (!logado) {
        window.location.href = '../index.html';
        return;
    }

    const dataUser = localStorage.getItem(logado);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }

    getEntrada();
    getSaida();
    getTotal();
}

function logout() {
    sessionStorage.removeItem('logado');
    localStorage.removeItem('sessao');
    window.location.href = '../index.html';
}

function getEntrada() {
    const transactions = data.transactions;

    const entradas = transactions.filter((item) => item.type === 'option1');

    if (entradas.length) {
        let entradasInHtml = ``;
        let limite = 0;

        if (entradas.length > 5) {
            limite = 5;
        } else {
            limite = entradas.length;
        }

        for (let index = 0; index < limite; index++) {
            entradasInHtml += `
            <div class="my-3">
                <h3>R$ ${entradas[index].value.toFixed(2)}</h3>
                <div class="d-flex justify-content-between">
                    <span>${entradas[index].description}</span>
                    <span>${entradas[index].date}</span>
                </div>
            </div>
            `;
        }

        document.getElementById('transactions-incomes').innerHTML = entradasInHtml;
    }

}

function getSaida() {
    const transactions = data.transactions;

    const saidas = transactions.filter((item) => item.type === 'option2');

    if (saidas.length) {
        let saidasInHtml = ``;
        let limite = 0;

        if (saidas.length > 5) {
            limite = 5;
        } else {
            limite = saidas.length;
        }

        for (let index = 0; index < limite; index++) {
            saidasInHtml += `
            <div class="my-3">
                <h3>R$ ${saidas[index].value.toFixed(2)}</h3>
                <div class="d-flex justify-content-between">
                    <span>${saidas[index].description}</span>
                    <span>${saidas[index].date}</span>
                </div>
            </div>
            `;
        }

        document.getElementById('transactions-outcomes').innerHTML = saidasInHtml;
    }

}

function getTotal(){
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) => {
        if(item.type === 'option1'){
            total += item.value;
        }else{
            total -= item.value;
        }
    });

    document.getElementById('total').innerHTML = `R$ ${total.toFixed(2)}`;
}

function salvarData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}