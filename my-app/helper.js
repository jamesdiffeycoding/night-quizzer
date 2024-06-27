export function getCreationDay (time) {
    let creationDay = `${-1 + Math.floor((new Date() - new Date(time)) / (1000 * 60 * 60 * 24))}`
    return creationDay <= 0 ? "today" : creationDay == 1 ? "1 day ago." : `${creationDay} days ago.`
}


