import { Clock, ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface TimeInputProps {
  label: string;
  name: string;
  required?: boolean;
  onChange: (hour: number) => void;
}

export function TimeInput({ label, name, required = false, onChange }: TimeInputProps) {
  const [time, setTime] = useState('12:00');

  const handleTimeChange = (value: string) => {
    setTime(value);
    const hour = parseInt(value.split(':')[0], 10);
    onChange(hour);
  };

  const adjustTime = (direction: 'up' | 'down') => {
    const [hours, minutes] = time.split(':').map(Number);
    let newHours = direction === 'up' ? (hours + 1) % 24 : (hours - 1 + 24) % 24;
    const newTime = `${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    setTime(newTime);
    onChange(newHours);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <label className="block text-sm font-medium text-gray-700 flex items-center">
        <Clock className="mr-2 text-blue-600" />
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          type="time"
          name={name}
          value={time}
          onChange={(e) => handleTimeChange(e.target.value)}
          required={required}
          className="
            block w-full pl-10 pr-12 py-3 
            border-2 border-blue-200 rounded-xl 
            focus:ring-2 focus:ring-blue-500 
            transition duration-300
          "
        />
        <div className="absolute right-2 flex flex-col">
          <motion.button
            type="button"
            onClick={() => adjustTime('up')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-blue-600 hover:bg-blue-50 rounded-full p-1"
          >
            <ChevronUp className="h-4 w-4" />
          </motion.button>
          <motion.button
            type="button"
            onClick={() => adjustTime('down')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-blue-600 hover:bg-blue-50 rounded-full p-1"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.button>
        </div>
        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-600" />
      </div>
    </motion.div>
  );
}