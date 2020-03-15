type LerpFunction = (target: number, point: number) => number;

const lerp: LerpFunction = function (target: number, point: number) {
  return (target - point) * 0.2;
};

export default lerp;
