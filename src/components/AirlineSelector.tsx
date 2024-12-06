import { Plane, Check } from 'lucide-react';
import { AIRLINES } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface AirlineSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function AirlineSelector({ value, onChange }: AirlineSelectorProps) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 flex items-center">
        <Plane className="mr-2 text-blue-600" />
        Select Airline
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {AIRLINES.map((airline) => (
          <motion.button
            key={airline}
            type="button"
            onClick={() => onChange(airline)}
            className={`
              relative flex items-center justify-center p-4 rounded-xl transition-all duration-300 
              ${value === airline 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * AIRLINES.indexOf(airline) }}
          >
            <Plane className={`h-5 w-5 mr-2 ${value === airline ? 'text-white' : 'text-blue-600'}`} />
            <span className="font-medium">{airline}</span>
            <AnimatePresence>
              {value === airline && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
                >
                  <Check className="h-4 w-4 text-blue-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
    </div>
  );
}