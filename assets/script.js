var pessoasList = []; 


//Funcões de início
getPessoasList();
renderPessoasList();
document.getElementById('pessoaForm').addEventListener('click', function (event) {
  const data = formataData();
  let inputNome = document.getElementById("nome");
  let inputIdade = document.getElementById("idade");
  let inputEmail = document.getElementById("email");
  let inputCidade = document.getElementById("cidade");
  let inputEstado = document.getElementById("estado");
  let inputText1 = document.getElementById("text1");
  let inputText2 = document.getElementById("text2");

  if(inputNome.value == '' || inputIdade.value == '' || inputEmail.value == '' || inputCidade.value == '' || inputEstado.value == 'opc' || inputEstado.value == '' || inputText1.value == '' || inputText2.value == ''){
    alert('Preencha todos os campos')
  }else{
    addPessoa(data, inputNome.value, inputCidade.value, inputEstado.value);
    limparCampos()
  }
})

//Função adequada para limpar os campos do formulário.
function limparCampos(){
  let inputNome = document.getElementById("nome");
  let inputIdade = document.getElementById("idade");
  let inputEmail = document.getElementById("email");
  let inputCidade = document.getElementById("cidade");
  let inputEstado = document.getElementById("estado");
  let inputText1 = document.getElementById("text1");
  let inputText2 = document.getElementById("text2");
  inputNome.value = '';
  inputIdade.value = '';
  inputEmail.value = '';
  inputCidade.value = '';
  inputEstado.value = 'Selecione';
  inputText1.value = '';
  inputText2.value = '';
}

//Função adequada para incluir dados do formulário em uma lista e no local storage.
function addPessoa(data, nome, cidade, estado) {
  let count = acharId()
  var newPessoa = { id: count++, data: data, nome: nome, cidade: cidade, estado: estado};
  pessoasList.push(newPessoa); 
  localStorage.setItem('pessoasList', JSON.stringify(pessoasList));
  renderPessoasList();
}

//Função adequada para excluir um item da lista e do local storage.
function deletePessoa(pessoaId) {
  var updatedPessoasList = pessoasList.filter(function (pessoa) {
    return pessoa.id !== pessoaId; 
  });

  if (updatedPessoasList.length < pessoasList.length) { 
    pessoasList = updatedPessoasList;
    localStorage.setItem('pessoasList', JSON.stringify(pessoasList)); 
    renderPessoasList();
  } else {
    alert('Pessoa não encontrada.');
  }
}

//Função adequada para excluir todos os itens da lista e do local storage.
function apagarTudo(){
  localStorage.clear();
  pessoasList = [];
  renderPessoasList();
}

//Função adequada para pesquisar um campo do formulário.
function pesquisarNome(){
  var pessoasListElement = document.getElementById('pessoasList');
  pessoasListElement.innerHTML = '';
  let flag = 0
  let pesquisarNome = document.getElementById("pesquisarNome");
  if(pesquisarNome.value == ''){
    alert('Nenhum nome para pesquisar')
    renderPessoasList()
    return
  }
  for(let i = 0; i<pessoasList.length; i++){
    if(pessoasList[i].nome.toLowerCase() == pesquisarNome.value.toLowerCase()){
      var listPessoa = document.createElement('li');
      listPessoa.innerHTML = '<span class="data">' + pessoasList[i].data + '</span>' + '  |  '+ '<span class="nome">' + pessoasList[i].nome  + '</span>' + '  |  ' +'<span class="cidade">' + pessoasList[i].cidade  + '</span>' + ' - ' + '<span class="estado">' + pessoasList[i].estado  + '</span>' + '  '+ '<button class="delete-button" onclick="deletePessoa(' + pessoasList[i].id  + ')">Excluir</button>';
      pessoasListElement.appendChild(listPessoa);
      flag = 1;
    }
  }
  if(flag == 0){
    alert('Nenhum nome encontrado')
    renderPessoasList()
    return
  }else{
    pesquisarNome.value = '';
  }
}




function getPessoasList() {
  var storedList = JSON.parse(localStorage.getItem('pessoasList')) 
  pessoasList = storedList || [];
}
function renderPessoasList() {
  var pessoasListElement = document.getElementById('pessoasList');
  pessoasListElement.innerHTML = '';
  pessoasList.forEach(function (pessoa) {
    var listPessoa = document.createElement('li');
    listPessoa.innerHTML = '<span class="data">' + pessoa.data + '</span>' + '  |  '+ '<span class="nome">' + pessoa.nome + '</span>' + '  |  ' +'<span class="cidade">' + pessoa.cidade + '</span>' + ' - ' + '<span class="estado">' + pessoa.estado + '</span>' + '  '+ '<button class="delete-button" onclick="deletePessoa(' + pessoa.id + ')">Excluir</button>';
    pessoasListElement.appendChild(listPessoa);
  });
}

function acharId(){
  let listaPessoas = JSON.parse(localStorage.getItem('pessoasList'));
  let count = 1;
  if(listaPessoas !== null){
    let quantidadePessoas = listaPessoas.length;
    if(quantidadePessoas >= 1){
      count = listaPessoas[quantidadePessoas-1].id + 1;
    }
  }
  return count
}

function formataData(){
  const data = new Date(Date.now())
  let dia = data.getDate();
  if(dia<10){
      dia = '0' + dia;
  }
  let mes = data.getMonth() + 1
  if(mes<10){
      mes = '0' + mes;
  }
  const ano = data.getFullYear()
  return dia + '/' + mes + '/' + ano;
}

