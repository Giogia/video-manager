export const getVideo = (id: string) => document.getElementById(id) as HTMLVideoElement

export const isVideoPlaying = (video: HTMLVideoElement) => Boolean(
    !video.paused &&
    !video.ended &&
    video.currentTime > 0 &&
    video.readyState > 2
)