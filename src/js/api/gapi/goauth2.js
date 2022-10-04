import api from "api";

let tokenClient;

const loadScript = (file) => {
  const script = document.createElement("script");
  script.async = true;
  script.defer = true;
  script.src = file;
  document.body.appendChild(script);

  script.addEventListener("load", () => {
    if (typeof gapi !== "undefined") gapiLoaded();
    if (typeof google !== "undefined") gisLoaded();
  });
};

loadScript("https://apis.google.com/js/api.js");
loadScript("https://accounts.google.com/gsi/client");

const getCredentials = () => {
  return api.get("settings", "tab=google_api_oauth2").then((resp) => {
    if (resp.data.success) {
      return resp.data.data;
    }
  });
};
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

const SCOPES =
  "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";

function gapiLoaded() {
  gapi.load("client", initializeGapiClient);
}

async function initializeGapiClient() {
  const credentials = await getCredentials();
  await gapi.client.init({
    apiKey: credentials.api_key,
    discoveryDocs: [DISCOVERY_DOC],
  });
}

async function gisLoaded() {
  const credentials = await getCredentials();
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: credentials.client_id,
    scope: SCOPES,
    callback: "", // defined later
  });
}

function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw resp;
    }
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

export { handleAuthClick };
