//this uses server side not client side data fetching <there is no 'use client'> this is how we will do all of our data management
//prints json of users data to screen

import AuthButton from '@/components/AuthButton';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Notes() {
  const supabase = createClient();

  //redirects to login page if not an authenticated/logged in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  
  const { data: Users } = await supabase.from("Users").select();

  return (
    //purple banner showing its protected and return data as well as auth  button component for logging out
    <div className="w-full">
      <div className="py-6 font-bold bg-purple-950 text-center">
          This is a protected page that you can only see as an authenticated user
          <AuthButton />
      </div>
      <pre>{JSON.stringify(Users, null, 5)}</pre>
    </div>
  )
}

