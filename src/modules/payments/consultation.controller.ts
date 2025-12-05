export interface ConsultationPackage {
  id: number;
  name: string;
  price: number; // in Naira
  durationMinutes: number;
}

// Example packages
export const packages: ConsultationPackage[] = [
  { id: 1, name: 'Basic', price: 2000, durationMinutes: 15 },
  { id: 2, name: 'Standard', price: 5000, durationMinutes: 30 },
  { id: 3, name: 'Premium', price: 10000, durationMinutes: 60 }
];

export const getPackageById = (id: number) => {
  const pkg = packages.find(p => p.id === id);
  if (!pkg) throw new Error('Package not found');
  return pkg;
};


