<template>
  <div class="container">
    <div class="flex-item grid-container" style="justify-self: flex-end">
      <div  class="history-grid-item-overlay" :class="{ historyGridItemOverlayAnim : historyOverlay }">
        <div class="displayResultHistory">
          <div class="responsiveWidth" v-for="(item, index) in sumHistory" :key="index">
            <p class="upperResultP"><span style="color: rgba(112, 112, 112, 0.816);" v-for="(seqItem, Sindex) in item.sequence" :key="Sindex">{{seqItem}}</span></p>
            <p>={{item.sum}}</p>
          </div>
        </div>
        <div @click="clearSumHistory" class="clearHistory" :class="{ clearHistoryAnim : historyOverlay }">Clear History</div>
      </div>
      <div class="result-grid-item">
        <p>
          <span v-for="(num, index) in computedHistory" :key="index">{{
            num
          }}</span>
        </p>
        <p v-if="resultHistory">
          {{ resultHistory[resultHistory.length - 1] }}
        </p>
      </div>
      <Operator @backspace="popHistory" op="<=" />
      <Operator @history="onHistory" op="History" />
      <Operator @reset="resetHistory" op="C" class="grid-row-3 grid-column-1" />
      <Operator @braces="onBraces" op="( )" class="grid-row-3 grid-column-2" />
      <Operator @percent="onPercent" op="%" class="grid-row-3 grid-column-3" />
      <Operator @divide="onDivide" op="÷" class="grid-row-3 grid-column-4" />
      <Number @number="onNumber" num="7" class="grid-row-4 grid-column-1" />
      <Number @number="onNumber" num="8" class="grid-row-4 grid-column-2" />
      <Number @number="onNumber" num="9" class="grid-row-4 grid-column-3" />
      <Operator @multiply="onMultiply" op="×" class="grid-row-4 grid-column-4" />
      <Number @number="onNumber" num="4" class="grid-row-5 grid-column-1" />
      <Number @number="onNumber" num="5" class="grid-row-5 grid-column-2" />
      <Number @number="onNumber" num="6" class="grid-row-5 grid-column-3" />
      <Operator @minus="onMinus" op="-" class="grid-row-5 grid-column-4" />
      <Number @number="onNumber" num="1" class="grid-row-6 grid-column-1" />
      <Number @number="onNumber" num="2" class="grid-row-6 grid-column-2" />
      <Number @number="onNumber" num="3" class="grid-row-6 grid-column-3" />
      <Operator @add="onAdd" op="+" class="grid-row-6 grid-column-4" />
      <Operator @negative="onNegative" op="+/-" class="grid-row-7 grid-column-1" />
      <Number @number="onNumber" num="0" class="grid-row-7 grid-column-2" />
      <Operator @point="onPoint" op="." class="grid-row-7 grid-column-3" />
      <Operator @equals="onEquals" op="=" class="grid-row-7 grid-column-4" />
    </div>
  </div>
</template>

<script lang="ts">
import { parse } from "node_modules/@fortawesome/fontawesome-svg-core";
import { computed, defineComponent, ref } from "vue";
import Number from "../components/Number.vue";
import Operator from "../components/Operator.vue";

