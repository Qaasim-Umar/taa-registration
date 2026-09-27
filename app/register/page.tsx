'use client';

import { useState } from 'react';
import { AttendeeData, ConfirmedRegistration } from '@/lib/types';
import { validateAttendee, generateRegistrationId, createQRPayload, generateQRCode } from '@/lib/utils';
import { PRICE_PER_ATTENDEE } from '@/lib/constants';
import ProgressBar from '../components/ProgressBar';
import AttendeeCountSelector from '../components/AttendeeCountSelector';
import AttendeeForm from '../components/AttendeeForm';
import ReviewRegistration from '../components/ReviewRegistration';
import ConfirmationTicket from '../components/ConfirmationTicket';
import { formatCurrency } from '@/lib/utils';

type Step = 'count' | 'forms' | 'review' | 'confirmation';

const createEmptyAttendee = (): AttendeeData => ({
  fullName: '',
  email: '',
  phone: '',
  state: '',
  address: '',
  gender: '',
  institution: ''
});

export default function RegisterPage() {
  const [step, setStep] = useState<Step>('count');
  const [attendeeCount, setAttendeeCount] = useState(1);
  const [attendees, setAttendees] = useState<AttendeeData[]>([createEmptyAttendee()]);
  const [confirmedRegistrations, setConfirmedRegistrations] = useState<ConfirmedRegistration[]>([]);
  const [validationErrors, setValidationErrors] = useState<Record<number, Record<string, string>>>({});

  const handleCountChange = (count: number) => {
    setAttendeeCount(count);
    const newAttendees = Array.from({ length: count }, (_, i) => attendees[i] || createEmptyAttendee());
    setAttendees(newAttendees);
  };

  const handleCountContinue = () => {
    setStep('forms');
  };

  const handleCountBack = () => {
    window.location.href = '/';
  };

  const handleAttendeeChange = (index: number, field: keyof AttendeeData, value: string) => {
    const newAttendees = [...attendees];
    newAttendees[index] = { ...newAttendees[index], [field]: value };
    setAttendees(newAttendees);

    // Clear error for this field
    if (validationErrors[index]?.[field]) {
      const newErrors = { ...validationErrors };
      delete newErrors[index][field];
      if (Object.keys(newErrors[index]).length === 0) {
        delete newErrors[index];
      }
      setValidationErrors(newErrors);
    }
  };

  const validateAllForms = (): boolean => {
    const errors: Record<number, Record<string, string>> = {};
    let isValid = true;

    attendees.forEach((attendee, index) => {
      const attendeeErrors = validateAttendee(attendee);
      if (Object.keys(attendeeErrors).length > 0) {
        errors[index] = attendeeErrors;
        isValid = false;
      }
    });

    setValidationErrors(errors);
    return isValid;
  };

  const handleFormsContinue = () => {
    if (validateAllForms()) {
      setStep('review');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Scroll to first error
      const firstErrorIndex = Object.keys(validationErrors)[0];
      if (firstErrorIndex) {
        const element = document.getElementById(`attendee-form-${firstErrorIndex}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleReviewEdit = () => {
    setStep('forms');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReviewBack = () => {
    setStep('forms');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReviewConfirm = async () => {
    // Generate registration IDs and QR codes for each attendee
    const confirmed: ConfirmedRegistration[] = [];

    for (const attendee of attendees) {
      const registrationId = generateRegistrationId();
      const qrPayload = createQRPayload(registrationId, attendee.fullName);
      const qrCode = await generateQRCode(qrPayload);

      confirmed.push({
        registrationId,
        attendee,
        amount: PRICE_PER_ATTENDEE,
        qrCode
      });
    }

    setConfirmedRegistrations(confirmed);
    setStep('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stepLabels = ['Attendees', 'Details', 'Review', 'Confirmation'];
  const currentStepIndex = ['count', 'forms', 'review', 'confirmation'].indexOf(step) + 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Navy */}
      <header className="bg-gradient-to-r from-navy to-navy-dark shadow-lg print:shadow-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center font-bold text-navy">
                N26
              </div>
              <div>
                <h1 className="text-white text-xl font-bold">NATCON 2026</h1>
                <p className="text-gold text-sm">Registration</p>
              </div>
            </div>
            {step !== 'confirmation' && (
              <a href="/" className="text-gold hover:text-gold-light text-sm font-medium print:hidden">
                ← Back to Home
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Progress Bar */}
        {step !== 'confirmation' && (
          <ProgressBar currentStep={currentStepIndex} totalSteps={4} stepLabels={stepLabels} />
        )}

        {/* Step Content */}
        <div className="mt-8">
          {step === 'count' && (
            <AttendeeCountSelector
              count={attendeeCount}
              onChange={handleCountChange}
              onContinue={handleCountContinue}
              onBack={handleCountBack}
            />
          )}

          {step === 'forms' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
                <h2 className="text-3xl font-bold text-navy mb-2">Registration Details</h2>
                <p className="text-gray-600 mb-6">Fill in the information for each attendee</p>

                {/* Sticky Summary on Desktop */}
                <div className="bg-gradient-to-r from-navy to-navy-dark rounded-xl p-4 mb-6 sticky top-4 z-10">
                  <div className="flex items-center justify-between text-white">
                    <span className="font-semibold">
                      {attendees.length} {attendees.length === 1 ? 'Attendee' : 'Attendees'}
                    </span>
                    <span className="text-gold text-xl font-bold">
                      {formatCurrency(attendees.length * PRICE_PER_ATTENDEE)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Forms */}
              <div className="space-y-6 mb-8">
                {attendees.map((attendee, index) => (
                  <div key={index} id={`attendee-form-${index}`}>
                    <AttendeeForm
                      attendee={attendee}
                      index={index}
                      onChange={handleAttendeeChange}
                      errors={validationErrors[index] || {}}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
                <button
                  onClick={() => setStep('count')}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 rounded-xl transition-all"
                >
                  ← Back
                </button>
                <button
                  onClick={handleFormsContinue}
                  className="flex-1 bg-accent hover:bg-accent/90 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg"
                >
                  Continue to Review
                </button>
              </div>

              {Object.keys(validationErrors).length > 0 && (
                <div className="max-w-4xl mx-auto mt-4">
                  <div className="bg-accent/10 border border-accent rounded-xl p-4">
                    <p className="text-accent text-sm font-medium">
                      ⚠️ Please fix the errors above before continuing
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 'review' && (
            <ReviewRegistration
              attendees={attendees}
              onEdit={handleReviewEdit}
              onConfirm={handleReviewConfirm}
              onBack={handleReviewBack}
            />
          )}

          {step === 'confirmation' && (
            <ConfirmationTicket confirmedAttendees={confirmedRegistrations} />
          )}
        </div>
      </main>

      {/* Footer - Navy */}
      {step !== 'confirmation' && (
        <footer className="bg-gradient-to-r from-navy to-navy-dark border-t border-white/10 py-6 mt-12 print:hidden">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-white/60 text-sm">
              Need help? Contact us at 09152677650, 08132444849, 08136436178
            </p>
            <p className="text-white/40 text-xs mt-2">© 2026 The Achiever Ambassadors Islamic Foundation</p>
          </div>
        </footer>
      )}
    </div>
  );
}
