import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent: any) => {
  return (props : any) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        Router.replace('/login');
      } else {
        setVerified(true);
      }
    }, []);

    if (!verified) {
      return null; // Or a loading spinner, etc.
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
