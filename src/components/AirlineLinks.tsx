import { ExternalLink } from 'lucide-react';
import { AIRLINE_WEBSITES } from '../types';

export function AirlineLinks() {
  return (
    <div id="airlines" className="max-w-4xl mx-auto p-6 my-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Official Airline Websites</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(AIRLINE_WEBSITES).map(([airline, url]) => (
          <a
            key={airline}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <span className="font-medium text-gray-700">{airline}</span>
            <ExternalLink className="h-5 w-5 text-blue-600" />
          </a>
        ))}
      </div>
    </div>
  );
}