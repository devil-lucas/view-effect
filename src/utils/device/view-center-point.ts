interface DeviceViewCenterPointFunctionReturn {
  x: number;
  y: number;
}

type DeviceViewCenterPointFunction = () => DeviceViewCenterPointFunctionReturn;

const viewCenterPoint: DeviceViewCenterPointFunction = function () {
  const { innerWidth, innerHeight } = window;

  return {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };
};

export default viewCenterPoint;
