/**
 * Runtime environment helpers.
 *
 * Used by the redesign branch to gate write paths (order creation, payment
 * gateway init, etc.) on preview deployments so that reviewing the new UI
 * against the production Appwrite project is safe.
 */

export type AppEnv = "production" | "preview" | "development";

export function getAppEnv(): AppEnv {
  const explicit = process.env.NEXT_PUBLIC_ENV;
  if (explicit === "preview" || explicit === "development" || explicit === "production") {
    return explicit;
  }
  if (process.env.NODE_ENV === "production") return "production";
  return "development";
}

export const isProduction = () => getAppEnv() === "production";
export const isPreview = () => getAppEnv() === "preview";
export const isDevelopment = () => getAppEnv() === "development";

/**
 * True when the UI should block destructive / outbound operations so the
 * preview branch does not mutate production data or trigger real emails /
 * payment flows.
 */
export const isWriteSafeEnv = () => isProduction();
