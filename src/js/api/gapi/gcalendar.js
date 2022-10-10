import { handleSignIn } from "api/gapi/goauth2";
let eventData;
export const createEvent = async (data) => {
  eventData = data;
  await handleSignIn(() => {
    myEvent();
  });
};

const myEvent = async () => {
  const meetingRequestId = crypto.randomUUID();

  event = {
    summary: eventData.summary,
    description: "",
    start: {
      dateTime: eventData.start.dateTime.toISOString(),
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: eventData.end.dateTime.toISOString(),
      timeZone: "America/Los_Angeles",
    },
    attendees: [
      { email: "theazharul@gmail.com" },
      { email: "sbrin@example.com" },
    ],
    conferenceData: {
      createRequest: {
        requestId: meetingRequestId,
        conferenceSolutionKey: {
          type: "hangoutsMeet",
        },
      },
    },
  };

  const request = gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event,
    conferenceDataVersion: 1,
  });

  request.execute((event) => {
    localStorage.setItem("hangoutLink", event.hangoutLink);
  });
};
