import { Plane } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Plane className="h-8 w-8" />
          <h1 className="text-2xl font-bold">AirFare Predictor</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#prediction" className="hover:text-blue-200 transition-colors">Predict Fare</a></li>
            <li><a href="#airlines" className="hover:text-blue-200 transition-colors">Airlines</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}