import api from "api";
import { handleSignIn } from "api/gapi/goauth2";
let eventData;
let hangoutLink;

export const createEvent = (data) => {
  eventData = data;
  handleSignIn(myEvent);
  return hangoutLink;
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
    attendees: eventData.attendees,
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
    eventData.form.google_meet = event.hangoutLink;
    api
      .edit(eventData.type, eventData.form.id, eventData.form)
      .then((resp) => {});
    // localStorage.setItem("hangoutLink", event.hangoutLink);
    // hangoutLink = event.hangoutLink;
  });
};
