<!-- eslint-disable no-console -->
<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>
<template>
  <div class="flex items-center justify-center h-screen w-screen colorDiv">
    <Card>
      <template #header>
        <h2>Personality Test</h2>
      </template>

      <template #content>
        <div class="input-section">
          <input type="text" placeholder="your full name" class="full-name-input" />
          <button class="start-button" disabled>Start</button>
        </div>

        <p class="note">
          This is a timed form, the time it takes you to complete it will be recorded. Make sure you submit on time!
          If
          you submit late, your response will still be saved.
        </p>
      </template>
    </Card>
  </div>
</template>