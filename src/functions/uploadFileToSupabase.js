import { supabase } from "../supabase";

const uploadFileToSupabase = async (pathFile, file) => {
  try {
    // console.log(`file: ${file[0].file}, pathFile: ${pathFile}`);
    const { data, error } = await supabase.storage
      .from("fiscalizaciones")
      .upload(pathFile, file[0].file);

    if (error) {
      console.error("Error uploading file: ", error.message);
      return;
    }

    console.log("File uploaded: ", data);
    return data;
  } catch (error) {
    console.error("Error uploading file: ", error.message);
    return;
  }
};

export { uploadFileToSupabase };
