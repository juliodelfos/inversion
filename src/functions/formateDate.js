const formateDate = (date) => {
  const fecha = new Date(date);
  // console.log(fecha);
  const year = fecha.getFullYear();
  const month = fecha.getMonth() + 1; // Los meses van de 0 a 11, por lo que se suma 1
  const day = fecha.getDate();
  const hour = fecha.getHours();
  const minute = fecha.getMinutes();
  const seconds = fecha.getSeconds();

  return `${year}-${month}-${day}T${hour}:${minute}:${seconds}`;
};

export { formateDate };
