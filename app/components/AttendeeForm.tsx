import { AttendeeData, ValidationErrors } from '@/lib/types';
import { NIGERIAN_STATES, GENDER_OPTIONS } from '@/lib/constants';

interface AttendeeFormProps {
  attendee: AttendeeData;
  index: number;
  onChange: (index: number, field: keyof AttendeeData, value: string) => void;
  errors: ValidationErrors;
}

export default function AttendeeForm({ attendee, index, onChange, errors }: AttendeeFormProps) {
  return (
    <div className="bg-blue-50 rounded-xl shadow-lg p-6 md:p-8 border-2 border-blue-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
          <span className="text-navy font-bold text-lg">{index + 1}</span>
        </div>
        <h3 className="text-2xl font-bold text-navy">Attendee {index + 1}</h3>
      </div>

      <div className="space-y-5">
        {/* Full Name */}
        <div>
          <label htmlFor={`fullName-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            id={`fullName-${index}`}
            value={attendee.fullName}
            onChange={(e) => onChange(index, 'fullName', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 focus:ring-gold/20 outline-none transition-all ${
              errors.fullName ? 'border-accent' : 'border-gray-200 focus:border-gold'
            }`}
            placeholder="Enter full name"
          />
          {errors.fullName && <p className="text-accent text-sm mt-1">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor={`email-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span className="text-accent">*</span>
          </label>
          <input
            type="email"
            id={`email-${index}`}
            value={attendee.email}
            onChange={(e) => onChange(index, 'email', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 focus:ring-gold/20 outline-none transition-all ${
              errors.email ? 'border-accent' : 'border-gray-200 focus:border-gold'
            }`}
            placeholder="example@email.com"
          />
          {errors.email && <p className="text-accent text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor={`phone-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number <span className="text-accent">*</span>
          </label>
          <input
            type="tel"
            id={`phone-${index}`}
            value={attendee.phone}
            onChange={(e) => onChange(index, 'phone', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 focus:ring-gold/20 outline-none transition-all ${
              errors.phone ? 'border-accent' : 'border-gray-200 focus:border-gold'
            }`}
            placeholder="080XXXXXXXX"
          />
          {errors.phone && <p className="text-accent text-sm mt-1">{errors.phone}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* State */}
          <div>
            <label htmlFor={`state-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
              State <span className="text-accent">*</span>
            </label>
            <select
              id={`state-${index}`}
              value={attendee.state}
              onChange={(e) => onChange(index, 'state', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 focus:ring-gold/20 outline-none transition-all ${
                errors.state ? 'border-accent' : 'border-gray-200 focus:border-gold'
              }`}
            >
              <option value="">Select state</option>
              {NIGERIAN_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && <p className="text-accent text-sm mt-1">{errors.state}</p>}
          </div>

          {/* Gender */}
          <div>
            <label htmlFor={`gender-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
              Gender <span className="text-accent">*</span>
            </label>
            <select
              id={`gender-${index}`}
              value={attendee.gender}
              onChange={(e) => onChange(index, 'gender', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 focus:ring-gold/20 outline-none transition-all ${
                errors.gender ? 'border-accent' : 'border-gray-200 focus:border-gold'
              }`}
            >
              <option value="">Select gender</option>
              {GENDER_OPTIONS.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
            {errors.gender && <p className="text-accent text-sm mt-1">{errors.gender}</p>}
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor={`address-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
            Address <span className="text-accent">*</span>
          </label>
          <textarea
            id={`address-${index}`}
            value={attendee.address}
            onChange={(e) => onChange(index, 'address', e.target.value)}
            rows={3}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 focus:ring-gold/20 outline-none transition-all resize-none ${
              errors.address ? 'border-accent' : 'border-gray-200 focus:border-gold'
            }`}
            placeholder="Enter residential address"
          />
          {errors.address && <p className="text-accent text-sm mt-1">{errors.address}</p>}
        </div>

        {/* Institution */}
        <div>
          <label htmlFor={`institution-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
            Institution <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            id={`institution-${index}`}
            value={attendee.institution}
            onChange={(e) => onChange(index, 'institution', e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 focus:ring-gold/20 outline-none transition-all ${
              errors.institution ? 'border-accent' : 'border-gray-200 focus:border-gold'
            }`}
            placeholder="School, University, or Organization"
          />
          {errors.institution && <p className="text-accent text-sm mt-1">{errors.institution}</p>}
        </div>
      </div>
    </div>
  );
}
