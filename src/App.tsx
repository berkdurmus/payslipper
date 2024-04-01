import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PayslipList from './components/PayslipList';
import PayslipDetail from './components/PayslipDetail';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PayslipList />} />
          <Route path="/payslip/:id" element={<PayslipDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
