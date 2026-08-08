export type VehicleType = 'bike';

export interface VehicleBrand {
  id: string;
  name: string;
  logo: string; // SVG or image URL
  type: 'bike';
  popularModels: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  category: VehicleType;
  subCategory: string; // e.g., 'Periodic Service', 'Engine', 'AC', 'Tyre', 'Battery', 'Denting'
  description: string;
  price: number;
  originalPrice: number;
  durationMinutes: number;
  warrantyDays: number;
  iconName: string;
  image: string;
  inclusions: string[];
  popular?: boolean;
}

export type BookingStatus =
  | 'PENDING'
  | 'MECHANIC_ASSIGNED'
  | 'EN_ROUTE'
  | 'ARRIVED'
  | 'INSPECTION'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Mechanic {
  id: string;
  name: string;
  phone: string;
  photo: string;
  rating: number;
  totalJobs: number;
  specialization: ('bike')[];
  experienceYears: number;
  status: 'available' | 'busy' | 'offline';
  currentLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  vehicle: string; // e.g. "Hero Splendor - KA 05 HE 4821"
}

export interface Vehicle {
  id: string;
  type: VehicleType;
  brand: string;
  model: string;
  registrationNumber: string;
  fuelType?: string;
  year?: number;
}

export interface PaymentDetails {
  method: 'UPI' | 'CARD' | 'NETBANKING' | 'CASH_AFTER_SERVICE';
  transactionId?: string;
  amount: number;
  discount: number;
  finalAmount: number;
  status: 'PENDING' | 'PAID' | 'FAILED';
  paidAt?: string;
}

export interface ServiceBooking {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  vehicle: Vehicle;
  serviceIds: string[];
  serviceNames: string[];
  totalPrice: number;
  location: {
    address: string;
    city: string;
    pincode: string;
    landmark?: string;
    lat: number;
    lng: number;
  };
  date: string;
  timeSlot: string;
  status: BookingStatus;
  mechanicId?: string;
  mechanic?: Mechanic;
  payment: PaymentDetails;
  createdAt: string;
  updatedAt: string;
  estimatedArrivalMinutes?: number;
  beforePhotos?: string[];
  afterPhotos?: string[];
  inspectionNotes?: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  vehicleModel: string;
  serviceName: string;
  comment: string;
  verified: boolean;
  city: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'booking' | 'mechanics' | 'pricing' | 'warranty';
}

export interface ServiceCity {
  id: string;
  name: string;
  state: string;
  activeAreas: string[];
  popular: boolean;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  maxDiscount: number;
  minBookingValue: number;
  description: string;
}
