import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabin not found");
  }

  return data;
}

export async function createAndEidtCabin(newCabin, id) {
  //image storage example: https://koliplszxmmpbmlktoqv.supabase.co/storage/v1/object/public/cabin-images/cabin_001.jpg

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  //1.创建新的cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //2.修改现有的cabin
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Could not create");
  }

  //upload image

  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //Delete the cabin if there was an erropr uploading image

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Image uploading Error");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Could not delete");
  }

  return data;
}
