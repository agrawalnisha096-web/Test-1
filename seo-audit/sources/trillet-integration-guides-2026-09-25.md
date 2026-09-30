# Integration guides: Google Calendar, GoHighLevel, ServiceTitan

Written against dev, 25 Sep 2026, and audited against the frontend, backend and call-agent source. Three new help-centre pages for Ming to publish, each with a screenshot list.

# Connect Google Calendar

Let your agent check your Google Calendar, book appointments, move them and cancel them during a call. Bookings land on the Google calendar you choose, and the caller gets a Google Calendar invite by email.

## Before you start

- You need a Google account that can edit the calendar you want bookings to go into.
- Connect it from the agent you want to take bookings. Each agent has its own connection, so connecting one agent doesn't connect the others.

## Connect your Google account

1. Open your agent.
2. In the settings list, click Advanced Settings, then Integrations in the menu on the left.
3. Click the Google Calendar tile, then Connect Google Calendar.
4. Sign in to Google and choose the account that owns the calendar.
5. Google asks for permission to see your calendars and to create and edit events. Allow both. Trillet needs them to find free times and to book.
6. You're sent back to your agent and see "Google Calendar connected successfully."

## Choose the calendar and timezone

Signing in doesn't finish the setup. Go back and confirm these settings.

1. Open Advanced Settings → Integrations → Google Calendar again.
2. Select Calendar: pick the calendar appointments should go into. Trillet picks your primary calendar until you change it.
3. Slot Duration (minutes): choose how long each appointment is: 15, 30, 45 or 60 minutes, or type your own length under Custom. The default is 30.
4. Agent Location (Timezone): choose your business's timezone. This is required, and bookings won't work without it. Trillet fills it in from your Google calendar when it can. Check it's right before you save.
5. Under Functions, choose what the agent can do:
   - Check availability: finds free times on the calendar.
   - Book an appointment: creates the event.
   - Reschedule: moves an existing appointment.
   - Cancel: removes an existing appointment.

   Functions marked Added are already on. Click the bin icon to remove one, or tick a function to add it.
6. Optional: fill in what the agent says while it works, for example "One moment, let me check what's available...". There's a field for checking availability, booking, cancelling and rescheduling.
7. Click Save settings, then Publish Changes in the top bar. Your changes don't reach live calls until you publish.

## Change the agent's instructions for each function

Each function comes with Trillet's instructions for when and how the agent uses it. You can edit them.

1. In your agent's settings, under Functions, click a function, for example Check availability.
2. Additional instructions shows Trillet's default instructions for that function. Edit the text to fit how your business works.
3. Use the switch to turn the instructions on or off. Click Reset to go back to Trillet's default. Once you've edited the text, Trillet's future updates to the default won't apply to it until you click Reset.
4. Optional: open What the agent says while this runs to change what the agent says while the function works.
5. Optional, Book an appointment only: under Details to include, list what the agent should collect and write into the Google Calendar event, such as the caller's address or type of service.
6. To take a function away from the agent, click Remove this function.
7. Repeat for each function, then click Publish Changes.

## What happens on a call

- The agent checks the calendar for free time before offering a slot. Any time not already taken by an event counts as free, so block your closed hours in Google Calendar or add your opening hours to the agent's prompt.
- To book, the agent needs the caller's name and email address. It asks for both, and Google emails the caller an invite.
- To move or cancel, the agent finds the appointment from the time the caller gives and their name, email or phone number.

## Test it

1. Make a test call and book an appointment for a time you know is free.
2. Check the event appears in the calendar you chose, at the right local time.
3. Ask to move it, then cancel it, and check the calendar each time.

## Change or disconnect

- To switch to a different Google account, open the Google Calendar settings and click Reconnect.
- To stop the agent booking, click Disconnect. This removes the connection and its calendar settings from this agent only.

## Troubleshooting

- Bookings don't work, or land at the wrong time: check Agent Location (Timezone) is set to your business's timezone. Then click Save settings and Publish Changes.
- Bookings land in the wrong calendar: change Select Calendar, then save and publish.
- The agent offers times when you're closed: block those hours in Google Calendar, or add your opening hours to the agent's prompt.
- The agent uses a function at the wrong moment: open that function, check Additional instructions is switched on, and edit the text. Then publish.
- "Google Calendar connected, but a refresh token was not received": click Disconnect and remove Trillet's access in your Google Account settings. Then connect again.
- "Google Calendar didn't finish connecting": nothing was saved. Try again from the agent's Integrations settings.
- "Please save your flow before connecting Google Calendar": save your agent first, then connect.
- The agent says it can't book, move or cancel: check that function is Added under Functions, then publish.

## For Ming: screenshots

1. Advanced Settings → Integrations showing the Google Calendar tile.
2. The Google Calendar window before connecting, with Connect Google Calendar.
3. Google's permission screen.
4. The connected window showing Select Calendar, Slot Duration, Agent Location (Timezone) and Functions.
5. A function's settings open, showing Additional instructions with Reset and the switch, and What the agent says while this runs.
6. Book an appointment's settings showing Details to include.
7. A booked test event in Google Calendar.