export default defineComponent({
  name: "Home",
  components: { Number, Operator },
  setup() {
    const historyOverlay = ref(false);
    const inputHistory = ref(Array<string>());
    const resultHistory = ref(Array<string>());
    interface sumHistoryInt {
      sum: string;
      sequence: string[];
    }
    const sumHistory = ref(Array<sumHistoryInt>());

    //computed incase multiple histories are used, currently not needed
    const computedHistory = computed(() => {
      if (inputHistory.value.length) {
        return inputHistory.value;
      }
    });

    const onNumber = (value: number) => {
      if (inputHistory.value.length) {
        if (
          inputHistory.value[inputHistory.value.length - 1] === "+" ||
          inputHistory.value[inputHistory.value.length - 1] === "-" ||
          inputHistory.value[inputHistory.value.length - 1] === "×" ||
          inputHistory.value[inputHistory.value.length - 1] === "÷" ||
          inputHistory.value[inputHistory.value.length - 1] === "+/-"
        ) {
          inputHistory.value.push("");
        }
        if (inputHistory.value[inputHistory.value.length - 1].includes("%")) {
          inputHistory.value.push("×");
          inputHistory.value.push("");
        }
        inputHistory.value[inputHistory.value.length - 1] += value;
      } else {
        inputHistory.value.push("");
        inputHistory.value[inputHistory.value.length - 1] += value;
        //numberHistory.value.push(value)
      }
    };

    const onPoint = () => {
      if (inputHistory.value.length) {
        if (!inputHistory.value[inputHistory.value.length - 1].includes(".")) {
          inputHistory.value[inputHistory.value.length - 1] += ".";
        }
      } else {
        inputHistory.value.push("0.");
      }
    };

    const onAdd = () => {
      if (!inputHistory.value.length) {
        console.log("Enter a number first.");
      } else {
        if (
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "."
        ) {
          //if last val was a decimal point
          inputHistory.value[inputHistory.value.length - 1] += "0";
          inputHistory.value.push("+");
        } else if (
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "+" ||
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "-" ||
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "×" ||
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "÷"
        ) {
          console.log("You can't enter consecutive operators.");
        } else {
          inputHistory.value.push("+");
        }
      }
    };

    const onMinus = () => {
      if (!inputHistory.value.length) {
        console.log("Enter a number first.");
      } else {
        if (
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "."
        ) {
          inputHistory.value[inputHistory.value.length - 1] += "0";
          inputHistory.value.push("-");
        } else if (
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "+" ||
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "-" ||
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "×" ||
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "÷"
        ) {
          console.log("You can't enter consecutive operators.");
        } else {
          inputHistory.value.push("-");
        }
      }
    };

    const onMultiply = () => {
      if (!inputHistory.value.length) {
        console.log("Enter a number first.");
      } else {
        if (
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "."
        ) {
          inputHistory.value[inputHistory.value.length - 1] += "0";
          inputHistory.value.push("×");
        } else if (
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "+" ||
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "-" ||
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "×" ||
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "÷"
        ) {
          console.log("You can't enter consecutive operators.");
        } else {
          inputHistory.value.push("×");
        }
      }
    };

    const onDivide = () => {
      if (!inputHistory.value.length) {
        console.log("Enter a number first.");
      } else {
        if (
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "."
        ) {
          inputHistory.value[inputHistory.value.length - 1] += "0";
          inputHistory.value.push("÷");
        } else if (
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "+" ||
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "-" ||
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "×" ||
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "÷"
        ) {
          console.log("You can't enter consecutive operators.");
        } else {
          inputHistory.value.push("÷");
        }
      }
    };

    const onNegative = () => {
      if (!inputHistory.value.length) {
        console.log("Enter a number first.");
      } else {
        if (
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "."
        ) {
          inputHistory.value[inputHistory.value.length - 1] += "0";
          inputHistory.value[inputHistory.value.length - 1] =
            "(-" + inputHistory.value[inputHistory.value.length - 1];
        } else if (
          inputHistory.value[inputHistory.value.length - 1].includes("(-")
        ) {
          inputHistory.value[
            inputHistory.value.length - 1
          ] = inputHistory.value[inputHistory.value.length - 1].replace(
            "(-",
            ""
          );
        } else if (
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "+" ||
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "-" ||
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "×" ||
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "÷"
        ) {
          console.log("You can't negate an operator.");
        } else {
          inputHistory.value[inputHistory.value.length - 1] =
            "(-" + inputHistory.value[inputHistory.value.length - 1];
        }
      }
    };

    const onPercent = () => {
      if (!inputHistory.value.length) {
        console.log("Enter a number first.");
      } else {
        if (
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "."
        ) {
          inputHistory.value[inputHistory.value.length - 1] += "0";
          inputHistory.value[inputHistory.value.length - 1] =
            inputHistory.value[inputHistory.value.length - 1] + "%";
        } else if (
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "+" ||
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "-" ||
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "×" ||
          inputHistory.value[inputHistory.value.length - 1].slice(-1) === "÷"
        ) {
          console.log("You can't % an operator.");
        } else {
          inputHistory.value[inputHistory.value.length - 1] =
            inputHistory.value[inputHistory.value.length - 1] + "%";
        }
      }
    };

    const onBraces = () => {
      let leftCounter = 0;
      let rightCounter = 0;
      if (!inputHistory.value.length) {
        console.log("Enter a number first.");
      } else {
          for(let input of inputHistory.value) {
            if(input.includes("(")) leftCounter++
            if(input.includes(")")) rightCounter++
          }
          if (rightCounter < leftCounter) {
            inputHistory.value[inputHistory.value.length - 1] = inputHistory.value[inputHistory.value.length - 1] + ")";
            console.log("Braces Val:", inputHistory.value[inputHistory.value.length - 1] )
          }
          else {
            //neither exist
            inputHistory.value[inputHistory.value.length - 1] = "(" + inputHistory.value[inputHistory.value.length - 1];
            console.log("Braces Val:", inputHistory.value[inputHistory.value.length - 1] )
          }
          
      }
    };

    const onHistory = () => {
      console.log("History button clicked;")
      historyOverlay.value = !historyOverlay.value;
    }

    //BUTTON THAT ARE STILL TO:DO = ()
    const onEquals = () => {
      let calculationHistory: string[] = [...inputHistory.value].reverse();
      let leftIndex = null;
      let rightIndex = null;
      let braceCalc = true;
      console.log("Initial CalculationHistory Reversed:", calculationHistory);
      console.log(
        "Initial CalculationHistory:",
        [...calculationHistory].reverse()
      );
      console.log("inputHistory:", inputHistory.value);

      //Check if brace end exist, if not remove open brace
      let lastBraceIndex = null;
      let braceCounter = 0;
      for(let i = calculationHistory.length - 1; i>= 0; i--) {
        if (calculationHistory[i].includes("(")) {
          braceCounter++;
          lastBraceIndex = i;
        }
        if (calculationHistory[i].includes(")")) {
          braceCounter++;
          lastBraceIndex = i;
        }
      }

      //Odd amount of braces, remove last
      if(braceCounter % 2 !== 0 && lastBraceIndex !== null) {
        if(calculationHistory[lastBraceIndex].includes("(")) {
          calculationHistory[lastBraceIndex] = calculationHistory[lastBraceIndex].replace("(", "");
        }
      }

      for (let i = calculationHistory.length - 1; i >= 0; i--) {
        //parse "(-" as a negative "-n" val
        if (calculationHistory[i].includes("(-")) {
          calculationHistory[i] = calculationHistory[i].replace("(-", "-");
        }
        
        //parse ( )
        if (calculationHistory[i].includes("(")) {
          leftIndex = i;
          braceCalc = true;
          console.log("LeftIndex: ", leftIndex, "LeftIndexValue: ", calculationHistory[leftIndex]);
        }
        if (calculationHistory[i].includes(")")) {
          rightIndex = i;
          braceCalc = true;
          console.log("rightIndex: ", rightIndex, "rightIndex: ", calculationHistory[rightIndex]);
        }

        // Brace math
        if(leftIndex && rightIndex && braceCalc) {
          console.log("Am I reached?")
          if (calculationHistory[leftIndex].includes("(")) calculationHistory[leftIndex] = calculationHistory[leftIndex].replace("(", "");
          if (calculationHistory[rightIndex].includes(")")) calculationHistory[rightIndex] = calculationHistory[rightIndex].replace(")", "");
          for(let j = leftIndex; j >= rightIndex; j--) {
            console.log("Element inbetween braces: ", calculationHistory[j]);
            
            //brace multiply
            if (calculationHistory[j] === "×") {
            console.log("* Calc History pre splice:", calculationHistory);
            let precendingValue: number = parseFloat(calculationHistory[j - 1]);
            console.log("* precedingValue:", precendingValue);
            let procedingValue: number = parseFloat(calculationHistory[j + 1]);
            console.log("* procedingValue:", procedingValue);
            if (calculationHistory[j + 1].includes("%")) {
              procedingValue = procedingValue / 100;
            }
            if (calculationHistory[j - 1].includes("%")) {
              precendingValue = precendingValue / 100;
            }
            console.log("* precedingValue Mod:", precendingValue);
            console.log("* procedingValue Mod:", procedingValue);
            const sum: number = precendingValue * procedingValue;
            calculationHistory[j - 1] = sum.toString();

            //When sum is complete, remove excess values from calculation history
            calculationHistory.splice(j + 1, 1);
            calculationHistory.splice(j, 1);
            console.log("* Calc History post splice:", calculationHistory);
            braceCalc = false;
            }

            //brace divide
            if (calculationHistory[j] === "÷") {
            console.log("/ Calc History pre splice:", calculationHistory);
            let precendingValue: number = parseFloat(calculationHistory[j + 1]);
            let procedingValue: number = parseFloat(calculationHistory[j - 1]);
            if (calculationHistory[j - 1].includes("%")) {
              procedingValue = procedingValue / 100;
            }
            if (calculationHistory[j + 1].includes("%")) {
              precendingValue = precendingValue / 100;
            }
            const sum: number = precendingValue / procedingValue;
            calculationHistory[j - 1] = sum.toString();

            //When sum is complete, remove excess values from calculation history
            calculationHistory.splice(j + 1, 1);
            calculationHistory.splice(j, 1);
            console.log("/ Calc History post splice:", calculationHistory);
            braceCalc = false;
            }

            //brace add
            if (calculationHistory[j] === "+") {
            console.log("+ Calc History pre splice:", calculationHistory);
            let precendingValue: number = parseFloat(calculationHistory[j - 1]);
            let procedingValue: number = parseFloat(calculationHistory[j + 1]);
            if (calculationHistory[j + 1].includes("%")) {
              procedingValue = procedingValue / 100;
            }
            if (calculationHistory[j - 1].includes("%")) {
              //precendingValue = precendingValue / 100;
              const perc = precendingValue / 100;
              precendingValue = procedingValue * perc;
            }
            console.log("+ precedingValue Mod:", precendingValue);
            console.log("+ procedingValue Mod:", procedingValue);
            const sum: number = precendingValue + procedingValue;
            calculationHistory[j - 1] = sum.toString();

            //When sum is complete, remove excess values from calculation history
            calculationHistory.splice(j + 1, 1);
            calculationHistory.splice(j, 1);
            console.log("+ Calc History post splice:", calculationHistory);
            braceCalc = false;
            }

            //brace subtract
            if (calculationHistory[j] === "-") {
            console.log("- Calc History pre splice:", calculationHistory);
            let precendingValue: number = parseFloat(calculationHistory[j + 1]);
            let procedingValue: number = parseFloat(calculationHistory[j - 1]);
            if (calculationHistory[j - 1].includes("%")) {
              //procedingValue = procedingValue / 100;
              const perc = procedingValue / 100;
              procedingValue = precendingValue * perc;
            }
            if (calculationHistory[j + 1].includes("%")) {
              //precendingValue = precendingValue / 100;
              const perc = precendingValue / 100;
              precendingValue = procedingValue * perc;
            }
            console.log("- precedingValue Mod:", precendingValue);
            console.log("- procedingValue Mod:", procedingValue);
            const sum: number = precendingValue - procedingValue;
            calculationHistory[j - 1] = sum.toString();

            //When sum is complete, remove excess values from calculation history
            calculationHistory.splice(j + 1, 1);
            calculationHistory.splice(j, 1);
            console.log("- Calc History post splice:", calculationHistory);
            braceCalc = false;
            }

          }
        }
        

        //parse % 
        if (calculationHistory[calculationHistory.length - 1].includes("%")) {
          calculationHistory[
            calculationHistory.length - 1
          ] = calculationHistory[calculationHistory.length - 1].replace(
            "%",
            ""
          );
          const num = parseFloat(
            calculationHistory[calculationHistory.length - 1]
          );
          calculationHistory[calculationHistory.length - 1] = (
            num / 100
          ).toString();
          console.log("% Found inside new loop 1st VAL");
        }
      }
      //parse * && /
      if (
        calculationHistory.includes("×") ||
        calculationHistory.includes("÷")
      ) {
        for (let i = calculationHistory.length - 1; i >= 0; i--) {
          if (calculationHistory[i] === "×") {
            console.log("* Calc History pre splice:", calculationHistory);
            let precendingValue: number = parseFloat(calculationHistory[i - 1]);
            console.log("* precedingValue:", precendingValue);
            let procedingValue: number = parseFloat(calculationHistory[i + 1]);
            console.log("* procedingValue:", procedingValue);
            if (calculationHistory[i + 1].includes("%")) {
              procedingValue = procedingValue / 100;
            }
            if (calculationHistory[i - 1].includes("%")) {
              precendingValue = precendingValue / 100;
            }
            console.log("* precedingValue Mod:", precendingValue);
            console.log("* procedingValue Mod:", procedingValue);
            const sum: number = precendingValue * procedingValue;
            calculationHistory[i - 1] = sum.toString();

            //When sum is complete, remove excess values from calculation history
            calculationHistory.splice(i + 1, 1);
            calculationHistory.splice(i, 1);
            console.log("* Calc History post splice:", calculationHistory);
          }
          if (calculationHistory[i] === "÷") {
            console.log("/ Calc History pre splice:", calculationHistory);
            let precendingValue: number = parseFloat(calculationHistory[i + 1]);
            let procedingValue: number = parseFloat(calculationHistory[i - 1]);
            if (calculationHistory[i - 1].includes("%")) {
              procedingValue = procedingValue / 100;
            }
            if (calculationHistory[i + 1].includes("%")) {
              precendingValue = precendingValue / 100;
            }
            const sum: number = precendingValue / procedingValue;
            calculationHistory[i - 1] = sum.toString();

            //When sum is complete, remove excess values from calculation history
            calculationHistory.splice(i + 1, 1);
            calculationHistory.splice(i, 1);
            console.log("/ Calc History post splice:", calculationHistory);
          }
        }
      }
      //parse + && -
      if (
        calculationHistory.includes("+") ||
        calculationHistory.includes("-")
      ) {
        for (let i = calculationHistory.length - 1; i >= 0; i--) {
          if (calculationHistory[i] === "+") {
            console.log("+ Calc History pre splice:", calculationHistory);
            let precendingValue: number = parseFloat(calculationHistory[i - 1]);
            let procedingValue: number = parseFloat(calculationHistory[i + 1]);
            if (calculationHistory[i + 1].includes("%")) {
              procedingValue = procedingValue / 100;
            }
            if (calculationHistory[i - 1].includes("%")) {
              //precendingValue = precendingValue / 100;
              const perc = precendingValue / 100;
              precendingValue = procedingValue * perc;
            }
            console.log("+ precedingValue Mod:", precendingValue);
            console.log("+ procedingValue Mod:", procedingValue);
            const sum: number = precendingValue + procedingValue;
            calculationHistory[i - 1] = sum.toString();

            //When sum is complete, remove excess values from calculation history
            calculationHistory.splice(i + 1, 1);
            calculationHistory.splice(i, 1);
            console.log("+ Calc History post splice:", calculationHistory);
          }
          if (calculationHistory[i] === "-") {
            console.log("- Calc History pre splice:", calculationHistory);
            let precendingValue: number = parseFloat(calculationHistory[i + 1]);
            let procedingValue: number = parseFloat(calculationHistory[i - 1]);
            if (calculationHistory[i - 1].includes("%")) {
              //procedingValue = procedingValue / 100;
              const perc = procedingValue / 100;
              procedingValue = precendingValue * perc;
            }
            if (calculationHistory[i + 1].includes("%")) {
              //precendingValue = precendingValue / 100;
              const perc = precendingValue / 100;
              precendingValue = procedingValue * perc;
            }
            console.log("- precedingValue Mod:", precendingValue);
            console.log("- procedingValue Mod:", procedingValue);
            const sum: number = precendingValue - procedingValue;
            calculationHistory[i - 1] = sum.toString();

            //When sum is complete, remove excess values from calculation history
            calculationHistory.splice(i + 1, 1);
            calculationHistory.splice(i, 1);
            console.log("- Calc History post splice:", calculationHistory);
          }
        }
      }

      resultHistory.value.push(calculationHistory[0]); //calculationHistory Should always be reduced to 1x value at this point
      sumHistory.value.push({
        sum: calculationHistory[0],
        sequence: inputHistory.value
      });
      inputHistory.value = calculationHistory;

      console.log("Sum History:", sumHistory.value);
      console.log("calculationHistory:", calculationHistory);
      console.log("-------------------");
    };

    const resetHistory = () => {
      inputHistory.value.length = 0;
      resultHistory.value.length = 0;
    };

    const clearSumHistory = () => {
      sumHistory.value = new Array<sumHistoryInt>();
    }

    const popHistory = () => {
      if (inputHistory.value.length) {
        inputHistory.value.pop();
      }
    };

    return {
      onNumber,
      onPoint,
      onMultiply,
      onDivide,
      onAdd,
      onMinus,
      onNegative,
      onPercent,
      onBraces,
      onHistory,
      historyOverlay,
      onEquals,
      resetHistory,
      popHistory,
      computedHistory,
      resultHistory,
      sumHistory,
      clearSumHistory
    };
  }
});
</script>

