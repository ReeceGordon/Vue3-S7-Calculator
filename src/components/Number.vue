<template>
  <div @click="emitNumber" class="grid-item">{{ num }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: ["num"],
  setup(props, context) {

      const emitNumber = () => {
          context.emit("number", parseInt(props.num, 10))
      }

      return { emitNumber }

  },
});
</script>


<style scoped>
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 0.3px solid rgb(239 239 239 / 80%);
  padding: 20px;
  font-size: 30px;
  text-align: center;
  user-select: none;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: background-color 0.5s ease;
}

.grid-item:hover {
    background-color: rgba(0, 143, 199, 0.11);
    cursor: pointer;
}
</style>