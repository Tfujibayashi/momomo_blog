import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Footer, Header } from '@components/organisms';
import { Edit, Home, NotFound, SignIn } from '@components/pages';
import { AuthProvider } from '@components/providers';

import 'react-toastify/dist/ReactToastify.css';

export const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <ToastContainer />

      <AuthProvider>
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
};
