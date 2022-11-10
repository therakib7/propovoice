import api from "api";
import { handleSignIn } from "api/gapi/goauth2";

export function uploadToDrive(file, setGdriveFileId) {
  handleSignIn(() => {
    uploadFile(file, setGdriveFileId);
  });
}

/**
 * Upload file to Google Drive.
 */
async function uploadFile(file, setGdriveFileId) {
  var metadata = {
    name: file.name, //Filename at Google Drive
    mimeType: "image/*", // mimeType at Google Drive
  };

  var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
  var form = new FormData();
  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  form.append("file", file);

  var xhr = new XMLHttpRequest();
  xhr.open(
    "post",
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id"
  );
  xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
  xhr.responseType = "json";
  xhr.onload = (load) => {
    setGdriveFileId(load.target.response.id);
    console.log("File uploaded successfully");
  };
  xhr.send(form);
}
