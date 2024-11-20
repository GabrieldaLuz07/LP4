const routes = [
  /***************************LOGIN***************************/
  {
    path: "/",
    component: () => import("layouts/LayoutLogin.vue"),
    children: [
      {
        path: "",
        name: "login",
        component: () => import("pages/LoginPage.vue"),
      },
    ],
  },
  /**************************************************************/

  /***************************PRINCIPAL***************************/
  {
    path: "/app",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("pages/DashBoardPage.vue"),
      },

      /***************************ALUNOS***************************/
      {
        path: "/alunos",
        name: "alunos",
        component: () => import("src/pages/Alunos/AlunosPage.vue"),
      },
      {
        path: "/adicionarAluno",
        component: () => import("src/pages/Alunos/RegisterAluno.vue"),
      },
      {
        path: "/editarAluno/:id",
        component: () => import("src/pages/Alunos/RegisterAluno.vue"),
        name: "registerAluno",
      },
      /*****************************************************************/

      /***************************PROFESSORES***************************/
      {
        path: "/professores",
        name: "professores",
        component: () => import("src/pages/Professores/ProfessoresPage.vue"),
      },
      {
        path: "/adicionarProfessor",
        component: () => import("src/pages/Professores/RegisterProfessor.vue"),
      },
      {
        path: "/editarProfessor/:id",
        component: () => import("src/pages/Professores/RegisterProfessor.vue"),
        name: "registerProfessor",
      },
      /*****************************************************************/

      /***************************MODALIDADES***************************/
      {
        path: "/modalidades",
        name: "modalidades",
        component: () => import("src/pages/Modalidades/ModalidadesPage.vue"),
      },
      {
        path: "/adicionarModalidade",
        component: () => import("src/pages/Modalidades/RegisterModalidade.vue"),
      },
      {
        path: "/editarModalidade/:id",
        component: () => import("src/pages/Modalidades/RegisterModalidade.vue"),
        name: "registerModalidade",
      },
      /*****************************************************************/

      /***************************PLANOS***************************/
      {
        path: "/planos",
        name: "planos",
        component: () => import("src/pages/Planos/PlanosPage.vue"),
      },
      {
        path: "/adicionarPlano",
        component: () => import("src/pages/Planos/RegisterPlano.vue"),
      },
      {
        path: "/adicionarPlano/:id",
        component: () => import("src/pages/Planos/RegisterPlano.vue"),
        name: "registerPlano",
      },
      /*****************************************************************/
    ],
  },
  /***********************************************************/

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
