// You can also use ESM `import * as Sentry from "@sentry/node"` instead of `require`
const Sentry = require("@sentry/node");
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://042c65d1796f38ac3ee550c936674a4e@o4507014384451584.ingest.us.sentry.io/4507014385827840",
  integrations: [
    nodeProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});