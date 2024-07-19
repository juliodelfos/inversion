import { Persona, RUT, City, Company, Age, Woman, Man } from "../utils/svgs";

const fromObject2Array = (data) => {
  const formatRUT = (rut) => (rut.charAt(0) === "0" ? rut.slice(1) : rut);

  const resultado = [
    {
      tag: "Nombre completo",
      value: `${data.Nombres} ${data.Paterno} ${data.Materno}`,
      path: Persona(),
      iconClass: "icon-tabler-user-scan",
    },
    {
      tag: "RUT",
      value: formatRUT(data.RUT),
      path: RUT(),
      iconClass: "icon-tabler-id",
    },
    {
      tag: "Comuna",
      value: data.Comuna,
      path: City(),
      iconClass: "icon-tabler-map-pin",
    },
    {
      tag: "Ejecutora",
      value: data.Ejecutor,
      path: Company(),
      iconClass: "icon-tabler-building-estate",
    },
    {
      tag: "Edad",
      value: data.Edad,
      path: Age(),
      iconClass: "icon-tabler-cake",
    },
    {
      tag: "Género",
      value: data.Sexo === "F" ? "Femenino" : "Masculino",
      path: data.Sexo === "F" ? Woman() : Man(),
      iconClass: data.Sexo === "F" ? "icon-tabler-woman" : "icon-tabler-man",
    },
  ];
  return resultado;
};

export { fromObject2Array };
