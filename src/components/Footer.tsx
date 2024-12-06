export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About AirFare Predictor</h3>
            <p className="text-sm">
              Our AI-powered tool helps you predict airline fares across major Indian cities.
              Make informed decisions for your travel plans with accurate fare predictions.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#prediction" className="hover:text-white transition-colors">Predict Fare</a></li>
              <li><a href="#airlines" className="hover:text-white transition-colors">Airlines</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm">
              Have questions? Reach out to us at:<br />
              support@airfarepredictor.com
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} AirFare Predictor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}