import { getAppEnv } from "./env";

/**
 * Redesign rollout flags.
 *
 * While the redesign/v2 branch is live, individual sections can be swapped
 * behind flags so we can preview each change in isolation if needed. The
 * defaults assume "redesign on" — the branch is the redesign, after all.
 */
export const flags = {
  /** Use the redesigned header. */
  redesignHeader: true,
  /** Use the redesigned homepage sections. */
  redesignHome: true,
  /** Use the redesigned shop grid. */
  redesignShop: true,
  /** Use the redesigned product detail page. */
  redesignProductDetail: true,
  /** Use the redesigned cart / checkout UI (payment logic preserved). */
  redesignCart: true,
  redesignCheckout: true,
  /** Allow order submission (false on preview so we cannot place real orders). */
  allowOrderSubmit: getAppEnv() === "production",
  /** Allow newsletter signup writes. */
  allowNewsletterSignup: getAppEnv() === "production",
  /** Allow review submission. */
  allowReviewSubmit: getAppEnv() === "production",
} as const;

export type FeatureFlag = keyof typeof flags;
