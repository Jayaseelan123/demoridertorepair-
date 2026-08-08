import {
  VehicleBrand,
  ServiceItem,
  Mechanic,
  Review,
  FAQItem,
  ServiceCity,
  Coupon,
} from '../types';

export const VEHICLE_BRANDS: VehicleBrand[] = [
  { id: 'b1', name: 'Hero', logo: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=150&auto=format&fit=crop&q=80', type: 'bike', popularModels: ['Splendor Plus', 'HF Deluxe', 'Passion Pro', 'Glamour', 'Xpulse 200'] },
  { id: 'b2', name: 'Honda', logo: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=150&auto=format&fit=crop&q=80', type: 'bike', popularModels: ['CB Shine', 'Unicorn', 'Dio', 'CBR 150', 'Activa'] },
  { id: 'b3', name: 'Bajaj', logo: 'https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?w=150&auto=format&fit=crop&q=80', type: 'bike', popularModels: ['Pulsar 150', 'Pulsar NS200', 'Platina 110', 'Dominar 400'] },
  { id: 'b4', name: 'Royal Enfield', logo: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=150&auto=format&fit=crop&q=80', type: 'bike', popularModels: ['Classic 350', 'Bullet 350', 'Meteor 350', 'Hunter 350'] },
  { id: 'b5', name: 'TVS', logo: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=150&auto=format&fit=crop&q=80', type: 'bike', popularModels: ['Apache RTR 160', 'Jupiter 125', 'Ntorq 125', 'Ronin'] },
  { id: 'b6', name: 'Yamaha', logo: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=150&auto=format&fit=crop&q=80', type: 'bike', popularModels: ['YZF R15 V4', 'MT 15 V2', 'FZ S V4', 'RayZR 125'] },
  { id: 'b7', name: 'Suzuki', logo: 'https://images.unsplash.com/photo-1588258524675-c619426f04c8?w=150&auto=format&fit=crop&q=80', type: 'bike', popularModels: ['Access 125', 'Gixxer SF 250', 'Burgman Street', 'V-Strom SX'] },
  { id: 'b8', name: 'KTM', logo: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=150&auto=format&fit=crop&q=80', type: 'bike', popularModels: ['Duke 200', 'Duke 390', 'RC 200', 'Adventure 390'] },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 's-bike-1',
    title: 'Petrol Bike General Service',
    category: 'bike',
    subCategory: 'General Maintenance',
    description: 'Complete 18-point doorstep service for petrol bikes including engine oil change, air filter cleaning, chain lubrication, and brake adjustment.',
    price: 450,
    originalPrice: 650,
    durationMinutes: 45,
    warrantyDays: 30,
    iconName: 'Wrench',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80',
    inclusions: [
      'Engine Oil Replacement (Castrol / Motul)',
      'Air Filter Clean & Inspection',
      'Spark Plug Checking & Cleaning',
      'Chain Adjustment & Lubrication',
      'Front & Rear Brake Adjustment',
      '18-Point General Safety Check',
      'Free Doorstep Pressure Wash'
    ],
    popular: true,
  },
  {
    id: 's-bike-2',
    title: 'Petrol Bike Engine Tuning',
    category: 'bike',
    subCategory: 'Engine Care',
    description: 'Fuel system cleaning, spark plug check, tappet adjustment, and throttle tuning for smoother pickup and better mileage.',
    price: 799,
    originalPrice: 1100,
    durationMinutes: 60,
    warrantyDays: 30,
    iconName: 'Cpu',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=80',
    inclusions: [
      'Carburetor / Fuel Injector Clean',
      'Tappet Clearance Adjustment',
      'Engine Compression Check',
      'Spark Plug Replacement',
      'Silencer Carbon Clean Check'
    ],
  },
  {
    id: 's-bike-3',
    title: 'Doorstep Petrol Bike Breakdown Assistance',
    category: 'bike',
    subCategory: 'Emergency',
    description: 'Fast doorstep support for starting trouble, flat tyre repair, battery jumpstart, and cable replacement.',
    price: 299,
    originalPrice: 450,
    durationMinutes: 30,
    warrantyDays: 15,
    iconName: 'Zap',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80',
    inclusions: [
      '30-Min Priority Doorstep Arrival',
      'Battery Jumpstart or On-spot Charging',
      'Tubeless Puncture Fix (Up to 2 punctures)',
      'Fuel Cable / Clutch Wire Replacement',
      'Minor Wiring Fixes'
    ],
    popular: true,
  },
];

export const MECHANICS: Mechanic[] = [
  {
    id: 'mech-101',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    rating: 4.9,
    totalJobs: 1420,
    specialization: ['bike'],
    experienceYears: 8,
    status: 'available',
    currentLocation: {
      lat: 12.9716,
      lng: 77.5946,
      address: 'Koramangala 5th Block, Bengaluru',
    },
    vehicle: 'Hero Splendor (KA-01-ME-3312)',
  },
  {
    id: 'mech-102',
    name: 'Vikram Singh',
    phone: '+91 98234 56789',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    rating: 4.8,
    totalJobs: 980,
    specialization: ['bike'],
    experienceYears: 6,
    status: 'available',
    currentLocation: {
      lat: 12.9352,
      lng: 77.6245,
      address: 'HSR Layout Sector 3, Bengaluru',
    },
    vehicle: 'Royal Enfield Classic 350 (KA-05-MN-9921)',
  },
  {
    id: 'mech-103',
    name: 'Anil Deshmukh',
    phone: '+91 97112 88344',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating: 4.95,
    totalJobs: 2100,
    specialization: ['bike'],
    experienceYears: 11,
    status: 'available',
    currentLocation: {
      lat: 12.9783,
      lng: 77.6408,
      address: 'Indiranagar 100ft Road, Bengaluru',
    },
    vehicle: 'Bajaj Pulsar 150 (KA-03-BJ-1044)',
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userName: 'Arjun Mehta',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    date: '2 days ago',
    vehicleModel: 'Royal Enfield Classic 350',
    serviceName: 'Petrol Bike General Service',
    comment: 'Super fast! The mechanic Rajesh arrived at my home in 22 minutes with all tools and fresh Castrol engine oil. Service was clean, transparent, and my bike runs like butter now.',
    verified: true,
    city: 'Bengaluru',
  },
  {
    id: 'rev-2',
    userName: 'Karthik Raja',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    date: '3 days ago',
    vehicleModel: 'Honda CB Shine',
    serviceName: 'Doorstep Petrol Bike Breakdown Assistance',
    comment: 'My bike refused to start while leaving for office. The mechanic arrived in 18 mins and fixed the battery connection on the spot. Lifesaver!',
    verified: true,
    city: 'Delhi NCR',
  },
  {
    id: 'rev-3',
    userName: 'Sneha Patel',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    date: '5 days ago',
    vehicleModel: 'Bajaj Pulsar 150',
    serviceName: 'Petrol Bike Engine Tuning',
    comment: 'The pickup and mileage improved noticeably after the tuning. Everything was done right at my doorstep and the pricing was very clear.',
    verified: true,
    city: 'Pune',
  },
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How fast will the doorstep mechanic arrive?',
    answer: 'Our verified mechanics reach your location within 30 minutes for emergency breakdown calls, or at your exact selected time slot for scheduled petrol bike services.',
    category: 'general',
  },
  {
    id: 'faq-2',
    question: 'Are all mechanics verified and trained?',
    answer: 'Yes! Every Ride N Repair technician undergoes strict background verification, Police clearance check, and rigorous automotive skill certification for petrol bikes and their engine systems.',
    category: 'mechanics',
  },
  {
    id: 'faq-3',
    question: 'Do you provide a service warranty on repairs?',
    answer: 'Absolutely. We offer a 30-Day or 1000 KM No-Questions-Asked Service Guarantee on all general maintenance and periodic services, plus up to 6 months warranty on spare parts.',
    category: 'warranty',
  },
  {
    id: 'faq-4',
    question: 'What payment methods are supported?',
    answer: 'We accept Razorpay payments including UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, NetBanking, and cash/UPI payment after job completion.',
    category: 'pricing',
  },
  {
    id: 'faq-5',
    question: 'Can I reschedule or cancel my booking?',
    answer: 'Yes, you can easily cancel or reschedule your service booking anytime up to 15 minutes prior to the scheduled slot directly from your user dashboard with zero cancellation fees.',
    category: 'booking',
  },
];

export const CITIES: ServiceCity[] = [
  { id: 'ct-1', name: 'Bengaluru', state: 'Karnataka', activeAreas: ['Koramangala', 'HSR Layout', 'Indiranagar', 'Whitefield', 'Electronic City', 'Jayanagar'], popular: true },
  { id: 'ct-2', name: 'Mumbai', state: 'Maharashtra', activeAreas: ['Andheri', 'Bandra', 'Powai', 'Navi Mumbai', 'Thane', 'Worli'], popular: true },
  { id: 'ct-3', name: 'Delhi NCR', state: 'Delhi', activeAreas: ['Gurugram', 'Noida', 'South Delhi', 'Dwarka', 'Faridabad', 'Ghaziabad'], popular: true },
  { id: 'ct-4', name: 'Hyderabad', state: 'Telangana', activeAreas: ['Gachibowli', 'HITECH City', 'Banjara Hills', 'Kukatpally', 'Madhapur'], popular: true },
  { id: 'ct-5', name: 'Pune', state: 'Maharashtra', activeAreas: ['Wakad', 'Baner', 'Viman Nagar', 'Kothrud', 'Hinjewadi'], popular: true },
  { id: 'ct-6', name: 'Chennai', state: 'Tamil Nadu', activeAreas: ['Velachery', 'Anna Nagar', 'OMR', 'T. Nagar', 'Adyar'], popular: true },
  { id: 'ct-7', name: 'Ahmedabad', state: 'Gujarat', activeAreas: ['SG Highway', 'Bodakdev', 'Prahlad Nagar', 'Satellite'], popular: false },
  { id: 'ct-8', name: 'Kolkata', state: 'West Bengal', activeAreas: ['Salt Lake', 'New Town', 'Ballygunge', 'Park Street'], popular: false },
];

export const COUPONS: Coupon[] = [
  { code: 'FIRST100', discountPercent: 15, maxDiscount: 150, minBookingValue: 400, description: '₹150 Flat Off on your 1st Doorstep Bike Service' },
  { code: 'RNRCARE', discountPercent: 20, maxDiscount: 300, minBookingValue: 999, description: '20% OFF on Periodic Petrol Bike Services' },
];
