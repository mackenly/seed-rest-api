import assert from 'node:assert';
import { Miniflare } from 'miniflare';

const mf = new Miniflare({
	scriptPath: './build/worker/shim.mjs',
	modules: true,
	modulesRules: [{ type: 'CompiledWasm', include: ['**/*.wasm'], fallthrough: true }],
});

const res = await mf.dispatchFetch('http://localhost');
assert(res.ok);
// reponse looks like this: {"length":32,"random_string":"UKVD0R9sFFfpI5Ng3gbYEfYZBlbEmqIa"}
// but the random string is different every time
const json = await res.json();
assert(json.length === 32);
assert(typeof json.random_string === 'string');
assert(json.random_string.length === 32);

await mf.dispose();