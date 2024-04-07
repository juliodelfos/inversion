const formateDate = (date) => {
  const fecha = new Date(date);
  // console.log(fecha);
  const year = fecha.getFullYear();
  const month = fecha.getMonth() + 1; // Los meses van de 0 a 11, por lo que se suma 1
  const day = fecha.getDate();
  const hour = fecha.getHours();
  const minute = fecha.getMinutes();
  // const seconds = fecha.getSeconds();

  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }T${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}:00`;
};

export { formateDate };
