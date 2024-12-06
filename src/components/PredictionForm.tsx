import { useState } from 'react';
import type { AirlineFormData, PredictionResponse } from '../types';
import { CITIES, TRAVEL_CLASSES } from '../types';
import { MapPin, Loader2, Clock, Plane, ArrowRightLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const AIRLINES = [
  { name: 'IndiGo', color: '#007BFF' },
  { name: 'Air India', color: '#FF4500' },
  { name: 'SpiceJet', color: '#FFA500' },
  { name: 'Vistara', color: '#800080' },
  { name: 'AirAsia', color: '#FF0000' },
  { name: 'AkasaAir', color: '#FF6347' },
  { name: 'AllianceAir', color: '#FFD700' },
  { name: 'StarAir', color: '#00CED1' },
];

export function PredictionForm() {
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAirline, setSelectedAirline] = useState<string>(AIRLINES[0].name);
  const [departureHour, setDepartureHour] = useState(8);
  const [arrivalHour, setArrivalHour] = useState(10);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data: AirlineFormData = {
      booking_date: formData.get('booking_date') as string,
      journey_date: formData.get('journey_date') as string,
      airline: selectedAirline,
      source: formData.get('source') as string,
      destination: formData.get('destination') as string,
      travel_class: formData.get('travel_class') as string,
      stops: Number(formData.get('stops')),
      departure_hour: departureHour,
      arrival_hour: arrivalHour,
    };

    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const result: PredictionResponse = await response.json();
      setResult(result.fare);
    } catch (error) {
      console.error('Prediction failed:', error);
      setError('Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-200"
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-6 text-center">
          <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
            <Plane className="w-10 h-10" />
            Airline Fare Predictor
          </h2>
          <p className="mt-2 text-sm font-medium text-gray-200">
            Get accurate fare predictions for your journey in just a few clicks.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Booking and Journey Dates */}
          <div className="grid md:grid-cols-2 gap-6">
            <InputField label="Booking Date" name="booking_date" type="date" icon={<Clock className="text-blue-600" />} />
            <InputField label="Journey Date" name="journey_date" type="date" icon={<Plane className="text-blue-600" />} />
          </div>

          {/* Departure and Arrival Time */}
          <div className="flex items-center justify-between space-x-4">
            <TimeField label="Departure Time" value={departureHour} onChange={setDepartureHour} />
            <ArrowRightLeft className="text-blue-600" />
            <TimeField label="Arrival Time" value={arrivalHour} onChange={setArrivalHour} />
          </div>

          {/* Airline Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Airline</label>
            <div className="flex flex-wrap gap-4">
              {AIRLINES.map((airline) => (
                <button
                  key={airline.name}
                  type="button"
                  onClick={() => setSelectedAirline(airline.name)}
                  className={`px-6 py-3 rounded-xl text-white font-semibold focus:outline-none transition-transform ${
                    selectedAirline === airline.name ? 'scale-105' : 'scale-100'
                  }`}
                  style={{
                    backgroundColor: airline.color,
                    border: selectedAirline === airline.name ? '3px solid #000' : 'none',
                  }}
                >
                  {airline.name}
                </button>
              ))}
            </div>
          </div>

          {/* Source and Destination Cities */}
          <div className="grid md:grid-cols-2 gap-6">
            <Dropdown label="Source" name="source" options={CITIES} />
            <Dropdown label="Destination" name="destination" options={CITIES} />
          </div>

          {/* Travel Class and Stops */}
          <Dropdown label="Travel Class" name="travel_class" options={TRAVEL_CLASSES} />
          <InputField label="Total Stops" name="stops" type="number" min="0" max="2" placeholder="0-2 stops" />

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-4 rounded-xl hover:from-blue-700 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Predicting...
              </>
            ) : (
              'Predict Fare'
            )}
          </motion.button>

          {/* Error and Result Display */}
          <AnimatePresence>
            {error && <ErrorMessage error={error} />}
            {result !== null && !error && <SuccessMessage result={result} />}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
}

// Helper Components
const InputField = ({ label, icon, ...props }: { label: string; icon?: React.ReactNode }) => (
  <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
      {icon}
      {label}
    </label>
    <input
      {...props}
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition duration-300"
    />
  </motion.div>
);

const Dropdown = ({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: string[];
}) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <select
      name={name}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition duration-300"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </motion.div>
);

const TimeField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) => (
  <div className="flex-1">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input
      type="time"
      value={`${value.toString().padStart(2, '0')}:00`}
      onChange={(e) => onChange(Number(e.target.value.split(':')[0]))}
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition duration-300"
    />
  </div>
);

const ErrorMessage = ({ error }: { error: string }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="p-4 text-red-600 bg-red-100 border border-red-200 rounded-lg text-center"
  >
    {error}
  </motion.div>
);

const SuccessMessage = ({ result }: { result: number }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="p-4 text-green-600 bg-green-100 border border-green-200 rounded-lg text-center"
  >
    Predicted Fare: ₹{result.toFixed(2)}
  </motion.div>
);
