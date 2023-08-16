import Image from "next/image";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default function Home() {
  const supabase = createServerComponentClient({ cookies });

  // try {
  //   const { data, error } = await supabase.storage.from('avatars').download(path)
  //   if (error) {
  //     throw error
  //   }

  //   const url = URL.createObjectURL(data)
  //   setAvatarUrl(url)
  // } catch (error) {
  //   console.log('Error downloading image: ', error)
  // }

  return (
    <main>
      <h1>Upload your CV to work with us on Poziom</h1>
      <div>
        <form className="flex flex-col gap-2">
          <div className="flex gap-2">
            <label>
              First name
              <input type="text" placeholder="Krzysztof" />
            </label>
            <label>
              Last name
              <input type="text" placeholder="Poziomek" />
            </label>
          </div>
          <label className="block">
            Phone
            <input type="tel" placeholder="+1 234 567 8910" />
          </label>
          <label className="block">
            Email
            <input type="email" placeholder="test@test.com" />
          </label>
          <label className="block">
            Upload CV
            <input type="file"  />
          </label>
          <button className="bg-orange-300 p-2 rounded-lg">Submit</button>
        </form>
      </div>
    </main>
  );
}
