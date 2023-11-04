import { colors } from "../data/constants";

function getColor(index) {
  return `.cards{
    background-color: ${colors[index]};}`;
}

export { getColor };
