import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../../database.types";

type People = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  status: string | null;
}[];

const Page = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data, error } = await supabase
    .from("applications")
    .select("id, first_name, last_name, status");

  if (!data || data.length < 1 || error) return <div>No one here</div>;

  const { parsedPeople, newPeople } = data.reduce(
    (el, item) => {
      if (item.status === "new") {
        el.newPeople.push(item);
        return el;
      }
      el.parsedPeople.push(item);
      return el;
    },
    {
      parsedPeople: [] as People,
      newPeople: [] as People,
    }
  );

  const handleSubmit = async (e: FormData) => {
    'use server';
    console.log('todo: handle submit');
  };

  return (
    <main>
      <h2 className="mt-2 text-xl font-bold">
        New applications ({newPeople.length})
      </h2>
      <ul className="flex flex-col gap-2">
        {data.map((el) => (
          <li key={el.id}>
            {el.first_name} {el.last_name}
            <form action={handleSubmit}>
              <button className="p-2 bg-orange-400 rounded-md ml-4">
                Process
              </button>
            </form>
          </li>
        ))}
      </ul>
      <h2 className="mt-2 text-xl font-bold">
        Old applications ({parsedPeople.length})
      </h2>
      <ul className="flex flex-col gap-2">
        {parsedPeople.map((el) => (
          <li key={el.id}>
            {el.first_name} {el.last_name}
          </li>
        ))}
      </ul>
    </main>
  );
};
export default Page;
