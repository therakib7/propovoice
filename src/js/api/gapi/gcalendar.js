import { handleSignIn } from "api/gapi/goauth2";
let eventData;

export const createEvent = (data, updateGoogleMeet) => {
  eventData = data;
  handleSignIn(() => {
    myEvent(updateGoogleMeet);
  });
};

const myEvent = async (updateGoogleMeet) => {
  const meetingRequestId = crypto.randomUUID();

  const event = {
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
    updateGoogleMeet(event.hangoutLink);
  });
};
