const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("pages/DashBoardPage.vue"),
      },
      {
        path: "/alunos",
        name: "aluno",
        component: () => import("pages/AlunosPage.vue"),
      },
      {
        path: "/adicionarAluno",
        component: () => import("pages/RegisterAluno.vue"),
      },
      {
        path: "/editarAluno/:id",
        component: () => import("pages/RegisterAluno.vue"),
        name: "registerAluno",
      },
      {
        path: "/professores",
        name: "professores",
        component: () => import("pages/ProfessoresPage.vue"),
      },
      {
        path: "/adicionarProfessor",
        component: () => import("pages/RegisterProfessor.vue"),
      },
      {
        path: "/editarProfessor/:id",
        component: () => import("pages/RegisterProfessor.vue"),
        name: "registerProfessor",
      },
      {
        path: "/modalidades",
        name: "modalidades",
        component: () => import("pages/ModalidadesPage.vue"),
      },
      {
        path: "/adicionarModalidade",
        component: () => import("pages/RegisterModalidade.vue"),
      },
      {
        path: "/editarModalidade/:id",
        component: () => import("pages/RegisterModalidade.vue"),
        name: "registerModalidade",
      },
    ],
  },

  {
    path: "/login",
    component: () => import("layouts/LayoutLogin.vue"),
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("pages/LoginPage.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
