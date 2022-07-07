try {
  Deno.removeSync("./key.json");
} catch {
} finally {
  const key = await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
  );

  const exportedKey = await crypto.subtle.exportKey("jwk", key);
  Deno.writeFileSync(
    "./key.json",
    new TextEncoder().encode(JSON.stringify(exportedKey)),
  );
}

export const jwtKey = await crypto.subtle.importKey(
  "jwk",
  JSON.parse(
    new TextDecoder().decode(Deno.readFileSync("./key.json")),
  ),
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);
