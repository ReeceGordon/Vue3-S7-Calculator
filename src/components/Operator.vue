<template>
  <div
    @click="emitOP"
    v-if="isBackspace"
    :class="{ backspace: isBackspace }"
    class="grid-item"
  >
    <font-awesome-icon icon="backspace" />
  </div>
  <div
    @click="emitOP"
    v-else
    :class="{ equals: isEquals, blueText: isBlue, history: isHistory, redText: isC }"
    class="grid-item"
  >
    {{ op }}
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  props: ["op"],
  setup(props, context) {
    const isBackspace = ref(false);
    const isEquals = ref(false);
    const isBlue = ref(false);
    const isC = ref(false);
    const isHistory = ref(false);
    const isPoint = ref(false);
    const isAdd = ref(false);
    const isMinus = ref(false)
    const isMultiply = ref(false);
    const isDivide = ref(false);
    const isNegative = ref(false)
    const isPercent = ref(false)
    const isBraces = ref(false)

    onMounted(() => {
      if (props.op === "<=") isBackspace.value = true;
      if (props.op === "=") isEquals.value = true;
      if (
        props.op === "( )" ||
        props.op === "%" ||
        props.op === "÷" ||
        props.op === "÷" ||
        props.op === "×" ||
        props.op === "-" ||
        props.op === "+"
      )
        isBlue.value = true;
      if (props.op === "History") isHistory.value = true;
      if (props.op === "C") isC.value = true;
      if (props.op === ".") isPoint.value = true;
      if (props.op === "+") isAdd.value = true;
      if (props.op === "-") isMinus.value = true;
      if (props.op === "×") isMultiply.value = true;
      if (props.op === "÷") isDivide.value = true;
      if (props.op === "+/-") isNegative.value = true;
      if (props.op === "%") isPercent.value = true;
      if (props.op === "( )") isBraces.value = true;
    });

    const emitOP = () => {
      if(isC.value) context.emit("reset");
      if(isBackspace.value) context.emit("backspace");
      if(isPoint.value) context.emit("point");
      if(isAdd.value) context.emit("add");
      if(isMinus.value) context.emit("minus");
      if(isEquals.value) context.emit("equals");
      if(isMultiply.value) context.emit("multiply");
      if(isDivide.value) context.emit("divide");
      if(isNegative.value) context.emit("negative");
      if(isPercent.value) context.emit("percent");
      if(isBraces.value) context.emit("braces")
      if(isHistory.value) context.emit("history")
    }

    return {
      isBackspace,
      isEquals,
      isBlue,
      isHistory,
      isC,
      emitOP
    };
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

.grid-item svg {
  color: rgb(0, 143, 199);
  transition: color 0.5s ease;
}

.grid-item svg:hover {
  color: rgba(0, 143, 199, 0.61);
}

.backspace {
  grid-column: 3 / 5;
  grid-row: 2;
  border: none;
  justify-self: end;
}

.backspace:hover {
  background-color: white;
}

.equals {
  background-color: rgb(0, 143, 199);
  color: white;
}

.equals:hover {
  background-color: rgb(0, 143, 199);
  color: white;
}

.blueText {
  color: rgb(0, 143, 199);
}

.redText {
  color: rgba(255, 0, 0, 0.719);
}

.history {
  grid-row: 2;
  grid-column: 1 / 3;
  border: none;
  color: rgba(112, 112, 112, 0.295);

  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-right: auto;

  transition: color 0.5s ease;
}

.history:hover {
  background-color: white;
  color: rgba(112, 112, 112, 0.616);
}

@media only screen and (max-width: 600px) {
  .history {
    grid-row-start: 2;
    grid-column: span 2;
    font-size: 20px;
    border: none;
    color: rgba(112, 112, 112, 0.295);

    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-right: auto;
  }
}
</style>