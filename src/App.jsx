import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SubMainHome from './ViewFame/SubMainHome';
import InquiryPage from './ViewFame/InquiryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubMainHome />} />
        <Route path="/inquiry/write" element={<InquiryPage />} />
      </Routes>
    </Router>
  );
}

export default App;