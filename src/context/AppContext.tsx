import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ServiceBooking,
  Vehicle,
  BookingStatus,
  Mechanic,
  ServiceCity,
  Coupon,
  ServiceItem,
} from '../types';
import { MECHANICS, SERVICES, CITIES, COUPONS } from '../data/mockData';

export type UserRole = 'customer' | 'mechanic' | 'admin' | 'guest';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  userVehicles: Vehicle[];
  addUserVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  removeUserVehicle: (id: string) => void;
  
  bookings: ServiceBooking[];
  createBooking: (bookingData: Partial<ServiceBooking>) => ServiceBooking;
  updateBookingStatus: (
    bookingId: string,
    status: BookingStatus,
    extra?: { beforePhotos?: string[]; afterPhotos?: string[]; inspectionNotes?: string }
  ) => void;
  assignMechanicToBooking: (bookingId: string, mechanicId: string) => void;
  cancelBooking: (bookingId: string) => void;
  
  activeTrackingBookingId: string | null;
  setActiveTrackingBookingId: (id: string | null) => void;
  
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  bookingPreselect: {
    vehicleType?: 'bike' | 'car' | 'ev';
    brand?: string;
    serviceId?: string;
  };
  openBookingWizard: (preselect?: { vehicleType?: 'bike' | 'car' | 'ev'; brand?: string; serviceId?: string }) => void;
  
  // Services Admin state
  servicesList: ServiceItem[];
  updateServicePrice: (serviceId: string, newPrice: number) => void;
  
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
  
  // User auth state
  currentUser: {
    name: string;
    email: string;
    phone: string;
  };
  updateUserProfile: (profile: { name: string; email: string; phone: string }) => void;
}

const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'veh-1',
    type: 'bike',
    brand: 'Royal Enfield',
    model: 'Classic 350',
    registrationNumber: 'KA-01-MJ-8821',
    fuelType: 'Petrol',
    year: 2022,
  },
  {
    id: 'veh-2',
    type: 'car',
    brand: 'Hyundai',
    model: 'Creta',
    registrationNumber: 'KA-05-MN-9921',
    fuelType: 'Petrol',
    year: 2023,
  },
];

