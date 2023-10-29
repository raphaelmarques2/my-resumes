<template>
  <main>
    <div class="flex flex-col items-center space-y-4">
      <h1 class="text-blue-600">About me</h1>
      <div class="text-center">
        <h2 class="font-bold">Raphael Marques</h2>
        <p class="text-sm">Fullstack Developer | Tech Lead</p>
      </div>
      <div class="flex space-x-4">
        <NuxtLink to="mailto:jose.raphael.marques@gmail.com">
          <div class="link-icon">
            <Icon name="email" />
          </div>
        </NuxtLink>
        <NuxtLink to="https://www.linkedin.com/in/raphaelmarques84/">
          <div class="link-icon">
            <Icon name="linkedin" />
          </div>
        </NuxtLink>
        <NuxtLink to="https://github.com/raphaelmarques2">
          <div class="link-icon">
            <Icon name="github" />
          </div>
        </NuxtLink>
      </div>
      <p class="max-w-md text-center font-semibold">
        Fullstack web developer. I've worked as a developer, researcher,
        professor, manager, game developer and tech lead. I love learning,
        sharing knowledge, solving hard problems, and creating products that
        deliver value and a great user experience.
      </p>
      <p class="font-semibold">
        Let's talk?
        <NuxtLink to="mailto:jose.raphael.marques@gmail.com" class="link">
          jose.raphael.marques@gmail.com
        </NuxtLink>
      </p>
      <p class="max-w-md text-center font-semibold">
        This project was made using Postgres, Node,<br />
        NestJS, Vue, Nuxt and Tailwind. <br />More details on project's
        <NuxtLink
          to="https://github.com/raphaelmarques2/my-resumes"
          class="link"
        >
          github page
        </NuxtLink>
        .
      </p>
    </div>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped>
.link-icon {
  @apply w-6 h-6 rounded flex items-center justify-center bg-gray-200 hover:bg-gray-300;
}
.link {
  @apply text-blue-600 font-semibold hover:underline;
}
</style>
