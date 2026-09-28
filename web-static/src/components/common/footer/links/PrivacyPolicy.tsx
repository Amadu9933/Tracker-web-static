import React from 'react';

const PrivacyPolicy: React.FC = () => (
<div className="mx-auto mt-16 w-full max-w-6xl px-4 py-10 sm:px-6 md:px-8 md:py-14">
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-[28px]">
{/* Header */}
<div className="border-b border-slate-200 bg-slate-50 px-5 py-7 sm:px-8 sm:py-8 md:px-10">
  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600 sm:text-sm sm:tracking-[0.22em]">
    Privacy Policy
  </p>

  <h1 className="mt-3 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl md:text-4xl">
    Your privacy matters to us
  </h1>

  <p className="mt-3 text-sm leading-6 text-slate-600">
    Last updated: September 2026
  </p>
</div>

{/* Content */}
<div className="space-y-8 px-5 py-7 text-sm leading-7 text-slate-700 sm:px-8 sm:py-9 md:px-10 md:py-10">

  {/* Introduction */}
  <section>
    <p>
      TrackerrGo respects your privacy and is committed to protecting your
      personal data. This Privacy Policy explains how we collect, use,
      manage, store, and protect information when you use TrackerrGo.
    </p>

    <p className="mt-3">
      We do not sell your personal data. We use information only where
      necessary to provide our services, maintain security, communicate
      with users, and improve TrackerrGo.
    </p>
  </section>

  {/* Information We Collect */}
  <section>
    <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
      1. Information We Collect
    </h2>

    <p className="mt-3">
      Depending on how you use TrackerrGo, we may collect:
    </p>

    <ul className="mt-3 list-disc space-y-2 pl-5">
      <li>
        Name, phone number, and email address.
      </li>
      <li>
        Delivery information such as delivery addresses, customer
        and rider information.
      </li>
      <li>
        Rider location data, including GPS coordinates, when location
        sharing has been authorised.
      </li>
      <li>
        Device and technical information required to operate, secure,
        and improve our services.
      </li>
      <li>
        Information you voluntarily provide when contacting us or using
        our services.
      </li>
    </ul>
  </section>

  {/* How We Use Data */}
  <section>
    <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
      2. How We Use Your Data
    </h2>

    <p className="mt-3">
      We use personal data for purposes such as:
    </p>

    <ul className="mt-3 list-disc space-y-2 pl-5">
      <li>Providing real-time parcel tracking.</li>
      <li>Connecting customers with delivery riders during deliveries.</li>
      <li>Sending delivery notifications and service communications.</li>
      <li>Operating, maintaining, and securing TrackerrGo.</li>
      <li>Providing customer support.</li>
      <li>Detecting and preventing fraud, abuse, and unauthorised access.</li>
      <li>Improving the reliability and performance of our services.</li>
    </ul>
  </section>

  {/* Rider Location */}
  <section className="rounded-xl border border-orange-100 bg-orange-50/50 p-5 sm:p-6">
    <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
      3. Rider Location Data
    </h2>

    <p className="mt-3">
      TrackerrGo collects rider location data solely to provide real-time
      delivery location communication and tracking.
    </p>

    <p className="mt-3">
      Before collecting a rider's location, TrackerrGo requests permission
      from the rider. Location data is collected only after the rider
      authorises location access.
    </p>

    <p className="mt-3">
      When location access is granted, TrackerrGo may collect and share the rider's location in the background, including when the app is minimised or not actively displayed on the screen. This is necessary to maintain continuous location updates during an active delivery, as foreground-only location access may stop providing regular location updates when the app is minimised.
    </p>

    <p className="mt-3">
      Rider location allows authorised customers to see the rider's position while a delivery is being tracked. We do not use rider location data for advertising, unrelated profiling, or purposes unrelated to delivery tracking.
    </p>

    <p className="mt-3">
      Riders can control location permissions through their device settings. Disabling background location access may prevent continuous real-time tracking features from functioning.
    </p>
  </section>

  {/* Consent */}
  <section>
    <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
      4. Consent
    </h2>

    <p className="mt-3">
      Where consent is required, we ask for consent before collecting or
      processing personal data. You may withdraw consent where processing
      is based on consent, although doing so may affect features that
      depend on that information.
    </p>
  </section>

  {/* Data Management */}
  <section>
    <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
      5. How We Manage and Protect Your Data
    </h2>

    <p className="mt-3">
      We collect and retain only information that is reasonably necessary
      to provide our services. We use appropriate technical and
      organisational measures to protect personal data against
      unauthorised access, disclosure, alteration, loss, or misuse.
    </p>

    <p className="mt-3">
      Access to personal data is limited to authorised users, personnel,
      and service providers who need the information to operate TrackerrGo.
    </p>
  </section>

  {/* Data Sharing */}
  <section>
    <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
      6. Data Sharing
    </h2>

    <p className="mt-3">
      We do not sell personal data. We may share necessary information
      with trusted service providers that help us operate TrackerrGo,
      including providers for hosting, messaging, email, mapping, and
      infrastructure.
    </p>

    <p className="mt-3">
      We may also disclose information where required by applicable law
      or where necessary to protect the security, rights, or property of
      TrackerrGo, our users, or others.
    </p>
  </section>

  {/* Data Retention */}
  <section>
    <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
      7. Data Retention
    </h2>

    <p className="mt-3">
      We retain personal data only for as long as reasonably necessary to
      provide our services, meet legal or operational requirements,
      resolve disputes, and maintain security.
    </p>

    <p className="mt-3">
      When information is no longer required, we may securely delete or
      anonymise it.
    </p>
  </section>

  {/* User Rights */}
  <section>
    <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
      8. Your Privacy Rights
    </h2>

    <p className="mt-3">
      Subject to applicable law, you may have the right to:
    </p>

    <ul className="mt-3 list-disc space-y-2 pl-5">
      <li>Know how your personal data is being used.</li>
      <li>Request access to your personal data.</li>
      <li>Request correction of inaccurate information.</li>
      <li>Request deletion of personal data where applicable.</li>
      <li>Object to or restrict certain processing.</li>
      <li>Withdraw consent where processing is based on consent.</li>
      <li>Raise a concern about how your personal data is handled.</li>
    </ul>
  </section>

  {/* Changes */}
  <section>
    <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
      9. Changes to This Policy
    </h2>

    <p className="mt-3">
      We may update this Privacy Policy when our services or legal
      requirements change. Any updated version will be published on this
      page with a revised date.
    </p>
  </section>

  {/* Contact */}
  <section className="border-t border-slate-200 pt-7">
    <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
      10. Contact Us
    </h2>

    <p className="mt-3">
      If you have questions about this Privacy Policy, your personal data,
      or how TrackerrGo handles your information, please contact us.
    </p>

    <div className="mt-4 rounded-xl bg-slate-50 p-4 sm:p-5">
      <p className="font-semibold text-slate-900">
        TrackerrGo
      </p>

      <p className="mt-1">
        Email:{' '}
        <a
          href="mailto:support@trackerrgo.com"
          className="font-medium text-orange-600 hover:text-orange-700 hover:underline"
        >
          support@trackerrgo.com
        </a>
      </p>
    </div>
  </section>

</div>
  </div>
</div>

);

export default PrivacyPolicy;