<style scoped>
.container {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container p {
  height: 100px;
  text-align: end;
  padding-top: 4%;
  padding-left: 1%;
  padding-right: 1%;
  margin: 0;
  color: rgb(0, 143, 199);
  max-width: 359px;
  word-wrap: break-word;
}

.grid-container {
  display: grid;
  gap: 0px;
  grid-template-columns: repeat(4,1fr);
  grid-template-rows: repeat(7,1fr);
  padding: 0px;
  height: 800px;
  width: 400px;
  border: 0.3px solid rgb(239 239 239 / 80%);
}

.result-grid-item {
  padding: 20px;
  font-size: 30px;
  text-align: end;
  background-color: rgba(255, 255, 255, 0.8);
  grid-column: 1/5;
  grid-row:1;
}

.history-grid-item-overlay {
  border-top: 0.3px solid rgb(239 239 239 / 80%);
  grid-column: 1/4;
  grid-row: 3/ 8;
  background-color:white;
  color: white;
  z-index: 1;
  width: 1%;
  visibility: hidden;

  transition: width 0.4s ease, visibility 0s ease 0.1s;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}

.historyGridItemOverlayAnim {
  width: 100%;
  visibility: visible;
  color: rgb(0, 143, 199);

  transition: width 0.4s ease, visibility 0s ease;
}

.clearHistory {
  border-top: 0.3px solid rgb(153, 153, 153);
  padding: 10px;
  padding-left: 50px;
  padding-right: 50px;
  cursor: pointer;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  user-select: none;
}

.clearHistoryAnim {

}

.displayResultHistory {
  align-self: flex-end;
  margin-right:30px;
  margin-bottom: 15px;
}

.displayResultHistory > div > p {
  height: initial;
  padding-top: initial;
  padding-left: initial;
  padding-right: initial;
  margin: initial;
  max-width:initial;
}

.upperResultP {
  margin-bottom: 5px !important;
  border-top: 0.3px solid rgba(153, 153, 153, 0.24);
}

.grid-row-3 {
  grid-row: 3;
}

.grid-row-4 {
  grid-row: 4;
}

.grid-row-5 {
  grid-row: 5;
}

.grid-row-6 {
  grid-row: 6;
}

.grid-row-7 {
  grid-row: 7;
}

.grid-column-1 {
  grid-column: 1;
}

.grid-column-2 {
  grid-column: 2;
}

.grid-column-3 {
  grid-column: 3;
}

.grid-column-4 {
  grid-column: 4;
}

.responsiveWidth {
  width: 14.4em;
  margin-right: 5px;
}



@media screen and (max-width: 600px) {
  .grid-container {
    display: grid;
    gap: 0px;
    grid-template-columns: repeat(4,1fr);
    grid-template-rows: repeat(7,1fr);
    padding: 1px;
    height: 100%;
    width: 100%;
  }

  .container p {
    max-width: 529px;
  }

  .displayResultHistory {
  align-self: flex-end;
  margin-right:20px;
  margin-bottom: 15px;
}

.responsiveWidth {
  width: 13.8em;
  margin-right: 5px;
}

}
/* IPhone X generation */
@media screen and (max-width: 375px) {
  .responsiveWidth {
  width: 14.2em;
  margin-right: 5px;
}
}

/* Samsuns S5 + older */
@media screen and (max-width: 360px) {
  .responsiveWidth {
  width: 13.8em;
  margin-right: 5px;
}
}

</style>