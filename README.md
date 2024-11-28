# Timesheet

Sistema para gestão de usuários e marcação de ponto.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# Sistema de Marcação de Ponto com Angular e Firebase

Este sistema web foi desenvolvido utilizando **Angular** para a interface e **Firebase** para autenticação e banco de dados em tempo real, além de utilizar **Cloud Functions** para a marcação de ponto com o horário do servidor. O sistema permite o cadastro de usuários e o registro de pontos de entrada e saída, com validações de CPF e código do usuário.

---

## Funcionalidades

### 1. Tela de signup

**Objetivo**: Permitir que os usuários administradores(gestores) ese cadastrem no sistema.

- **Rota**: 
  /auth/signup

**Tecnologias utilizadas**:
- **Firebase Authentication** para autenticação de usuários.
- 
### 2. Tela de Login

**Objetivo**: Permitir que os usuários loguem no sistema para relizar a gestão de funcionários.

**Tecnologias utilizadas**:
- **Firebase Authentication** para autenticação de usuários.

### 3. Tela para CRUD e Listagem de Usuários

**Objetivo**: Registrar novos usuários no sistema e listar os usuários cadastrados.

- **Rota**: 
  /home
  
- **Campos do formulário de cadastro**:
  - **Nome**
  - **CPF** (com validação de formato e unicidade)
  - **E-mail**
  - **Código de usuário** (4 dígitos numéricos únicos)

- **Tecnologias utilizadas**:
  - **Firebase Firestore** para armazenar dados dos usuários.
  - **Angular Forms** para validação dos campos do formulário.
  - **Validações extras** para checar se o códico de usuário ou cpf já foram cadastrados no sistema
  
### 3. Tela de Marcação de Ponto

**Objetivo**: Registrar a entrada e saída de usuários no sistema, utilizando o código do usuário.

- **Rota**: 
  /timesheet

- **Campos**:
  - **Código do usuário** (4 dígitos numéricos)

- **Lógica de marcação**:
  - **Entrada de Ponto**: Quando o usuário marca o ponto pela primeira vez, o sistema registra a "Entrada".
  - **Saída de Ponto**: Quando o usuário marca o ponto novamente, o sistema registra a "Saída".
  
- **Tecnologias utilizadas**:
  - **Firebase Cloud Functions** para capturar o horário do servidor e registrar a marcação de ponto.
  - **Firestore** para armazenar os registros de pontos de entrada e saída.

---

## Estrutura de Pastas

A estrutura de pastas do projeto foi organizada de acordo com as melhores práticas do Angular para facilitar a manutenção e escalabilidade da aplicação.


