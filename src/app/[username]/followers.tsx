import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FollowerWithUser } from "@/lib/types";

export default function Followers({
  followers,
}: {
  followers: FollowerWithUser[];
}) {
  const NEXT_PUBLIC_AWS_URL = process.env.NEXT_PUBLIC_AWS_URL;

  return (
    <div className="bg hidden w-96 flex-col py-10 lg:flex">
      <h2 className="font-primary text-xl font-bold text-custom-text-primary">
        Followers
      </h2>
      {followers.length > 0 ? (
        <ul>
          {followers &&
            followers.map((follower: FollowerWithUser) => (
              <li
                key={follower?.id}
                className="my-8 flex items-center justify-between gap-4"
              >
                <Link
                  href={`/@${follower?.followerSlug}`}
                  className="flex items-center gap-2"
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-custom-text-primary">
                    <Avatar className="flex size-8 items-center justify-center bg-zinc-200 text-sm">
                      <AvatarImage
                        src={NEXT_PUBLIC_AWS_URL! + follower.follower?.avatar}
                        alt="User avatar"
                      />
                      <AvatarFallback>
                        {follower.follower?.name?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </span>

                  <span className="flex max-w-[18em] flex-col overflow-hidden text-sm text-custom-text-primary">
                    <p className="text-lg">{follower.follower?.name}</p>
                    <p className="text-xs">{follower.followerSlug}</p>
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      ) : (
        <p className="py-4 text-xs text-custom-text-light">No Followers</p>
      )}
    </div>
  );
}
