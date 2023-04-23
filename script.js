var contador = 1;

function addInputs() {
  const inputsDiv = document.getElementById("row");
  const inputsDivRow = document.createElement("div");
  const newInputsDiv1 = document.createElement("div");
  const newInputsDiv2 = document.createElement("div");
  const newInputsDiv3 = document.createElement("div");
  newInputsDiv1.className ="mb-3 p-2 flex-fill"
  newInputsDiv2.className ="mb-3 p-2 flex-fill"
  newInputsDiv3.className ="mb-3 p-2 flex-fill"
  inputsDivRow.className ="d-flex justify-content-between inputs"

  const materiaLabel = document.createElement("label");
  materiaLabel.for = "materia";
  materiaLabel.innerHTML = "Matéria:";
  materiaLabel.className = "form-label";
  newInputsDiv1.appendChild(materiaLabel);

  const materiaInput = document.createElement("input");
  materiaInput.type = "text";
  materiaInput.id = "materia-" + contador;
  materiaInput.name = "materia";
  materiaInput.className = "form-control";
  materiaInput.required = true;
  newInputsDiv1.appendChild(materiaInput);

  const professorLabel = document.createElement("label");
  professorLabel.for = "professor";
  professorLabel.className = "form-label";
  professorLabel.innerHTML = "Professor:";
  newInputsDiv2.appendChild(professorLabel);

  const professorInput = document.createElement("input");
  professorInput.type = "text";
  professorInput.id = "professor-" + contador;
  professorInput.name = "professor";
  professorInput.className = "form-control";
  professorInput.required = true;
  newInputsDiv2.appendChild(professorInput);

  const horarioLabel = document.createElement("label");
  horarioLabel.for = "horario";
  horarioLabel.className = "form-label";
  horarioLabel.innerHTML = "Horário:";
  newInputsDiv3.appendChild(horarioLabel);

  const horarioInput = document.createElement("input");
  horarioInput.type = "text";
  horarioInput.id = "horario-" + contador;
  horarioInput.name = "horario";
  horarioInput.className = "form-control";
  horarioInput.required = true;
  newInputsDiv3.appendChild(horarioInput);

  inputsDivRow.appendChild(newInputsDiv1);
  inputsDivRow.appendChild(newInputsDiv2);
  inputsDivRow.appendChild(newInputsDiv3);
  inputsDiv.appendChild(inputsDivRow);
  contador++;
}
function getInputs() {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  const inputsArray = Array.from(formData.entries());
  var listaAulas = [];
  for (var i = 0; i < inputsArray.length; i += 3) {
    var horarioCadastro = {
      [inputsArray[i][0]]: inputsArray[i][1],
      [inputsArray[i + 1][0]]: inputsArray[i + 1][1],
      [inputsArray[i + 2][0]]: inputsArray[i + 2][1],
    };
    listaAulas.push(horarioCadastro)

  }
  return listaAulas;
}


function separarHorario(input) {
  var turno = input.match(/[a-zA-Z]/);
  if (turno) {
    var posicao = turno.index;
    var diaSemana = input.substr(0, posicao);
    var horarios = input.substr(posicao + 1);
    return {
      diaSemana: diaSemana,
      turno: turno[0],
      horarios: horarios
    };
  } else {
    // caso não tenha letra na string
    return null;
  }
}

function inserirnaTabela() {
  var listadeHorarios = getInputs();
  for (var i = 0; i < listadeHorarios.length; i++) {
    horarioObj = listadeHorarios[i];
    var resultado = separarHorario(horarioObj.horario);
    var aulaposicao = resultado.horarios.split("");
    resultado['turno'] = resultado['turno'].toLowerCase();
    // Irá mapear no vetor de aulaposicao já que ele tem cada aula separada em posicoes, irá formatar o id da tabela como 2-m-1 (dia-turno-posicaodaaula)
    var id = aulaposicao.map(str =>
      resultado.diaSemana + "-" + resultado['turno'] + "-" + str);
    // Recebe o nome da matéria e da materia para adicionar no html
    textoMateriaProfessor = horarioObj.materia + "<br>" + horarioObj.professor;
    // Para cada id no array de ids, irá selecionar o id do elemento na tabela e inserir o texto no html
    id.forEach(id => document.getElementById(id).innerHTML = textoMateriaProfessor);

  }
}
function mostrarResultado() {
  var input = document.querySelectorAll('[id^="horario"]');
  var output = '';
  for (var i = 0; i < input.length; i++) {
    var resultado = separarHorario(input[i].value);
    if (resultado) {
      output += "Dia da Semana: " + resultado.diaSemana + "<br>" +
        "Turno: " + resultado.turno + "<br>" +
        "Posição: " + resultado.horarios + "<br>";
    } else {
      output += "O horário está faltando o turno.";
    }
    document.getElementById("resultado").innerHTML = output;
  }
}

function addTableData() {
  const professor = document.getElementById("professor").value;
  const materia = document.getElementById("materia").value;
  const horario = document.getElementById("horario").value;

  const table = document.getElementById("resultados");
  const row = table.insertRow();
  const professorCell = row.insertCell(0);
  const materiaCell = row.insertCell(1);
  const horarioCell = row.insertCell(2);
  professorCell.innerHTML = professor;
  materiaCell.innerHTML = materia;
  horarioCell.innerHTML = horario;


}

function preencherFormulario() {
  var materias = ["Engenharia de Processos","CLP 2","Economia para Engenheiros","Lógica Fuzzy"];
  var professores = ["Rejane","Agessandro","Fabricio","Nonato"];
  var horarios = ["6M3456","4M3456","2M45","3M3456"];
  for (var i = 0; i < professores.length; i++) {
  document.getElementById("materia-" + i).value = materias[i];
  document.getElementById("professor-" + i).value = professores[i]
  document.getElementById("horario-"+i).value = horarios[i];
  }
}

function trocarTema(){
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        document.documentElement.setAttribute('data-bs-theme','light')
    }
    else {
        document.documentElement.setAttribute('data-bs-theme','dark')
    }
}