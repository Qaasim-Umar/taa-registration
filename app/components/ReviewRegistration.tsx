import { AttendeeData } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { PRICE_PER_ATTENDEE } from '@/lib/constants';

interface ReviewRegistrationProps {
  attendees: AttendeeData[];
  onEdit: () => void;
  onConfirm: () => void;
  onBack?: () => void;
}

export default function ReviewRegistration({ attendees, onEdit, onConfirm, onBack }: ReviewRegistrationProps) {
  const total = attendees.length * PRICE_PER_ATTENDEE;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-blue-50 rounded-2xl shadow-xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-navy mb-2 text-center">Review Your Registration</h2>
        <p className="text-gray-600 text-center mb-8">
          Please verify all information before proceeding
        </p>

        {/* Attendees List */}
        <div className="space-y-6 mb-8">
          {attendees.map((attendee, index) => (
            <div key={index} className="border-2 border-gray-100 bg-white rounded-xl p-6 hover:border-gold/50 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                  <span className="text-navy font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-navy">{attendee.fullName}</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Email</p>
                  <p className="text-gray-900 font-medium">{attendee.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Phone</p>
                  <p className="text-gray-900 font-medium">{attendee.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">State</p>
                  <p className="text-gray-900 font-medium">{attendee.state}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Gender</p>
                  <p className="text-gray-900 font-medium">{attendee.gender}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-500 mb-1">Address</p>
                  <p className="text-gray-900 font-medium">{attendee.address}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-500 mb-1">Institution</p>
                  <p className="text-gray-900 font-medium">{attendee.institution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-br from-navy to-navy-dark rounded-xl p-6 mb-8">
          <h3 className="text-gold text-lg font-semibold mb-4">Registration Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-white">
              <span>Number of Attendees:</span>
              <span className="font-semibold text-lg">{attendees.length}</span>
            </div>
            <div className="flex justify-between items-center text-white">
              <span>Price per Attendee:</span>
              <span className="font-semibold text-lg">{formatCurrency(PRICE_PER_ATTENDEE)}</span>
            </div>
            <div className="border-t border-white/20 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-gold text-xl font-semibold">Total Amount:</span>
                <span className="text-gold text-3xl font-bold">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-lg transition-all"
            >
              ← Previous Step
            </button>
          )}
          <button
            onClick={onEdit}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 rounded-lg transition-all"
          >
            Edit Registration
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-accent hover:bg-accent/90 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg"
          >
            Confirm Registration
          </button>
        </div>
      </div>
    </div>
  );
}
