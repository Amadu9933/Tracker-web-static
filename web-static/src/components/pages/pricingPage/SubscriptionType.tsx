import { Check, Crown, Sparkles } from "lucide-react";

const payuFeatures = [
  "Pay only when you generate a tracking link",
  "No monthly subscription",
  "Real-time parcel tracking",
  "Live rider location updates",
  "Customer tracking notifications",
  "Delivery history and tracking records",
];

const premiumFeatures = [
  "Real-time parcel tracking",
  "Live rider location updates",
  "Customer tracking notifications",
  "Delivery history and tracking records",
  "Unlimited tracking generation",
  "Unlimited active deliveries",
  "Advanced delivery analytics",
  "Custom branded tracking pages",
  "SMS notifications",
  "Whatsapp tracking updates",
  "Multiple team members",
  "API access and integrations",
  "Priority customer support",
];

export default function SubscriptionType() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">
            Simple pricing that grows with you
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Start with PAYU and pay only for what you use. As your delivery
            operations grow, Premium will unlock powerful tools for scaling
            businesses.
          </p>
        </div>


        {/* Pricing Cards */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">

          {/* PAYU */}
          <div className="relative rounded-3xl border border-[#C75B12] bg-gradient-to-br from-[#2b1d14] via-zinc-900 to-zinc-900 p-8 shadow-[0_20px_70px_rgba(199,91,18,.15)]">

            <div className="absolute right-6 top-6 rounded-full bg-[#C75B12] px-3 py-1 text-xs font-bold text-white">
              AVAILABLE NOW
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C75B12]/20">
                <Sparkles className="text-[#F5A25D]" size={22} />
              </div>

              <h2 className="text-2xl font-bold text-white">
                PAYU
              </h2>
            </div>


            <p className="mt-5 text-zinc-400">
              Flexible tracking payment for businesses that want to pay only
              when they ship.
            </p>


            <div className="mt-8">
              <span className="text-5xl font-black text-white">
                ₦150
              </span>

              <span className="ml-2 text-zinc-500">
                / tracking generated
              </span>
            </div>


            <div className="mt-8 space-y-4">
              {payuFeatures.map((feature) => (
                <div
                  key={feature}
                  className="flex gap-3 text-zinc-300"
                >
                  <Check
                    size={19}
                    className="mt-0.5 text-[#E97B2D]"
                  />

                  <span>{feature}</span>
                </div>
              ))}
            </div>


            <div className="mt-10 rounded-2xl bg-[#C75B12]/10 p-4">
              <p className="font-semibold text-white">
                Perfect for small and growing businesses
              </p>

              <p className="mt-1 text-sm text-zinc-400">
                No monthly fees. No commitments. Pay only when you create a
                tracking experience for your customers.
              </p>
            </div>

          </div>



          {/* PREMIUM */}
          <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

            <div className="absolute right-6 top-6 rounded-full bg-zinc-800 px-3 py-1 text-xs font-bold text-zinc-300">
              COMING SOON
            </div>


            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
                <Crown className="text-amber-400" size={22} />
              </div>

              <h2 className="text-2xl font-bold text-white">
                PREMIUM
              </h2>
            </div>


            <p className="mt-5 text-zinc-400">
              Designed for logistics companies that need unlimited tracking
              capacity and advanced business tools.
            </p>


            <div className="mt-8">
              <span className="text-5xl font-black text-white">
                ₦75,000
              </span>

              <span className="ml-2 text-zinc-500">
                / month
              </span>
            </div>


            <div className="mt-8 space-y-4">
              {premiumFeatures.map((feature) => (
                <div
                  key={feature}
                  className="flex gap-3 text-zinc-300"
                >
                  <Check
                    size={19}
                    className="mt-0.5 text-amber-400"
                  />

                  <span>{feature}</span>
                </div>
              ))}
            </div>


            <div className="mt-10 rounded-2xl border border-dashed border-zinc-700 p-4">
              <p className="font-semibold text-white">
                Premium is coming soon 🚀
              </p>

              <p className="mt-1 text-sm text-zinc-400">
                We are building advanced features for larger logistics teams.
                Existing PAYU users will be able to upgrade when it launches.
              </p>
            </div>

          </div>

        </div>


        {/* Footer */}
        <p className="mt-12 text-center text-sm text-zinc-500">
          Pay As You Use (PAYU) is the default plan available today. You can continue using it
          without switching to a subscription.
        </p>

      </div>
    </section>
  );
}