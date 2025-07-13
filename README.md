# 🗓️ CalendaFlow

**CalendaFlow** é um sistema fullstack de agendamento com um calendário interativo, focado em produtividade, controle de eventos e notificações inteligentes.

## 🚀 Funcionalidades

- 📅 Calendário interativo com **FullCalendar.js**
- 👥 Criação de eventos com **participantes**, **horários** e **notificações**
- 🔒 Autenticação com controle de **níveis de acesso**
- 📬 Notificações via **email** ou **push**
- 🔗 Integração entre frontend e backend com APIs REST
- 📦 Projeto modular com pastas separadas para frontend e backend

---

## 🛠️ Tecnologias Utilizadas

| Camada        | Tecnologia                                |
|---------------|--------------------------------------------|
| **Frontend**  | React + FullCalendar.js                   |
| **Backend**   | .NET Core (C#)                            |
| **Banco de Dados** | SQL Server (via SQL Server Management Studio) |
| **Autenticação** | Identity (ou JWT, se configurado)       |
| **Notificações** | Email SMTP / Push API                   |

---

## 📁 Estrutura do Projeto

agenda-fullstack/
├── AgendaApi/ # Backend (.NET Core)
└── agenda-frontend/ # Frontend (React + FullCalendar)

---

## 🧑‍💻 Como rodar o projeto localmente

### Pré-requisitos

- .NET SDK 7 ou superior
- Node.js (para o frontend)
- SQL Server instalado e configurado (ou use SQL Server Management Studio)

---

### Backend (.NET + SQL Server)

1. Acesse a pasta do backend:
  cd AgendaApi
  Atualize a string de conexão com o SQL Server em appsettings.json:
  
  "ConnectionStrings": {
    "DefaultConnection": "Server=SEU_SERVIDOR;Database=CalendaFlowDb;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
  
Execute as migrações (se estiver usando Entity Framework):
  dotnet ef database update

Rode o servidor:
  dotnet run
  
Frontend (React)

  cd agenda-frontend
  npm install
  npm start
  Acesse em: http://localhost:3000

✅ Roadmap Futuro

 Dashboard para analytics de agendamentos

 Suporte a múltiplos fusos horários

 Exportação de calendário (Google, Outlook)

 Modo escuro 🌙

