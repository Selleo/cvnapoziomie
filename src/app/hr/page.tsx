import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const Page = async () => {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.from("applications").select("*");

  return <main>{JSON.stringify(data)}</main>;
};
export default Page;
