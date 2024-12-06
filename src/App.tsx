import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PredictionForm } from './components/PredictionForm';
import { AirlineLinks } from './components/AirlineLinks';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <main className="container mx-auto px-4">
        <PredictionForm />
        <AirlineLinks />
      </main>
      <Footer />
    </div>
  );
}

export default App;