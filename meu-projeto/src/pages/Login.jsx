// src/components/Login.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { createAuthClient } from "better-auth/client";

const Login = () => {
  const navigate = useNavigate();
  const authClient = createAuthClient();

  const signIn = async () => {
    try {
      const data = await authClient.signIn.social({
        provider: "google",
      });

      if (!data.error) {
        navigate("/home");
      } else {
        alert(data.error.message || "Erro ao fazer login com o Google");
      }
    } catch (error) {
      alert("Falha ao autenticar com o Google.");
      console.error(error);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div
        className="logo-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "40px",
        }}
      >
        <div style={{ transform: "scale(1.5)", marginBottom: "20px" }}>
          <Logo />
        </div>
        <h3 style={{ fontSize: "18px", marginTop: 10 }}>Entrar na plataforma</h3>
      </div>

      <button
        className="google-login-button"
        onClick={signIn}
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #ccc",
          borderRadius: "6px",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          width: "500px", // menor largura para melhor centralização
          maxWidth: "90%",
        }}
      >
        <img
          src="/google.png"
          alt="Google logo"
          style={{ width: "24px", height: "24px" }}
        />
        <span style={{ fontSize: "16px", fontWeight: "500" }}>
          Entrar com Google
        </span>
      </button>
    </div>
  );
};

export default Login;
