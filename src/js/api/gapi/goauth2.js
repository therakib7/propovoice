import api from "api";

const script = document.createElement("script");
script.async = true;
script.defer = true;
script.src = "https://apis.google.com/js/api.js";

document.body.appendChild(script);

// script.addEventListener("load", () => {
//   if (window.gapi) handleClientLoad();
// });

const getCredentials = () => {
  return api.get("settings", "tab=google_api_oauth2").then((resp) => {
    if (resp.data.success) {
      return resp.data.data;
    }
  });
};

const SCOPES =
  "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";

const handleClientLoad = () => {
  window.gapi.load("client:auth2", initClient);
};

function openSignInPopup(credentials) {
  window.gapi.auth2.authorize(
    { client_id: credentials.client_id, scope: SCOPES },
    (res) => {
      if (res) {
        if (res.access_token)
          localStorage.setItem("access_token", res.access_token);

        // Load calendar events after authentication
        // window.gapi.client.load("calendar", "v3", listUpcomingEvents);
        window.gapi.client.load("calendar", "v3", () => {});
      }
    }
  );
}

async function initClient() {
  const credentials = await getCredentials();
  if (!localStorage.getItem("access_token")) {
    openSignInPopup(credentials);
  } else {
    var event = {
      summary: "Google I/O 2015",
      location: "800 Howard St., San Francisco, CA 94103",
      description: "A chance to hear more about Google's developer products.",
      start: {
        dateTime: "2015-05-28T09:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: "2015-05-28T17:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
      attendees: [
        { email: "lpage@example.com" },
        { email: "sbrin@example.com" },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    };

    var request = window.gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    request.execute(function (event) {
      console.log(event.htmlLink);
      appendPre("Event created: " + event.htmlLink);
    });

    // Get events if access token is found without sign in popup
    // const API_KEY = "AIzaSyAZl_Kxf-nYlCdfleqGfRcP2OdOXE44uTo";
    // fetch(
    //   `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${API_KEY}&orderBy=startTime&singleEvents=true`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    //     },
    //   }
    // )
    //   .then((res) => {
    //     // Check if unauthorized status code is return open sign in popup
    //     if (res.status !== 401) {
    //       return res.json();
    //     } else {
    //       localStorage.removeItem("access_token");

    //       openSignInPopup();
    //     }
    //   })
    //   .then((data) => {
    //     if (data?.items) {
    //       console.log(`Events: ${data.items}`);
    //     }
    //   });
  }
}

export { handleClientLoad };
