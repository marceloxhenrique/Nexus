import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FollowerWithUser, FollowingWithUser } from "@/lib/types";

export default function Following({
  following,
}: {
  following: FollowingWithUser[];
}) {
  const NEXT_PUBLIC_AWS_URL = process.env.NEXT_PUBLIC_AWS_URL;

  return (
    <div className="bg hidden w-96 flex-col py-10 lg:flex">
      <h2 className="font-primary text-xl font-bold text-custom-text-primary">
        Following
      </h2>
      {following.length > 0 ? (
        <ul>
          {following &&
            following.map((follower: FollowingWithUser) => (
              <li
                key={follower?.id}
                className="my-8 flex items-center justify-between gap-4"
              >
                <Link
                  href={`/@${follower?.followingSlug}`}
                  className="flex items-center gap-2"
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-custom-text-primary">
                    <Avatar className="flex size-8 items-center justify-center bg-zinc-200 text-sm">
                      <AvatarImage
                        src={NEXT_PUBLIC_AWS_URL! + follower.following?.avatar}
                        alt="User avatar"
                      />
                      <AvatarFallback>
                        {follower.following?.name?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </span>

                  <span className="flex max-w-[18em] flex-col overflow-hidden text-sm text-custom-text-primary">
                    <p className="text-lg">{follower.following?.name}</p>
                    <p className="text-xs">{follower.followingSlug}</p>
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      ) : (
        <p className="py-4 text-xs text-custom-text-light">No Following</p>
      )}
    </div>
  );
}
