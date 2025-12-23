// Copies SRC into DEST between <!-- SYNC START --> and <!-- SYNC END -->
module.exports = async (params) => {
  const app = params.app;
  const SRC  = "Meta/Timelines/timeline.mw";        // <— change if needed
  const DEST = "Meta/Timelines/timeline-viewer.md"; // <— change if needed
  const WRAP_IN_FENCE = false; // set true to wrap in ```mw

  const START="<!-- SYNC START -->", END="<!-- SYNC END -->";
  const src = app.vault.getAbstractFileByPath(SRC);
  const dest= app.vault.getAbstractFileByPath(DEST);
  if(!src) { new Notice("Source not found: " + SRC); return; }
  if(!dest){ new Notice("Destination not found: " + DEST); return; }

  let content = (await app.vault.read(src)).trim();
  if (WRAP_IN_FENCE) content = "```mw\n" + content + "\n```";

  let body = await app.vault.read(dest);
  const re = new RegExp(`${START}[\\s\\S]*?${END}`, "m");
  const block = `${START}\n${content}\n${END}`;
  body = re.test(body) ? body.replace(re, block) : (body + "\n\n" + block + "\n");
  await app.vault.modify(dest, body);
  new Notice("Synced.");
};
