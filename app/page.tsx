import Link from 'next/link';
import { EVENT_DETAILS, PRICE_PER_ATTENDEE } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Navy Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-dark to-navy">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
          {/* Logo/Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center font-bold text-navy">
                N26
              </div>
              <div className="text-left">
                <p className="text-xs text-gold uppercase tracking-wider font-semibold">NATCON</p>
                <p className="text-xs text-white/80">{EVENT_DETAILS.organizer.split('(')[0]}</p>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
              <span className="block text-gold mb-2">7<sup className="text-3xl">th</sup> Annual National</span>
              <span className="block">CONFERENCE</span>
            </h1>
            
            <div className="inline-block bg-gold px-6 py-2 rounded-full mb-8">
              <p className="text-navy font-bold uppercase tracking-wide">Reformation 2026</p>
            </div>
          </div>

          {/* Theme */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-gold uppercase tracking-widest text-sm mb-3 font-semibold">Theme</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Knowledge with Purpose:
            </h2>
            <p className="text-2xl md:text-3xl text-gold-light font-medium">
              Raising Responsible Muslim Leaders
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link 
              href="/register"
              className="inline-block bg-accent hover:bg-accent/90 text-white font-bold text-lg px-12 py-5 rounded-full transition-all transform hover:scale-105 shadow-2xl hover:shadow-accent/50"
            >
              Register Now
            </Link>
            <p className="text-white/60 text-sm mt-4">Secure your spot at NATCON 2026</p>
          </div>
        </div>
      </div>

      {/* Event Details Section - White Background */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Event Details Grid */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
            {/* Date */}
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-gold/50 transition-all shadow-sm">
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-gold font-semibold mb-2">Date</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{EVENT_DETAILS.dateDisplay}</p>
            </div>

            {/* Venue */}
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-gold/50 transition-all shadow-sm">
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-gold font-semibold mb-2">Venue</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{EVENT_DETAILS.venue}, {EVENT_DETAILS.location}</p>
            </div>

            {/* Registration Fee */}
            <div className="bg-gradient-to-br from-accent to-accent/80 rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Registration Fee</h3>
              <p className="text-white text-3xl font-bold">{formatCurrency(PRICE_PER_ATTENDEE)}</p>
              <p className="text-white/80 text-xs mt-1">per attendee</p>
            </div>
          </div>

          {/* Features */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="text-gold text-center uppercase tracking-wider text-sm mb-6 font-semibold">Featuring</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {EVENT_DETAILS.features.map((feature, index) => (
                  <span key={index} className="bg-white border border-gray-200 px-4 py-2 rounded-full text-gray-700 text-sm shadow-sm">
                    {feature}
                  </span>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-gold text-center uppercase tracking-wider text-sm mb-4 font-semibold">Audience</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {EVENT_DETAILS.audience.map((aud, index) => (
                    <span key={index} className="text-gray-600 text-sm">
                      {aud}{index < EVENT_DETAILS.audience.length - 1 ? ' •' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Link 
              href="/register"
              className="inline-block bg-navy hover:bg-navy/90 text-white font-bold text-lg px-12 py-5 rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              Start Registration →
            </Link>
          </div>
        </div>
      </div>

      {/* Footer - Navy Background */}
      <div className="bg-gradient-to-r from-navy to-navy-dark border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white/60 text-sm">© 2026 The Achiever Ambassadors Islamic Foundation</p>
          <p className="text-white/40 text-xs mt-2">NATCON 2026 - Raising Responsible Muslim Leaders</p>
        </div>
      </div>
    </main>
  );
}
