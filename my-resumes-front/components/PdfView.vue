<template>
  <div class="flex flex-col items-center pt-2 space-y-2">
    <div>
      <TextButton label="Generate" @click="printPdf()" />
    </div>
    <div>
      <div id="pdf">
        <object :data="data" :style="{ height: '500px' }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PdfGenerator } from "~/services/PdfGenerator";

const data = ref("");

function printPdf() {
  //https://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html

  const gen = new PdfGenerator();

  gen.addTitle1("José Raphael Teixeira Marques", { align: "center" });
  gen.addText("Backend engineer", { align: "center" });
  gen.addSpace(4);

  gen.addText("João Pessoa, PB - Brazil");
  gen.addText("Email: jose.raphael.marques@gmail.com");

  gen.addHorizontalLine();

  gen.addSpace(2);
  gen.addTitle2("Profile");
  gen.addSpace(2);
  gen.addText(
    "I've been a fullstack web developer for 6 years, with 13 years of development experience. I worked as a researcher, professor, manager, game developer and tech lead. I love learning, sharing knowledge, and applying it to solve problems and create products that deliver value and a great experience."
  );

  gen.addHorizontalLine();

  gen.addSpace(2);
  gen.addTitle2("Education");
  gen.addSpace(2);
  gen.addBulletPoint(
    "MSc in Informatics - Universidade Federal da Paraíba - 03.2009 - 04.2010"
  );
  gen.addBulletPoint(
    "BSc of Computer Science - Universidade Federal da Paraíba - 08.2004 - 03.2009"
  );

  gen.addHorizontalLine();
  gen.addSpace(2);
  gen.addTitle2("Work Experience");
  gen.addSpace(4);

  gen.addTitle3("Backend engineer");
  gen.addText("Deel - 01.2023 - Now");
  gen.addSpace(2);
  gen.addText(
    "I work as a backend engineer on a new payroll product. I’ve create many features and integrations, in collaboration with the team."
  );
  gen.addSpace(2);
  gen.addText(
    "Main technologies: Node, TypeScript, JavaScript, Postgres, Kubernetes, AWS"
  );

  gen.addSpace(4);
  gen.addTitle3("Fullstack developer / Tech Lead");
  gen.addText("ThinkBox – 08.2017 – 12/2022");
  gen.addSpace(2);
  gen.addText(
    "I worked as fullstack developer and tech lead on NexBoard Studio, an online video editing tool. As a developer, I code backend and frontend applications, tests, and review code. As a tech lead, I detail, prioritize and review team tasks, and promote constant team improvement. I'm also responsible for choosing technologies and designing a scalable architecture for the project."
  );
  gen.addSpace(2);
  gen.addText(
    "Main technologies: Node, TypeScript, NestJS, MongoDB, React, NextJS, Vue, Tailwind, AWS"
  );

  gen.addSpace(4);
  gen.addTitle3("Backend developer");
  gen.addText("IARIS – 10.2022 – 12.2022");
  gen.addSpace(2);
  gen.addText(
    "I worked as a backend developer, building solutions for an automatic exam anti-fraud system. I make improvements to the backend architecture, develop new features and make code fixes."
  );
  gen.addSpace(2);
  gen.addText(
    "Main technologies: C#, .NET Core, RabbitMQ, MongoDB, SQL Server, Azure"
  );

  gen.addSpace(4);
  gen.addTitle3("Game developer / Tech Lead");
  gen.addText("ThinkBox – 08.2012 – 08.2017");
  gen.addSpace(2);
  gen.addText(
    "I worked as a game developer, creating educational games, simulators, and apps. As a game developer, I've helped to create several games, simulators, and applications, for mobile, desktop, and web platforms, including game mechanics, AI, user interface, procedural 3D generation, and code optimization."
  );
  gen.addSpace(2);
  gen.addText(
    "As a web developer, I've created backend and frontend applications to serve the games and simulators created. As a tech lead, I've worked by choosing technologies, designing architecture, prioritizing tasks, bringing solutions, and helping the team to improve the development process and code quality"
  );
  gen.addSpace(2);
  gen.addText("Main technologies: Unity, C#, ASP.NET Core, Vue, MySQL, SQLite");

  gen.addPage();

  //gen.addSpace(4);
  gen.addTitle3("Teaching");
  gen.addText("Centro Universitário UNIPÊ – 08.2012 - 07.2017");
  gen.addSpace(2);
  gen.addText(
    "I worked as a professor for Computer Science course, teaching subjects about programming, game development and computer graphics."
  );

  gen.addSpace(4);
  gen.addTitle3("Teaching");
  gen.addText("Universidade Federal da Paraíba – 01.2012 – 12.2013");
  gen.addSpace(2);
  gen.addText(
    "I worked as a professor for Computer Science course, teaching subjects about informatics, database and scientific methodology."
  );

  gen.addSpace(4);
  gen.addTitle3("Researcher / Developer");
  gen.addText("Vsoft Tecnologia – 04.2010 – 03.2013");
  gen.addSpace(2);
  gen.addText(
    "I worked as a researcher working with biometrics face and fingerprint recognition. I developed biometric algorithms, including code optimization and desktop applications for capturing images and videos."
  );
  gen.addSpace(2);
  gen.addText("Main technologies: Java, C++, C#, Windows Forms");

  gen.addHorizontalLine();

  gen.addSpace(2);
  gen.addTitle2("Courses");
  gen.addSpace(4);

  gen.addTitle3("Docker and Kubernetes: The Complete Guide");
  gen.addText("Udemy – 22 hours – 2022");
  gen.addSpace(2);

  gen.addTitle3("Microservices with NodeJs and React");
  gen.addText("Udemy – 54 hours – 2022");
  gen.addSpace(2);

  gen.addTitle3("The Complete Apache Kafka Practical Guide");
  gen.addText("Udemy – 8.5 hours – 2022");
  gen.addSpace(2);

  gen.addHorizontalLine();

  gen.addSpace(2);
  gen.addTitle2("Skills");
  gen.addSpace(2);
  gen.addBulletPoint(
    "Advanced: Typescript, Node, Express, TypeScript, REST, C#, Vue, React, Tailwind, NestJS, NextJS, Nuxt, Jest, ThreeJS, Unity"
  );
  gen.addBulletPoint(
    "Intermediate: Java, C++, Firebase, MongoDB, MySQL, SQLite, ASP.NET Core, Docker, DDD, Clean Architecture"
  );
  gen.addBulletPoint(
    "Learning: CI/CD, GraphQL, AWS, Postgres, Angular, RabbitMQ, Kafka, Microservices"
  );

  data.value = gen.getPdfString();
}

onMounted(() => {
  printPdf();
});
</script>

<style scoped></style>
