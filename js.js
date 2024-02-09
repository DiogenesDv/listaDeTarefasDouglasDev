//1 Captura dos elementos html
let inputNovaTarefa = document.querySelector('#inputNovaTarefa');
let btnAddTarefas = document.querySelector('#btnAddTarefas');
let listaTarefas = document.querySelector('#listaTarefas');
let janelaEdicao = document.querySelector('#janelaEdicao');
let janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo');
let janelaEdicaoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar');
let btnAtualizarTarefa = document.querySelector('#btnAtualizarTarefa');
let idTarefaEdicao = document.querySelector('#idTarefaEdicao');
let inputTarefaNomeEdicao = document.querySelector('#inputTarefaNomeEdicao');

//2 Ouvir quando uma tecla for precionada
inputNovaTarefa.addEventListener('keypress',(precionar) => {

    if(precionar.keyCode == 13){

        let tarefa = {
            nome: inputNovaTarefa.value,
            id: gerarId(),
        }

        //Adcionar tarefa ao html
        addTarefa(tarefa);
    }

});

janelaEdicaoBtnFechar.addEventListener('click', (e) => {
    alternarJanelaEdicao();
});

//4 Programar botao addTarefa
btnAddTarefas.addEventListener('click', (precionar) => {

    let tarefa = {
        nome: inputNovaTarefa.value,
        id: gerarId(),
    }

    //Adcionar tarefa ao html
    addTarefa(tarefa);

});

btnAtualizarTarefa.addEventListener('click', (e) => {
    e.preventDefault();
    let idTarefa = idTarefaEdicao.innerHTML.replace('#', '');

    let tarefa = {
        nome: inputTarefaNomeEdicao.value,
        id: idTarefa
    }

    let tarefaAtual = document.getElementById(''+idTarefa+'');

    if (tarefaAtual) {
        let li = criarTagLi(tarefa);
        listaTarefas.replaceChild(li, tarefaAtual);
        alternarJanelaEdicao();    
    }else{
        alert('Tarefa nao encontrada');
    }

    

});

//3 Criar Funcao para gerar Id
function gerarId(){
    return Math.floor(Math.random() * 3000);
}

//5 Criando as funcoes addTarefa e CriarTagLi
function addTarefa(tarefa){

    if (inputNovaTarefa.value == '') {
        alert("Nenhuma Tarefa Criada")
    }else{
        let li = criarTagLi(tarefa);
        listaTarefas.appendChild(li);
        inputNovaTarefa.value = '';
    }
    
}

//6 Criando tags
function criarTagLi(tarefa){
    let li = document.createElement('li');
    li.id = tarefa.id;

    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome;

    let div = document.createElement('div');

    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnAcao');
    btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
    btnEditar.setAttribute('onclick','editar('+tarefa.id+')');
    
    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fas fa-trash"></i>';
    btnExcluir.setAttribute('onclick','excluir('+tarefa.id+')');

    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(div);
    return li;
}

//Criando as funcoes Editar e Excluir
function editar(idTarefa){
   //alert(idTarefa);
    let perguntaConfirmacao = window.confirm('Deseja realmente Editar?');
 
    let li = document.getElementById(''+idTarefa+'');
    if (li) {
        idTarefaEdicao.innerHTML = '#' + idTarefa;
        inputTarefaNomeEdicao.value = li.innerText;
        alternarJanelaEdicao();
    }else{
        alert('Tarefa nao encontrada');
    }

}

function excluir(idTarefa){
    //alert(idTarefa);
    let perguntaConfirmacao = window.confirm('Deseja realmente excluir?');
    if (perguntaConfirmacao) {
        let li = document.getElementById(''+idTarefa+'');
        if (li) {
            listaTarefas.removeChild(li);
        }else{
            alert('Tarefa nao encontrada');
        }
    }
}

function alternarJanelaEdicao(){
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}
