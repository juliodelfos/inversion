import { supabase } from "../supabase";

const uploadFileToSupabase = async (pathFile, file) => {
  try {
    const { data, error } = await supabase.storage
      .from("fiscalizaciones")
      .upload(pathFile, file[0].file);

    if (error) {
      console.error("Error uploading file:", error.message);
      return null; // Return null in case of error
    }

    return data;
  } catch (error) {
    console.error("Unexpected error uploading file:", error.message);
    return null; // Return null in case of unexpected error
  }
};

export { uploadFileToSupabase };
