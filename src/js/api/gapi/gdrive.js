import api from "api";
import { handleSignIn } from "api/gapi/goauth2";

export function uploadToDrive(file, setForm) {
  handleSignIn(() => {
    uploadFile(file, setForm);
  });
}

/**
 * Upload file to Google Drive.
 */
function uploadFile(file, setForm) {
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
    [setForm]
  );
}

export async function deleteFile(fileId) {
  handleSignIn(() => {

    var accessToken = window.gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
    fetch(`https://www.googleapis.com/drive/v2/files/${fileId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    }).then(res => console.log(res));
  })
}

function sendRequest(method, url, body, callback, params = []) {
  var accessToken = window.gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
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

function uploadCallback(setForm, load) {
  const fileId = load.target.response.id;
  // setGdriveFileId(fileId);
  setForm((prev) => ({ ...prev, url: `https://drive.google.com/uc?export=view&id=${fileId}` }));
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
