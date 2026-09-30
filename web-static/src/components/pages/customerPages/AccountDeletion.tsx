export default function DeleteAccount() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-gray-900 mt-10">
            TrackerrGo Data Deletion
          </h1>

          <p className="mt-3 text-gray-600">
            Request deletion of your TrackerrGo account and personal data.
          </p>
        </header>

        {/* Main deletion request */}
        <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900">
            How to request data deletion
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            If you would like to delete your TrackerrGo account and associated
            personal data, send an email to: <a
            href="mailto:support@trackerrgo.com?subject=TrackerrGo%20Data%20Deletion%20Request"
            className="text-orange-600"
          >
            support@trackerrgo.com
          </a>
          </p>

          <div className="mt-6 rounded-lg bg-gray-50 p-4">
            <p className="text-sm leading-6 text-gray-600">
              Please use the subject{" "}
              <strong>"TrackerrGo Data Deletion Request"</strong> and include
              the email address or phone number associated with your TrackerrGo
              account. This helps us verify your account and process your
              request.
            </p>
          </div>
        </section>

        {/* What gets deleted */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Data that will be deleted
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Subject to applicable legal and regulatory requirements, we will
            delete personal data associated with your TrackerrGo account,
            including:
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-gray-600">
            <li>Account and profile information</li>
            <li>Contact information</li>
            <li>Rider profile information</li>
            <li>Rider location information associated with your account</li>
            <li>Delivery and tracking information associated with your account</li>
            <li>Other personal information that is no longer required</li>
          </ul>
        </section>

        {/* Data that may be retained */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Data that may be retained
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Some information may need to be retained where necessary to:
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-gray-600">
            <li>Comply with legal or regulatory obligations</li>
            <li>Resolve disputes</li>
            <li>Prevent fraud or abuse</li>
            <li>Maintain security records</li>
            <li>Meet accounting or other legitimate business requirements</li>
          </ul>

          <p className="mt-4 leading-7 text-gray-600">
            Information retained for these purposes will only be kept for as
            long as necessary to fulfill the applicable legal or business
            requirement.
          </p>
        </section>

        {/* Verification and processing */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900">
            What happens after you contact us?
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-5 leading-7 text-gray-600">
            <li>We receive your deletion request.</li>
            <li>
              We verify that you own or control the TrackerrGo account.
            </li>
            <li>
              We process the request and delete data that is not required to
              be retained.
            </li>
            <li>
              We may contact you if additional information is required to
              verify your request.
            </li>
          </ol>

          <p className="mt-5 leading-7 text-gray-600">
            We will process verified deletion requests within the timeframe
            required by applicable law.
          </p>
        </section>

        {/* Privacy policy */}
        <section className="mt-6 rounded-2xl bg-white p-6 text-center shadow-sm sm:p-8">
          <p className="text-sm text-gray-600">
            For more information about how TrackerrGo collects and uses
            personal data, please review our{" "}
            <a
              href="/privacy-policy"
              className="font-medium text-orange-600 hover:underline"
            >
              Privacy Policy
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}