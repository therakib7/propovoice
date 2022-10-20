import api from "api";

let tokenClient;

const loadScript = (id, file, callAfterLoad) => {
  const script = document.createElement("script");
  script.async = true;
  script.defer = true;
  script.src = file;
  script.id = id;
  script.onload = callAfterLoad;
  document.body.appendChild(script);
};

loadScript("gapi", "https://apis.google.com/js/api.js", gapiLoaded);
loadScript("gsi", "https://accounts.google.com/gsi/client", gisLoaded);

(() => {
  return api.get("settings", "tab=google_api_oauth2").then((resp) => {
    if (resp.data.success) {
      localStorage.setItem("g_client_id", resp.data.data.client_id);
      localStorage.setItem("g_api_key", resp.data.data.api_key);
    }
  });
})();

const CLIENT_ID = localStorage.getItem("g_client_id");
const API_KEY = localStorage.getItem("g_api_key");

const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

const SCOPES =
  "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";

function gapiLoaded() {
  gapi.load("client:auth2", initializeGapiClient);
}

async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
}

async function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: "", // defined later
  });
}

async function handleSignIn(myRequest) {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw resp;
    }
    await myRequest();
  };

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({ prompt: "" });
  }
}

export { handleSignIn };
