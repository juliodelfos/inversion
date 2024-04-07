import { supabase } from "../supabase";

const uploadFileToSupabase = async (file, pathFile) => {
  const { photos } = file;
  const { data, error } = await supabase.storage
    .from("InspectionsPhotos")
    .upload(pathFile, photos[0].file);

  if (error) {
    console.error("Error uploading file: ", error.statusCode);
    return;
  }
  return data;
  // console.log("File uploaded: ", data);
};

export { uploadFileToSupabase };
