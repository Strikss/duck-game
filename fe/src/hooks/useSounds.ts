import useSound from "use-sound";

const sounds = {
	quack: "/sounds/quack.mp3",
	awp: "/sounds/awp.mp3",
} as const;

export type SoundKey = keyof typeof sounds;

export function useSounds<T = unknown>(
	key: SoundKey,
	options?: Parameters<typeof useSound<T>>[1],
) {
	return useSound<T>(sounds[key], options);
}
