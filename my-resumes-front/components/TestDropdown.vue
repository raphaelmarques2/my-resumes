<template>
  <HMenu class="bg-blue-500 hover:bg-blue-400 inline" as="div">
    <HMenuButton>More</HMenuButton>
    <HMenuItems class="border border-gray-500 rounded shadow w-40">
      <HMenuItem v-slot="{ active }">
        <div>
          <a :class="{ 'bg-blue-500': active }" href="/page1">Page1</a>
        </div>
      </HMenuItem>
      <HMenuItem v-slot="{ active }">
        <div>
          <a :class="{ 'bg-blue-500': active }" href="/page2">Page2</a>
        </div>
      </HMenuItem>
      <HMenuItem disabled>
        <div>
          <span class="opacity-75">Invite a friend (coming soon!)</span>
        </div>
      </HMenuItem>
    </HMenuItems>
  </HMenu>
</template>

<script setup>
//import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
//import { ChevronDownIcon } from "@heroicons/vue/20/solid";
// import ArchiveIcon from "./archive-icon.vue";
// import DuplicateIcon from "./duplicate-icon.vue";
// import MoveIcon from "./move-icon.vue";
// import EditIcon from "./edit-icon.vue";
// import DeleteIcon from "./delete-icon.vue";
</script>
