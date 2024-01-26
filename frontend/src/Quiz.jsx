import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos de Bootstrap

import { Container, Row, Col, Form, Button, Navbar, Nav } from "react-bootstrap"; // Importa componentes de Bootstrap
import './index.css'
export default function App() {
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [savedQuestions, setSavedQuestions] = useState([]);


  const handleAddQuestion = () => {
    // Verificar que la pregunta no esté vacía
    if (questions.every((q) => q.pregunta.trim() !== "")) {
      setQuestions([...questions, { pregunta: "", opciones: [""] }]);
    } else {
      alert("Por favor, complete la pregunta antes de agregar una nueva.");
    }
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    const currentOptions = updatedQuestions[questionIndex].opciones;

    // Verificar que no se ingresen opciones vacías
    if (currentOptions.every((o) => o.trim() !== "")) {
      // Verificar si ya hay 4 opciones
      if (currentOptions.length < 4) {
        updatedQuestions[questionIndex].opciones.push("");
        setQuestions(updatedQuestions);
      } else {
        alert("No se pueden agregar más de 4 opciones.");
      }
    } else {
      alert("Por favor, complete la opción antes de agregar una nueva.");
    }
  };

  const handleInputChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].opciones[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddAllQuestions = async () => {
    // Verificar que no haya preguntas u opciones vacías
    if (
      questions.every((q) => q.pregunta.trim() !== "" && q.opciones.every((o) => o.trim() !== ""))
    ) {
      try {
        // Crear un objeto con las preguntas y opciones
        const formData = {
          questions: questions.map((q) => ({
            pregunta: q.pregunta,
            opciones: q.opciones,
          })),
        };

        // Imprimir el JSON en la consola para verificar
        const jsonString = JSON.stringify(formData, null, 2);
        console.log("JSON a enviar:", jsonString);

        // Crear un formulario dinámicamente
        const formElement = document.createElement("form");
        formElement.classList.add("custom-form"); // Agrega una clase al formulario

        const formTitle = document.createElement("h3");
        formTitle.textContent = "Formulario Evaluativo";
        formElement.appendChild(formTitle);

        // Iterar sobre las preguntas y opciones y agregar campos al formulario
        formData.questions.forEach((question, questionIndex) => {
          const questionLabel = document.createElement("label");
          questionLabel.textContent = `Pregunta ${questionIndex + 1}: ${question.pregunta}`;
          questionLabel.classList.add("question-label");
          formElement.appendChild(questionLabel);

          // Iterar sobre las opciones y agregar viñetas al formulario
          const optionsList = document.createElement("ul");
          optionsList.classList.add("options-list");

          question.opciones.forEach((opcion, opcionIndex) => {
            const listItem = document.createElement("li");
            listItem.textContent = opcion;
            optionsList.appendChild(listItem);
          });

          // Agregar la lista de viñetas al formulario
          formElement.appendChild(optionsList);
        });

        // Agregar el formulario al div deseado en tu HTML
        const formContainer = document.getElementById("formContainer");
        formContainer.innerHTML = ""; // Limpiar el contenido anterior
        formContainer.appendChild(formElement);



        // Enviar el objeto como JSON al servidor
        const response = await fetch("http://localhost:3001/guardarCuestionario", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });


        // Resto del código...
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Por favor, complete todas las preguntas y opciones antes de agregarlas.");
    }
  };


  const guardarCuestionario = async () => {
    try {
      await axios.post('http://localhost:3001/guardarCuestionario', { questions });
      obtenerCuestionario();
      setQuestions([]); // Limpiar preguntas después de guardar
    } catch (error) {
      console.error('Error al guardar el cuestionario:', error);
    }
  };

  const obtenerCuestionario = async () => {
    try {
      const response = await axios.get('http://localhost:3001/obtenerCuestionario');
      setCuestionarioGuardado(response.data);
    } catch (error) {
      console.error('Error al obtener el cuestionario:', error);
    }
  };

  return (
    <div id="Principal">
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container className="logo-contenedor">
          <img src="./logo.png" alt="" />
          <Navbar.Brand href="#home">Generador de cuestionarios</Navbar.Brand>
         
        </Container>
      </Navbar>

      <div class="contenidoYForm ContePri">
        {/* Contenido principal */}
        <div class="ContenidoPrincipal">
          <h3><center>Creación del formulario</center></h3>
          <p><b>Ingrese las preguntas y opciones:</b></p>
          <Container className="mt-4">
            <Row>
              <Col xs={12}>
                <Form>
                  {questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="mb-4 priIn">
                      <Form.Group controlId={`pregunta-${questionIndex}`}>
                        <Form.Label>Ingrese la pregunta:</Form.Label>
                        <Form.Control className="inp"
                          type="text"
                          value={question.pregunta}
                          onChange={(e) => {
                            const updatedQuestions = [...questions];
                            updatedQuestions[questionIndex].pregunta = e.target.value;
                            setQuestions(updatedQuestions);
                          }}
                        />
                      </Form.Group>
                      {question.opciones.map((opcion, opcionIndex) => (
                        <div key={opcionIndex}>
                           
                          <Form.Group controlId={`opcion-${questionIndex}-${opcionIndex}`}>
                            <Form.Label>Opcion:</Form.Label>
                            <Form.Control
                              type="text"
                              value={opcion}
                              onChange={(e) =>
                                handleInputChange(questionIndex, opcionIndex, e.target.value)
                              }
                              className="w-100"
                            />
                          </Form.Group>

                        </div>
                      ))}
                      <br/>
                      <Button variant="secondary" onClick={() => handleAddOption(questionIndex)}>
                        Agregar Opción
                      </Button>
                    </div>
                  ))}
                  <div className="botones">
                    <Button variant="primary" onClick={handleAddQuestion}>
                      Agregar Pregunta
                    </Button>{"     "}
                    <Button variant="success" onClick={handleAddAllQuestions}>
                      Agregar al cuestionario 
                    </Button>
                  </div>
                </Form>
              </Col>
              <Col>
                <div className="cuestionario_all mt-4">
                  {allQuestions.map((q, index) => (
                    <div key={index}>
                      <div>Pregunta: {q.pregunta}</div>
                      {q.opciones.map((opcion, idx) => (
                        <div key={idx}>Opción: {opcion}</div>
                      ))}
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="showForm">
          <div className="Formulario"><img src="./logo2.png" alt="" /></div>
          <div id="formContainer"></div>
        </div>
      </div>
    </div>

  );
}