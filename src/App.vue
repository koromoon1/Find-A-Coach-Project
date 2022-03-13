<template>
  <TheHeader />
  <router-view v-slot="slotProps">
    <!-- !Transition needs exactly 1 child element! (rare exceptions) -->
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
      <!-- ':is': the component that router decide to load -->
      <!-- 'v-slot="slotProps"': to get the component router wants to render -->
      <!-- important: 'C'omponent -->
      <!-- mode="out-in": first animate the removal of existing page, then appearance of the new page -->
    </transition>
  </router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
export default {
  components: { TheHeader },
};
</script>

<style>
/* Global Style */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

/* Router Transition Animation */
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.12s ease-out;
}

.route-leave-active {
  transition: all 0.12s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 100;
  transform: translateY(0);
}
</style>
