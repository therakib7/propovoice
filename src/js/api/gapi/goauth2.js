import api from "api";

import { toast } from "react-toastify";

let tokenClient;
let gapiInited = false;
let gisInited = false;

const loadScript = (id, file, callAfterLoad) => {
  const script = document.createElement("script");
  script.async = true;
  script.defer = true;
  script.src = file;
  script.id = id;
  script.onload = callAfterLoad;
  document.body.appendChild(script);
};

const getOAuth2Data = async () => {
  return api.get("settings", "tab=google_api_oauth2").then((resp) => {
    if (
      resp.data.success &&
      resp.data.data.client_id !== "" &&
      resp.data.data.api_key !== ""
    ) {
      localStorage.setItem("g_client_id", resp.data.data.client_id);
      localStorage.setItem("g_api_key", resp.data.data.api_key);
    } else {
      toast.error("Please setup Google Client ID and Api key in Settings!");
      throw new Error("Please setup Google Client ID and Api key in Settings!");
    }
  });
};

function gapiLoaded() {
  window.gapi.load("client:auth2", initializeGapiClient);
}

async function initializeGapiClient() {
  const API_KEY = localStorage.getItem("g_api_key");

  const DISCOVERY_DOC =
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

  await window.gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
}

function gisLoaded() {
  const CLIENT_ID = localStorage.getItem("g_client_id");

  const SCOPES =
    "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file";

  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: "", // defined later
  });
  gisInited = true;
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function handleSignIn(myRequest) {
  await getOAuth2Data();
  loadScript("gapi", "https://apis.google.com/js/api.js", gapiLoaded);
  loadScript("gsi", "https://accounts.google.com/gsi/client", gisLoaded);
  await wait(500);
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw resp;
    }
    await myRequest();
  };
  if (window.gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    await tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    await tokenClient.requestAccessToken({ prompt: "" });
  }
}

export { handleSignIn, getOAuth2Data };
