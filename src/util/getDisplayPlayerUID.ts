/**
 * Display player Uid
 * @param saveFilePlayerUid player_uid
 * @returns
 */
export default function getDisplayPlayersUID(saveFilePlayerUid: string) {
  return parseInt(saveFilePlayerUid.split("-")[0], 16);
}
