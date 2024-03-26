const inputTarefa = document.querySelector('.nova-tarefa');
const btnTarefa = document.querySelector('.btn-add-tarefa');
const tarefa = document.querySelector('.tarefas');


function criaItem(){
    const li = document.createElement('li');
    return li;
}

inputTarefa.focus(); // faz com que o cursor ja fique disponível para o input ja no carregar dad página

inputTarefa.addEventListener('keypress', function(e){
    if(e.keyCode === 13){ // ao pressionar enter 
        if(!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
})

function cleanInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaTarefa(textoInput){
    const li = criaItem();
    li.innerText = textoInput;
    tarefa.appendChild(li);
    btnApagar(li)
    cleanInput()
    salvaTarefa()
}


btnTarefa.addEventListener('click', function(){
    if(!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);

})

function btnApagar(li){
    li.innerText += ' ';
    const btnApagar = document.createElement('button');
    btnApagar.innerText = 'Apagar';
    btnApagar.setAttribute('class', 'apagar');
    li.appendChild(btnApagar);
}

document.addEventListener('click', function(e){
    const el = e.target;
    if(el.classList.contains('apagar')){
        el.parentElement.remove();
        salvaTarefa();
    }
})

function salvaTarefa(){
    const liTarefa = tarefa.querySelectorAll('li');
    const listaDeTarefas = [];

    for(let tarefa of liTarefa){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar','').trim();

        listaDeTarefas.push(tarefaTexto);
    
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON)
}

function addTarefaSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas)

    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
}

addTarefaSalvas();