const INITIAL_BOOKINGS: ServiceBooking[] = [
  {
    id: 'RNR-98124',
    userId: 'user-001',
    userName: 'Anish Verma',
    userPhone: '+91 98450 12345',
    userEmail: 'anish.verma@example.com',
    vehicle: {
      id: 'veh-1',
      type: 'bike',
      brand: 'Royal Enfield',
      model: 'Classic 350',
      registrationNumber: 'KA-01-MJ-8821',
    },
    serviceIds: ['s-bike-1'],
    serviceNames: ['General Bike Maintenance'],
    totalPrice: 450,
    location: {
      address: 'Flat 402, Oakwood Apartments, Koramangala 5th Block',
      city: 'Bengaluru',
      pincode: '560095',
      landmark: 'Near Forum Mall',
      lat: 12.9352,
      lng: 77.6245,
    },
    date: '2026-08-06',
    timeSlot: '11:00 AM - 12:00 PM',
    status: 'EN_ROUTE',
    mechanicId: 'mech-101',
    mechanic: MECHANICS[0],
    estimatedArrivalMinutes: 14,
    payment: {
      method: 'UPI',
      transactionId: 'pay_N3x9A123k',
      amount: 450,
      discount: 0,
      finalAmount: 450,
      status: 'PAID',
      paidAt: '2026-08-06 10:15 AM',
    },
    createdAt: '2026-08-06 10:15 AM',
    updatedAt: '2026-08-06 10:30 AM',
  },
  {
    id: 'RNR-77210',
    userId: 'user-001',
    userName: 'Anish Verma',
    userPhone: '+91 98450 12345',
    userEmail: 'anish.verma@example.com',
    vehicle: {
      id: 'veh-2',
      type: 'car',
      brand: 'Hyundai',
      model: 'Creta',
      registrationNumber: 'KA-05-MN-9921',
    },
    serviceIds: ['s-car-1', 's-car-2'],
    serviceNames: ['Standard Car Periodic Service', 'Car AC Complete Service & Gas Refill'],
    totalPrice: 3498,
    location: {
      address: 'Flat 402, Oakwood Apartments, Koramangala 5th Block',
      city: 'Bengaluru',
      pincode: '560095',
      lat: 12.9352,
      lng: 77.6245,
    },
    date: '2026-07-28',
    timeSlot: '02:00 PM - 03:00 PM',
    status: 'COMPLETED',
    mechanicId: 'mech-102',
    mechanic: MECHANICS[1],
    payment: {
      method: 'CARD',
      transactionId: 'pay_K2l0B984z',
      amount: 3498,
      discount: 200,
      finalAmount: 3298,
      status: 'PAID',
      paidAt: '2026-07-28 03:45 PM',
    },
    createdAt: '2026-07-27 06:00 PM',
    updatedAt: '2026-07-28 04:00 PM',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('customer');
  const [selectedCity, setSelectedCity] = useState<string>('Bengaluru');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState({
    name: 'Anish Verma',
    email: 'anish.verma@example.com',
    phone: '+91 98450 12345',
  });

  const [userVehicles, setUserVehicles] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem('rnr_user_vehicles');
    return saved ? JSON.parse(saved) : INITIAL_VEHICLES;
  });

  const [bookings, setBookings] = useState<ServiceBooking[]>(() => {
    const saved = localStorage.getItem('rnr_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [servicesList, setServicesList] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('rnr_services');
    return saved ? JSON.parse(saved) : SERVICES;
  });

  const [activeTrackingBookingId, setActiveTrackingBookingId] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingPreselect, setBookingPreselect] = useState<{
    vehicleType?: 'bike' | 'car' | 'ev';
    brand?: string;
    serviceId?: string;
  }>({});

  useEffect(() => {
    localStorage.setItem('rnr_user_vehicles', JSON.stringify(userVehicles));
  }, [userVehicles]);

  useEffect(() => {
    localStorage.setItem('rnr_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('rnr_services', JSON.stringify(servicesList));
  }, [servicesList]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addUserVehicle = (vehicleData: Omit<Vehicle, 'id'>) => {
    const newVehicle: Vehicle = {
      ...vehicleData,
      id: `veh-${Date.now()}`,
    };
    setUserVehicles((prev) => [...prev, newVehicle]);
    showToast(`Added ${newVehicle.brand} ${newVehicle.model} to your vehicles!`);
  };

  const removeUserVehicle = (id: string) => {
    setUserVehicles((prev) => prev.filter((v) => v.id !== id));
    showToast('Vehicle removed successfully');
  };

  const openBookingWizard = (preselect?: { vehicleType?: 'bike' | 'car' | 'ev'; brand?: string; serviceId?: string }) => {
    if (preselect) {
      setBookingPreselect(preselect);
    } else {
      setBookingPreselect({});
    }
    setIsBookingModalOpen(true);
  };

  const createBooking = (bookingData: Partial<ServiceBooking>): ServiceBooking => {
    const randomAssignedMech = MECHANICS[Math.floor(Math.random() * MECHANICS.length)];
    const id = `RNR-${Math.floor(10000 + Math.random() * 90000)}`;
    
    const newBooking: ServiceBooking = {
      id,
      userId: 'user-001',
      userName: bookingData.userName || currentUser.name,
      userPhone: bookingData.userPhone || currentUser.phone,
      userEmail: bookingData.userEmail || currentUser.email,
      vehicle: bookingData.vehicle || userVehicles[0],
      serviceIds: bookingData.serviceIds || [],
      serviceNames: bookingData.serviceNames || ['Doorstep Vehicle Repair'],
      totalPrice: bookingData.totalPrice || 450,
      location: bookingData.location || {
        address: '24, Indiranagar 100ft Road',
        city: selectedCity,
        pincode: '560038',
        lat: 12.9783,
        lng: 77.6408,
      },
      date: bookingData.date || new Date().toISOString().split('T')[0],
      timeSlot: bookingData.timeSlot || '10:00 AM - 11:00 AM',
      status: 'MECHANIC_ASSIGNED',
      mechanicId: randomAssignedMech.id,
      mechanic: randomAssignedMech,
      estimatedArrivalMinutes: 25,
      payment: bookingData.payment || {
        method: 'UPI',
        transactionId: `pay_${Math.random().toString(36).substring(2, 10)}`,
        amount: bookingData.totalPrice || 450,
        discount: 0,
        finalAmount: bookingData.totalPrice || 450,
        status: 'PAID',
        paidAt: new Date().toLocaleString(),
      },
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };

    setBookings((prev) => [newBooking, ...prev]);
    showToast(`Booking ${newBooking.id} confirmed! Mechanic assigned.`);
    return newBooking;
  };

  const updateBookingStatus = (
    bookingId: string,
    status: BookingStatus,
    extra?: { beforePhotos?: string[]; afterPhotos?: string[]; inspectionNotes?: string }
  ) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            status,
            updatedAt: new Date().toLocaleString(),
            ...(extra?.beforePhotos ? { beforePhotos: extra.beforePhotos } : {}),
            ...(extra?.afterPhotos ? { afterPhotos: extra.afterPhotos } : {}),
            ...(extra?.inspectionNotes ? { inspectionNotes: extra.inspectionNotes } : {}),
          };
        }
        return b;
      })
    );
    showToast(`Booking ${bookingId} status updated to: ${status.replace('_', ' ')}`);
  };

  const assignMechanicToBooking = (bookingId: string, mechanicId: string) => {
    const mech = MECHANICS.find((m) => m.id === mechanicId) || MECHANICS[0];
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            mechanicId: mech.id,
            mechanic: mech,
            status: 'MECHANIC_ASSIGNED',
            updatedAt: new Date().toLocaleString(),
          };
        }
        return b;
      })
    );
    showToast(`Mechanic ${mech.name} assigned to booking ${bookingId}`);
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'CANCELLED', updatedAt: new Date().toLocaleString() } : b))
    );
    showToast(`Booking ${bookingId} has been cancelled`);
  };

  const updateServicePrice = (serviceId: string, newPrice: number) => {
    setServicesList((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, price: newPrice } : s))
    );
    showToast('Service price updated successfully');
  };

  const updateUserProfile = (profile: { name: string; email: string; phone: string }) => {
    setCurrentUser(profile);
    showToast('Profile updated successfully');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        selectedCity,
        setSelectedCity,
        userVehicles,
        addUserVehicle,
        removeUserVehicle,
        bookings,
        createBooking,
        updateBookingStatus,
        assignMechanicToBooking,
        cancelBooking,
        activeTrackingBookingId,
        setActiveTrackingBookingId,
        isBookingModalOpen,
        setIsBookingModalOpen,
        bookingPreselect,
        openBookingWizard,
        servicesList,
        updateServicePrice,
        toastMessage,
        showToast,
        currentUser,
        updateUserProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
