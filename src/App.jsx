import Hero from './components/Hero';
import Demo from './components/Demo';

import './App.css';

const App = () => {
  return (
    <main>
      <div className='main'>
        {/* Gradient background */}
        <div className='gradient'/>
      </div>

      {/* App container */}
      <div className='app'>
          {/* Description of page */}
          <Hero/>

          {/* Show article summary */}
          <Demo/>
      </div>
    </main>
  )
}

export default App