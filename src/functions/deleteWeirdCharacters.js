const deleteWeirdCharacters = (texto) => {
  const vocalesAcentuadas = "áéíóúüÁÉÍÓÚÜ";
  const vocalesSinAcentuar = "aeiouuAEIOUU";
  const letraEspecial = "ñ";
  const letraNormal = "n";

  const regex = new RegExp(`[${vocalesAcentuadas}${letraEspecial}]`, "g");
  const reemplazos = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    ü: "u",
    Á: "A",
    É: "E",
    Í: "I",
    Ó: "O",
    Ú: "U",
    Ü: "U",
    ñ: "n",
  };

  return texto.replace(regex, (letra) => reemplazos[letra]);
};

export { deleteWeirdCharacters };
