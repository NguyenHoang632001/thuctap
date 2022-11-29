export const builDataSelect = (arr, type) => {
  switch (type) {
    case "PROVINCE":
      return arr.map((item) => ({
        value: item.id,
        label: item.provinceName,
      }));
    case "DISTRICT":
      return arr.map((item) => ({
        value: item.id,
        label: item.districtName,
      }));
    case "WARD":
      return arr.map((item) => ({
        value: item.id,
        label: item.wardName,
      }));

    default:
      break;
  }
};
