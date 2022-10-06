import { handleSignIn } from "api/gapi/goauth2";

export const createEvent = () => {
  handleSignIn(() => {
    myEvent();
  });
};

const myEvent = async () => {
  const meetingRequestId = crypto.randomUUID();
  event = {
    summary: "Google I/O 2015",
    // location: "800 Howard St., San Francisco, CA 94103",
    description: "A chance to hear more about Google's developer products.",
    start: {
      dateTime: "2022-10-07T09:00:00-07:00",
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: "2022-10-07T17:00:00-07:00",
      timeZone: "America/Los_Angeles",
    },
    // recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
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
    // reminders: {
    //   useDefault: false,
    //   overrides: [
    //     { method: "email", minutes: 24 * 60 },
    //     { method: "popup", minutes: 10 },
    //   ],
    // },
  };

  const request = await gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });
  console.log(request);
  // request.execute(function (event) {
  //   console.log(event);
  //   appendPre("Event created: " + event.htmlLink);
  // });
};
