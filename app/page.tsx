import Link from "next/link";

export default function Home() {

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-10">
      <h1
       className="text-3xl font-medium"
      >Welcome!</h1>
      <div className="space-x-2">
      <Link 
       className="border-2 rounded-md border-gray-600 px-3 py-1"
       href={'/auth/register'}>
        Register
      </Link>
      <Link 
       className="border-2 rounded-md border-gray-600 px-3 py-1"
       href={'/auth/login'}>
        Login
      </Link>
      </div>
    </div>
  );
}
