import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Alert, Platform } from "react-native";

export default async function downloadFileAndSaveToDevice(
  apiUrl,
  filename,
  ext
) {
  // Check for permissions
  const writeAccessGranted = await getWriteAccess();
  if (writeAccessGranted) {
    // Attempt to download
    try {
      const isSaved = await saveFile(apiUrl, filename, ext);
      if (isSaved) {
        Alert.alert("Afirmativo", "El archivo se encuentra en el dispositivo.");
      } else {
        Alert.alert("Oops", "Ocurrio un error al intentar guardar el archivo");
      }
    } catch (err) {
      console.error(err);
    }
  }
}
async function saveFile(url, filename, ext) {
  filename = filename.replaceAll("/", "");
  filename = encodeURIComponent(filename + "." + ext);
  console.log("this is the path: ", filename);

  const { uri, status } = await FileSystem.downloadAsync(
    url,
    FileSystem.documentDirectory + filename, // target path
    { cache: false } // dont save into the app filesystem
  );
  console.log("File saved into: ", uri);
  if (status === 200) {
    if (Platform.OS === "android") {
      const asset = await MediaLibrary.createAssetAsync(uri);
      const album = await MediaLibrary.getAlbumAsync("NoTubeLibrary");
      console.log("album: ", album);
      if (album == null) {
        await MediaLibrary.createAlbumAsync("NoTubeLibrary", asset, false);
        console.log("Created new album, since it doesnt exist");
        return;
      } else {
        await MediaLibrary.addAssetsToAlbumAsync(asset, album, false);
        console.log("saved file into ", album.title);
      }
    }
    return true;
  } else {
    console.log("status", status);
    return false;
  }
}

async function getWriteAccess() {
  const actualPermissions = await MediaLibrary.getPermissionsAsync();
  console.log("Permisos status: ", actualPermissions);
  if (actualPermissions.status !== "granted") {
    // No writeAccess allowed
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.status !== "granted") {
      Alert.alert(
        "No le has dado a permitir",
        "Esta app necesita que le des acceso a tu libreria de archivos, compañero..."
      );
      return false;
    }
  }
  return true;
}
