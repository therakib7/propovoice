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

  var form = new FormData();
  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  form.append("file", file);

  sendRequest(
    "post",
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
    form,
    uploadCallback,
    [setGdriveFileId]
  );
}

function sendRequest(method, url, body, callback, params) {
  var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
  xhr.responseType = "json";
  xhr.onload = (load) => {
    params.push(load);
    callback.apply(this, params);
  };
  xhr.send(body);
}

function uploadCallback(setGdriveFileId, load) {
  const fileId = load.target.response.id;
  setGdriveFileId(fileId);
  console.log("File uploaded successfully");

  const permissionBody = {
    role: "reader",
    type: "anyone",
  };
  sendRequest(
    "post",
    `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`,
    new Blob([JSON.stringify(permissionBody)], { type: "application/json" }),
    permissionCallback,
    [fileId]
  );
}
function permissionCallback(fileId, load) {
  console.log(`The file id ${fileId} is public now!!!`);
}
