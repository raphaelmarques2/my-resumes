<template>
  <div class="flex flex-col items-center pt-2 space-y-2">
    <!-- <div>
      <TextButton label="Generate" @click="printPdf()" />
    </div> -->
    <div>
      <div id="pdf">
        <object
          :data="data"
          :style="{
            width: width ? `${width}px` : undefined,
            height: height ? `${height}px` : undefined,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PdfGenerator } from "~/services/PdfGenerator";
import {
  ExperienceDto,
  ProfileDto,
  ResumeDto,
} from "~/services/backend/generated";
import moment from "moment";
import { getExperienceTime } from "~/services/utils";

const props = defineProps<{
  width?: number;
  height?: number;
  profile?: ProfileDto;
  resume?: ResumeDto;
  experiences?: ExperienceDto[];
}>();

const data = ref("");

function printPdf() {
  const gen = new PdfGenerator();

  if (props.profile) {
    gen.addTitle1(props.profile.name, { align: "center" });
  }
  if (props.resume) {
    gen.addText(props.resume.title, { align: "center" });
  }
  gen.addSpace(4);

  if (props.profile) {
    if (props.profile.address) {
      gen.addText(props.profile.address);
    }
    if (props.profile.email) {
      gen.addText(`E-mail: ${props.profile.email}`);
    }
    if (props.profile.linkedin) {
      gen.addText(`LinkedIn: ${props.profile.linkedin}`);
    }
  }

  gen.addHorizontalLine();

  gen.addSpace(2);
  if (props.resume) {
    gen.addTitle2("Profile");
    gen.addSpace(2);
    gen.addText(props.resume.description);
  }

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

  if (props.experiences) {
    gen.addHorizontalLine();
    gen.addSpace(2);
    gen.addTitle2("Work Experience");

    const experiences = (
      props.resume
        ? props.resume.experiences.map((id) =>
            props.experiences!.find((e) => e.id === id)
          )
        : props.experiences
    ) as ExperienceDto[];

    for (const experience of experiences) {
      gen.addSpace(4);
      gen.addTitle3(experience.title);

      const time = getExperienceTime(experience);
      gen.addText(`${experience.company} - ${time}`);
      gen.addSpace(2);
      gen.addText(experience.description);
      if (experience.technologies.length > 0) {
        gen.addSpace(2);
        gen.addText(`Main technologies: ${experience.technologies.join(", ")}`);
      }
    }
  }

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
