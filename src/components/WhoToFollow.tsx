import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import { Button } from "./ui/button";

const users = [
  {
    id: "jane0f5aaa04ffc8",
    slug: "janef5aaa04ffc8",
    name: "Jane Doe",
    avatar: "https://avatars.githubusercontent.com/u/1019400?v=4",
  },
  {
    id: "5aaa04ffc822",
    slug: "johnf5aaa04ffc8",
    name: "John Doe",
    avatar: "https://avatars.githubusercontent.com/u/1019400?v=4",
  },
  {
    id: "5aaa04123ffc822",
    slug: "Markf5aaa04ffc8",
    name: "Mark Doe",
    avatar: "https://avatars.githubusercontent.com/u/1019400?v=4",
  },
];

export default function WhoToFollow({}) {
  return (
    <div className="bg mt-18 hidden w-full flex-wrap pl-10 xl:block">
      <h2 className="font-secondary text-2xl font-bold text-custom-text-primary">
        Who to follow
      </h2>
      <ul className="">
        {users.map((user) => (
          <li
            key={user?.id}
            className="my-8 flex items-center justify-between gap-4"
          >
            <Link href={`/@${user?.slug}`} className="flex items-center gap-2">
              <span className="flex items-center gap-2 text-sm font-medium text-custom-text-primary">
                <Avatar className="flex items-center justify-center bg-zinc-200 text-sm">
                  <AvatarImage src={user?.avatar!} alt="User avatar" />
                  <AvatarFallback>
                    {user?.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </span>
              <p className="max-w-[14em] overflow-hidden text-custom-text-primary">
                {user?.name}
              </p>
            </Link>
            <Button variant={"outline"} className="text-custom-text-primary">
              Follow
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
