

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(96,165,250,0.16),_transparent_24%)]" />
        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16 sm:px-10 lg:px-12">
          <header className="mb-12 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-amber-300/80">Barber Booking</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Fresh cuts. Easy booking.
              </h1>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 shadow-lg shadow-slate-950/20">
              Open Mon–Sat 9am–7pm
            </div>
          </header>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
                Book a premium barber experience in seconds. Browse services, pick a stylist, and lock in your next appointment with a clean, modern booking flow.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="#"
                  className="inline-flex w-full items-center justify-center rounded-full bg-amber-400 px-8 py-4 text-base font-semibold text-slate-950 transition hover:bg-amber-300 sm:w-auto"
                >
                  Book your cut
                </a>
                <a
                  href="#services"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base text-slate-100 transition hover:bg-white/10 sm:w-auto"
                >
                  View services
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.8)] backdrop-blur">
              <div className="space-y-6">
                <div className="flex items-center justify-between rounded-3xl bg-slate-950/80 p-5">
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Your next look</p>
                    <p className="mt-2 text-2xl font-semibold text-white">Style your appointment</p>
                  </div>
                  <div className="h-16 w-16 rounded-3xl bg-amber-300/20 p-3 text-amber-300">✂️</div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-950/80 p-5">
                    <p className="text-sm text-slate-400">Barber</p>
                    <p className="mt-2 text-lg font-semibold text-white">Milo Tanner</p>
                    <p className="mt-3 text-sm leading-6 text-slate-400">Master cuts, faded styles, and beard sculpting.</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/80 p-5">
                    <p className="text-sm text-slate-400">Popular service</p>
                    <p className="mt-2 text-lg font-semibold text-white">Signature Cut</p>
                    <p className="mt-3 text-sm leading-6 text-slate-400">30 minutes with expert styling and a relaxing finish.</p>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-5">
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Booking perks</p>
                  <ul className="mt-4 space-y-3 text-sm text-slate-300">
                    <li>• Instant availability checks</li>
                    <li>• Protected appointments with reminders</li>
                    <li>• Easy rescheduling and cancelation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="border-t border-white/10 bg-slate-950/95 px-6 py-16 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">Services</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Crafted experiences for every look</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Choose the service that fits your style, whether it’s a quick trim, a full grooming session, or a detailed fade and beard finish.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { title: "Classic Cut", detail: "30 min · $35" },
              { title: "Beard Trim", detail: "20 min · $20" },
              { title: "Signature Fade", detail: "45 min · $50" },
            ].map((service) => (
              <div key={service.title} className="rounded-3xl border border-white/10 bg-slate-900/90 p-6 text-left">
                <p className="text-xl font-semibold text-white">{service.title}</p>
                <p className="mt-3 text-sm text-slate-400">{service.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
