import * as fs from "fs";

export enum SyncStats {
  SYNCING = "syncing",
  NOT_SYNCING = "not_syncing",
}

export default function getSyncStats(): SyncStats {
  const handleTmpFolder = "./tmp_save/";
  const destFile = `${handleTmpFolder}save.json`;

  // Check if the folder exists
  if (fs.existsSync(handleTmpFolder) && !fs.existsSync(destFile)) {
    // last sync not ready yet.
    return SyncStats.SYNCING;
  }
  return SyncStats.NOT_SYNCING;
}