---

# Connect GoHighLevel

Let your agent check your GoHighLevel calendar and book, move and cancel appointments during a call. The agent finds the caller's contact in GoHighLevel, or creates one, and books the appointment against it.

## Before you start

- You need a GoHighLevel login that can access the sub-account you want to book into.
- You need the ID of the GoHighLevel calendar you want to use. The steps below show where to find it.
- Connect it from the agent you want to take bookings. Each agent has its own connection.

## Connect your GoHighLevel account

1. Open your agent.
2. In the settings list, click Advanced Settings, then Integrations in the menu on the left.
3. Click the GoHighLevel tile, then Connect GoHighLevel.
4. Sign in to GoHighLevel and choose the sub-account the agent should work in.
5. Approve the access GoHighLevel asks for. Trillet needs your calendars and contacts to book appointments.
6. You're sent back to your agent and see "GoHighLevel connected successfully."

## Find your Calendar ID

1. Log in to your GoHighLevel sub-account.
2. Go to Settings (bottom left), then Calendars.
3. Find your calendar and click the three-dots menu.
4. Select Share, or the option to copy the link or embed code.
5. Copy the characters at the end of the booking link. In `https://api.leadconnectorhq.com/widget/booking/A1b2C3d4E5f6G7h8`, the ID is `A1b2C3d4E5f6G7h8`.

## Turn on calendar booking

1. Open Advanced Settings → Integrations → GoHighLevel again.
2. Under Features, turn on Calendar Booking. The agent can't do anything in GoHighLevel until this is on.
3. Paste the ID into Calendar ID. Paste only the ID, not the whole link. This is required.
4. Agent Location (Timezone): choose your business's timezone. This is required, and bookings won't work without it. It should match the timezone set on your GoHighLevel calendar.
5. Under Functions, choose what the agent can do: Check availability, Book an appointment, Reschedule and Cancel. Functions marked Added are already on. Click the bin icon to remove one, or tick a function to add it.
6. Optional: fill in what the agent says while it checks availability, books, cancels or reschedules.
7. Click Done, then Publish Changes in the top bar.

## Change the agent's instructions for each function

Each function comes with Trillet's instructions for when and how the agent uses it. You can edit them.

1. In your agent's settings, under Functions, click a function, for example Check availability.
2. Additional instructions shows Trillet's default instructions for that function. Edit the text to fit how your business works.
3. Use the switch to turn the instructions on or off. Click Reset to go back to Trillet's default. Once you've edited the text, Trillet's future updates to the default won't apply to it until you click Reset.
4. Optional: open What the agent says while this runs to change what the agent says while the function works.
5. To take a function away from the agent, click Remove this function.
6. Repeat for each function, then click Publish Changes.

## What happens on a call

- The agent offers times from your GoHighLevel calendar's own availability, so your calendar's opening hours, slot length and booking rules still apply. Change those in GoHighLevel.
- To book, the agent needs the caller's first name, last name and email address. It looks up the caller's contact by email or phone number and creates one if none exists.
- To move or cancel, the agent finds the caller's contact and their appointment first.

## Test it

1. Make a test call and book an appointment.
2. In GoHighLevel, check the appointment appears on the right calendar at the right time, and that the contact exists.
3. Ask to move it, then cancel it, and check GoHighLevel each time.

## Change or disconnect

- To use a different calendar, change Calendar ID and publish.
- To use a different sub-account, click Disconnect, then connect again and choose the other sub-account.
- Disconnect removes the connection and its settings from this agent only.

## Troubleshooting

- Bookings don't work, or slots are at the wrong times: check Agent Location (Timezone) is set and matches your GoHighLevel calendar's timezone, then publish.
- "Calendar ID not found": paste only the ID from the end of the booking link, not the whole link.
- The agent says a slot is unavailable: the agent should always check availability before booking. Make sure Check availability is Added.
- No times are offered: check your GoHighLevel calendar has open hours and team members assigned.
- The agent has no booking abilities: check Calendar Booking is on and a Calendar ID is saved, then publish.
- The agent uses a function at the wrong moment: open that function, check Additional instructions is switched on, and edit the text. Then publish.
- "GoHighLevel didn't finish connecting": nothing was saved. Try again from the agent's Integrations settings.
- "Please save your flow before connecting GoHighLevel": save your agent first, then connect.

## For Ming: screenshots

1. Advanced Settings → Integrations showing the GoHighLevel tile.
2. GoHighLevel's sub-account picker.
3. GoHighLevel Settings → Calendars with the three-dots menu open, and the share link.
4. The connected window with Calendar Booking on, Calendar ID, Agent Location (Timezone) and Functions.
5. A function's settings open, showing Additional instructions with Reset and the switch, and What the agent says while this runs.
6. A booked test appointment in GoHighLevel.

---

# Connect ServiceTitan

Let your agent recognise returning customers, offer appointment times and send bookings into ServiceTitan during a call. By default, bookings go to your office's queue for approval, so nothing lands on a technician's schedule until your team confirms it.

ServiceTitan is being rolled out gradually. If you don't see the ServiceTitan tile, contact support to have it turned on.

