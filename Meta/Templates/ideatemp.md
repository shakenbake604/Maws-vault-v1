---
title: "Idea: "
created: 2025-07-28
modified: 2025-12-18
---
<%*  /* --------------- Templater script --------------- */

// 1️⃣  Ask for the idea’s title
const ideaName = await tp.system.prompt("📝 Idea name");
if (!ideaName) { throw new Error("Need a name to continue!"); }   // guard‑rail

// 3️⃣  Build the destination file path  (= no sub‑folder)
const basePath = "Ideas";           // parent folder
const destFile = `${basePath}/${ideaName}`;                    // final file

// 4️⃣  Generate helper values for front‑matter
const id   = tp.date.now("YYMMDDHHmmss");                         // unique numeric ID
                                           

// 5️⃣  Compose the entire Markdown note body
const body = `---  
 Date: ${tp.date.now("YYYY-MM-DD ddd @ HH:mm")}  
---

# Idea: 
  

## Details  
| Item           | Notes |
|----------------|-------|
| Target users   |       |
| Monetization   |       |
| Timeline       |       |

## First next steps  
- [ ] Quick feasibility scan  
- [ ] Outline MVP requirements  

## References  
- 

---
id: ${id}   

*Captured automatically on ${tp.date.now("YYYY-MM-DD HH:mm:ss")}*
`;

// 6️⃣  Create the new file (folder auto‑created if it doesn’t exist)
const newFile = await tp.file.create_new(body, destFile);

// 7️⃣  Open the freshly‑made note in a new pane
await app.workspace.getLeaf(true).openFile(newFile);

/* --------------- End of script --------------- */
-%>
