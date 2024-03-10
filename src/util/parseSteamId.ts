import hasher from "google-cityhash";
import getDisplayPlayersUID from "./getDisplayPlayerUID";

const steamIdToPlayerUid = (steamId: string) => {
  const hash = hasher.city64(steamId);
  return (
    ((hash.getLowBitsUnsigned() + hash.getHighBitsUnsigned() * 23) &
      0xffffffff) >>>
    0
  );
};

const steamAccountIdToBuf = (accountId: number) => {
  return (BigInt(accountId) + BigInt(76561197960265728)).toString();
};

export default function getSteamId(playerUid: string) {
  // inspired by: https://github.com/cheahjs/palworld-steam-id-to-player-uid/blob/main/src/worker/PalToSteamWorker.ts
  // brute force to test the correct one.
  // const target = +getDisplayPlayersUID(playerUid);
  // const start = 28154560;
  // const end = 28154563;
  // for (let i = start; i <= end; i++) {
  //   const uid = steamIdToPlayerUid(steamAccountIdToBuf(i));
  //   console.log(i, '+++', uid, target);
  //   if (target === uid) {
  //     return uid;
  //   }
  // }
}
