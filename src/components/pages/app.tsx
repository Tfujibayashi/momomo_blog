import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Footer, Header } from '@components/organisms';
import { Content, Edit, Edits, Home, NotFound, SignIn } from '@components/pages';

import 'react-toastify/dist/ReactToastify.css';
import { AuthContextStore, useAuthContext } from '~/hooks';

export const App = (): JSX.Element => {
  const { loading } = useAuthContext() as AuthContextStore;

  return (
    <div>
      <ToastContainer />

      <Header />

      <main>
        {loading ? (
          <div>読み込み中</div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/content/:contentId" element={<Content />} />

            <Route path="/sign-in" element={<SignIn />} />

            <Route path="/edit/:contentId" element={<Edit />} />

            <Route path="/edit" element={<Edits />} />

            <Route path="/*" element={<NotFound />} />
          </Routes>
        )}
      </main>

      <Footer />
    </div>
  );
};
