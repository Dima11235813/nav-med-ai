import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const required = {
  epics: ["id","title","owner","status","success_metrics"],
  features: ["id","epic","title","status","owners","acceptance_criteria"],
  stories: ["id","feature","title","priority","estimate","status","qa_owner"],
  tasks: ["id","story","title","type","status","definition_of_done"]
};

const roots = [
  ["proj-mgmt/02-epics", "epics"],
  ["proj-mgmt/03-features", "features"],
  ["proj-mgmt/04-stories", "stories"],
  ["proj-mgmt/05-tasks", "tasks"]
];

let failures = 0;
for (const [dir, kind] of roots) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".md")) continue;
    const fp = path.join(dir, f);
    const { data } = matter(fs.readFileSync(fp, "utf8"));
    const missing = required[kind].filter(k => !(k in data));
    if (missing.length) {
      console.error(`❌ ${fp} missing: ${missing.join(", ")}`);
      failures++;
    }
  }
}
if (failures) process.exit(1);
console.log("✅ proj-mgmt docs valid");
