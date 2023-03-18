<script setup lang="ts">
import Navbar from '../components/Navbar.vue'

</script>

<template>
    <Navbar />
    <div>
        <router-view :key="$route.path"></router-view>
    </div>
</template>