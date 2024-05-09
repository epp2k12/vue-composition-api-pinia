<script setup>

</script>

<template> 
      <div class="my-wrapper">
            
        <div style="background: lightblue; border-radius: 5px">
            <slot name="card-header"></slot>
        </div>

        <slot></slot>

      </div>

</template>

<style>
.my-wrapper {
  border: 1px solid darkblue;
  margin: 5px;
  padding: 5px;
  text-align: center;
  border-radius: 10px;
}
</style>