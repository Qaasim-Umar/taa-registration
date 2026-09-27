import { formatCurrency } from '@/lib/utils';
import { PRICE_PER_ATTENDEE } from '@/lib/constants';

interface AttendeeCountSelectorProps {
  count: number;
  onChange: (count: number) => void;
  onContinue: () => void;
  onBack?: () => void;
}

export default function AttendeeCountSelector({ count, onChange, onContinue, onBack }: AttendeeCountSelectorProps) {
  const total = count * PRICE_PER_ATTENDEE;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-blue-50 rounded-2xl shadow-xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-navy mb-3 text-center">
          How many people are you registering?
        </h2>
        <p className="text-gray-600 text-center mb-8">
          You can register yourself or multiple people on behalf of others
        </p>

        <div className="mb-8">
          <label htmlFor="attendeeCount" className="block text-sm font-medium text-gray-700 mb-3">
            Number of Attendees
          </label>
          <input
            type="number"
            id="attendeeCount"
            min="1"
            max="50"
            value={count}
            onChange={(e) => onChange(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
            className="w-full text-5xl font-bold text-center text-navy py-6 px-4 border-2 border-gray-200 rounded-xl focus:border-gold focus:ring-4 focus:ring-gold/20 outline-none transition-all"
          />
          <p className="text-sm text-gray-500 text-center mt-2">Maximum 50 attendees per registration</p>
        </div>

        {/* Quick Select Buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {[1, 2, 3, 4, 5, 10].map((num) => (
            <button
              key={num}
              onClick={() => onChange(num)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                count === num
                  ? 'bg-gold text-navy'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Price Summary */}
        <div className="bg-gradient-to-br from-navy to-navy-dark rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between text-white mb-3">
            <span className="text-lg">Price per attendee:</span>
            <span className="text-xl font-semibold">{formatCurrency(PRICE_PER_ATTENDEE)}</span>
          </div>
          <div className="flex items-center justify-between text-white mb-3">
            <span className="text-lg">Number of attendees:</span>
            <span className="text-xl font-semibold">× {count}</span>
          </div>
          <div className="border-t border-white/20 pt-3 mt-3">
            <div className="flex items-center justify-between">
              <span className="text-gold text-xl font-semibold">Total Amount:</span>
              <span className="text-gold text-3xl font-bold">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 rounded-lg transition-all"
            >
              ← Back to Home
            </button>
          )}
          <button
            onClick={onContinue}
            className="flex-1 bg-accent hover:bg-accent/90 text-white font-bold text-sm md:text-lg py-4 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg"
          >
            Continue to Forms
          </button>
        </div>
      </div>
    </div>
  );
}
