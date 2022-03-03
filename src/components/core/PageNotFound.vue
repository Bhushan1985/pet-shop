<template>
  <div class="global-error">
    <div style="max-width: 50%">
      <h1> Page Not Found (404) </h1>
      <p> Cannot resolve path: {{$route.path}} </p>
      <h4>
        <a href="/"> Return Home </a>
      </h4>
    </div>
  </div>  
</template>
<style scoped>
.global-error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
