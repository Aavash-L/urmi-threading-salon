import os from "node:os";
import path from "node:path";

// Every test run uses the test sink: nothing reaches Supabase, Resend, Telegram or web push.
process.env.BOOKING_TEST_SINK = path.join(os.tmpdir(), `urmi-booking-sink-${process.pid}.json`);
delete process.env.RESEND_API_KEY;
delete process.env.TELEGRAM_BOT_TOKEN;
delete process.env.VAPID_PRIVATE_KEY;
