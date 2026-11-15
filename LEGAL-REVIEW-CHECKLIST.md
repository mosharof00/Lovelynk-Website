# LoveLynk Build 3.8 — publication checklist

These comprehensive legal pages are **drafts**, not a legal opinion or a verified account of production processing. Review them before public deployment or App Store/Google Play submission.

- Confirm LoveLynk Ltd registered office and a working privacy contact. A working contact form is necessary for GDPR requests and Google Play's external deletion path.
- Confirm live app account creation, sharing, location, notifications, content, storage, processors (e.g. auth, hosting, analytics, billing), transfers and technical security practices against the policy. Do not claim not-yet-implemented account deletion functionality.
- Confirm and document actual retention and deletion timeframes, and whether account deletion removes shared content and backup copies. Set those timeframes in the published policy when finalised.
- Confirm age eligibility, parental permissions where relevant, Children's Code applicability, and appropriate safeguards. Review special-category user content handling.
- Configure Netlify Forms or an equivalent working endpoint. The contact form currently posts to `/message-sent.html` with `data-netlify=true`; a local HTML preview cannot submit. The deletion form currently routes to the same live contact endpoint.
- Verify the app's in-app deletion workflow and the external website deletion path for Apple/Google requirements. Google Play needs an external deletion URL; use `/account-deletion.html` only after its request mechanism is live.
- Verify Apple/Google subscription prices, availability of 7-day trials, billing disclosures, consumer cancellation information and the updated subscription rules applicable from 1 January 2027. Actual store checkout terms control.
- The Facebook icon from earlier builds has no confirmed social URL and points to the contact page. YouTube is shown as pending; connect only verified profiles.
- Have a UK qualified legal professional review the final Terms and Privacy Policy for the actual product and markets of launch. Some sections describe planned functionality conditionally.

Official guidance: https://ico.org.uk/for-organisations/advice-for-small-organisations/privacy-notices-and-cookies/how-to-write-a-privacy-notice-and-what-goes-in-it/ ; https://developer.apple.com/app-store/review/guidelines/uk/ ; https://support.google.com/googleplay/android-developer/answer/18265346?hl=en-GB
