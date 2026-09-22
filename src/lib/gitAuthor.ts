import { execFileSync } from 'node:child_process';

/**
 * Reads the author of the most recent commit that touched a file, straight
 * from git history at build time. Returns null for files with no commit yet
 * (new/uncommitted pages) instead of throwing, since that's a normal state
 * in local dev.
 */
export function getLastAuthor(filePath: string): string | null {
	try {
		const output = execFileSync(
			'git',
			['log', '-1', '--format=%an', '--', filePath],
			{ encoding: 'utf-8' },
		).trim();
		return output.length > 0 ? output : null;
	} catch {
		return null;
	}
}

export interface GitMeta {
	author: string | null;
	date: string | null;
}

/** Author + ISO commit date in one git call, for the homepage's recent list. */
export function getLastGitMeta(filePath: string): GitMeta {
	try {
		const output = execFileSync(
			'git',
			['log', '-1', '--format=%an|%aI', '--', filePath],
			{ encoding: 'utf-8' },
		).trim();
		if (!output) return { author: null, date: null };
		const [author, date] = output.split('|');
		return { author: author ?? null, date: date ?? null };
	} catch {
		return { author: null, date: null };
	}
}
