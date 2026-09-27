'use client';

import { useEffect, useState } from 'react';
import { ConfirmedRegistration } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { PRICE_PER_ATTENDEE } from '@/lib/constants';
import Image from 'next/image';

interface ConfirmationTicketProps {
  confirmedAttendees: ConfirmedRegistration[];
}

export default function ConfirmationTicket({ confirmedAttendees }: ConfirmationTicketProps) {
  const [qrCodes, setQrCodes] = useState<Record<string, string>>({});
  const total = confirmedAttendees.length * PRICE_PER_ATTENDEE;

  useEffect(() => {
    // Generate QR codes for all attendees
    const generateQRCodes = async () => {
      const codes: Record<string, string> = {};
      for (const attendee of confirmedAttendees) {
        codes[attendee.registrationId] = attendee.qrCode;
      }
      setQrCodes(codes);
    };

    generateQRCodes();
  }, [confirmedAttendees]);

  const handleDownload = (registrationId: string, attendeeName: string) => {
    const qrCode = qrCodes[registrationId];
    if (!qrCode) return;

    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `NATCON2026-${registrationId}-${attendeeName.replace(/\s+/g, '_')}.png`;
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Success Message */}
      <div className="bg-blue-50 rounded-2xl shadow-xl p-8 md:p-12 mb-6 text-center print:shadow-none">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">Registration Successful!</h1>
        <p className="text-gray-600 text-lg mb-6">
          Your registration for NATCON 2026 has been completed successfully
        </p>
        <div className="inline-block bg-gold/10 px-6 py-3 rounded-xl">
          <p className="text-sm text-gray-600 mb-1">Total Amount</p>
          <p className="text-3xl font-bold text-navy">{formatCurrency(total)}</p>
        </div>
      </div>

      {/* Registration Summary */}
      <div className="bg-blue-50 rounded-2xl shadow-xl p-8 md:p-12 mb-6 print:shadow-none">
        <h2 className="text-2xl font-bold text-navy mb-6">Registration Summary</h2>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-gray-600 text-sm mb-1">Total Attendees</p>
            <p className="text-3xl font-bold text-navy">{confirmedAttendees.length}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-gray-600 text-sm mb-1">Price per Attendee</p>
            <p className="text-2xl font-bold text-navy">{formatCurrency(PRICE_PER_ATTENDEE)}</p>
          </div>
          <div className="bg-gold/10 rounded-xl p-4">
            <p className="text-gray-600 text-sm mb-1">Total Amount</p>
            <p className="text-2xl font-bold text-navy">{formatCurrency(total)}</p>
          </div>
        </div>
      </div>

      {/* Attendee Tickets */}
      <div className="space-y-6 mb-6">
        {confirmedAttendees.map((attendee, index) => (
          <div key={attendee.registrationId} className="bg-blue-50 rounded-2xl shadow-xl overflow-hidden print:shadow-none print:break-inside-avoid">
            <div className="bg-gradient-to-r from-navy to-navy-dark p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gold text-sm font-semibold mb-1">Attendee {index + 1}</p>
                  <h3 className="text-white text-2xl font-bold">{attendee.attendee.fullName}</h3>
                </div>
                <div className="text-right">
                  <p className="text-gold text-sm font-semibold mb-1">Registration ID</p>
                  <p className="text-white text-lg font-mono">{attendee.registrationId}</p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* QR Code */}
                <div className="flex-shrink-0">
                  <div className="bg-white border-4 border-gray-100 rounded-xl p-4 inline-block">
                    {qrCodes[attendee.registrationId] ? (
                      <Image
                        src={qrCodes[attendee.registrationId]}
                        alt={`QR Code for ${attendee.attendee.fullName}`}
                        width={200}
                        height={200}
                        className="w-48 h-48"
                      />
                    ) : (
                      <div className="w-48 h-48 bg-gray-100 animate-pulse rounded-lg" />
                    )}
                  </div>
                  <button
                    onClick={() => handleDownload(attendee.registrationId, attendee.attendee.fullName)}
                    className="mt-3 w-full bg-navy hover:bg-navy/90 text-white text-sm font-semibold py-2 rounded-lg transition-all print:hidden"
                  >
                    Download QR Code
                  </button>
                </div>

                {/* Attendee Details */}
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-navy mb-4">Attendee Information</h4>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Email</p>
                      <p className="text-gray-900 font-medium">{attendee.attendee.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Phone</p>
                      <p className="text-gray-900 font-medium">{attendee.attendee.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">State</p>
                      <p className="text-gray-900 font-medium">{attendee.attendee.state}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Gender</p>
                      <p className="text-gray-900 font-medium">{attendee.attendee.gender}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Institution</p>
                      <p className="text-gray-900 font-medium">{attendee.attendee.institution}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Amount Paid</p>
                      <p className="text-navy font-bold text-lg">{formatCurrency(attendee.amount)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="bg-blue-50 rounded-2xl shadow-xl p-8 print:hidden">
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handlePrint}
            className="flex-1 bg-navy hover:bg-navy/90 text-white font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print All Tickets
          </button>
          <a
            href="/"
            className="flex-1 bg-gold hover:bg-gold-light text-navy font-semibold py-4 rounded-lg transition-all text-center"
          >
            Return to Home
          </a>
        </div>
        <p className="text-gray-500 text-sm text-center mt-6">
          Please save your registration details. You will need to present your QR code at the event.
        </p>
      </div>
    </div>
  );
}
