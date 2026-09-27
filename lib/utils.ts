import QRCode from 'qrcode';
import { AttendeeData, ValidationErrors } from './types';

export function formatCurrency(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}

export function generateRegistrationId(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `REG-2026-${timestamp.toString().slice(-6)}${random}`;
}

export async function generateQRCode(data: string): Promise<string> {
  try {
    return await QRCode.toDataURL(data, {
      width: 300,
      margin: 2,
      color: {
        dark: '#0A1647',
        light: '#FFFFFF'
      }
    });
  } catch (err) {
    console.error('QR generation error:', err);
    return '';
  }
}

export function createQRPayload(registrationId: string, attendeeName: string): string {
  // For prototype: encode only registration ID and name
  // Backend will replace with secure token
  return JSON.stringify({
    regId: registrationId,
    name: attendeeName,
    event: 'NATCON2026'
  });
}

export function validateAttendee(attendee: AttendeeData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!attendee.fullName.trim()) {
    errors.fullName = 'Full name is required';
  }

  if (!attendee.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(attendee.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!attendee.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^[\d\s\-\+\(\)]{10,}$/.test(attendee.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!attendee.state) {
    errors.state = 'State is required';
  }

  if (!attendee.address.trim()) {
    errors.address = 'Address is required';
  }

  if (!attendee.gender) {
    errors.gender = 'Gender is required';
  }

  if (!attendee.institution.trim()) {
    errors.institution = 'Institution is required';
  }

  return errors;
}

export function validateAllAttendees(attendees: AttendeeData[]): boolean {
  return attendees.every(attendee => {
    const errors = validateAttendee(attendee);
    return Object.keys(errors).length === 0;
  });
}
