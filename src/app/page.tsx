import Image from "next/image";

import {
  createServerComponentClient,
  createServerActionClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default function Home() {
  
  const onSubmit = async (e: FormData) => {
    "use server";
    const supabase = createServerActionClient({ cookies });

    const firstName = e.get("firstName");
    const lastName = e.get("lastName");
    const phone = e.get("phone");
    const email = e.get("email");
    const cv = e.get("cv");

    console.log({ firstName, lastName, phone, email, cv });

    if (!cv) return;
    const randomFileName = Math.random().toString(36).substring(7);

    const { data, error } = await supabase.storage
      .from("cvs")
      .upload(`public/${randomFileName}`, cv);

    if (error || !data) {
      console.log(error);
      return;
    }

    console.log("cv data", data);

    let user = {
      email,
      phone_number: phone,
      first_name: firstName,
      last_name: lastName,
      cv_url: data.path,
    };

    const { data: data2, error: error2 } = await supabase
      .from("applications")
      .insert([user]);
  };

  return (
    <main>
      <h1>Upload your CV to work with us on Poziom</h1>
      <div>
        <form action={onSubmit} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <label>
              First name
              <input
                required
                name="firstName"
                type="text"
                placeholder="Krzysztof"
              />
            </label>
            <label>
              Last name
              <input
                required
                name="lastName"
                type="text"
                placeholder="Poziomek"
              />
            </label>
          </div>
          <label className="block">
            Phone
            <input
              required
              name="phone"
              type="tel"
              placeholder="+1 234 567 8910"
            />
          </label>
          <label className="block">
            Email
            <input
              required
              name="email"
              type="email"
              placeholder="test@test.com"
            />
          </label>
          <label className="block">
            Upload CV
            <input required name="cv" type="file" />
          </label>
          <button className="bg-orange-300 p-2 rounded-lg">Submit</button>
        </form>
      </div>
    </main>
  );
}
