/**
 * Upload file to Google Drive.
 */
async function uploadFile() {
  var fileContent = "Hello World"; // As a sample, upload a text file.
  var file = new Blob([fileContent], { type: "text/plain" });
  var metadata = {
    name: "sample-file-via-js", // Filename at Google Drive
    mimeType: "text/plain", // mimeType at Google Drive
    // TODO [Optional]: Set the below credentials
    // Note: remove this parameter, if no target is needed
    parents: ["SET-GOOGLE-DRIVE-FOLDER-ID"], // Folder ID at Google Drive which is optional
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
  xhr.onload = () => {
    document.getElementById("content").innerHTML =
      "File uploaded successfully. The Google Drive file id is <b>" +
      xhr.response.id +
      "</b>";
    document.getElementById("content").style.display = "block";
  };
  xhr.send(form);
}
