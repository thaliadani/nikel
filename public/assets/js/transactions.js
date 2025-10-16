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

    getAllTransactions();
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

    getAllTransactions();
}

function logout() {
    sessionStorage.removeItem('logado');
    localStorage.removeItem('sessao');
    window.location.href = '../index.html';
}

function getAllTransactions() {
    const transactions = data.transactions;
    let transactionsInHtml = ``;

    if (transactions.length) {
        transactions.forEach((item) => {
            let type = 'Entrada';

            if (item.type === 'option2') {
                type = 'Saída';
            }

            transactionsInHtml += `
            <tr>
                <th scope="row">${item.date}</th>
                <td>${item.value.toFixed(2)}</td>
                <td>${type}</td>
                <td>${item.description}</td>
            </tr>
            `;
        });
        
        document.getElementById('transactions-list').innerHTML = transactionsInHtml;
    }

}

function salvarData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}