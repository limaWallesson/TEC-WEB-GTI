let produtos = [];

document.getElementById('produtoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const codigo = document.getElementById('codigo').value;
    const discricao = document.getElementById('discricao').value;
    produtos.push({
        codigo: parseInt(codigo),
        discricao: discricao
    });
    atualizarTabela();
    document.getElementById('produtoForm').reset();
});

function atualizarTabela() {
    const tabela = document.getElementById('tabelaProdutos').getElementsByTagName('tbody')[0];
    tabela.innerHTML = '';
    produtos.forEach((produto, index) => {
        const novaLinha = tabela.insertRow();
        const celulaDiscricao = novaLinha.insertCell(0);
        const celulaCodigo = novaLinha.insertCell(1);
        const celulaAcoes = novaLinha.insertCell(2);
        celulaDiscricao.textContent = produto.discricao;
        celulaCodigo.textContent = produto.codigo;
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.addEventListener('click', () => editarProduto(index));
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.addEventListener('click', () => excluirProduto(index));
        celulaAcoes.appendChild(btnEditar);
        celulaAcoes.appendChild(btnExcluir);
    });
}

function editarProduto(index) {
    const produto = produtos[index];
    document.getElementById('codigo').value = produto.codigo;
    document.getElementById('discricao').value = produto.discricao;
    produtos.splice(index, 1);
    atualizarTabela();
}

function excluirProduto(index) {
    produtos.splice(index, 1);
    atualizarTabela();
}

document.getElementById('ordenarDiscricao').addEventListener('click', function() {
    produtos.sort((a, b) => a.discricao.localeCompare(b.discricao));
    atualizarTabela();
});

document.getElementById('ordenarCodigo').addEventListener('click', function() {
    produtos.sort((a, b) => a.codigo - b.codigo);
    atualizarTabela();
});