import { createClient } from '@/utils/supabase/server';

export default async function Notes() {
  const supabase = createClient();
  const { data: Users } = await supabase.from("Users").select();

  return <pre>{JSON.stringify(Users, null, 5)}</pre>
}