import { useState, type FormEvent } from "react";
import { redirect, useNavigate } from "react-router"; // Adicione useNavigate
import { addStudent } from "../api/addStudent.server";
import { insertReportOnStudent } from "../api/insertReportOnStudent.server";
import Button from "../components/Button";
import FileUpload from "../components/FileUpload";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";
import VoltarButton from "../components/VoltarButton";
import type { Route } from "./+types/cadastrar-aluno";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const student = await addStudent(request, formData);
  await insertReportOnStudent(request, formData, student.id);

  return redirect(`/aluno/${student.id}`);
}

export default function CadastrarAluno() {
  const [nome, setNome] = useState("");
  const [relatorio, setRelatorio] = useState(null);
  const navigate = useNavigate(); // Adicione esta linha

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) {
      alert("Por favor, insira o nome do aluno.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nome", nome);
      if (relatorio) {
        formData.append("file", relatorio);
      }

      const response = await fetch("/cadastrar-aluno", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        navigate(-1); // Volta para a página anterior após o sucesso
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao cadastrar aluno");
      }
    } catch (error) {
      // Trate o erro aqui (ex: mostrar mensagem para o usuário)
      console.error("Erro ao cadastrar aluno:", error);
      alert("Ocorreu um erro ao cadastrar o aluno. Por favor, tente novamente.");
    }
  };

  return (
    <div style={{ backgroundColor: "transparent" }}>
      <Navbar />
      <div className="cadastrar-aluno-page">
        <div className="header">
          <VoltarButton />
          <h1>Cadastrar Novo Aluno</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="form-container"
          encType="multipart/form-data"
        >
          <InputField
            type="text"
            placeholder="Nome do Aluno"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <div className="file-upload-container">
            <FileUpload
              onChange={(e: any) => setRelatorio(e.target.files[0])}
            />
          </div>
          <Button backgroundColor="#022651" strokeColor="#5A5858" type="submit">
            Cadastrar
          </Button>
        </form>
      </div>
    </div>
  );
}