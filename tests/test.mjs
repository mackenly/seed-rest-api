import assert from 'node:assert';
import { unstable_dev } from 'wrangler';

const worker = await unstable_dev('build/index.js', {
	compatibilityDate: '2026-09-18',
	logLevel: 'error',
	experimental: {
		disableExperimentalWarning: true,
		watch: false,
		forceLocal: true,
	},
});

try {
	const res = await worker.fetch('http://localhost');
	assert(res.ok);
	// response looks like this: {"length":32,"random_string":"UKVD0R9sFFfpI5Ng3gbYEfYZBlbEmqIa"}
	// but the random string is different every time
	const json = await res.json();
	assert(json.length === 32);
	assert(typeof json.random_string === 'string');
	assert(json.random_string.length === 32);
} finally {
	await worker.stop();
}