## Before you start

You need four values from your ServiceTitan account. Ask your ServiceTitan admin to create them under Settings → Integrations → API Application Access.

- Tenant ID: numbers only, for example 3141592653.
- Application Key: starts with ak1.
- Client ID: starts with cid.
- Client Secret: often starts with cs1.
The API application needs access to ServiceTitan's Settings, CRM, Job Planning & Management, Dispatch, Marketing and Memberships areas. That lets the agent read and create the records below.

## Connect ServiceTitan

1. Open your agent.
2. In the settings list, click Advanced Settings, then Integrations in the menu on the left.
3. Click the ServiceTitan tile. Its settings open below the tiles.
4. Paste in your Tenant ID, Application Key, Client ID and Client Secret.
5. Click Verify & Connect. Trillet checks the details with ServiceTitan and loads your business units, job types and campaigns. Your credentials are stored encrypted.

## Choose what the agent can do

Under Agent permissions, switch each ability on or off. Anything switched off is never offered to the agent.

- Recognize the caller (on by default): matches the caller to their ServiceTitan record by the number they're calling from, so returning customers are greeted by name.
- Offer appointment times (on by default): reads open slots for the selected business unit and job type.
- Take booking requests (on by default): creates a booking request in your ServiceTitan queue for the office to confirm.
- Book directly onto the schedule (off by default): skips the office queue and books the job straight onto the dispatch board.
- Save call notes (on by default): attaches gate codes, access instructions and caller details to bookings.
- Find the account by service address (off by default): looks up the account for the address the caller gives, and only confirms the account name.
- Create jobs (off by default): creates a job with an appointment window, with no technician assigned.
The agent only works with the caller it's speaking to. It never reads out other customers' details, jobs or bookings.

## Change the agent's instructions for each function

Each function comes with Trillet's instructions for when and how the agent uses it. You can edit them.

1. In your agent's settings, under Functions, click a function, for example Take a booking request.
2. Additional instructions shows Trillet's default instructions for that function. Edit the text to fit how your business works.
3. Use the switch to turn the instructions on or off. Click Reset to go back to Trillet's default. Once you've edited the text, Trillet's future updates to the default won't apply to it until you click Reset.
4. Optional: open What the agent says while this runs to change what the agent says while the function works.
5. Repeat for each function, then click Publish Changes.

## Set your booking settings

Under Booking settings:

- Booking window: how far ahead the agent can offer times: the next 3, 7, 14 or 30 days. The default is 7.
- Minimum notice: the earliest slot the agent can offer, counted from the time of the call: no minimum, 2 hours, 4 hours, 1 day or 2 days. The default is 2 hours.
- Business unit: limits availability and bookings to one business unit. Leave it on All business units to use them all.
- Default job type: the job type new bookings use unless the call points to a different one.
- Campaign: the campaign stamped on jobs the agent creates. Leave it on Let Trillet choose if you don't track campaigns.
Then click Publish Changes in the top bar. Changes don't reach live calls until you publish.

## Use booking details in messages and workflows

Under Available in messages & workflows, click a variable such as `{{servicetitan_job_number}}` to copy it. These fill in after each booking, so you can use them in post-call texts, email summaries, webhooks and workflows.

## Test it

1. Click Test to check the connection. You should see "Connection healthy" with the number of business units, job types and campaigns found.
2. Click Live data to see what the agent can read from ServiceTitan.
3. Make a test call from a number that belongs to a customer in ServiceTitan, and ask to book.
4. In ServiceTitan, check the booking request or job appears.

## Disconnect

Click Disconnect and confirm. This removes the saved credentials and booking settings from this agent only.

## Troubleshooting

After any fix to your settings, click Publish Changes so live calls pick it up.

- "Invalid Client ID or Client Secret": copy both again from API Application Access. Check you haven't swapped them.
- "Token accepted but the App Key was rejected": check the Application Key. It starts with ak1.
- "This app is not authorized for that Tenant ID": check the Tenant ID. Then check the app is connected in ServiceTitan under Settings → Integrations → API Application Access.
- "Could not reach ServiceTitan" after Test: the saved credentials may have been revoked. Disconnect and connect again with new credentials.
- A booking fails because a campaign is needed: pick a Campaign in Booking settings, or give the API application access to Marketing.
- A booking fails because a booking provider is needed: some ServiceTitan accounts need a booking provider for new bookings. Contact support to set it up.
- The agent won't book the time the caller asks for: the time is outside your Booking window or inside your Minimum notice. Change them if needed.
- The agent uses a function at the wrong moment: open that function, check Additional instructions is switched on, and edit the text. Then publish.
- The ServiceTitan tile is missing: ServiceTitan isn't turned on for your workspace yet. Contact support.

## For Ming: screenshots

1. Advanced Settings → Integrations showing the ServiceTitan tile.
2. The connect form with the four fields and Verify & Connect.
3. ServiceTitan's API Application Access page.
4. The connected panel showing Agent permissions and Booking settings.
5. A function's settings open, showing Additional instructions with Reset and the switch, and What the agent says while this runs.
6. The Live data window.
