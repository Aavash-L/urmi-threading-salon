# Owner-Run Operational Test

These checks involve real calls and real messages, so they are for the salon owner
(or someone they designate) to run. They were **not** run during implementation.
Use a personal phone that is not the salon's, and note the date/time of each step.

## A. Automated receptionist — (973) 653-9322

| # | Call and ask | Expected | Result / notes |
|---|---|---|---|
| 1 | "How much is eyebrow threading?" | Matches the site: starts at $10 | |
| 2 | "How much is a full face?" / "a Brazilian?" | $35 / $45 starting prices | |
| 3 | "What are your hours today?" | Mon–Wed 10–6:30, Thu–Fri 10–7, Sat 10–6, Sun 11–5 (or approved newer hours) | |
| 4 | "Do you take walk-ins?" | Yes, during salon hours | |
| 5 | "Can I book for Saturday at 2?" | Explains how appointments are arranged; does not promise a slot it cannot confirm | |
| 6 | "I'd like to talk to someone." | Transfers to a person, or explains clearly when no one is available | |
| 7 | Call during open hours, ask for a person, and stay on | Note how long the transfer takes and what happens if nobody answers | |
| 8 | Call after hours | Caller hears the correct hours and a clear next step (message, callback, or call back later) | |
| 9 | Ask about offers / gift cards / loyalty cards | Answers match what the salon actually offers | |

Record any answer that disagrees with the website so either the receptionist script
or `src/lib/constants.ts` / `src/lib/catalog.ts` can be corrected.

## B. Online appointment request — real delivery

Do this once after each deployment that touches booking.

1. On the live site, open **Request an Appointment** and submit a request with your own
   name, your phone number, and (once) your email; put "TEST – please ignore" in Notes.
2. Confirm the page says **"Appointment Request Received"** and "not confirmed yet".
3. Confirm staff received it on every configured channel within a few minutes:
   - salon email (`urmithreadingandbeautysalon@gmail.com`)
   - Telegram (if configured)
   - admin web-push alert on the staff device (if enabled)
4. Open `/admin`: the request shows as **Pending** with the right service, date and time.
5. If you gave an email: the acknowledgement says the request is **not confirmed yet**.
6. In `/admin`, press **Confirm**. The status becomes Confirmed; with an email, a
   "Your appointment is confirmed" message arrives.
7. Press **Cancel** on the test request so it no longer holds the time.
8. Repeat step 1 without an email to confirm email is optional.

If step 2 shows success but step 3 finds nothing on any channel, stop taking online
requests (call-only) and report it — the site is designed to show an error instead.

## C. Numbers to compare monthly

- Calls from the website (`call_click` events, once an analytics tool is connected) —
  a tap is not a completed call; compare with the phone system's call log.
- Online requests received (admin dashboard) vs. requests confirmed vs. no-shows.
